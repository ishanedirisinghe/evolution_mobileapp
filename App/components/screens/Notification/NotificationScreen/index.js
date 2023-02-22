import React, { Component } from 'react';
import {
    View,
    Text,
    ActivityIndicator,
    SafeAreaView,
    TouchableOpacity,
    FlatList,
    RefreshControl,
    Platform,
    Image
} from 'react-native';

import DefaultPreference from 'react-native-default-preference';
import moment from 'moment';

import Spinner from 'react-native-loading-spinner-overlay';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { showMessage } from 'react-native-flash-message';

import NOTIFICATION_POPUP from '../../uiElements/NotificationPopup';
import HamNavigationHeader from '../../uiElements/HamNavigationHeader';
import { updateNotificationBadgeCount } from '../../../../../Action/notification';
const recordsPerPage = 10;
import styles from './styles';
import { Colors } from '../../../../styles';
const ICON_NOTIFY_UNREAD = require('../../../../assets/images/ic_notify_unread.png');
const ICON_NOTIFY_READ = require('../../../../assets/images/ic_notify_read.png');

class Search extends Component {
    fieldRef = React.createRef();

    constructor(props) {
        super(props);
        this.state = {
            isLogged: false,
            visible: true,
            pageNo: 1,
            refreshFlatList: false,
            notificationList: [],
            showNotificationPopup: false,
            notificationPopupTitle: '',
            notificationPopupMessage: '',
            notificationPopupTime: '',
            showScreenLoading: false,
            showPullToRefresh: false
        };
    }

    componentDidMount() {
        this.props.navigation.addListener('didFocus', payload => {
            console.log(
                'DEBUG: yyyyyyyyyyyyyyyyyyyyyyyyyyyyy. ',
                this.props.navigation.state.params
            );
            const { PUSH_NOTIFI_DATA } = this.props.navigation.state.params;

            if (PUSH_NOTIFI_DATA && PUSH_NOTIFI_DATA.MsgID) {
                if (!PUSH_NOTIFI_DATA.IsRead) {
                    this.setState({ callFunctionMarkRead: true });
                    this.markReadNotification(PUSH_NOTIFI_DATA.MsgID);
                }
                console.log(
                    'PUSH_NOTIFI_DATA TIME: yyyyyyyyyyyyyyyyyyyyyyyyyyyyy. ',
                    PUSH_NOTIFI_DATA.dtSendTime
                );
                this.setState({
                    isLogged: false,
                    visible: true,
                    pageNo: 1,
                    refreshFlatList: false,
                    notificationList: [],
                    showScreenLoading: false,
                    showNotificationPopup: true,
                    notificationPopupTitle: PUSH_NOTIFI_DATA.MeassageHeadr,
                    notificationPopupMessage: PUSH_NOTIFI_DATA.MessageDetail,
                    notificationPopupTime: PUSH_NOTIFI_DATA.dtSendTime,
                    showPullToRefresh: false,
                    callFunctionGetNotifications: true
                });
            } else {
                this.setState({
                    isLogged: false,
                    visible: true,
                    pageNo: 1,
                    refreshFlatList: false,
                    notificationList: [],
                    showScreenLoading: true,
                    showNotificationPopup: false,
                    notificationPopupTitle: '',
                    notificationPopupMessage: '',
                    notificationPopupTime: '',
                    showPullToRefresh: false,
                    callFunctionGetNotifications: true
                });
            }

            this.getNotificationData();
        });
    }

    getNotificationData() {
        var context = this;

        DefaultPreference.get('user_data').then(function(user_data) {
            console.log('PAGE ----------------------. ', context.state.pageNo);
            let userData = JSON.parse(user_data);
            let requestPath =
                global.API_ENDPOINT +
                '/api/NotificationAPI/GetNotifications?studentID=' +
                userData.StudentID +
                '&PageNo=' +
                context.state.pageNo +
                '&RecordsPerPage=' +
                recordsPerPage; // ' + context.state.pageNo + '
            console.log('DEBUG: Get Notification request.', requestPath);

            // context.setState({ showScreenLoading: true });
            fetch(requestPath, {
                method: 'GET',
                headers: {
                    Authorization: 'Bearer ' + global.session.access_token
                }
            })
                .then(response => response.text())
                .then(result => {
                    context.setState({
                        showScreenLoading: false,
                        showPullToRefresh: false,
                        isFooterLoading: false
                    });
                    let resultJson = JSON.parse(result);
                    console.log(
                        'DEBUG: Get Notification request success. ',
                        resultJson
                    );

                    var dataList =
                        resultJson && resultJson.length > 0 ? resultJson : [];

                    var nextPage = context.state.pageNo;
                    var hasMoreData = true;

                    if (dataList.length == recordsPerPage) {
                        nextPage = nextPage + 1;
                    } else {
                        hasMoreData = false;
                    }

                    if (dataList.length > 0) {
                        if (
                            context.state.notificationList &&
                            context.state.notificationList.length > 0 &&
                            context.state.pageNo != 1
                        ) {
                            context.setState({
                                pageNo: nextPage,
                                loadMoreData: hasMoreData,
                                notificationList: [
                                    ...context.state.notificationList,
                                    ...dataList
                                ]
                            });
                        } else {
                            context.setState({
                                pageNo: nextPage,
                                loadMoreData: hasMoreData,
                                notificationList: dataList
                            }); // dataList
                        }

                        // console.log('DATA ----------------------. ', newD);
                        // context.setState({ pageNo: nextPage, loadMoreData: hasMoreData, notificationList: newD })
                    } else {
                        context.setState({
                            pageNo: nextPage,
                            loadMoreData: hasMoreData
                        });
                    }

                    if (
                        context.state.openNotifiMesgID != '' &&
                        context.state.openNotifiStudentID != ''
                    ) {
                        context.setState({
                            pageNo: nextPage,
                            loadMoreData: hasMoreData
                        });
                    }
                })
                .catch(error => {
                    if (context.state.callFunctionGetNotifications) {
                        context.setState({
                            callFunctionGetNotifications: false
                        });
                        console.log(
                            'Recall Notifications --------------------------------------'
                        );
                        context.getNotificationData();
                    } else {
                        context.setState({
                            showScreenLoading: false,
                            showPullToRefresh: false,
                            isFooterLoading: false,
                            loadMoreData: false
                        });
                        if (context.state.pageNo == 1) {
                            showMessage({
                                message: 'Error',
                                description:
                                    'Unknown server error. Please check your internet connection. Contact support if issue prevails.',
                                type: 'danger'
                            });
                        }
                    }
                });
        });
    }

    markReadNotification(notifi_id) {
        var context = this;
        let requestPath =
            global.API_ENDPOINT +
            '/api/NotificationAPI/PostReadStatus?notificationID=' +
            notifi_id;
        console.log('DEBUG: Mark Notification Read request.', requestPath);

        fetch(requestPath, {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + global.session.access_token
            }
        })
            .then(response => response.text())
            .then(result => {
                let resultJson = JSON.parse(result);
                console.log(
                    'DEBUG: Mark Notification Read success. ',
                    resultJson
                );

                const elementsIndex = context.state.notificationList.findIndex(
                    element => element.NotificationID == notifi_id
                );
                let newArray = [...context.state.notificationList];
                newArray[elementsIndex] = {
                    ...newArray[elementsIndex],
                    IsRead: true
                };

                context.setState({ notificationList: newArray });

                // Update notification badge count
                updateNotificationBadgeCount();
            })
            .catch(error => {
                if (context.state.callFunctionMarkRead) {
                    context.setState({ callFunctionMarkRead: false });
                    console.log(
                        'Recall MarkRead --------------------------------------'
                    );
                    context.markReadNotification(notifi_id);
                } else {
                    console.log('DEBUG: Mark Notification Read failed.', error);
                    showMessage({
                        message: 'Error',
                        description:
                            'Unknown server error. Please check your internet connection. Contact support if issue prevails.',
                        type: 'danger'
                    });
                }
            });
    }

    onPressNotificationItem = item => {
        if (!item.IsRead) {
            this.setState({ callFunctionMarkRead: true });
            this.markReadNotification(item.NotificationID);
        }
        this.setState({
            showNotificationPopup: true,
            notificationPopupTitle: item.MeassageHeadr,
            notificationPopupMessage: item.MessageDetail,
            notificationPopupTime: item.dtSendTime
        });
    };

    onPressClosePopup = () => {
        this.setState({
            showNotificationPopup: !this.state.showNotificationPopup
        });
    };

    onPullToRefresh = () => {
        this.setState(
            {
                showPullToRefresh: true,
                callFunctionGetNotifications: true,
                showScreenLoading: true,
                pageNo: 1,
                notificationList: []
            },
            this.getNotificationData
        );
    };

    handleLoadMoreDataNotification = () => {
        if (this.state.loadMoreData) {
            this.setState(
                { isFooterLoading: true, callFunctionGetNotifications: true },
                this.getNotificationData
            );
        }
    };

    renderFooterLoader = () => {
        return this.state.isFooterLoading ? (
            <View
                style={{
                    marginTop: wp('3%'),
                    height: wp('50%'),
                    alignItems: 'center'
                }}>
                <ActivityIndicator size="large" color={Colors.TINT_COLOR} />
            </View>
        ) : null;
    };

    renderNotificationFlatListItem({ item, index }) {
        return (
            <TouchableOpacity
                style={
                    item.IsRead ? styles.listItemRead : styles.listItemUnRead
                }
                activeOpacity={0.6}
                onPress={() => this.onPressNotificationItem(item)}>
                <Image
                    source={item.IsRead ? ICON_NOTIFY_READ : ICON_NOTIFY_UNREAD}
                    style={item.IsRead ? styles.readIcon : styles.unreadIcon}
                />
                <View style={styles.listItemDetailContainer}>
                    <Text
                        numberOfLines={1}
                        style={[
                            styles.notificationTitleText,
                            {
                                color: item.IsRead
                                    ? Colors.TEXT.DARK_BLACK_COLOR
                                    : Colors.TEXT.SECONDARY_COLOR
                            }
                        ]}>
                        {item.MeassageHeadr}
                    </Text>
                    <Text
                        numberOfLines={2}
                        style={[
                            styles.notificationDescriptionText,
                            {
                                color: item.IsRead
                                    ? Colors.TEXT.PRIMARY_COLOR
                                    : Colors.TEXT.SECONDARY_COLOR
                            }
                        ]}>
                        {item.MessageDetail}
                    </Text>
                    <Text
                        style={[
                            styles.notificationDateText,
                            {
                                color: item.IsRead
                                    ? Colors.TEXT.GRAY_COLOR
                                    : Colors.TEXT.SECONDARY_COLOR
                            }
                        ]}>
                        {moment(item.dtSendTime).format('DD/MM/YYYY')}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.flex1}>
                    <HamNavigationHeader
                        {...this.props}
                        screenTitle="Notifications"
                    />
                    <View style={styles.centerContainer}>
                        <Spinner
                            visible={
                                this.state.showScreenLoading &&
                                !this.state.isFooterLoading
                            }
                            textContent={'Loading...'}
                        />
                        <FlatList
                            style={styles.notificationList}
                            contentContainerStyle={
                                styles.notificationListContianer
                            }
                            alwaysBounceVertical={false}
                            data={this.state.notificationList || []}
                            keyExtractor={(item, NotificationID) =>
                                `"id"${NotificationID}`
                            }
                            renderItem={this.renderNotificationFlatListItem.bind(
                                this
                            )}
                            onEndReached={this.handleLoadMoreDataNotification}
                            onEndReachedThreshold={
                                Platform.OS === 'ios' ? 0 : 0.13
                            }
                            refreshControl={
                                <RefreshControl
                                    refreshing={this.state.showPullToRefresh}
                                    onRefresh={this.onPullToRefresh}
                                />
                            }
                            extraData={this.state.refreshFlatList}
                            ListFooterComponent={() =>
                                this.state.isFooterLoading ? (
                                    this.renderFooterLoader()
                                ) : (
                                    <View style={{ height: wp('2%') }} />
                                )
                            }
                            showsVerticalScrollIndicator={false}
                        />

                        {!this.state.showScreenLoading &&
                        !this.state.showPullToRefresh &&
                        this.state.notificationList.length === 0 ? (
                            <Text style={styles.noNotificationText}>
                                {'No notifications received'}
                            </Text>
                        ) : null}
                    </View>
                </View>
                {this.state.showNotificationPopup ? (
                    <NOTIFICATION_POPUP
                        TITLE={this.state.notificationPopupTitle}
                        MESSAGE={this.state.notificationPopupMessage}
                        TIME={this.state.notificationPopupTime}
                        onPressClose={this.onPressClosePopup}
                    />
                ) : null}
            </SafeAreaView>
        );
    }
}

export default Search;

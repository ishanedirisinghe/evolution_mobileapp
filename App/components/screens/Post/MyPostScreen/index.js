import React, { Component } from 'react';
import {
    View,
    Text,
    ActivityIndicator,
    SafeAreaView,
    FlatList,
    RefreshControl
} from 'react-native';
import DefaultPreference from 'react-native-default-preference';
import { showMessage } from 'react-native-flash-message';
import { NavigationEvents } from 'react-navigation';
import POST_ITEM from '../../uiElements/PostItem';
import NavigationHeader from '../../uiElements/NavigationHeader';
import styles from './styles';
import { Colors } from '../../../../styles';
const ICON_ADD = require('../../../../assets/images/ic_add.png');

class Search extends Component {
    fieldRef = React.createRef();

    constructor(props) {
        super(props);
        this.page = 1;
        this.loadAllData = true;
        this.state = {
            loading: false,
            isRefreshing: false,
            data: [],
            error: ''
        };
    }

    onFireScreen() {
        this.setState({
            loading: false,
            isRefreshing: false,
            data: [],
            error: ''
        });
        this.getMyPostsData(this.page);
    }

    async fetchMyPosts(isRefresh, page) {
        var context = this;
        if (isRefresh) {
            context.setState({ isRefreshing: true });
        } else {
            context.setState({ loading: true });
        }

        DefaultPreference.get('user_data').then(function(user_data) {
            let userData = JSON.parse(user_data);
            let requestPath =
                global.API_ENDPOINT +
                '/api/PostAPI/MyPostList?studentID=' +
                userData.StudentID +
                '&PageNo=' +
                page +
                '&RecordsPerPage=10';
            console.log('DEBUG: Get My Post request.', requestPath);

            fetch(requestPath, {
                method: 'GET',
                headers: {
                    Authorization: 'Bearer ' + global.session.access_token
                }
            })
                .then(response => response.text())
                .then(result => {
                    let resultJson = JSON.parse(result);
                    console.log(
                        'DEBUG: Get My Post request success. ',
                        resultJson.length
                    );

                    if (resultJson && resultJson.length < 1) {
                        context.loadAllData = true;
                    }

                    if (isRefresh) {
                        let data = resultJson;
                        context.setState({ isRefreshing: false, data: data });
                    } else {
                        let listData = [...context.state.data, ...resultJson];
                        context.setState({ loading: false, data: listData });
                    }
                })
                .catch(error => {
                    context.loadAllData = true;
                    context.setState({ loading: false, isRefreshing: false });
                    showMessage({
                        message: 'Error',
                        description:
                            'Unknown server error. Please check your internet connection. Contact support if issue prevails.',
                        type: 'danger'
                    });
                });
        });
    }

    getMyPostsData(page) {
        this.fetchMyPosts(false, page);
    }

    onRefresh() {
        this.page = 1;
        this.loadAllData = false;
        this.fetchMyPosts(true, 1);
    }

    handleLoadMore = () => {
        if (!this.state.loading && !this.loadAllData) {
            this.page = this.page + 1;
            this.getMyPostsData(this.page);
        }
    };

    onPressPostItem = item => {
        if (
            (item && item.PostStatus && item.PostStatus == 'Pending') ||
            (item && item.PostStatus && item.PostStatus == 'Re-Submitted')
        ) {
            this.props.navigation.navigate('CreatePostScreen', {
                TYPE: 'VIEW',
                POST: item
            }); // TYPE = ADD , UPDATE, VIEW
        } else {
            this.props.navigation.navigate('CreatePostScreen', {
                TYPE: 'UPDATE',
                POST: item
            }); // TYPE = ADD , UPDATE, VIEW
        }
    };

    renderFooter = () => {
        if (!this.state.loading) return null;
        return (
            <View style={styles.indicatorView}>
                <ActivityIndicator color={Colors.APP_COLOR} />
            </View>
        );
    };

    renderSeparator = () => {
        return <View style={styles.listSeparator} />;
    };

    renderPostFlatListItem({ item, index }) {
        return (
            <POST_ITEM
                key={index}
                INDEX={index}
                ITEM={item}
                ONPRESS_POST_ITEM={() => this.onPressPostItem(item)}
            />
        );
        // return (
        //     <TouchableOpacity
        //         style={{}}
        //         activeOpacity={0.6}
        //         onPress={() => this.onPressPostItem(item)}>
        //         <View style={styles.listItemRead}>
        //             <Text
        //                 style={styles.notificationTitleText}
        //                 numberOfLines={2}>
        //                 {item.PostTitle}
        //             </Text>
        //             <View
        //                 style={{ flex: 1, flexDirection: 'row', marginTop: 6 }}>
        //                 <Text
        //                     style={{
        //                         ...styles.notificationDateText,
        //                         color: 'gray',
        //                         flex: 1
        //                     }}>
        //                     {moment(item.EnteredOn).fromNow()}
        //                 </Text>
        //                 <Text
        //                     style={{
        //                         ...styles.notificationStatusText,
        //                         color:
        //                             item.PostStatus &&
        //                             item.PostStatus == 'Approved'
        //                                 ? 'green'
        //                                 : item.PostStatus &&
        //                                   item.PostStatus == 'Rejected'
        //                                 ? 'red'
        //                                 : 'gray'
        //                     }}
        //                     numberOfLines={1}>
        //                     {item.PostStatus}
        //                 </Text>
        //             </View>
        //         </View>
        //     </TouchableOpacity>
        // );
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <NavigationEvents onWillFocus={() => this.onFireScreen()} />
                <NavigationHeader
                    {...this.props}
                    screenTitle="My Posts"
                    rightButton={{
                        image: ICON_ADD,
                        onPress: () =>
                            this.props.navigation.navigate('CreatePostScreen', {
                                TYPE: 'ADD'
                            })
                    }}
                />
                <View style={styles.flex1}>
                    <FlatList
                        style={styles.flex1}
                        contentContainerStyle={styles.listContentContainer}
                        data={this.state.data}
                        extraData={this.state}
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.isRefreshing}
                                onRefresh={this.onRefresh.bind(this)}
                                tintColor={Colors.APP_COLOR}
                            />
                        }
                        renderItem={this.renderPostFlatListItem.bind(this)}
                        keyExtractor={(item, PostID) => `"id"${PostID}`}
                        ItemSeparatorComponent={this.renderSeparator}
                        ListFooterComponent={this.renderFooter.bind(this)}
                        onEndReachedThreshold={0.4}
                        onEndReached={this.handleLoadMore.bind(this)}
                    />

                    {!this.state.isRefreshing &&
                    !this.state.loading &&
                    this.state.data.length === 0 ? (
                        <Text style={styles.noDataText}>
                            {'No Posts Right Now!'}
                        </Text>
                    ) : null}
                </View>
            </SafeAreaView>
        );
    }
}

export default Search;

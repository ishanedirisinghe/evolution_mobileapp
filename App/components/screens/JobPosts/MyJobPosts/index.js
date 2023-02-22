import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    ActivityIndicator,
    SafeAreaView,
    FlatList,
    TouchableOpacity,
    RefreshControl,
    BackHandler
} from 'react-native';
import DefaultPreference from 'react-native-default-preference';
import moment from 'moment';
import { showMessage } from 'react-native-flash-message';
import { NavigationEvents } from 'react-navigation';
import SUB_TAB_BAR from '../../uiElements/JopPostStatusTabItem';
import styles from './styles';
import { Colors } from '../../../../styles';
import LinearGradient from 'react-native-linear-gradient';
import NavigationHeaderTwoRButton from '../../uiElements/NavigationHeaderTwoRButton';

const ICON_ADD = require('../../../../assets/images/ic_add_white.png');
const ICON_MY_POST = require('../../../../assets/images/my_post.png');
const ICON_INFO = require('../../../../assets/images/ic_info.png');
const JOB_ICON = require('../../../../assets/images/ic_job.png');

var keyIndex = 100;

const SUB_BAR_ITEMS = [
    {
        id: 1,
        key: 'Pending',
        label: 'Pending'
    },
    {
        id: 2,
        key: 'Approved',
        label: 'Approved'
    },
    {
        id: 3,
        key: 'Rejected',
        label: 'Rejected'
    },
    {
        id: 4,
        key: 'Expired',
        label: 'Expired'
    },
    {
        id: 5,
        key: 'Re-Submitted',
        label: 'Re-Submitted'
    }
];

// const imageWidth = Dimensions.get('window').width;
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
            error: '',
            selectedSubTabIndex: 0,
            selectedSubTabObject: SUB_BAR_ITEMS[0]
        };
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }

    componentWillMount() {
        // this.getMyPostsData(this.page);
    }

    componentWillUnmount() {}

    onFireScreen() {
        this.setState({
            loading: false,
            isRefreshing: false,
            data: [],
            error: ''
        });
        this.getMyPostsData(this.page);
    }

    getMyPostsData(page) {
        this.fetchMyPosts(false, page);
    }

    async fetchMyPosts(isRefresh, page) {
        var context = this;
        if (isRefresh) {
            context.setState({ isRefreshing: true });
        } else {
            context.setState({ loading: true });
        }

        DefaultPreference.get('job_user_data').then(function(user_data) {
            let userData = JSON.parse(user_data);
            let requestPath =
                global.API_ENDPOINT +
                '/api/JobPostAPI/GetMyJobPostList?CustomerID=' +
                userData.CustomerID +
                '&StatusID=' +
                context.state.selectedSubTabObject.id +
                '&PageNo=' +
                page +
                '&RecordsPerPage=10';
            console.log('DEBUG: Get My Job Post request.', requestPath);

            fetch(requestPath, {
                method: 'GET'
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

    componentWillMount() {
        BackHandler.addEventListener(
            'hardwareBackPress',
            this.handleBackButtonClick
        );
    }

    componentWillUnmount() {
        BackHandler.removeEventListener(
            'hardwareBackPress',
            this.handleBackButtonClick
        );
    }

    handleBackButtonClick() {
        this.onPressGoBack();
        return true;
    }

    onRefresh() {
        this.page = 1;
        this.loadAllData = false;
        this.fetchMyPosts(true, 1);
    }

    handleLoadMore = () => {
        var context = this;
        if (!this.state.loading && !this.loadAllData) {
            this.page = this.page + 1;
            this.getMyPostsData(this.page);
        }
    };

    onPressGoBack = () => {
        var context = this;
        context.props.navigation.navigate('Option');
    };

    onPressPostItem = (index, item) => {
        // if ((item && item.PostStatus && item.PostStatus == "Pending") || (item && item.PostStatus && item.PostStatus == "Re-Submitted")) {
        //   this.props.navigation.navigate("CreatePostScreen", { TYPE: "VIEW", POST: item }) // TYPE = ADD , UPDATE, VIEW
        // } else {
        //   this.props.navigation.navigate("CreatePostScreen", { TYPE: "UPDATE", POST: item }) // TYPE = ADD , UPDATE, VIEW
        // }
        // console.log('DEBUG: Get My Job Post request-------------.', item.JobPostingID);

        var context = this;
        if (context.state.selectedSubTabIndex == 1) {
            var navigation = context.props.navigation;
            navigation.navigate('ApplicantsList');
            this.props.navigation.navigate('ApplicantsList', {
                JOB_POST_ID: item.JobPostingID
            });
        }
    };

    onPressCreateJobPost = () => {
        var context = this;
        var navigation = context.props.navigation;

        context.setState({ loading: true });
        DefaultPreference.get('job_user_data').then(function(value) {
            context.setState({ loading: false });

            if (value) {
                let jsonData = JSON.parse(value);
                if (jsonData.CustomerID) {
                    navigation.navigate('CreateJobPost', {
                        TYPE: 'EXISTING_USER',
                        JOB_USER: jsonData
                    }); // TYPE = NEW_USER , EXISTING_USER
                } else {
                    navigation.navigate('CreateJobPost', {
                        TYPE: 'NEW_USER',
                        JOB_USER: {}
                    }); // TYPE = NEW_USER , EXISTING_USER
                }
            } else {
                navigation.navigate('CreateJobPost', {
                    TYPE: 'NEW_USER',
                    JOB_USER: {}
                }); // TYPE = NEW_USER , EXISTING_USER
            }
        });
    };

    renderFooter = () => {
        if (!this.state.loading) {
            return null;
        }
        return (
            <View style={styles.indicatorView}>
                <ActivityIndicator color={Colors.APP_COLOR} />
            </View>
        );
    };

    renderPostFlatListItem({ item, index }) {
        return (
            <TouchableOpacity
                style={styles.listItemContainer}
                activeOpacity={0.6}
                onPress={() => this.onPressPostItem(index, item)}>
                <View style={styles.headerContainer}>
                    <View style={styles.jobIconContainer}>
                        <Image style={styles.jobIcon} source={JOB_ICON} />
                    </View>
                    <Text
                        style={styles.postTitleText}
                        numberOfLines={1}
                        ellipsizeMode="tail">
                        {item.JobTitle}
                    </Text>
                </View>
                <Text style={styles.postDescriptionText}>
                    {item.JobDescription}
                </Text>
                <Text style={styles.postDateText}>
                    {moment(item.EnteredOn).format('DD/MM/YYYY')}
                </Text>
            </TouchableOpacity>
        );
    }

    onPressSubTabBar = (index, key) => {
        if (index != this.state.selectedSubTabIndex) {
            // this.setState({
            //   selectedSubTabObject: SUB_BAR_ITEMS[index],
            //   selectedSubTabIndex: index
            // })
            // this.page = 1;
            // this.loadAllData = false;
            // this.fetchMyPosts(true, 1);

            this.setState(
                {
                    selectedSubTabObject: SUB_BAR_ITEMS[index],
                    selectedSubTabIndex: index,
                    loading: false,
                    isRefreshing: false,
                    data: []
                },
                () => {
                    this.page = 1;
                    this.loadAllData = false;
                    this.fetchMyPosts(false, 1);
                }
            );
        }
    };

    renderSubBarItems({ item, index }) {
        const { selectedSubTabIndex } = this.state;
        return (
            <SUB_TAB_BAR
                INDEX={index}
                SELECTED_INDEX={selectedSubTabIndex}
                KEY={item.key}
                LABEL={item.label}
                onPress={this.onPressSubTabBar}
            />
        );
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <NavigationEvents onWillFocus={() => this.onFireScreen()} />
                <NavigationHeaderTwoRButton
                    screenTitle="My Posts"
                    onPressBackButton={() => this.onPressGoBack()}
                    rightButtonFirst={{
                        image: ICON_MY_POST,
                        onPress: () =>
                            this.props.navigation.navigate('InquiryList')
                    }}
                    rightButtonSecond={{
                        image: ICON_INFO,
                        onPress: () =>
                            this.props.navigation.navigate('CustomerDetail')
                    }}
                />
                <View style={styles.flex1}>
                    <View style={styles.subTabView}>
                        <FlatList
                            contentContainerStyle={styles.subTabList}
                            data={SUB_BAR_ITEMS || []}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            renderItem={this.renderSubBarItems.bind(this)}
                            keyExtractor={({ item, index }) =>
                                `item_id_${(item && item.id) || keyIndex++}`
                            }
                        />
                    </View>
                    <View style={styles.flex1}>
                        <FlatList
                            style={styles.flex1}
                            contentContainerStyle={styles.listViewContent}
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
                            ListFooterComponent={this.renderFooter.bind(this)}
                            onEndReachedThreshold={0.4}
                            onEndReached={this.handleLoadMore.bind(this)}
                        />

                        {!this.state.isRefreshing &&
                        !this.state.loading &&
                        this.state.data.length === 0 ? (
                            <Text style={styles.noDataText}>{`No ${
                                this.state.selectedSubTabObject.label
                            } Job Posts Right Now!`}</Text>
                        ) : null}
                    </View>
                </View>
                <LinearGradient
                    style={styles.fabContainer}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    colors={[
                        Colors.GRADIENT.GRADIENT_START,
                        Colors.GRADIENT.GRADIENT_END
                    ]}>
                    <TouchableOpacity
                        style={styles.fabTouch}
                        onPress={this.onPressCreateJobPost}>
                        <Image source={ICON_ADD} style={styles.fabIcon} />
                    </TouchableOpacity>
                </LinearGradient>
            </SafeAreaView>
        );
    }
}

export default Search;

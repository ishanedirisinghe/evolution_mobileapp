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
import HamNavigationHeader from '../../uiElements/HamNavigationHeader';
import POST_ITEM from '../../uiElements/PostItem';
import styles from './styles';
import { Colors } from '../../../../styles';
const ICON_MY_POST = require('../../../../assets/images/my_post.png');

class Search extends Component {
    fieldRef = React.createRef();

    constructor(props) {
        super(props);
        this.page = 1;
        this.loadAllData = false;
        this.state = {
            loading: false,
            isRefreshing: false,
            data: [],
            error: ''
        };
    }

    componentDidMount() {
        this.page = 1;
        this.loadAllData = false;
        this.state = {
            loading: true,
            isRefreshing: false,
            data: [],
            error: ''
        };
        const { PUSH_NOTIFI_DATA } = this.props.navigation.state.params;
        if (PUSH_NOTIFI_DATA && PUSH_NOTIFI_DATA.MsgID) {
            this.getPostByID(PUSH_NOTIFI_DATA.MsgID);
        } else {
            this.getPostsData(this.page);
        }
    }

    componentWillReceiveProps(nextPropsPosts) {
        console.log(
            ' Posts--------- componentWillReceiveProps -------------.:'
        );
        // this.refreshPage();
        this.page = 1;
        this.loadAllData = false;
        this.state = {
            loading: true,
            isRefreshing: false,
            data: [],
            error: ''
        };
        const { PUSH_NOTIFI_DATA } = this.props.navigation.state.params;
        if (PUSH_NOTIFI_DATA && PUSH_NOTIFI_DATA.MsgID) {
            this.getPostByID(PUSH_NOTIFI_DATA.MsgID);
        } else {
            this.getPostsData(this.page);
        }
    }

    getPostByID(postId) {
        var context = this;
        DefaultPreference.get('user_data').then(function(user_data) {
            var jsonUserData = JSON.parse(user_data);

            let requestPath =
                global.API_ENDPOINT +
                '/api/PostAPI/GetPostByID?StudentID=' +
                jsonUserData.StudentID +
                '&PostID=' +
                postId;
            fetch(requestPath, {
                method: 'GET',
                headers: {
                    Authorization: 'Bearer ' + global.session.access_token
                }
            })
                .then(addPostResponse => addPostResponse.text())
                .then(result => {
                    let resultJson = JSON.parse(result);
                    // context.setState({ spinner: false });
                    console.log('DEBUG: GET post by ID success. ', resultJson);
                    context.onPressPostItem(-1, resultJson);
                })
                .catch(error => {
                    // context.setState({ spinner: false });
                    console.log('GET post by ID.', error);
                    this.getPostsData(this.page);
                });
        });
    }

    async fetchPosts(isRefresh, page) {
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
                '/api/PostAPI/GetPostList?StudentID=' +
                userData.StudentID +
                '&PageNo=' +
                page +
                '&RecordsPerPage=10';
            console.log('DEBUG: Get Posts request.', requestPath);
            // api/PostAPI/GetPostList?StudentID=8019505&PageNo=3&RecordsPerPage=5
            // api/PostAPI/GetPostList?StudentID=6339745&PageNo=1&RecordsPerPage=10

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
                        'DEBUG: Get Posts request success. ',
                        resultJson.length
                    );

                    if (resultJson && resultJson.length < 1) {
                        context.loadAllData = true;
                    }

                    if (isRefresh) {
                        let data = resultJson;
                        context.setState({
                            isRefreshing: false,
                            loading: false,
                            data: data
                        });
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

    getPostsData(page) {
        this.fetchPosts(false, page);
    }

    onRefresh() {
        this.page = 1;
        this.loadAllData = false;
        this.fetchPosts(true, 1);
    }

    handleLoadMore = () => {
        if (!this.state.loading && !this.loadAllData) {
            this.page = this.page + 1;
            this.getPostsData(this.page);
        }
    };

    refreshData = (newIndex, newItem) => {
        console.log('REFRESH ------------------------------------- ', newIndex);
        if (newIndex == -1) {
            this.page = 1;
            this.loadAllData = false;
            this.state = {
                loading: true,
                isRefreshing: false,
                data: [],
                error: ''
            };
            this.getPostsData(this.page);
        } else {
            var listData = this.state.data;
            listData[newIndex] = newItem;
            this.setState({ data: listData });
        }
    };

    goToPost = (index, item) => {
        this.props.navigation.navigate('PostDetailScreen', {
            POST: item,
            POST_INDEX: index,
            onGoBack: (newIndex, newItem) => {
                this.refreshData(newIndex, newItem);
            }
        });
    };

    onPressPostItem = (index, item) => {
        // this.props.navigation.navigate("PostDetailScreen", { POST: item })
        this.props.navigation.navigate('PostDetailScreen', {
            POST: item,
            POST_INDEX: index,
            onGoBack: (newIndex, newItem) => {
                this.refreshData(newIndex, newItem);
            }
        });
    };

    renderFooter = () => {
        if (!this.state.loading) {
            return null;
        }
        return (
            <View style={styles.indicatorView}>
                <ActivityIndicator color={Colors.TINT_COLOR} />
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
                ONPRESS_POST_ITEM={() => this.onPressPostItem(index, item)}
            />
        );
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <HamNavigationHeader
                    {...this.props}
                    screenTitle="Posts"
                    rightButton={{
                        image: ICON_MY_POST,
                        onPress: () =>
                            this.props.navigation.navigate('MyPostScreen')
                    }}
                />
                <View style={styles.centerContainer}>
                    <FlatList
                        style={styles.list}
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

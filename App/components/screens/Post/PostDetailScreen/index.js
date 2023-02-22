/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    ActivityIndicator,
    SafeAreaView,
    ScrollView,
    FlatList,
    TouchableOpacity,
    RefreshControl,
    TextInput,
    KeyboardAvoidingView,
    Keyboard,
    BackHandler,
    Platform
} from 'react-native';

import DefaultPreference from 'react-native-default-preference';
import moment from 'moment';
import { showMessage, hideMessage } from 'react-native-flash-message';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';

import HTML from 'react-native-render-html';

import COMMENT_ITEM from '../../uiElements/CommentItem';

import NavigationHeader from '../../uiElements/NavigationHeader';
import { updateNotificationBadgeCount } from '../../../../../Action/notification';
import styles from './styles';
import { Colors } from '../../../../styles';

const ICON_MESSAGE = require('../../../../assets/images/ic_message.png');

class Search extends Component {
    fieldRef = React.createRef();

    constructor(props) {
        super(props);
        this.page = 1;
        this.loadAllData = false;
        this.state = {
            loading: false,
            isRefreshing: false,
            error: '',
            UglyWordsList: [],
            commentList: [],
            postComment: ''
        };
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }

    componentDidMount() {
        var context = this;
        const { POST, POST_INDEX } = this.props.navigation.state.params;
        context.setState({
            loading: false,
            isRefreshing: false,
            error: '',
            UglyWordsList: [],
            commentList: [],
            postComment: '',
            currentPost: POST,
            currentPostContent: (POST && POST.PostContent) || '',
            currentPostIndex: POST_INDEX
        });
        this.getCommentListData(this.page);
        this.onMarkReadPost();
        // this.fetchUglyWordsList();
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

    async fetchCommentList(isRefresh, page) {
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
                '/api/PostAPI/GetPostComments?PostID=' +
                context.state.currentPost.PostID +
                '&PageNo=' +
                page +
                '&RecordsPerPage=15';
            console.log('Get comment list request.', requestPath);

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
                        'Get comment list request success. ',
                        resultJson.length
                    );
                    if (resultJson && resultJson.length < 1) {
                        context.loadAllData = true;
                    }

                    if (isRefresh) {
                        let data = resultJson;
                        context.setState({
                            isRefreshing: false,
                            commentList: data
                        });
                    } else {
                        let listData = [
                            ...context.state.commentList,
                            ...resultJson
                        ];
                        context.setState({
                            loading: false,
                            commentList: listData
                        });
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

    getCommentListData(page) {
        this.fetchCommentList(false, page);
    }

    onRefresh() {
        this.page = 1;
        this.loadAllData = false;
        this.fetchCommentList(true, 1);
    }

    handleLoadMore = () => {
        if (!this.state.loading && !this.loadAllData) {
            this.page = this.page + 1;
            this.getCommentListData(this.page);
        }
    };

    async fetchUglyWordsList() {
        var context = this;
        context.setState({ loading: true });

        DefaultPreference.get('user_data').then(function(user_data) {
            let userData = JSON.parse(user_data);
            let requestPath =
                global.API_ENDPOINT + '/api/PostAPI/GetUglyWordsList';
            console.log('DEBUG: Get Ugly Words request.', requestPath);

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
                        'DEBUG: Get Ugly Words request success. ',
                        resultJson
                    );

                    context.setState({
                        loading: false,
                        UglyWordsList:
                            resultJson && resultJson.length > 0
                                ? resultJson
                                : []
                    });
                })
                .catch(error => {
                    showMessage({
                        message: 'Error',
                        description:
                            'Unknown server error. Please check your internet connection. Contact support if issue prevails.',
                        type: 'danger'
                    });
                });
        });
    }

    onMarkReadPost() {
        var context = this;
        DefaultPreference.get('user_data').then(function(user_data) {
            var jsonUserData = JSON.parse(user_data);

            let requestPath =
                global.API_ENDPOINT +
                '/api/PostAPI/UpdatePostRead?PostID=' +
                context.state.currentPost.PostID +
                '&StudentID=' +
                jsonUserData.StudentID;
            fetch(requestPath, {
                method: 'POST',
                headers: {
                    Authorization: 'Bearer ' + global.session.access_token
                }
            })
                .then(addPostResponse => addPostResponse.text())
                .then(addPostResponseTxt => {
                    console.log('UpdatePostRead success. ', addPostResponseTxt);

                    var updatedPostItem = context.state.currentPost;
                    updatedPostItem.IsRead = true;
                    context.setState({ currentPost: updatedPostItem });

                    // Update notification badge count
                    updateNotificationBadgeCount();
                })
                .catch(error => {
                    console.log('DEBUG: Add like post request failed.', error);
                });
        });
    }

    onLikePost() {
        var context = this;
        var postIsLiked = !context.state.currentPost.IsLike;
        DefaultPreference.get('user_data').then(function(user_data) {
            var jsonUserData = JSON.parse(user_data);
            console.log(
                'Debug: Get user_data in reset Passcode done',
                jsonUserData
            );

            let requestPath =
                global.API_ENDPOINT +
                '/api/PostAPI/LikeToPost?StudentID=' +
                jsonUserData.StudentID +
                '&IsLike=true&PostID=' +
                context.state.currentPost.PostID;

            console.log('DEBUG: add post', requestPath);
            fetch(requestPath, {
                method: 'POST',
                headers: {
                    Authorization: 'Bearer ' + global.session.access_token
                }
            })
                .then(addPostResponse => addPostResponse.text())
                .then(addPostResponseTxt => {
                    context.setState({ spinner: false, postIsLiked: true });

                    console.log(
                        'DEBUG: Add post success. ',
                        addPostResponseTxt
                    );

                    var updatedPostItem = context.state.currentPost;
                    updatedPostItem.IsLike = postIsLiked;
                    if (postIsLiked) {
                        updatedPostItem.NoOfLikes =
                            updatedPostItem.NoOfLikes &&
                            updatedPostItem.NoOfLikes > 0
                                ? updatedPostItem.NoOfLikes + 1
                                : 1;
                    } else {
                        updatedPostItem.NoOfLikes =
                            updatedPostItem.NoOfLikes &&
                            updatedPostItem.NoOfLikes > 0
                                ? updatedPostItem.NoOfLikes - 1
                                : 0;
                    }
                    context.setState({ currentPost: updatedPostItem });
                })
                .catch(error => {
                    // if (context.state.callFunction) {
                    //   context.setState({ callFunction: false });
                    //   console.log('Recall Add post --------------------------------------');
                    //   context.save();

                    // } else {
                    context.setState({ spinner: false });
                    console.log('DEBUG: Add like post request failed.', error);
                    showMessage({
                        message: 'Error',
                        description:
                            'Unknown server error. Please check your internet connection. Contact support if issue prevails.',
                        type: 'danger'
                    });
                    // }
                });
        });
    }

    handleCheckNewComment(context, newComment) {
        return context.state.commentList(
            item => newComment.CommentID === item.CommentID
        );
    }

    onAddNewPostComment() {
        var context = this;

        var newComment = context.state.postComment;
        for (var i = context.state.UglyWordsList.length - 1; i >= 0; i--) {
            newComment = newComment.replace(context.state.UglyWordsList[i], '');
        }

        if (!newComment || newComment.trim() == '') {
            showMessage({
                message: 'Comment',
                description: 'Please enter the comment.',
                type: 'danger'
            });
            return;
        }

        Keyboard.dismiss();
        DefaultPreference.get('user_data').then(function(user_data) {
            var jsonUserData = JSON.parse(user_data);
            console.log(
                'Debug: Get user_data in reset Passcode done',
                jsonUserData
            );

            let requestPath =
                global.API_ENDPOINT +
                '/api/PostAPI/PostComment?StudentID=' +
                jsonUserData.StudentID +
                '&PostID=' +
                context.state.currentPost.PostID +
                '&Comment=' +
                newComment;
            // let requestPath = global.API_ENDPOINT + '/api/PostAPI/SavePost?StudentID=8019505&Title=' + postTitle + '&PostContent=' + html;

            console.log('DEBUG: add post', requestPath);
            fetch(requestPath, {
                method: 'POST',
                headers: {
                    Authorization: 'Bearer ' + global.session.access_token
                }
            })
                .then(addPostCommentResponse => addPostCommentResponse.text())
                .then(result => {
                    let resultJson = JSON.parse(result);
                    context.setState({ spinner: false, postComment: '' });

                    if (
                        resultJson &&
                        resultJson.Message &&
                        resultJson.Message != ''
                    ) {
                        showMessage({
                            message: 'Error',
                            description: resultJson.Message,
                            type: 'danger'
                        });
                    } else {
                        // console.log('Debug: -----------------------   111');
                        let array1 = context.state.commentList;
                        let array2 = [resultJson];
                        let array3 = array1.concat(array2);
                        array3 = [...new Set([...array1, ...array2])];

                        var updatedPostItem = context.state.currentPost;
                        updatedPostItem.NoOfComments =
                            updatedPostItem.NoOfComments &&
                            updatedPostItem.NoOfComments > 0
                                ? updatedPostItem.NoOfComments + 1
                                : 1;
                        let array22 = updatedPostItem.postComments;
                        let array23 = [resultJson];
                        let array24 = array22.concat(array23);
                        array24 = [...new Set([...array22, ...array23])];

                        updatedPostItem.postComments = array24;
                        context.setState({
                            commentList: array3,
                            currentPost: updatedPostItem
                        });
                    }
                })
                .catch(error => {
                    // if (context.state.callFunction) {
                    //   context.setState({ callFunction: false });
                    //   console.log('Recall Add post --------------------------------------');
                    //   context.save();

                    // } else {
                    context.setState({ spinner: false });
                    console.log(
                        'DEBUG: Add post comment request failed.',
                        error
                    );
                    showMessage({
                        message: 'Error',
                        description:
                            'Unknown server error. Please check your internet connection. Contact support if issue prevails.',
                        type: 'danger'
                    });
                    // }
                });
        });
    }

    onPressGoBack = () => {
        this.props.navigation.state.params.onGoBack(
            this.state.currentPostIndex,
            this.state.currentPost
        );
        this.props.navigation.goBack();
    };

    onPressLike = () => {
        this.onLikePost();
    };

    onPressComment = () => {
        this.commentTextInput.focus();
    };

    onPressAddNewComment = () => {
        this.onAddNewPostComment();
    };

    // removeUglyWords(comment) {

    //   var txt = comment
    //   console.log('postComment 111 ------------.', txt);

    //   for (var i = this.state.UglyWordsList.length - 1; i >= 0; i--) {
    //     txt = txt.replace(this.state.UglyWordsList[i], "");
    //   }

    //   console.log('postComment 111 ------------.', txt);
    //   console.log('postComment 222 ------------.', comment);
    //   if (txt == comment) {
    //     this.setState({
    //       postCommentNew22: txt,
    //     });
    //   }
    //   // console.log('postComment 222 ------------.', txt);
    //   // this.setState({
    //   //   postCommentNew: txt,
    //   // });

    // }

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

    renderSeparator = () => {
        return <View />;
    };

    renderCommentFlatListItem({ item, index }) {
        return (
            <View style={styles.flex1}>
                <COMMENT_ITEM
                    INDEX={index}
                    COMMENT={item}
                    ONPRESS_COMMENT_ITEM={() => {}}
                />
                <Text style={styles.commentDateTimeText} numberOfLines={1}>
                    {moment(item.EnteredOn).format('DD/MM/YYYY')}
                </Text>
            </View>
        );
    }

    render() {
        const { currentPost } = this.state;

        return (
            <SafeAreaView style={styles.container}>
                <NavigationHeader
                    screenTitle=""
                    onPressBackButton={() => this.onPressGoBack()}
                />
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : null}
                    style={styles.flex1}>
                    <ScrollView style={styles.flex1}>
                        <View style={styles.flex1}>
                            <View style={styles.postUserView}>
                                <Image
                                    style={styles.postUserImage}
                                    source={{
                                        uri:
                                            currentPost &&
                                            currentPost.StudentImageUrl &&
                                            currentPost.StudentImageUrl !== ''
                                                ? currentPost.StudentImageUrl
                                                : 'http://www.gravatar.com/avatar/?d=mp'
                                    }}
                                />
                                <View style={styles.postUserTextView}>
                                    <Text
                                        style={styles.postUserNameText}
                                        numberOfLines={2}>
                                        {currentPost && currentPost.StudentName}
                                    </Text>
                                    <Text
                                        style={styles.postDateTimeText}
                                        numberOfLines={1}>
                                        {moment(
                                            currentPost && currentPost.EnteredOn
                                        ).format('DD/MM/YYYY')}
                                    </Text>
                                </View>
                            </View>
                            <Text style={styles.postTitleText}>
                                {currentPost && currentPost.PostTitle}
                            </Text>
                            <HTML
                                containerStyle={styles.htmlContainer}
                                html={currentPost && currentPost.PostContent}
                            />
                            <View style={styles.postActionView}>
                                <TouchableOpacity
                                    style={styles.postActionItemView}
                                    activeOpacity={0.6}
                                    onPress={() => this.onPressLike()}>
                                    <IconAntDesign
                                        name={
                                            currentPost && currentPost.IsLike
                                                ? 'heart'
                                                : 'hearto'
                                        }
                                        size={22}
                                        color={Colors.TINT_PINK_COLOR}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.postActionItemView}
                                    activeOpacity={0.6}
                                    onPress={() => this.onPressComment()}>
                                    <Image
                                        source={ICON_MESSAGE}
                                        style={styles.messageIcon}
                                        resizeMode="contain"
                                    />
                                </TouchableOpacity>
                            </View>

                            <View style={styles.flex1}>
                                <FlatList
                                    ref={ref => {
                                        this.flatListRef = ref;
                                    }}
                                    style={styles.flex1}
                                    data={this.state.commentList}
                                    extraData={this.state}
                                    refreshControl={
                                        <RefreshControl
                                            refreshing={this.state.isRefreshing}
                                            onRefresh={this.onRefresh.bind(
                                                this
                                            )}
                                            tintColor={Colors.APP_COLOR}
                                        />
                                    }
                                    renderItem={this.renderCommentFlatListItem.bind(
                                        this
                                    )}
                                    keyExtractor={(item, CommentID) =>
                                        `"id"${CommentID}`
                                    }
                                    ItemSeparatorComponent={
                                        this.renderSeparator
                                    }
                                    ListFooterComponent={this.renderFooter.bind(
                                        this
                                    )}
                                    onEndReachedThreshold={0.4}
                                    onEndReached={this.handleLoadMore.bind(
                                        this
                                    )}
                                />
                            </View>
                        </View>
                    </ScrollView>
                    <View style={styles.addCommentItemView}>
                        <View style={styles.addCommentUserTextView}>
                            <TextInput
                                ref={input => {
                                    this.commentTextInput = input;
                                }}
                                multiline={true}
                                style={[
                                    styles.inputTextView,
                                    { maxHeight: 200 }
                                ]}
                                placeholder={'Write a comment...'}
                                // numberOfLines={0}
                                value={this.state.postComment}
                                onChangeText={text =>
                                    this.setState({
                                        postComment: text
                                    })
                                }
                                // onChangeText={(comment) => this.removeUglyWords(comment)}
                                inlineImagePadding={2}
                            />
                            <TouchableOpacity
                                disabled={
                                    this.state.postComment &&
                                    this.state.postComment != ''
                                        ? false
                                        : true
                                }
                                style={styles.postCommentAcction}
                                activeOpacity={0.6}
                                onPress={() => this.onPressAddNewComment()}>
                                <IconFontAwesome
                                    name={'send'}
                                    size={24}
                                    color={
                                        this.state.postComment &&
                                        this.state.postComment !== ''
                                            ? '#841c7c'
                                            : '#A9A9A9'
                                    }
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </SafeAreaView>
        );
    }
}

export default Search;

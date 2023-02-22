/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Text, View, Image, TouchableOpacity, Dimensions } from 'react-native';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import HTMLView from 'react-native-htmlview';
import DefaultPreference from 'react-native-default-preference';
import moment from 'moment';

import styles from './styles';

import COMMENT_ITEM from '../CommentItem';
import ADD_COMMENT_ITEM from '../AddCommentItem';
import { Colors, scale, verticalScale } from '../../../../styles';

const deltaImageWidth = Dimensions.get('window').width - scale(60);
const ICON_MESSAGE = require('../../../../assets/images/ic_message.png');

function renderNode(node) {
    if (node.name === 'img') {
        return (
            <Image
                style={{
                    width: deltaImageWidth,
                    height: verticalScale(268),
                    resizeMode: 'contain'
                }}
                source={{ uri: node.attribs.src }}
            />
        );
    }
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            postItem: props.ITEM,
            enableSeeMore: false,
            clickedSeeMore: false
        };
    }

    onLikePost() {
        var context = this;
        var postIsLiked = !context.state.postItem.IsLike;
        DefaultPreference.get('user_data').then(function(user_data) {
            var jsonUserData = JSON.parse(user_data);

            let requestPath =
                global.API_ENDPOINT +
                '/api/PostAPI/LikeToPost?StudentID=' +
                jsonUserData.StudentID +
                '&IsLike=' +
                postIsLiked +
                '&PostID=' +
                context.state.postItem.PostID;
            // let requestPath = global.API_ENDPOINT + '/api/PostAPI/SavePost?StudentID=8019505&Title=' + postTitle + '&PostContent=' + html;

            console.log('DEBUG: add post like in postlist', requestPath);
            fetch(requestPath, {
                method: 'POST',
                headers: {
                    Authorization: 'Bearer ' + global.session.access_token
                }
            })
                .then(addPostResponse => addPostResponse.text())
                .then(addPostResponseTxt => {
                    context.setState({ spinner: false });

                    console.log(
                        'DEBUG: add post like in postlist success. ',
                        addPostResponseTxt
                    );

                    var updatedPostItem = context.state.postItem;
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
                    context.setState({ postItem: updatedPostItem });
                })
                .catch(error => {
                    // if (context.state.callFunction) {
                    //   context.setState({ callFunction: false });
                    //   console.log('Recall Add post --------------------------------------');
                    //   context.save();

                    // } else {
                    context.setState({ spinner: false });
                    console.log(
                        'DEBUG: add post like in postlist request failed.',
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

    onPressLike = () => {
        this.onLikePost();
    };

    onPressSeeMore = () => {
        this.setState({ clickedSeeMore: true });
    };

    find_dimesions(layout) {
        const { x, y, width, height } = layout;
        console.warn('ITEM height :', this.props.INDEX, height);
        if (height > verticalScale(280) && this.state.enableSeeMore == false) {
            this.setState({ enableSeeMore: true });
        }
    }

    render() {
        const ITEM = this.state.postItem;
        const LIKE_COUNT =
            ITEM && ITEM.NoOfLikes && ITEM.NoOfLikes > 0 ? ITEM.NoOfLikes : 0;
        const COMMENT_COUNT =
            ITEM && ITEM.NoOfComments && ITEM.NoOfComments > 0
                ? ITEM.NoOfComments
                : 0;

        const POST_CONTENT = ITEM.PostContent;
        const IS_LIKE = ITEM.IsLike;

        return (
            <TouchableOpacity
                style={styles.listItemContainer}
                activeOpacity={0.6}
                onPress={() => this.props.ONPRESS_POST_ITEM()}>
                <View style={styles.flex1}>
                    <View style={styles.postUserView}>
                        <Image
                            resizeMode="cover"
                            style={styles.postUserImage}
                            source={{
                                uri:
                                    ITEM &&
                                    ITEM.StudentImageUrl &&
                                    ITEM.StudentImageUrl !== ''
                                        ? ITEM.StudentImageUrl
                                        : 'http://www.gravatar.com/avatar/?d=mp'
                            }}
                        />
                        <View style={styles.postUserTextView}>
                            <Text
                                style={styles.postUserNameText}
                                numberOfLines={2}>
                                {ITEM.StudentName}
                            </Text>
                            <Text
                                style={styles.postDateTimeText}
                                numberOfLines={1}>
                                {moment(ITEM.EnteredOn).format('DD/MM/YYYY')}
                            </Text>
                        </View>
                    </View>
                    <Text style={styles.postTitleText}>{ITEM.PostTitle}</Text>
                    <View
                        onLayout={event => {
                            this.find_dimesions(event.nativeEvent.layout);
                        }}
                        style={styles.postContentContainer}>
                        <HTMLView
                            st
                            style={[
                                styles.postContentView,
                                {
                                    height:
                                        this.state.enableSeeMore === true &&
                                        this.state.clickedSeeMore === false
                                            ? verticalScale(280)
                                            : 'auto'
                                }
                            ]}
                            renderNode={renderNode}
                            value={POST_CONTENT}
                        />
                    </View>

                    <View style={styles.actionMainContainer}>
                        {this.state.enableSeeMore &&
                        this.state.clickedSeeMore === false ? (
                            <TouchableOpacity
                                style={styles.postSeeMoreView}
                                activeOpacity={0.6}
                                onPress={() => this.onPressSeeMore()}>
                                <Text
                                    style={styles.postSeeMoreText}
                                    numberOfLines={1}>
                                    See more
                                </Text>
                            </TouchableOpacity>
                        ) : null}

                        <View style={styles.postActionContainer}>
                            {LIKE_COUNT > 0 || COMMENT_COUNT > 0 ? (
                                <View style={styles.postCountView}>
                                    {LIKE_COUNT > 0 ? (
                                        <View style={styles.postLikeCountView}>
                                            <IconAntDesign
                                                name="heart"
                                                size={20}
                                                color={Colors.TINT_PINK_COLOR}
                                            />
                                            <Text
                                                style={styles.postCountItemText}
                                                numberOfLines={1}>
                                                {LIKE_COUNT > 9999
                                                    ? '9999+'
                                                    : LIKE_COUNT}
                                            </Text>
                                        </View>
                                    ) : null}
                                    {COMMENT_COUNT > 0 ? (
                                        <View
                                            style={styles.postCommentCountView}>
                                            <Text
                                                style={styles.postCountItemText}
                                                numberOfLines={1}>
                                                {COMMENT_COUNT > 9999
                                                    ? '9999+'
                                                    : COMMENT_COUNT}
                                            </Text>
                                            <Text
                                                style={styles.postCountItemText}
                                                numberOfLines={1}>
                                                {COMMENT_COUNT > 1
                                                    ? 'Comments'
                                                    : 'Comment'}
                                            </Text>
                                        </View>
                                    ) : null}
                                </View>
                            ) : null}
                            <View style={styles.postActionView}>
                                <TouchableOpacity
                                    style={styles.postActionItemView}
                                    activeOpacity={0.6}
                                    onPress={() => this.onPressLike()}>
                                    <IconAntDesign
                                        name={IS_LIKE ? 'heart' : 'hearto'}
                                        size={22}
                                        color={Colors.TINT_PINK_COLOR}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.postActionItemView}
                                    activeOpacity={0.6}
                                    onPress={() =>
                                        this.props.ONPRESS_POST_ITEM()
                                    }>
                                    <Image
                                        source={ICON_MESSAGE}
                                        style={styles.messageIcon}
                                        resizeMode="contain"
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    {ITEM &&
                    ITEM.postComments &&
                    ITEM.postComments.length > 0 ? (
                        <View style={styles.postCommentView}>
                            <COMMENT_ITEM
                                INDEX={0}
                                COMMENT={ITEM.postComments[0]}
                                ONPRESS_COMMENT_ITEM={() =>
                                    this.props.ONPRESS_POST_ITEM()
                                }
                            />
                            {ITEM.postComments.length > 1 ? (
                                <COMMENT_ITEM
                                    INDEX={1}
                                    COMMENT={ITEM.postComments[1]}
                                    ONPRESS_COMMENT_ITEM={() =>
                                        this.props.ONPRESS_POST_ITEM()
                                    }
                                />
                            ) : null}
                            <ADD_COMMENT_ITEM
                                ONPRESS_ADD_COMMENT_ITEM={() =>
                                    this.props.ONPRESS_POST_ITEM()
                                }
                            />
                        </View>
                    ) : null}
                </View>
            </TouchableOpacity>
        );
    }
}

export default App;

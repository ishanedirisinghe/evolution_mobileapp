import React, { Component } from 'react';
import {
    View,
    Text,
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
import { showMessage } from 'react-native-flash-message';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import styles from './styles';
import NavigationHeader from '../../uiElements/NavigationHeader';
import { Colors } from '../../../../styles';

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
            inquiryDetailList: [],
            postComment: ''
        };
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }

    componentDidMount() {
        var context = this;
        const { INQUIRY } = this.props.navigation.state.params;
        context.setState(
            {
                loading: false,
                isRefreshing: false,
                error: '',
                inquiryDetailList: [],
                postComment: '',
                currentInquiry: INQUIRY
            },
            () => {
                this.getInquiryCommentListData(this.page);
            }
        );
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

    async fetchInquiryDetailsList(isRefresh, page) {
        var context = this;
        if (isRefresh) {
            context.setState({ isRefreshing: true });
        } else {
            context.setState({ loading: true });
        }

        let requestPath =
            global.API_ENDPOINT +
            '/api/JobPostAPI/GetInquiryDetailsList?InquiryID=' +
            context.state.currentInquiry.InquiryID +
            '&PageNo=' +
            page +
            '&RecordsPerPage=15';

        fetch(requestPath, {
            method: 'GET'
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
                        inquiryDetailList: data
                    });
                } else {
                    let listData = [
                        ...context.state.inquiryDetailList,
                        ...resultJson
                    ];
                    context.setState({
                        loading: false,
                        inquiryDetailList: listData
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
    }

    getInquiryCommentListData(page) {
        this.fetchInquiryDetailsList(false, page);
    }

    onRefresh() {
        this.page = 1;
        this.loadAllData = false;
        this.fetchInquiryDetailsList(true, 1);
    }

    handleLoadMore = () => {
        if (!this.state.loading && !this.loadAllData) {
            this.page = this.page + 1;
            this.getInquiryCommentListData(this.page);
        }
    };

    handleCheckNewComment(context, newComment) {
        return context.state.inquiryDetailList(
            item => newComment.CommentID === item.CommentID
        );
    }

    onAddNewPostComment() {
        var context = this;
        var newComment = context.state.postComment.trim();

        Keyboard.dismiss();
        let requestPath =
            global.API_ENDPOINT + '/api/JobPostAPI/AddQuestionsForInquiry';

        console.log('DEBUG: add post', requestPath);
        fetch(requestPath, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify({
                InquriyID: context.state.currentInquiry.InquiryID,
                InquiryLine: newComment
            })
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
                    DefaultPreference.get('job_user_data').then(function(
                        user_data
                    ) {
                        let userData = JSON.parse(user_data);
                        var resultJsonObj = resultJson;
                        resultJsonObj.InquiryLine =
                            userData.ContactName +
                            ': ' +
                            resultJson.InquiryLine;

                        let array1 = context.state.inquiryDetailList;
                        let array2 = [resultJsonObj];
                        let array3 = array1.concat(array2);
                        array3 = [...new Set([...array1, ...array2])];

                        context.setState({ inquiryDetailList: array3 });
                    });
                }
            })
            .catch(error => {
                context.setState({ spinner: false });
                console.log('DEBUG: Add post comment request failed.', error);
                showMessage({
                    message: 'Error',
                    description:
                        'Unknown server error. Please check your internet connection. Contact support if issue prevails.',
                    type: 'danger'
                });
            });
    }

    onPressGoBack = () => {
        this.props.navigation.goBack();
    };

    onPressAddNewComment = () => {
        this.onAddNewPostComment();
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

    renderCommentFlatListItem({ item, index }) {
        return (
            <View style={styles.flex1}>
                <View style={styles.commentItemView}>
                    <View style={styles.contentView}>
                        <View style={styles.commentUserTextView}>
                            <Text style={styles.commentText}>
                                {item.InquiryLine}
                            </Text>
                        </View>
                    </View>
                    <Text style={styles.commentDateTimeText} numberOfLines={1}>
                        {moment(item.EnteredOn).format('DD/MM/YYYY')}
                    </Text>
                </View>
            </View>
        );
    }

    render() {
        const { currentInquiry } = this.state;

        return (
            <SafeAreaView style={styles.container}>
                <NavigationHeader
                    screenTitle={''}
                    onPressBackButton={() => this.onPressGoBack()}
                />
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : null}
                    style={styles.flex1}>
                    <ScrollView
                        style={styles.flex1}
                        contentContainerStyle={styles.scrollContentContainer}>
                        <View style={styles.flex1}>
                            <View style={styles.detailView}>
                                <Text style={styles.titleText}>
                                    {currentInquiry &&
                                        currentInquiry.InquiryTopic}
                                </Text>
                                <Text style={styles.descriptionText}>
                                    {currentInquiry && currentInquiry.ShortDesc}
                                </Text>
                                <View style={styles.separatorView} />
                                <View style={styles.flex1}>
                                    <FlatList
                                        ref={ref => {
                                            this.flatListRef = ref;
                                        }}
                                        style={styles.flex1}
                                        data={this.state.inquiryDetailList}
                                        extraData={this.state}
                                        refreshControl={
                                            <RefreshControl
                                                refreshing={
                                                    this.state.isRefreshing
                                                }
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
                                value={this.state.postComment}
                                onChangeText={text =>
                                    this.setState({ postComment: text })
                                }
                                inlineImagePadding={2}
                            />
                            <TouchableOpacity
                                disabled={
                                    this.state.postComment &&
                                    this.state.postComment !== ''
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

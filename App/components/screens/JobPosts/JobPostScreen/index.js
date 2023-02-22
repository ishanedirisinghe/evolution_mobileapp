import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    ActivityIndicator,
    SafeAreaView,
    FlatList,
    TouchableOpacity,
    RefreshControl
} from 'react-native';
import DefaultPreference from 'react-native-default-preference';
import { showMessage } from 'react-native-flash-message';
import styles from './styles';
import NavigationHeader from '../../uiElements/NavigationHeader';
import { Colors } from '../../../../styles';
import moment from 'moment';

const JOB_ICON = require('../../../../assets/images/ic_job.png');
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
            error: '',
            isLoginUser: false
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
        this.chechUserIsLogin();

        this.getPostsData(this.page);
    }

    chechUserIsLogin() {
        var context = this;
        DefaultPreference.get('job_user_data').then(function(value) {
            if (value) {
                let jsonData = JSON.parse(value);

                console.log(
                    'USER--------------------------------------------------------------',
                    jsonData
                );
                if (jsonData.isVerify) {
                    context.setState({ isLoginUser: true });
                } else {
                    context.setState({ isLoginUser: false });
                }
            } else {
                context.setState({ isLoginUser: false });
            }
        });
    }

    componentWillReceiveProps(nextPropsPosts) {
        this.chechUserIsLogin();
    }

    async fetchJobPosts(isRefresh, page) {
        var context = this;
        if (isRefresh) {
            context.setState({ isRefreshing: true });
        } else {
            context.setState({ loading: true });
        }

        let requestPath =
            global.API_ENDPOINT +
            '/api/JobPostAPI/GetAllJobPostList?PageNo=' +
            page +
            '&RecordsPerPage=10';
        console.log('DEBUG: Get Job Posts request.', requestPath);

        fetch(requestPath, {
            method: 'GET'
        })
            .then(response => response.text())
            .then(result => {
                let resultJson = JSON.parse(result);
                console.log(
                    'DEBUG: Get job Posts request success. ',
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
    }

    getPostsData(page) {
        this.fetchJobPosts(false, page);
    }

    onRefresh() {
        this.page = 1;
        this.loadAllData = false;
        this.fetchJobPosts(true, 1);
    }

    handleLoadMore = () => {
        if (!this.state.loading && !this.loadAllData) {
            this.page = this.page + 1;
            this.getPostsData(this.page);
        }
    };

    refreshData = (newIndex, newItem) => {
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
        this.props.navigation.navigate('JobPostDetail', { JOB_POST: item });
    };

    onPressLogin = () => {
        var context = this;
        var navigation = context.props.navigation;

        navigation.navigate('JobPostLogin', {
            TYPE: 'POST_LIST',
            onGoBackJobPost: () => {
                this.chechUserIsLogin();
            }
        }); // TYPE = POST_LIST , ADD_POST
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
                <ActivityIndicator color={Colors.TINT_PINK_COLOR} />
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
                <Text style={styles.postDateText}>
                    {moment(item.EnteredOn).format('DD/MM/YYYY')}
                </Text>
                <Text style={styles.postDescriptionText}>
                    {item.JobDescription}
                </Text>
            </TouchableOpacity>
        );
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <NavigationHeader {...this.props} screenTitle="Jobs" />
                <View style={styles.flex1}>
                    <FlatList
                        style={styles.flex1}
                        data={this.state.data}
                        extraData={this.state}
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.isRefreshing}
                                onRefresh={this.onRefresh.bind(this)}
                                tintColor={Colors.TINT_PINK_COLOR}
                            />
                        }
                        renderItem={this.renderPostFlatListItem.bind(this)}
                        keyExtractor={(item, JobPostingID) =>
                            `"id"${JobPostingID}`
                        }
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

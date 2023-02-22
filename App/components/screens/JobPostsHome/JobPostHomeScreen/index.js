import React, { Component } from 'react';
import {
    View,
    Text,
    ActivityIndicator,
    SafeAreaView,
    FlatList,
    TouchableOpacity,
    RefreshControl,
    Image
} from 'react-native';
import { showMessage } from 'react-native-flash-message';
import HamNavigationHeader from '../../uiElements/HamNavigationHeader';
import styles from './styles';
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
        this.getPostsData(this.page);
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

    onPressPostItem = (index, item) => {
        this.props.navigation.navigate('JobPostHomeDetailScreen', {
            JOB_POST: item
        });
    };

    renderFooter = () => {
        if (!this.state.loading) return null;
        return (
            <View style={styles.indicatorView}>
                <ActivityIndicator color={Colors.TINT_PINK_COLOR} />
            </View>
        );
    };

    // TODO
    /**
     * color: (item.PostStatus && item.PostStatus == "Approved") ? "green" : (item.PostStatus && item.PostStatus == "Rejected") ? "red" : "gray"
     */
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
                <HamNavigationHeader {...this.props} screenTitle="Jobs" />
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

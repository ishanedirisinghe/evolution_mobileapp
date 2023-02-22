/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    ActivityIndicator,
    Dimensions,
    SafeAreaView,
    ScrollView,
    FlatList,
    TouchableOpacity,
    Linking,
    RefreshControl
} from 'react-native';

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import deviceInfoModule from 'react-native-device-info';
import DefaultPreference from 'react-native-default-preference';
import moment from 'moment';
import { showMessage, hideMessage } from 'react-native-flash-message';
import { NavigationEvents } from 'react-navigation';

import Buttons from '../../../uiElements/Buttons/RoundButtons';
import NavBarWithRightButton from '../../../uiElements/NavBarWithRightButton';

const imageWidth = Dimensions.get('window').width;
import NavBar from '../../../uiElements/NavBar';

//import Loading from '../../../uiElements/Loading';

import styles from './styles';

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
            error: ''
        };
    }

    componentDidMount() {
        const { TYPE } = this.props;
        console.log('DEBUG: TYPE 0.', TYPE);
        if (TYPE == 'Pending') {
            console.log('DEBUG: TYPE 1.', TYPE);
            this.setState({
                data: [
                    {
                        JobPostingID: 5,
                        JobTitle:
                            'Software Engineers / Senior Software Engineers',
                        JobDescription:
                            'Degree in Computer Science or equivalent. 2+ Years of experience in software engineering and development using PHP. Experience with at least one of PHP Frameworks.',
                        ApprovedOn: '2020-12-17T23:45:24.45'
                    },
                    {
                        JobPostingID: 6,
                        JobTitle: 'Relationship Manager',
                        JobDescription:
                            'Degree in Marketing ,CIMA, CIM or Diploma in Marketing or Management. • Experience in B2B, Relationship Building, Frontline Sales.',
                        ApprovedOn: '2020-12-17T18:11:55.827'
                    },
                    {
                        JobPostingID: 7,
                        JobTitle: 'Coordinator',
                        JobDescription:
                            'The “Debug Group” is a diversified group of well established companies in the ICT industry.',
                        ApprovedOn: '2020-12-17T18:11:55.827'
                    },
                    {
                        JobPostingID: 8,
                        JobTitle: 'Life Insurance Executive / Manager',
                        JobDescription: 'AIA Insurance Lanka Limited',
                        ApprovedOn: '2020-12-17T18:11:55.827'
                    },
                    {
                        JobPostingID: 9,
                        JobTitle: 'Senior Magento Engineer - Front End',
                        JobDescription: 'Senior Magento Engineer - Front End',
                        ApprovedOn: '2020-12-17T18:11:55.827'
                    }
                ]
            });
        } else if (TYPE == 'Approved') {
            console.log('DEBUG: TYPE 2.', TYPE);
            this.setState({
                data: [
                    {
                        JobPostingID: 5,
                        JobTitle: 'Software Engineer',
                        JobDescription:
                            'Experience with at least one of PHP Frameworks.',
                        ApprovedOn: '2020-12-17T23:45:24.45'
                    },
                    {
                        JobPostingID: 6,
                        JobTitle: 'Relationship Manager',
                        JobDescription:
                            'Diploma in Marketing or Management. • Experience in B2B, Relationship Building, Frontline Sales.',
                        ApprovedOn: '2020-12-17T18:11:55.827'
                    }
                ]
            });
        } else if (TYPE == 'Rejected') {
            console.log('DEBUG: TYPE 3.', TYPE);
            this.setState({
                data: [
                    {
                        JobPostingID: 7,
                        JobTitle: 'Senior Software Engineer',
                        JobDescription:
                            'The “Debug Group” is a diversified group of well established companies in the ICT industry.',
                        ApprovedOn: '2020-12-17T18:11:55.827'
                    },
                    {
                        JobPostingID: 8,
                        JobTitle: 'Life Insurance Executive / Manager',
                        JobDescription: 'AIA Insurance Lanka Limited',
                        ApprovedOn: '2020-12-17T18:11:55.827'
                    },
                    {
                        JobPostingID: 9,
                        JobTitle: 'Senior Magento Engineer',
                        JobDescription: 'Magento Engineer - Front End',
                        ApprovedOn: '2020-12-17T18:11:55.827'
                    }
                ]
            });
        }
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
        // this.getMyPostsData(this.page);
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
                <ActivityIndicator color="#841c7c" />
            </View>
        );
    };

    renderSeparator = () => {
        return <View style={styles.listSeparator} />;
    };

    renderPostFlatListItem({ item, index }) {
        return (
            <TouchableOpacity
                style={{}}
                activeOpacity={0.6}
                onPress={() => this.onPressPostItem(index, item)}>
                <View style={styles.listItem}>
                    <Text style={styles.postTitleText} numberOfLines={2}>
                        {item.JobTitle}
                    </Text>
                    <Text style={styles.postDescriptionText} numberOfLines={4}>
                        {item.JobDescription}
                    </Text>
                    <Text
                        style={{
                            ...styles.postDateText,
                            color: 'gray',
                            flex: 1
                        }}>
                        {moment(item.ApprovedOn).format('DD/MM/YYYY')}
                    </Text>
                    {/* <View style={{ flex: 1, flexDirection: "row", marginTop: 6 }}>
    <Text style={{ ...styles.notificationDateText, color: "gray", flex: 1 }}>{moment(item.EnteredOn).fromNow()}</Text>
    <Text style={{ ...styles.notificationStatusText, color: (item.PostStatus && item.PostStatus == "Approved") ? "green" : (item.PostStatus && item.PostStatus == "Rejected") ? "red" : "gray" }} numberOfLines={1}>{item.PostStatus}</Text>
  </View> */}
                </View>
            </TouchableOpacity>
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    style={styles.list}
                    data={this.state.data}
                    extraData={this.state}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.isRefreshing}
                            onRefresh={this.onRefresh.bind(this)}
                            tintColor="#841c7c"
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
                this.state.data.length == 0 ? (
                    <Text style={styles.noDataText}>
                        {'No Job Posts Right Now!'}
                    </Text>
                ) : null}
            </View>
        );
    }
}

export default Search;

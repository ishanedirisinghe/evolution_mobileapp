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
    RefreshControl,
    StyleSheet
} from 'react-native';

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import deviceInfoModule from 'react-native-device-info';
import DefaultPreference from 'react-native-default-preference';
import moment from 'moment';
import { showMessage, hideMessage } from 'react-native-flash-message';
import IconAntDesign from 'react-native-vector-icons/AntDesign';

import Buttons from '../../uiElements/Buttons/RoundButtons';

const imageWidth = Dimensions.get('window').width;
import NavBarWithBack from '../../uiElements/NavBarWithBack';

import POST_ITEM from '../../uiElements/PostItem';

import styles from './styles';

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
        const { JOB_POST_ID } = this.props.navigation.state.params;

        this.setState(
            {
                JobPostingID: JOB_POST_ID
            },
            () => {
                this.loadData();
            }
        );
    }

    loadData() {
        this.setState(
            {
                loading: false,
                isRefreshing: false,
                data: [],
                error: ''
            },
            () => {
                this.page = 1;
                this.loadAllData = false;
                this.getApplicantsData(this.page);
            }
        );
    }

    async fetchApplicants(isRefresh, page) {
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
                '/api/JobPostAPI/GetApplicantsList?JobPostID=' +
                context.state.JobPostingID +
                '&PageNo=' +
                page +
                '&RecordsPerPage=10';
            console.log(
                'DEBUG: Get My Job Post request-------------.',
                requestPath
            );
            fetch(requestPath, {
                method: 'GET'
            })
                .then(response => response.text())
                .then(result => {
                    let resultJson = JSON.parse(result);

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

    getApplicantsData(page) {
        this.fetchApplicants(false, page);
    }

    onRefresh() {
        this.page = 1;
        this.loadAllData = false;
        this.fetchApplicants(true, 1);
    }

    handleLoadMore = () => {
        if (!this.state.loading && !this.loadAllData) {
            this.page = this.page + 1;
            this.getApplicantsData(this.page);
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
            this.getApplicantsData(this.page);
        } else {
            var listData = this.state.data;
            listData[newIndex] = newItem;
            this.setState({ data: listData });
        }
    };

    onPressApplicantItem = (index, item) => {
        this.props.navigation.navigate('ApplicantDetails', { APPLICANT: item });
    };

    onPressCreateInquiry = () => {
        var context = this;
        var navigation = context.props.navigation;
        navigation.navigate('CreateInquiry', {
            onGoBackInquiryList: () => {
                this.loadData();
            }
        });
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
                onPress={() => this.onPressApplicantItem(index, item)}>
                <View style={styles.listItem}>
                    <Text style={styles.postTitleText} numberOfLines={2}>
                        {item.ApplicantName}
                    </Text>
                    <Text style={styles.postDescriptionText} numberOfLines={1}>
                        {item.ApplicantTelNo}
                    </Text>
                    <Text style={styles.postDateText}>
                        {moment(item.ApplicantDate).format('DD/MM/YYYY')}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <NavBarWithBack
                    name={'Job Applicants'}
                    onPressBack={() => this.props.navigation.goBack()}
                />

                <View style={styles.centerContainer}>
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
                        keyExtractor={(item, JobPostingID) =>
                            `"id"${JobPostingID}`
                        }
                        // ItemSeparatorComponent={this.renderSeparator}
                        ListFooterComponent={this.renderFooter.bind(this)}
                        onEndReachedThreshold={0.4}
                        onEndReached={this.handleLoadMore.bind(this)}
                    />

                    {!this.state.isRefreshing &&
                    !this.state.loading &&
                    this.state.data.length == 0 ? (
                        <Text style={styles.noDataText}>
                            {'No Applicants Right Now!'}
                        </Text>
                    ) : null}
                </View>
            </SafeAreaView>
        );
    }
}

export default Search;

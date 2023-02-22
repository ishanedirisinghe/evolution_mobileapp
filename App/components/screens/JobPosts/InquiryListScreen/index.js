import React, { Component } from 'react';
import {
    View,
    Text,
    ActivityIndicator,
    SafeAreaView,
    FlatList,
    TouchableOpacity,
    RefreshControl
} from 'react-native';
import DefaultPreference from 'react-native-default-preference';
import { showMessage } from 'react-native-flash-message';
import NavigationHeader from '../../uiElements/NavigationHeader';
import { ContainedButton } from '../../uiElements/Button';
import styles from './styles';
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
            data: [],
            error: '',
            isLoginUser: false
        };
    }

    componentDidMount() {
        this.loadData();
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
                this.getInquiryData(this.page);
            }
        );
    }

    async fetchInquiry(isRefresh, page) {
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
                '/api/JobPostAPI/GetInquiryList?CustomerID=' +
                userData.CustomerID +
                '&PageNo=' +
                page +
                '&RecordsPerPage=10';

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

    getInquiryData(page) {
        this.fetchInquiry(false, page);
    }

    onRefresh() {
        this.page = 1;
        this.loadAllData = false;
        this.fetchInquiry(true, 1);
    }

    handleLoadMore = () => {
        if (!this.state.loading && !this.loadAllData) {
            this.page = this.page + 1;
            this.getInquiryData(this.page);
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
            this.getInquiryData(this.page);
        } else {
            var listData = this.state.data;
            listData[newIndex] = newItem;
            this.setState({ data: listData });
        }
    };

    onPressInquiryItem = (index, item) => {
        this.props.navigation.navigate('InquiryDetail', { INQUIRY: item });
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
                onPress={() => this.onPressInquiryItem(index, item)}>
                <Text
                    style={styles.itemTitleText}
                    numberOfLines={2}
                    ellipsizeMode="tail">
                    {item.InquiryTopic}
                </Text>
                <Text style={styles.itemDescriptionText}>{item.ShortDesc}</Text>
            </TouchableOpacity>
        );
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <NavigationHeader {...this.props} screenTitle="Inquiry" />
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
                        keyExtractor={(item, JobPostingID) =>
                            `"id"${JobPostingID}`
                        }
                        ListFooterComponent={this.renderFooter.bind(this)}
                        onEndReachedThreshold={0.4}
                        onEndReached={this.handleLoadMore.bind(this)}
                    />

                    <View style={styles.actionContainer}>
                        <ContainedButton
                            onPress={this.onPressCreateInquiry}
                            label="CREATE INQUIRY"
                        />
                    </View>
                    {!this.state.isRefreshing &&
                    !this.state.loading &&
                    this.state.data.length === 0 ? (
                        <Text style={styles.noDataText}>
                            {'No Inquiries Right Now!'}
                        </Text>
                    ) : null}
                </View>
            </SafeAreaView>
        );
    }
}

export default Search;

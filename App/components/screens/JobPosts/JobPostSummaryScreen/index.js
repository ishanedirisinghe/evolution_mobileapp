import React, { Component } from 'react';
import {
    View,
    Text,
    SafeAreaView,
    ScrollView,
    KeyboardAvoidingView,
    Platform
} from 'react-native';
import DefaultPreference from 'react-native-default-preference';
import { showMessage } from 'react-native-flash-message';
import Spinner from 'react-native-loading-spinner-overlay';
import HTML from 'react-native-render-html';
import NavigationHeader from '../../uiElements/NavigationHeader';
import styles from './styles';
import { ContainedButton } from '../../uiElements/Button';

class Search extends Component {
    fieldRef = React.createRef();

    constructor(props) {
        super(props);
        this.state = {
            spinner: false,
            postData: {},
            jobCategoryList: []
        };
    }

    componentDidMount() {
        var context = this;
        const {
            TYPE,
            JOB_POST,
            JOB_CATEGORY_LIST
        } = this.props.navigation.state.params; // TYPE = NEW_USER , EXISTING_USER
        context.setState({
            screenType: TYPE,
            postData: JOB_POST,
            jobCategoryList: JOB_CATEGORY_LIST
        });
    }

    onPressSubmitButton() {
        if (this.state.screenType == 'NEW_USER') {
            this.saveJobPostByNewCustomer();
        } else {
            this.saveJobPostByExistingCustomer();
        }
    }

    onGoToPostScreen = () => {
        this.props.navigation.navigate('MyJobPosts');
    };

    saveJobPostByExistingCustomer() {
        var context = this;
        context.setState({ spinner: true });
        let requestPath =
            global.API_ENDPOINT +
            '/api/JobPostAPI/SaveJobPostByExistingCustomer';

        console.log('DEBUG: save JobPostByExistingCustomer', requestPath);
        fetch(requestPath, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify(this.state.postData)
        })
            .then(response => response.text())
            .then(responseTxt => {
                context.setState({ spinner: false });
                console.log('DEBUG: Add job post success. ', responseTxt);

                let resultJson = JSON.parse(responseTxt);
                if (resultJson && resultJson.Message == undefined) {
                    showMessage({
                        message: 'Success',
                        description: 'Job post added successfully.',
                        type: 'success'
                    });
                    context.onGoToPostScreen();
                } else {
                    showMessage({
                        message: 'Error',
                        description:
                            resultJson && resultJson.Message != ''
                                ? resultJson.Message
                                : 'Unknown server error. Please check your internet connection. Contact support if issue prevails.',
                        type: 'danger'
                    });
                }
            })
            .catch(error => {
                context.setState({ spinner: false });
                console.log('DEBUG: Add post request failed.', error);
                showMessage({
                    message: 'Error',
                    description:
                        'Unknown server error. Please check your internet connection. Contact support if issue prevails.',
                    type: 'danger'
                });
            });
    }

    saveJobPostByNewCustomer() {
        var context = this;
        context.setState({ spinner: true });
        let requestPath =
            global.API_ENDPOINT + '/api/JobPostAPI/SaveJobPostByNewCustomer';

        console.log('DEBUG: save JobPostByNewCustomer', requestPath);
        console.log(
            'DEBUG: save JobPostByNewCustomer BODY',
            this.state.postData
        );
        fetch(requestPath, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify(this.state.postData)
        })
            .then(response => response.text())
            .then(responseTxt => {
                context.setState({ spinner: false });
                console.log('DEBUG: Add job post success. ', responseTxt);
                let resultJson = JSON.parse(responseTxt);
                if (resultJson && resultJson.Message == undefined) {
                    showMessage({
                        message: 'Success',
                        description: 'Job post added successfully.',
                        type: 'success'
                    });

                    resultJson.isVerify = true;
                    DefaultPreference.set(
                        'job_user_data',
                        JSON.stringify(resultJson)
                    ).then(function() {
                        context.onGoToPostScreen();
                    });
                } else {
                    showMessage({
                        message: 'Error',
                        description:
                            resultJson && resultJson.Message != ''
                                ? resultJson.Message
                                : 'Unknown server error. Please check your internet connection. Contact support if issue prevails.',
                        type: 'danger'
                    });
                }
            })
            .catch(error => {
                context.setState({ spinner: false });
                console.log('DEBUG: Add post request failed.', error);
                showMessage({
                    message: 'Error',
                    description:
                        'Unknown server error. Please check your internet connection. Contact support if issue prevails.',
                    type: 'danger'
                });
            });
    }

    render() {
        const { postData } = this.state;
        const jobCatList = this.state.jobCategoryList;
        const jobCategoryName = jobCatList.find(
            jobCategoryList => jobCategoryList.JobCatID === postData.JobCatID
        );

        return (
            <SafeAreaView style={styles.container}>
                <Spinner
                    textStyle
                    visible={this.state.spinner}
                    textContent={'Loading...'}
                />
                <NavigationHeader {...this.props} screenTitle="Summary" />
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : null}
                    style={styles.flex1}>
                    <ScrollView style={styles.flex1}>
                        <View style={styles.formContainer}>
                            <View style={styles.detailsContainer}>
                                <View style={styles.detailView}>
                                    <Text style={styles.detailTitle}>
                                        Job Category
                                    </Text>
                                    <Text style={styles.detailText}>
                                        {(jobCategoryName &&
                                            jobCategoryName.JobCatName) ||
                                            ''}
                                    </Text>
                                </View>
                                <View style={styles.detailSeparatorL} />
                                <View style={styles.detailView}>
                                    <Text style={styles.detailTitle}>
                                        Job Title
                                    </Text>
                                    <Text style={styles.detailText}>
                                        {(postData && postData.JobTitle) || ''}
                                    </Text>
                                </View>
                                <View style={styles.detailSeparatorL} />
                                <View style={styles.detailView}>
                                    <Text style={styles.detailTitle}>
                                        Job Description
                                    </Text>
                                    <Text style={styles.detailText}>
                                        {(postData &&
                                            postData.JobDescription) ||
                                            ''}
                                    </Text>
                                </View>
                                <View style={styles.detailSeparatorR} />

                                <View style={styles.detailView}>
                                    <Text style={styles.detailTitle}>
                                        Duties
                                    </Text>
                                    <Text style={styles.detailText}>
                                        {(postData && postData.Duties) || ''}
                                    </Text>
                                </View>
                                <View style={styles.detailSeparatorL} />

                                <View style={styles.detailView}>
                                    <Text style={styles.detailTitle}>
                                        Requierments
                                    </Text>
                                    <Text style={styles.detailText}>
                                        {(postData && postData.Requierments) ||
                                            ''}
                                    </Text>
                                </View>
                                <View style={styles.detailSeparatorR} />

                                <View style={styles.detailView}>
                                    <Text style={styles.detailTitle}>
                                        Expire Date
                                    </Text>
                                    <Text style={styles.detailText}>
                                        {(postData && postData.ExpireDate) ||
                                            ''}
                                    </Text>
                                </View>
                                <View style={styles.detailSeparatorL} />

                                {postData &&
                                postData.WebUrl &&
                                postData.WebUrl !== '' ? (
                                    <>
                                        <View style={styles.detailView}>
                                            <Text style={styles.detailTitle}>
                                                Web Url
                                            </Text>
                                            <Text style={styles.detailText}>
                                                {(postData &&
                                                    postData.WebUrl) ||
                                                    ''}
                                            </Text>
                                        </View>
                                        <View style={styles.detailSeparatorR} />
                                    </>
                                ) : null}

                                <View style={styles.detailView}>
                                    <Text style={styles.detailTitle}>
                                        Addional Info
                                    </Text>
                                    <HTML
                                        containerStyle={styles.htmlContent}
                                        html={
                                            (postData &&
                                                postData.AddionalInfo) ||
                                            ''
                                        }
                                        contentWidth="100%"
                                    />
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                    <View style={styles.actionContainer}>
                        <ContainedButton
                            onPress={this.onPressSubmitButton.bind(this)}
                            label="SUBMIT"
                        />
                    </View>
                </KeyboardAvoidingView>
            </SafeAreaView>
        );
    }
}

export default Search;

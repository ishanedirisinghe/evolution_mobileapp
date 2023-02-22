import React, { Component } from 'react';
import {
    View,
    SafeAreaView,
    ScrollView,
    TextInput,
    KeyboardAvoidingView,
    Keyboard,
    Platform,
    BackHandler
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import DefaultPreference from 'react-native-default-preference';
import { showMessage } from 'react-native-flash-message';
import styles from './styles';
import NavigationHeader from '../../uiElements/NavigationHeader';
import { OutlinedTextInput } from '../../uiElements/TextInput';
import { ContainedButton } from '../../uiElements/Button';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: true,
            spinner: false,
            topic: '',
            description: ''
        };
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }

    componentDidMount() {}

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

    onPressGoBack = () => {
        this.props.navigation.state.params.onGoBackInquiryList();
        this.props.navigation.goBack();
    };

    addNewInquiry() {
        var context = this;
        if (!context.state.topic || context.state.topic.trim() == '') {
            showMessage({
                message: 'Topic',
                description: 'Please enter the Inquiry Topic.',
                type: 'danger'
            });
            return;
        } else if (
            !context.state.description ||
            context.state.description.trim() == ''
        ) {
            showMessage({
                message: 'Description',
                description: 'Please enter the Description.',
                type: 'danger'
            });
            return;
        } else {
            Keyboard.dismiss();
            context.setState({ spinner: true });
            DefaultPreference.get('job_user_data').then(function(user_data) {
                var jsonUserData = JSON.parse(user_data);

                let requestPath =
                    global.API_ENDPOINT + '/api/JobPostAPI/AddCustomerInquiry';

                console.log('DEBUG: add post', requestPath);
                fetch(requestPath, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json'
                    },
                    body: JSON.stringify({
                        CustomerID: jsonUserData.CustomerID,
                        InquiryTopic: context.state.topic.trim(),
                        ShortDesc: context.state.description.trim()
                    })
                })
                    .then(addPostCommentResponse =>
                        addPostCommentResponse.text()
                    )
                    .then(result => {
                        console.log('DEBUG: add post------', result);
                        let resultJson = JSON.parse(result);
                        if (
                            resultJson &&
                            resultJson.Message &&
                            resultJson.Message != ''
                        ) {
                            context.setState({ spinner: false });
                            showMessage({
                                message: 'Error',
                                description: resultJson.Message,
                                type: 'danger'
                            });
                        } else {
                            context.setState({
                                spinner: false,
                                topic: '',
                                description: ''
                            });
                            showMessage({
                                message: 'Success',
                                description: 'Inquiry added successfully.',
                                type: 'success'
                            });
                        }
                    })
                    .catch(error => {
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
                    });
            });
        }
    }

    render() {
        const { screenType } = this.state;

        return (
            <SafeAreaView style={styles.container}>
                <NavigationHeader
                    screenTitle="Add Inquiry"
                    onPressBackButton={() => this.onPressGoBack()}
                />
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : null}
                    style={styles.flex1}>
                    <ScrollView keyboardShouldPersistTaps="handled">
                        <Spinner
                            visible={this.state.spinner}
                            textContent={'Loading...'}
                        />
                        <View style={styles.formView}>
                            <OutlinedTextInput
                                textInputProps={{
                                    placeholder: 'Topic*',
                                    value: this.state.topic,
                                    editable:
                                        screenType && screenType === 'VIEW'
                                            ? false
                                            : true
                                }}
                                onChangeText={text =>
                                    this.setState({ topic: text })
                                }
                            />
                            <View
                                style={[
                                    styles.inputContainer,
                                    styles.textAreaHeight
                                ]}>
                                <TextInput
                                    multiline
                                    numberOfLines={5}
                                    style={styles.textAreaText}
                                    placeholder="Description*"
                                    value={this.state.description}
                                    onChangeText={text =>
                                        this.setState({ description: text })
                                    }
                                />
                            </View>
                        </View>
                    </ScrollView>
                    <View style={styles.actionContainer}>
                        <ContainedButton
                            onPress={() => {
                                this.addNewInquiry();
                            }}
                            label="ADD"
                        />
                    </View>
                </KeyboardAvoidingView>
            </SafeAreaView>
        );
    }
}

export default Search;

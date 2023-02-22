import React, { Component } from 'react';
import {
    View,
    Text,
    SafeAreaView,
    ScrollView,
    Platform,
    KeyboardAvoidingView
} from 'react-native';
import { showMessage } from 'react-native-flash-message';
import Spinner from 'react-native-loading-spinner-overlay';
import styles from './styles';
import { BottomBackButton, ContainedButton } from '../../uiElements/Button';
import { OutlinedTextInput } from '../../uiElements/TextInput';

class LoginSignup extends Component {
    fieldRef = React.createRef();
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            spinner: false
        };
    }

    onPressLoginButton() {
        this.setState({ callFunction: true });
        this.loginAction();
    }

    async loginAction() {
        var context = this;
        let username = this.state.username.toLowerCase();
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let validEmail = re.test(String(username).toLowerCase());
        if (!username || username.trim() == '' || !validEmail) {
            showMessage({
                message: 'Email',
                description: 'Please enter a valid email.',
                type: 'danger'
            });
            return;
        }

        let requestPath =
            global.API_ENDPOINT +
            '/api/JobPostAPI/ForgetPassword?Email=' +
            username.trim();
        console.log('DEBUG: Get JOB Post Login request.', requestPath);

        context.setState({ spinner: true });
        fetch(requestPath, {
            method: 'GET'
        })
            .then(stdInfoResponse => stdInfoResponse.text())
            .then(stdInfoResponseTxt => {
                context.setState({ spinner: false });
                console.log(
                    'DEBUG: Get JOB Post Login request success. ',
                    stdInfoResponseTxt
                );

                let jsonPasrsedData = JSON.parse(stdInfoResponseTxt);
                if (jsonPasrsedData && jsonPasrsedData.Message == undefined) {
                    showMessage({
                        message: 'Success',
                        description: stdInfoResponseTxt,
                        type: 'success'
                    });
                    context.props.navigation.goBack();
                } else {
                    showMessage({
                        message: 'Error',
                        description:
                            'Unknown server error. Please check your internet connection. Contact support if issue prevails.',
                        type: 'danger'
                    });
                }
            })
            .catch(error => {
                context.setState({ spinner: false });
                console.log('DEBUG: Get JOB Post Login request failed.', error);
                showMessage({
                    message: 'Error',
                    description:
                        'Unknown server error. Please check your internet connection. Contact support if issue prevails.',
                    type: 'danger'
                });
            });
    }

    render() {
        return (
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : null}
                style={styles.flex1}>
                <SafeAreaView style={styles.container}>
                    <Spinner
                        textStyle
                        visible={this.state.spinner}
                        textContent={'Loading...'}
                    />
                    <ScrollView
                        contentContainerStyle={styles.scrollViewContent}>
                        <View style={styles.centerView}>
                            <Text style={styles.titleText}>
                                Forgot Password
                            </Text>
                            <Text style={styles.descriptionText}>
                                {
                                    "Confirm your email and we'll\nsend the instructions"
                                }
                            </Text>
                        </View>
                        <View style={styles.formView}>
                            <OutlinedTextInput
                                textInputProps={{
                                    placeholder: 'Email',
                                    keyboardType: 'email-address'
                                }}
                                onChangeText={text =>
                                    this.setState({ username: text })
                                }
                            />
                            <View style={styles.actionContainer}>
                                <ContainedButton
                                    onPress={this.onPressLoginButton.bind(this)}
                                    label="RESET PASSWORD"
                                />
                            </View>
                        </View>
                        <View style={styles.backContainer}>
                            <BottomBackButton
                                onPress={() => this.props.navigation.goBack()}
                            />
                        </View>
                    </ScrollView>
                </SafeAreaView>
            </KeyboardAvoidingView>
        );
    }
}

export default LoginSignup;

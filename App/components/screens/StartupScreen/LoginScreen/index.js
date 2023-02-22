/* eslint-disable react-native/no-inline-styles */
/* eslint-disable eqeqeq */
/* eslint-disable consistent-this */
/* eslint-disable no-undef */
import React, { Component } from 'react';
import DefaultPreference from 'react-native-default-preference';

import {
    View,
    Text,
    Image,
    SafeAreaView,
    ScrollView,
    KeyboardAvoidingView,
    TouchableOpacity
} from 'react-native';
import { showMessage } from 'react-native-flash-message';
import Spinner from 'react-native-loading-spinner-overlay';

import styles from './styles';
import { BottomBackButton, ContainedButton } from '../../uiElements/Button';
import {
    OutlinedTextInput,
    OutlinedPasswordTextInput
} from '../../uiElements/TextInput';

class LoginSignup extends Component {
    fieldRef = React.createRef();
    constructor(props) {
        super(props);
        this.state = {
            loginsignupstate: 1,
            username: '', //'venura@multifinance.lk',
            password: '', //'User@1234',
            spinner: false
        };
    }

    onPressLoginButton() {
        this.setState({ callFunction: true });
        this.loginAction();
    }

    async loginAction() {
        var context = this;
        let { username, password } = this.state;
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let validEmail = re.test(String(username).toLowerCase());
        if (!username || username.trim() == '' || !validEmail) {
            showMessage({
                message: 'Email',
                description: 'Please enter a valid email.',
                type: 'danger'
            });
            return;
        } else if (!password || password.trim() == '') {
            showMessage({
                message: 'Password',
                description: 'Please enter a password.',
                type: 'danger'
            });
            return;
        }

        let data = {
            grant_type: 'password',
            userName: username.trim(), //'admin@evolution.edu.au',//username,
            password: password.trim() //'Admin@123',//password
        };
        let requestPath = global.API_ENDPOINT + '/token';
        var navigation = this.props.navigation;
        const searchParams = Object.keys(data)
            .map(key => {
                return (
                    encodeURIComponent(key) +
                    '=' +
                    encodeURIComponent(data[key])
                );
            })
            .join('&');
        console.log('DEBUG: Sending token request.', requestPath, data);
        context.setState({ spinner: true });
        fetch(requestPath, {
            method: 'POST',
            headers: {
                'Content-Type':
                    'application/x-www-form-urlencoded;charset=UTF-8'
            },
            body: searchParams
        })
            .then(response => response.text())
            .then(result => {
                context.setState({ spinner: false });
                let resultJson = JSON.parse(result);
                if (resultJson.access_token != undefined) {
                    global.session = resultJson;
                    console.log('DEBUG: Token request success.', resultJson);
                    let requestPathStdInfo =
                        global.API_ENDPOINT + '/api/StudentAPI/GetStudentInfo';
                    console.log('DEBUG: GetStudentInfo', requestPathStdInfo);
                    fetch(requestPathStdInfo, {
                        method: 'GET',
                        headers: {
                            Authorization:
                                'Bearer ' + global.session.access_token
                        }
                    })
                        .then(stdInfoResponse => stdInfoResponse.text())
                        .then(stdInfoResponseTxt => {
                            console.log(
                                'DEBUG: GetStudentInfo request success. ',
                                stdInfoResponseTxt
                            );
                            console.log('DEBUG: 2222222222222222 ');
                            DefaultPreference.set(
                                'user_data',
                                stdInfoResponseTxt
                            ).then(function() {
                                console.log('DEBUG: 333333333333333');
                                console.log(
                                    'DEBUG: 44444444444',
                                    stdInfoResponseTxt
                                );
                                resultJsonStdInfo = JSON.parse(
                                    stdInfoResponseTxt
                                );
                                // resultJsonStdInfo['IsPassWordReset']=true;
                                if (!resultJsonStdInfo.IsPassWordReset) {
                                    navigation.navigate('ResetPassword');
                                } else {
                                    navigation.navigate('PasscodeLogin', {
                                        PUSH_NOTIFI_DATA: ''
                                    });
                                }
                            });
                        })
                        .catch(error => {
                            context.setState({ spinner: false });
                            console.log(
                                'DEBUG: GetStudentInfo request failed.',
                                error
                            );
                            showMessage({
                                message: 'Error',
                                description:
                                    'Unknown server error. Please check your internet connection. Contact support if issue prevails.',
                                type: 'danger'
                            });
                        });
                } else {
                    context.setState({ spinner: false });
                    showMessage({
                        message: 'Login failed',
                        description: 'The user name or password is incorrect',
                        type: 'danger'
                    });
                    console.log(
                        'DEBUG: Token request failed, invalid credentials.',
                        resultJson
                    );
                }
            })
            .catch(error => {
                console.log('DEBUG: Token request failed.', error);
                if (context.state.callFunction) {
                    context.setState({ callFunction: false });
                    console.log(
                        'Recall LOGIN --------------------------------------'
                    );
                    context.loginAction();
                } else {
                    context.setState({ spinner: false });
                    showMessage({
                        message: 'Login failed',
                        description:
                            'Unknown server error. Please check your internet connection. Contact support if issue prevails.',
                        type: 'danger'
                    });
                }
            });
    }

    changeLoginSignUpState() {
        if (this.state.loginsignupstate == 1) {
            this.setState({ loginsignupstate: 2 });
        } else {
            this.setState({ loginsignupstate: 1 });
        }
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
                            <Image
                                style={styles.logoImage}
                                source={require('../../../../assets/images/evolution_logo.png')}
                                resizeMode="contain"
                            />
                            <Text style={styles.loginText}>Login</Text>
                            <Text style={styles.descriptionText}>
                                {
                                    'Please enter user name and password\nsent you via email'
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
                            <View style={styles.H20} />
                            <OutlinedPasswordTextInput
                                textInputProps={{
                                    placeholder: 'Password'
                                }}
                                onChangeText={text =>
                                    this.setState({ password: text })
                                }
                            />
                            <View style={styles.actionContainer}>
                                <ContainedButton
                                    onPress={this.onPressLoginButton.bind(this)}
                                    label="LOGIN"
                                />
                            </View>
                            {/* ! Commented due to flow not implemented in design */}
                            {/* <View style={styles.fgContainer}>
                                <Text style={styles.fgText}>
                                    Forgot your password?
                                </Text>
                                <TouchableOpacity
                                    style={styles.resetTouch}>
                                    <Text style={styles.resetText}>
                                        Reset here
                                    </Text>
                                </TouchableOpacity>
                            </View> */}
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

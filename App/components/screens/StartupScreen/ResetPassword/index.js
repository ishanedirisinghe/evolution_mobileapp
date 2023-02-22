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
import styles from './styles';
import { showMessage } from 'react-native-flash-message';
import Spinner from 'react-native-loading-spinner-overlay';
import { BottomBackButton, ContainedButton } from '../../uiElements/Button';
import { OutlinedPasswordTextInput } from '../../uiElements/TextInput';
var re = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

class ResetPassword extends Component {
    fieldRef = React.createRef();
    constructor(props) {
        super(props);
        this.state = {
            loginsignupstate: 1,
            password: '',
            password_confirm: '',
            spinner: false
        };
    }

    onPressPasswordReset() {
        this.setState({ callFunction: true });
        this.passwordResetAction();
    }

    async passwordResetAction() {
        var context = this;
        console.log('DEBUG: Reset password.');
        let { password, password_confirm } = this.state;
        console.log(
            'Password:',
            password,
            ' - Confirm Password:',
            password_confirm
        );
        var navigation = this.props.navigation;
        if (!password || password.trim() == '') {
            console.log('DEBUG: Reset password2.');
            showMessage({
                message: 'New Password',
                description: 'Please enter the new password.',
                type: 'danger'
            });
            return;
        } else if (!password_confirm || password_confirm.trim() == '') {
            showMessage({
                message: 'Confirm Password',
                description: 'Please enter the confirm password.',
                type: 'danger'
            });
            return;
        } else if (password.trim() != password_confirm.trim()) {
            showMessage({
                message: 'Passwords',
                description:
                    "'New Password' and 'Confirm Password' does not match.",
                type: 'danger'
            });
            return;
        } else if (!re.test(password.trim())) {
            console.log(re.test(password.trim()));
            showMessage({
                message: 'Passwords',
                description:
                    'Password must have Minimum six characters, at least one uppercase letter, one lowercase letter, one number and one special character:',
                type: 'danger'
            });
            return;
        }

        console.log('Debug: Get user_data in reset password');
        DefaultPreference.get('user_data').then(function(user_data) {
            var jsonUserData = JSON.parse(user_data);
            console.log(
                'Debug: Get user_data in reset password done',
                jsonUserData
            );
            let requestPathStdInfo =
                global.API_ENDPOINT +
                '/api/StudentAPI/ResetPassword?UserID=' +
                jsonUserData.ID +
                '&password=' +
                password_confirm.trim();
            console.log('DEBUG: GetStudentInfo', requestPathStdInfo);
            context.setState({ spinner: true });
            fetch(requestPathStdInfo, {
                method: 'GET',
                headers: {
                    Authorization: 'Bearer ' + global.session.access_token
                }
            })
                .then(stdInfoResponse => stdInfoResponse.text())
                .then(stdInfoResponseTxt => {
                    context.setState({ spinner: false });
                    console.log(
                        'DEBUG: Password reset success. ',
                        stdInfoResponseTxt
                    );
                    jsonUserData.passwordResetComplte = true;
                    DefaultPreference.set(
                        'user_data',
                        JSON.stringify(jsonUserData)
                    ).then(function() {
                        console.log(
                            'DEBUG: user_data Updated to .',
                            jsonUserData
                        );
                        navigation.navigate('Passcode');
                    });
                })
                .catch(error => {
                    if (context.state.callFunction) {
                        context.setState({ callFunction: false });
                        console.log(
                            'Recall Reset Password --------------------------------------'
                        );
                        context.passwordResetAction();
                    } else {
                        context.setState({ spinner: false });
                        console.log(
                            'DEBUG:  Password reset request failed.',
                            error
                        );
                        showMessage({
                            message: 'Error',
                            description:
                                'Unknown server error. Please check your internet connection. Contact support if issue prevails.',
                            type: 'danger'
                        });
                    }
                });
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
                            <Text style={styles.titleText}>Reset Password</Text>
                            <Text style={styles.descriptionText}>
                                {'Please enter your\nnew password'}
                            </Text>
                        </View>
                        <View style={styles.formView}>
                            <OutlinedPasswordTextInput
                                textInputProps={{
                                    placeholder: 'New Password'
                                }}
                                onChangeText={text =>
                                    this.setState({ password: text })
                                }
                            />
                            <View style={styles.H20} />
                            <OutlinedPasswordTextInput
                                textInputProps={{
                                    placeholder: 'Confirm Password'
                                }}
                                onChangeText={text =>
                                    this.setState({ password_confirm: text })
                                }
                            />
                            <View style={styles.actionContainer}>
                                <ContainedButton
                                    onPress={this.onPressPasswordReset.bind(
                                        this
                                    )}
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

export default ResetPassword;

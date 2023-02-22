/* eslint-disable react-native/no-inline-styles */
/* eslint-disable eqeqeq */
import React, { Component } from 'react';
import {
    View,
    Text,
    SafeAreaView,
    ScrollView,
    KeyboardAvoidingView,
    Platform
} from 'react-native';
import styles from './styles';
import { showMessage } from 'react-native-flash-message';
import Spinner from 'react-native-loading-spinner-overlay';
import {
    OutlinedPasswordTextInput,
    OutlinedTextInput
} from '../../uiElements/TextInput';
import { BottomBackButton, ContainedButton } from '../../uiElements/Button';
var rePass = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

class ResetPassword extends Component {
    fieldRef = React.createRef();
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            old_password: '',
            new_password: '',
            spinner: false
        };
    }

    onPressChangePassword() {
        this.setState({ callFunction: true });
        this.passwordResetAction();
    }

    async passwordResetAction() {
        var context = this;

        let { username, old_password, new_password } = this.state;

        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let validEmail = re.test(String(username).toLowerCase());
        if (!username || username.trim() == '' || !validEmail) {
            showMessage({
                message: 'Email',
                description: 'Please enter a valid email.',
                type: 'danger'
            });
            return;
        } else if (!old_password || old_password.trim() == '') {
            showMessage({
                message: 'Old Password',
                description: 'Please enter the old password.',
                type: 'danger'
            });
            return;
        } else if (!new_password || new_password.trim() == '') {
            showMessage({
                message: 'New Password',
                description: 'Please enter the new password.',
                type: 'danger'
            });
            return;
        } else if (!rePass.test(new_password.trim())) {
            showMessage({
                message: 'New Password',
                description:
                    'New password must have Minimum six characters, at least one uppercase letter, one lowercase letter, one number and one special character:',
                type: 'danger'
            });
            return;
        }

        let requestPath =
            global.API_ENDPOINT +
            '/api/JobPostAPI/ChangePassword?Email=' +
            username.trim() +
            '&OldPassword=' +
            old_password.trim() +
            '&NewPassword=' +
            new_password.trim();

        context.setState({ spinner: true });
        fetch(requestPath, {
            method: 'GET'
        })
            .then(stdInfoResponse => stdInfoResponse.text())
            .then(stdInfoResponseTxt => {
                context.setState({ spinner: false });

                console.log(
                    'DEBUG: Get JOB Post Login request failed.',
                    stdInfoResponseTxt
                );
                let jsonPasrsedData = JSON.parse(stdInfoResponseTxt);
                if (jsonPasrsedData && jsonPasrsedData.Message == undefined) {
                    showMessage({
                        message: 'Password Updated',
                        description:
                            'Your password has been changed successfully',
                        type: 'success'
                    });
                    context.props.navigation.goBack();
                } else {
                    showMessage({
                        message: 'Error',
                        description:
                            jsonPasrsedData &&
                            jsonPasrsedData.Message &&
                            jsonPasrsedData.Message != ''
                                ? jsonPasrsedData.Message
                                : 'Unknown server error. Please check your internet connection. Contact support if issue prevails.',
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
                                Change Password
                            </Text>
                            <Text style={styles.descriptionText}>
                                {'Please change your password'}
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
                                    placeholder: 'Old Password'
                                }}
                                onChangeText={text =>
                                    this.setState({
                                        old_password: text
                                    })
                                }
                            />
                            <View style={styles.H20} />
                            <OutlinedPasswordTextInput
                                textInputProps={{
                                    placeholder: 'New Password'
                                }}
                                onChangeText={text =>
                                    this.setState({
                                        new_password: text
                                    })
                                }
                            />
                            <View style={styles.actionContainer}>
                                <ContainedButton
                                    onPress={this.onPressChangePassword.bind(
                                        this
                                    )}
                                    label="CHANGE PASSWORD"
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

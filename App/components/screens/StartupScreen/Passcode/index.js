/* eslint-disable eqeqeq */
/* eslint-disable consistent-this */
/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import DeviceInfo from 'react-native-device-info';
import {
    View,
    Text,
    SafeAreaView,
    ScrollView,
    KeyboardAvoidingView,
    Platform
} from 'react-native';
import { showMessage } from 'react-native-flash-message';
import Spinner from 'react-native-loading-spinner-overlay';
import styles from './styles';
import DefaultPreference from 'react-native-default-preference';
import { BottomBackButton, ContainedButton } from '../../uiElements/Button';
import { OutlinedPasswordTextInput } from '../../uiElements/TextInput';

class LoginSignup extends Component {
    fieldRef = React.createRef();
    constructor(props) {
        super(props);
        this.state = {
            loginsignupstate: 1,
            password: '',
            password_confirm: ''
        };
    }

    componentDidMount() {
        var context = this;
        DefaultPreference.get('firebase_token').then(function(value) {
            context.setState({ firebaseToken: value });
        });
    }

    onPressPasscode() {
        this.setState({ callFunction: true });
        this.passcodeAction();
    }

    async passcodeAction() {
        var context = this;
        console.log('DEBUG: Reset Passcode.');
        let { password, password_confirm } = this.state;
        console.log(
            'Password:',
            password,
            ' - Confirm Passcode:',
            password_confirm
        );
        var navigation = this.props.navigation;
        if (!password || password.trim() == '') {
            console.log('DEBUG: Reset Passcode.');
            showMessage({
                message: 'New Passcode',
                description: 'Please enter the new passcode.',
                type: 'danger'
            });
            return;
        } else if (!password_confirm || password_confirm.trim() == '') {
            showMessage({
                message: 'Confirm Passcode',
                description: 'Please enter the confirm passcode.',
                type: 'danger'
            });
            return;
        } else if (password.trim() != password_confirm.trim()) {
            showMessage({
                message: 'Passwords',
                description:
                    "'New Passcode' and 'Confirm Passcode' does not match.",
                type: 'danger'
            });
            return;
        } else if (password.length < 6) {
            showMessage({
                message: 'Passwords',
                description: 'Minumum 6 Digits',
                type: 'danger'
            });
            return;
        }
        console.log('Debug: Get user_data in reset Passcode');
        DefaultPreference.get('user_data').then(function(user_data) {
            var jsonUserData = JSON.parse(user_data);
            let devId = DeviceInfo.getUniqueId();

            console.log(
                'Debug: Get user_data in reset Passcode done',
                jsonUserData,
                'dev id:',
                devId
            );
            let requestPathStdInfo =
                global.API_ENDPOINT +
                '/api/StudentAPI/SetPassCode?UserID=' +
                jsonUserData.ID +
                '&passcode=' +
                password_confirm.trim() +
                '&DeviceID=' +
                devId;
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
                        'DEBUG: Passcode reset success. ',
                        stdInfoResponseTxt
                    );
                    jsonUserData.passcodeResetComplete = true;
                    DefaultPreference.set(
                        'user_data',
                        JSON.stringify(jsonUserData)
                    ).then(function() {
                        console.log(
                            'DEBUG: Passcode user_data Updated to .',
                            jsonUserData
                        );
                        // navigation.navigate('MyIdScreen');
                        context.submitFirebaseToken();
                    });
                })
                .catch(error => {
                    if (context.state.callFunction) {
                        context.setState({ callFunction: false });
                        console.log(
                            'Recall Passcode --------------------------------------'
                        );
                        context.passcodeAction();
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

    async submitFirebaseToken() {
        var context = this;
        let { firebaseToken } = this.state;

        var navigation = this.props.navigation;
        console.log(
            'GET Firebase Token in Passcode ------------------------------',
            firebaseToken
        );
        DefaultPreference.get('user_data').then(function(user_data) {
            var jsonUserData = JSON.parse(user_data);
            let devId = DeviceInfo.getUniqueId();
            let deviceType = Platform.OS === 'ios' ? 1 : 2;

            let requestPathFirebaseDetails =
                global.API_ENDPOINT +
                '/api/AccountAPI/SaveFirebaseDetais?token=' +
                firebaseToken +
                '&deviceType=' +
                deviceType;

            console.log(
                'DEBUG: PostFirebaseDetails',
                requestPathFirebaseDetails
            );
            context.setState({ spinner: true });

            fetch(requestPathFirebaseDetails, {
                method: 'POST',
                headers: {
                    Authorization: 'Bearer ' + global.session.access_token
                }
            })
                .then(firebaseDetailsResponse => firebaseDetailsResponse.text())
                .then(firebaseDetailsResponseTxt => {
                    context.setState({ spinner: false });
                    console.log(
                        'DEBUG: PostFirebaseDetails SUCCESS. ',
                        firebaseDetailsResponseTxt
                    );

                    navigation.navigate('MyIdScreen');
                })
                .catch(error => {
                    context.setState({ spinner: false });
                    console.log('DEBUG: PostFirebaseDetails FAILED.', error);

                    navigation.navigate('MyIdScreen');
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
                            <Text style={styles.titleText}>
                                Set Your Pass code
                            </Text>
                            <Text style={styles.descriptionText}>
                                {'Please set your passcode for set easy login'}
                            </Text>
                        </View>
                        <View style={styles.formView}>
                            <OutlinedPasswordTextInput
                                textInputProps={{
                                    maxLength: 6,
                                    keyboardType: 'numeric',
                                    placeholder: 'Passcode'
                                }}
                                onChangeText={text =>
                                    this.setState({
                                        password: text
                                    })
                                }
                            />
                            <View style={styles.H20} />
                            <OutlinedPasswordTextInput
                                textInputProps={{
                                    maxLength: 6,
                                    keyboardType: 'numeric',
                                    placeholder: 'Confirm Passcode'
                                }}
                                onChangeText={text =>
                                    this.setState({ password_confirm: text })
                                }
                            />
                            <View style={styles.actionContainer}>
                                <ContainedButton
                                    onPress={this.onPressPasscode.bind(this)}
                                    label="SET PASSCODE"
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

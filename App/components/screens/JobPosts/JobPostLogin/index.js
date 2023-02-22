import React, { Component } from 'react';
import DefaultPreference from 'react-native-default-preference';
import {
    View,
    Text,
    Image,
    SafeAreaView,
    ScrollView,
    KeyboardAvoidingView,
    TouchableOpacity,
    BackHandler
} from 'react-native';
import { showMessage } from 'react-native-flash-message';
import Spinner from 'react-native-loading-spinner-overlay';
import styles from './styles';
import { BottomBackButton, ContainedButton } from '../../uiElements/Button';
import {
    OutlinedPasswordTextInput,
    OutlinedTextInput
} from '../../uiElements/TextInput';

class LoginSignup extends Component {
    fieldRef = React.createRef();
    constructor(props) {
        super(props);
        this.state = {
            loginsignupstate: 1,
            username: '',
            password: '',
            spinner: false,
            jobUser: {}
        };
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }

    componentDidMount() {
        var context = this;
        const { TYPE } = context.props.navigation.state.params; // TYPE = POST_LIST , ADD_POST
        context.setState({ screenType: TYPE });
    }

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
        if (this.state.screenType == 'ADD_POST') {
            this.props.navigation.state.params.onGoBack(this.state.jobUser);
        } else {
            this.props.navigation.state.params.onGoBackJobPost();
        }
        this.props.navigation.goBack();
    };

    onPressLoginButton() {
        this.setState({ callFunction: true });
        this.loginAction();
    }

    async loginAction() {
        var context = this;
        let username = this.state.username.toLowerCase();
        let password = this.state.password;
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let validEmail = re.test(String(username));
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

        var navigation = this.props.navigation;
        let requestPath =
            global.API_ENDPOINT +
            '/api/JobPostAPI/Login?UserName=' +
            username.trim() +
            '&Password=' +
            password.trim();
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

                var jsonPasrsedData = JSON.parse(stdInfoResponseTxt);
                jsonPasrsedData.isVerify = true;

                if (jsonPasrsedData && jsonPasrsedData.Message == undefined) {
                    context.setState({ jobUser: jsonPasrsedData });
                    DefaultPreference.set(
                        'job_user_data',
                        JSON.stringify(jsonPasrsedData)
                    ).then(function() {
                        if (context.state.screenType == 'ADD_POST') {
                            context.onPressGoBack();
                        } else {
                            navigation.navigate('MyJobPosts');
                        }
                        // context.onPressGoBack();
                    });
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

    changeLoginSignUpState() {
        if (this.state.loginsignupstate == 1) {
            this.setState({ loginsignupstate: 2 });
        } else {
            this.setState({ loginsignupstate: 1 });
        }
    }

    onPressForgotPassword = () => {
        var context = this;
        var navigation = context.props.navigation;
        navigation.navigate('JobPostForgotPassword');
    };

    onPressSignUp = () => {
        var context = this;
        var navigation = context.props.navigation;
        navigation.navigate('CreateJobPost', {
            TYPE: 'NEW_USER',
            JOB_USER: {}
        });
    };

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
                            <Text style={styles.loginText}>Employer Login</Text>
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
                            <View style={styles.fgContainer}>
                                <Text style={styles.fgText}>
                                    Forgot your password?
                                </Text>
                                <TouchableOpacity
                                    style={styles.resetTouch}
                                    onPress={this.onPressForgotPassword}>
                                    <Text style={styles.resetText}>
                                        Reset here
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.fgContainer}>
                                <Text style={styles.fgText}>
                                    Don't have an account?
                                </Text>
                                <TouchableOpacity
                                    style={styles.resetTouch}
                                    onPress={this.onPressSignUp}>
                                    <Text style={styles.resetText}>
                                        Sign up
                                    </Text>
                                </TouchableOpacity>
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

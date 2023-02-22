import React, { Component } from 'react';
import { View, Text, Image, SafeAreaView } from 'react-native';
import DefaultPreference from 'react-native-default-preference';

import styles from './styles';
import { BottomBackButton, ContainedButton } from '../../uiElements/Button';

class LoginSignup extends Component {
    constructor(props) {
        super(props);
    }

    chechUserIsLogin() {
        var context = this;
        DefaultPreference.get('job_user_data').then(function (value) {
            if (value) {
                let jsonData = JSON.parse(value);

                if (jsonData.isVerify) {
                    context.goToMyJobPost();
                } else {
                    context.goToLogin();
                }
            } else {
                context.goToLogin();
            }
        });
    }

    goToLogin = () => {
        var context = this;
        var navigation = context.props.navigation;

        navigation.navigate('JobPostLogin', {
            TYPE: 'POST_LIST',
            onGoBackJobPost: () => {
                // this.chechUserIsLogin()
            }
        }); // TYPE = POST_LIST , ADD_POST
    };

    goToMyJobPost = () => {
        var context = this;
        var navigation = context.props.navigation;
        navigation.navigate('MyJobPosts');
    };

    onPressLogin = () => {
        this.chechUserIsLogin();
    };

    onPressSignUp = () => {
        var context = this;
        var navigation = context.props.navigation;
        navigation.navigate('CreateJobPost', {
            TYPE: 'NEW_USER',
            JOB_USER: {}
        }); // TYPE = NEW_USER , EXISTING_USER
    };

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.flex1}>
                    <View style={styles.centerView}>
                        <Image
                            style={styles.logoImage}
                            source={require('../../../../assets/images/evolution_logo.png')}
                            resizeMode="contain"
                        />
                        <Text style={styles.titleText}>Employer</Text>
                    </View>
                    <View style={styles.actionContainer}>
                        <ContainedButton
                            style={styles.buttonContainer}
                            onPress={() => this.onPressLogin()}
                            label="LOGIN"
                        />
                        <ContainedButton
                            style={styles.buttonContainer}
                            onPress={() => this.onPressSignUp()}
                            label="SIGN UP & CREATE POST"
                        />
                    </View>
                    <View style={styles.backContainer}>
                        <BottomBackButton
                            onPress={() => this.props.navigation.goBack()}
                        />
                    </View>
                </View>
            </SafeAreaView>
        );
    }
}

export default LoginSignup;

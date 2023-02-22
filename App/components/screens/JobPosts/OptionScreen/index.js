import React, { Component } from 'react';
import DefaultPreference from 'react-native-default-preference';
import { View, Text, Image, SafeAreaView } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import styles from './styles';
import { BottomBackButton, ContainedButton } from '../../uiElements/Button';

class LoginSignup extends Component {
    fieldRef = React.createRef();
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {}

    chechUserIsLogin() {
        var context = this;
        DefaultPreference.get('job_user_data').then(function(value) {
            if (value) {
                let jsonData = JSON.parse(value);

                console.log(
                    'USER--------------------------------------------------------------',
                    jsonData
                );
                if (jsonData.isVerify) {
                    context.goToMyJobPost();
                } else {
                    context.goToEmployerType();
                }
            } else {
                context.goToEmployerType();
            }
        });
    }

    goToEmployerType = () => {
        var context = this;
        var navigation = context.props.navigation;
        navigation.navigate('EmployerType');
    };

    goToMyJobPost = () => {
        var context = this;
        var navigation = context.props.navigation;
        navigation.navigate('MyJobPosts');
    };

    onPressJobSeeker = () => {
        var context = this;
        var navigation = context.props.navigation;
        navigation.navigate('JobPost');
    };

    onPressEmployer = () => {
        this.chechUserIsLogin();
    };

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <Spinner
                    textStyle
                    visible={this.state.spinner}
                    textContent={'Loading...'}
                />
                <View style={styles.flex1}>
                    <View style={styles.centerView}>
                        <Image
                            style={styles.logoImage}
                            source={require('../../../../assets/images/evolution_logo.png')}
                            resizeMode="contain"
                        />
                        <Text style={styles.titleText}>Job Posts</Text>
                    </View>
                    <View style={styles.actionContainer}>
                        <ContainedButton
                            style={styles.buttonContainer}
                            onPress={() => this.onPressJobSeeker()}
                            label="JOB SEEKER"
                        />
                        <ContainedButton
                            style={styles.buttonContainer}
                            onPress={() => this.onPressEmployer()}
                            label="EMPLOYER"
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

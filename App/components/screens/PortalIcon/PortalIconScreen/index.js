/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import {
    View,
    SafeAreaView,
    Linking,
    Platform,
    Text,
    TouchableOpacity,
    Image
} from 'react-native';

import styles from './styles';
import HamNavigationHeader from '../../uiElements/HamNavigationHeader';

const ICONS = {
    ARROW: require('../../../../assets/images/arrow_right.png'),
    LEARNING_PORTAL: require('../../../../assets/images/portal_icons/learning_portal.png'),
    STUDENT_PORTAL: require('../../../../assets/images/portal_icons/student_portal.png'),
    STUDENT_EMAIL: require('../../../../assets/images/portal_icons/student_email.png'),
    PASSPORT: require('../../../../assets/images/portal_icons/passport.png')
};
class App extends Component {
    fieldRef = React.createRef();

    constructor(props) {
        super(props);
        this.state = {
            isLogged: false,
            visible: true
        };
    }

    componentWillReceiveProps(nextPropsPortal) {
        console.log(
            'Portal --------- componentWillReceiveProps -------------.:',
            nextPropsPortal
        );
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <HamNavigationHeader
                    {...this.props}
                    screenTitle="Portal Icons"
                />
                <View style={styles.body}>
                    {/* Learning Portal */}
                    <TouchableOpacity
                        activeOpacity={0.5}
                        style={styles.buttonContainer}
                        onPress={() => {
                            Platform.OS === 'ios'
                                ? this.props.navigation.navigate(
                                      'PortalIconInfoScreen',
                                      {
                                          WEB_URL:
                                              'https://lms.evolution.pageculinaire.com.au',
                                          TITLE: 'Learning Portal'
                                      }
                                  )
                                : Linking.openURL(
                                      'https://lms.evolution.pageculinaire.com.au'
                                  );
                        }}>
                        <View style={styles.buttonIconContainer}>
                            <Image
                                source={ICONS.LEARNING_PORTAL}
                                style={{ width: 40, height: 36.6 }}
                            />
                        </View>
                        <Text style={styles.buttonTextLabel}>
                            Learning Portal
                        </Text>
                        <Image source={ICONS.ARROW} style={styles.arrow} />
                    </TouchableOpacity>

                    {/* Student Portal */}
                    <TouchableOpacity
                        activeOpacity={0.5}
                        style={styles.buttonContainer}
                        onPress={() => {
                            Platform.OS === 'ios'
                                ? this.props.navigation.navigate(
                                      'PortalIconInfoScreen',
                                      {
                                          WEB_URL:
                                              'https://admin.axcelerate.com.au/learner/',
                                          TITLE: 'Student Portal'
                                      }
                                  )
                                : Linking.openURL(
                                      'https://admin.axcelerate.com.au/learner/'
                                  );
                        }}>
                        <View style={styles.buttonIconContainer}>
                            <Image
                                source={ICONS.STUDENT_PORTAL}
                                style={{ width: 34, height: 43 }}
                            />
                        </View>
                        <Text style={styles.buttonTextLabel}>
                            Student Portal
                        </Text>
                        <Image source={ICONS.ARROW} style={styles.arrow} />
                    </TouchableOpacity>

                    {/* Student Email */}
                    <TouchableOpacity
                        activeOpacity={0.5}
                        style={styles.buttonContainer}
                        onPress={() => {
                            Platform.OS === 'ios'
                                ? this.props.navigation.navigate(
                                      'PortalIconInfoScreen',
                                      {
                                          WEB_URL:
                                              'https://outlook.office365.com',
                                          TITLE: 'Student Email'
                                      }
                                  )
                                : Linking.openURL(
                                      'https://outlook.office365.com'
                                  );
                        }}>
                        <View style={styles.buttonIconContainer}>
                            <Image
                                source={ICONS.STUDENT_EMAIL}
                                style={{ width: 40, height: 27 }}
                            />
                        </View>
                        <Text style={styles.buttonTextLabel}>
                            Student Email
                        </Text>
                        <Image source={ICONS.ARROW} style={styles.arrow} />
                    </TouchableOpacity>

                    {/* My Passport */}
                    <TouchableOpacity
                        activeOpacity={0.5}
                        style={styles.buttonContainer}
                        onPress={() => {
                            Platform.OS === 'ios'
                                ? this.props.navigation.navigate(
                                      'PortalIconInfoScreen',
                                      {
                                          WEB_URL:
                                              'https://lms.evolution.pageculinaire.com.au/mypassport',
                                          TITLE: 'My Passport'
                                      }
                                  )
                                : Linking.openURL(
                                      'https://lms.evolution.pageculinaire.com.au/mypassport'
                                  );
                        }}>
                        <View style={styles.buttonIconContainer}>
                            <Image
                                source={ICONS.PASSPORT}
                                style={{ width: 34.4, height: 40 }}
                            />
                        </View>
                        <Text style={styles.buttonTextLabel}>My Passport</Text>
                        <Image source={ICONS.ARROW} style={styles.arrow} />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }
}

export default App;

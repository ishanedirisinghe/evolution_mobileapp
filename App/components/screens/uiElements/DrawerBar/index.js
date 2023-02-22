import React from 'react';
import {
    View,
    ScrollView,
    Text,
    TouchableOpacity,
    Image,
    Alert,
    SafeAreaView
} from 'react-native';
import DefaultPreference from 'react-native-default-preference';
import AntIcons from 'react-native-vector-icons/AntDesign';
import styles from './styles';
import { setNotificationBadgeCount } from '../../../../../Action/notification';
import { Colors } from '../../../../styles';

const ICONS = {
    MY_ID: require('../../../../assets/images/nav_drawer/my_id.png'),
    PORTAL: require('../../../../assets/images/nav_drawer/portal.png'),
    EXPLORE_COURSES: require('../../../../assets/images/nav_drawer/online-course.png'),
    NOTIFY: require('../../../../assets/images/nav_drawer/notify.png'),
    NEWS: require('../../../../assets/images/nav_drawer/news.png'),
    POST: require('../../../../assets/images/nav_drawer/post.png'),
    JOB_POST: require('../../../../assets/images/nav_drawer/job_post.png'),
    ABOUT_US: require('../../../../assets/images/nav_drawer/about_us.png'),
    EDIT_PROFILE: require('../../../../assets/images/nav_drawer/edit_profile.png'),
    LOGOUT: require('../../../../assets/images/nav_drawer/logout.png')
};

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userTypeID: '',
            showView: false,
            notificationCount: 0,
            postCount: 0
        };
    }

    async componentDidMount() {
        const user_persist_data = await DefaultPreference.get('user_data');
        const jsonUserData = JSON.parse(user_persist_data);
        const userTypeID = jsonUserData.StudentTypeID;
        this.setState({ callFunction: true, userTypeID });
    }

    componentWillReceiveProps = props => {
        if (props.navigation.state.isDrawerOpen) {
            this.getNotificationCount();
            this.getUnreadReadPostCount();
        }
    };

    async getNotificationCount() {
        var context = this;
        DefaultPreference.get('user_data').then(function(user_data) {
            var jsonUserData = JSON.parse(user_data);
            let requestPath =
                global.API_ENDPOINT +
                '/api/NotificationAPI/GetNotifications?studentID=' +
                jsonUserData.StudentID +
                '&PageNo=1&RecordsPerPage=10';
            console.log('DEBUG: Get Notification count request.', requestPath);

            fetch(requestPath, {
                method: 'GET',
                headers: {
                    Authorization: 'Bearer ' + global.session.access_token
                }
            })
                .then(response => response.text())
                .then(result => {
                    let resultJson = JSON.parse(result);
                    console.log(
                        'DEBUG: Get Notification count request success. ',
                        resultJson
                    );

                    var dataList =
                        resultJson && resultJson.length > 0 ? resultJson : [];
                    var count = 0;
                    if (dataList.length > 0) {
                        count = dataList[0].URCount;
                    }

                    context.setState({
                        notificationCount: count
                    });

                    var unReadCount = count + context.state.postCount;
                    setNotificationBadgeCount(unReadCount);
                })
                .catch(error => {
                    console.log(
                        'DEBUG: Get Notification count request failed.',
                        error
                    );
                });
        });
    }

    async getUnreadReadPostCount() {
        var context = this;
        DefaultPreference.get('user_data').then(function(user_data) {
            var jsonUserData = JSON.parse(user_data);
            let requestPath =
                global.API_ENDPOINT +
                '/api/PostAPI/GetUnreadPostCount?StudentID=' +
                jsonUserData.StudentID;
            fetch(requestPath, {
                method: 'GET',
                headers: {
                    Authorization: 'Bearer ' + global.session.access_token
                }
            })
                .then(getUnreadPostCountResponse =>
                    getUnreadPostCountResponse.text()
                )
                .then(getUnreadPostCountResponseTxt => {
                    console.log(
                        'UnreadReadPostCount success. ',
                        getUnreadPostCountResponseTxt
                    );

                    var numberAsInt = parseInt(
                        getUnreadPostCountResponseTxt,
                        10
                    );
                    context.setState({
                        postCount: numberAsInt
                    });

                    var unReadCount =
                        numberAsInt + context.state.notificationCount;
                    setNotificationBadgeCount(unReadCount);
                })
                .catch(error => {
                    console.log('DEBUG: Add like post request failed.', error);
                });
        });
    }

    goToMyId = () => {
        this.props.navigation.closeDrawer();
        this.props.navigation.navigate('MyIdScreen', { refreshMyId: true });
    };

    goToBusinessCard = () => {
        this.props.navigation.closeDrawer();
        this.props.navigation.navigate('MyBusinessCard', {
            refreshMyBussinessCard: true
        });
    };

    goToPortalIcons = () => {
        this.props.navigation.closeDrawer();
        this.props.navigation.navigate('PortalIcon', { refreshPortal: true });
    };

    goToExploreCourses = () => {
        this.props.navigation.closeDrawer();
        this.props.navigation.navigate('ExploreCourses', { INQUIRYEEE: 'test' });
    };

    goToNotification = () => {
        this.props.navigation.closeDrawer();
        this.props.navigation.navigate('NotificationScreen', {
            PUSH_NOTIFI_DATA: ''
        });
    };

    goToNews = () => {
        this.props.navigation.closeDrawer();
        this.props.navigation.navigate('NewsScreen', { refreshNews: true });
    };

    goToPosts = () => {
        this.props.navigation.closeDrawer();
        this.props.navigation.navigate('PostScreen', { refreshPost: true });
    };

    goToJobPosts = () => {
        this.props.navigation.closeDrawer();
        this.props.navigation.navigate('JobPostHomeScreen', {
            refreshJobPost: true
        });
    };

    goToAboutUs = () => {
        this.props.navigation.closeDrawer();
        this.props.navigation.navigate('AboutUsScreen', { refreshAbout: true });
    };

    goToSettings = () => {
        this.props.navigation.closeDrawer();
        this.props.navigation.navigate('SettingScreen', {
            refreshSetting: true
        });
    };

    goToLogOut = () => {
        this.props.navigation.closeDrawer();
        Alert.alert(
            'Log out',
            'Are you sure you want to log out?',
            [
                { text: 'Log out', onPress: () => this.onPressLogout() },
                { text: 'Cancel', onPress: () => {} }
            ],
            { cancelable: false }
        );
    };

    onPressLogout = () => {
        var context = this;
        DefaultPreference.get('user_data').then(function(user_data) {
            var jsonUserData = JSON.parse(user_data);
            jsonUserData.passcodeResetComplete = false;
            DefaultPreference.set(
                'user_data',
                JSON.stringify(jsonUserData)
            ).then(function() {
                context.props.navigation.navigate('StartNavigator');
            });
        });
    };

    render() {
        let showBussinessCard = true;

        if (Number(this.state.userTypeID) === 1) {
            showBussinessCard = false;
        }

        return (
            <SafeAreaView style={styles.container}>
                <ScrollView contentContainerStyle={styles.scrollView}>
                    <Text style={styles.menuText}>Menu</Text>
                    <View style={styles.menuSeparator} />
                    <TouchableOpacity
                        style={styles.drawerItem}
                        onPress={this.goToMyId}>
                        <View
                            style={[
                                styles.itemIconContainer,
                                {
                                    backgroundColor: Colors.TINT_PINK_COLOR
                                }
                            ]}>
                            <Image
                                resizeMode="contain"
                                source={ICONS.MY_ID}
                                style={styles.itemIcon}
                            />
                        </View>
                        <Text style={styles.itemText}>MY ID</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.drawerItem}
                        onPress={this.goToPortalIcons}>
                        <View
                            style={[
                                styles.itemIconContainer,
                                {
                                    backgroundColor: Colors.TINT_PINK_COLOR
                                }
                            ]}>
                            <Image
                                resizeMode="contain"
                                source={ICONS.PORTAL}
                                style={styles.itemIcon}
                            />
                        </View>
                        <Text style={styles.itemText}>Portal Icons</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.drawerItem}
                        onPress={this.goToExploreCourses}>
                        <View
                            style={[
                                styles.itemIconContainer,
                                {
                                    backgroundColor: Colors.TINT_PINK_COLOR
                                }
                            ]}>
                            <Image
                                resizeMode="contain"
                                source={ICONS.EXPLORE_COURSES}
                                style={styles.itemIcon}
                            />
                        </View>
                        <Text style={styles.itemText}>Explore Courses</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.drawerItem}
                        onPress={this.goToNotification}>
                        <View
                            style={[
                                styles.itemIconContainer,
                                {
                                    backgroundColor: Colors.TINT_PINK_COLOR
                                }
                            ]}>
                            <Image
                                resizeMode="contain"
                                source={ICONS.NOTIFY}
                                style={styles.itemIcon}
                            />
                        </View>
                        <Text style={styles.itemText}>Notifications</Text>
                        {this.state.notificationCount &&
                        this.state.notificationCount > 0 ? (
                            <View style={styles.countItem}>
                                <Text style={styles.countText}>
                                    {this.state.notificationCount > 999
                                        ? '999+'
                                        : this.state.notificationCount}
                                </Text>
                            </View>
                        ) : null}
                    </TouchableOpacity>

                    <View style={styles.itemSeparator} />

                    <TouchableOpacity
                        style={styles.drawerItem}
                        onPress={this.goToNews}>
                        <View
                            style={[
                                styles.itemIconContainer,
                                {
                                    backgroundColor: Colors.TINT_BLUE_COLOR
                                }
                            ]}>
                            <Image
                                resizeMode="contain"
                                source={ICONS.NEWS}
                                style={styles.itemIcon}
                            />
                        </View>
                        <Text style={styles.itemText}>News</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.drawerItem}
                        onPress={this.goToPosts}>
                        <View
                            style={[
                                styles.itemIconContainer,
                                {
                                    backgroundColor: Colors.TINT_BLUE_COLOR
                                }
                            ]}>
                            <Image
                                resizeMode="contain"
                                source={ICONS.POST}
                                style={styles.itemIcon}
                            />
                        </View>
                        <Text style={styles.itemText}>Post</Text>
                        {this.state.postCount && this.state.postCount > 0 ? (
                            <View style={styles.countItem}>
                                <Text style={styles.countText}>
                                    {this.state.postCount > 999
                                        ? '999+'
                                        : this.state.postCount}
                                </Text>
                            </View>
                        ) : null}
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.drawerItem}
                        onPress={this.goToJobPosts}>
                        <View
                            style={[
                                styles.itemIconContainer,
                                {
                                    backgroundColor: Colors.TINT_BLUE_COLOR
                                }
                            ]}>
                            <Image
                                resizeMode="contain"
                                source={ICONS.JOB_POST}
                                style={styles.itemIcon}
                            />
                        </View>
                        <Text style={styles.itemText}>Job Posts</Text>
                    </TouchableOpacity>

                    {showBussinessCard ? (
                        <TouchableOpacity
                            style={styles.drawerItem}
                            onPress={this.goToBusinessCard}>
                            <View
                                style={[
                                    styles.itemIconContainer,
                                    {
                                        backgroundColor: Colors.TINT_BLUE_COLOR
                                    }
                                ]}>
                                <AntIcons
                                    name="idcard"
                                    size={16}
                                    color={Colors.WHITE_COLOR}
                                />
                            </View>
                            <Text style={styles.itemText}>Business Card</Text>
                        </TouchableOpacity>
                    ) : null}

                    <View style={styles.itemSeparator} />

                    <TouchableOpacity
                        style={styles.drawerItem}
                        onPress={this.goToAboutUs}>
                        <View
                            style={[
                                styles.itemIconContainer,
                                {
                                    backgroundColor: Colors.TINT_COLOR
                                }
                            ]}>
                            <Image
                                resizeMode="contain"
                                source={ICONS.ABOUT_US}
                                style={styles.itemIcon}
                            />
                        </View>
                        <Text style={styles.itemText}>About Us</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.drawerItem}
                        onPress={this.goToSettings}>
                        <View
                            style={[
                                styles.itemIconContainer,
                                {
                                    backgroundColor: Colors.TINT_COLOR
                                }
                            ]}>
                            <Image
                                resizeMode="contain"
                                source={ICONS.EDIT_PROFILE}
                                style={styles.itemIcon}
                            />
                        </View>
                        <Text style={styles.itemText}>Edit Profile</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.drawerItem}
                        onPress={this.goToLogOut}>
                        <View
                            style={[
                                styles.itemIconContainer,
                                {
                                    backgroundColor: Colors.TINT_COLOR
                                }
                            ]}>
                            <Image
                                resizeMode="contain"
                                source={ICONS.LOGOUT}
                                style={styles.itemIcon}
                            />
                        </View>
                        <Text style={styles.itemText}>Log Out</Text>
                    </TouchableOpacity>
                </ScrollView>
            </SafeAreaView>
        );
    }
}

export default App;

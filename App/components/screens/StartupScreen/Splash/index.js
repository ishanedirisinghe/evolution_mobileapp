/* eslint-disable no-alert */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable eqeqeq */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { Component, useState } from 'react';
import {
  View,
  Text,
  Image,
  SafeAreaView,
  TouchableOpacity,
  Linking,
  Platform,
  Alert,
  AppState,
} from 'react-native';
import DefaultPreference from 'react-native-default-preference';
import messaging from '@react-native-firebase/messaging';
import Spinner from 'react-native-loading-spinner-overlay';

import styles from './styles';
import { showMessage } from 'react-native-flash-message';

import Carousel from 'react-native-looped-carousel';
import { Colors, hexToRgb, scale } from '../../../../styles';
import { ContainedButton } from '../../uiElements/Button';
import checkVersion from 'react-native-store-version';
import deviceInfoModule from 'react-native-device-info';
import LinearGradient from 'react-native-linear-gradient';

var unreadCount = 0;

const ICONS = {
  ARROW: require('../../../../assets/images/arrow_right.png'),
  STUDENT_PORTAL: require('../../../../assets/images/portal_icons/student_portal.png'),
};

class StartScreen extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      isUserLogin: false,
      pushNotificationData: '',
      isLogged: false,
      visible: true,
      showScreenLoading: false,
      scrollEnabled: true,
      page: 0,
      pages: [],
    };
    unreadCount = 0;

  }

  setCarouselRef = ref => {
    this.carousel = ref;
  };

  componentDidMount() {

  this.props.navigation.addListener('didFocus', () => {});

  Linking.addEventListener('url', this.handleOpenURL);

  setTimeout(() => {
    this.getNewsData();
  }, 2000);

  this.checkUserAlreadyLogin();

  // this.createNotificationChannel();
  this.checkPermission();
  this.createNotificationListeners();
  AppState.addEventListener('change', this._handleAppStateChange);

  }

  componentWillUnmount() {
    Linking.removeEventListener('url', this.handleOpenURL);
    AppState.removeEventListener('change', this._handleAppStateChange);

    // this.notificationListener();
    // this.notificationOpenedListener();

    // this.messageListener();
    // this.unsubscribeFromNotificationListener();
  }

  _handleAppStateChange = nextState => {
    if (nextState === 'active') {
      this.checkAppUpdate();
    }
  };

  checkUserAlreadyLogin() {
    var context = this;
    DefaultPreference.get('user_data').then(function (value) {
      if (value) {
        let jsonData = JSON.parse(value);
        if (jsonData.passcodeResetComplete != undefined) {
          context.setState({ isUserLogin: true });
          console.log('is_user_login', this.state.isUserLogin);
        } else {
          context.setState({ isUserLogin: false });
          console.log('is_user_login', this.state.isUserLogin);
        }
      } else {
        context.setState({ isUserLogin: false });
        console.log('is_user_login', this.state.isUserLogin);
      }
    });

  }

  checkAppUpdate = async () => {
    const version = deviceInfoModule.getVersion();

    try {
      const check = await checkVersion({
        version,
        // iosStoreURL:
        //   'https://apps.apple.com/au/app/evolution-australia/id1521677056?mt=8',
        iosStoreURL:
        'https://apps.apple.com/au/app/evolution-australia/id1521677056',
        androidStoreURL:
          'https://play.google.com/store/apps/details?id=com.evolution.myid',
          country: "AU"
      });

      if (check.result === 'new') {
        setTimeout(() => {
          console.log('new - App version', check.remote);
          this.updateAppNotice();
        }, 2000);
      } else if (check.result === 'old') {
        //console.log('remote version', check.remote);
        console.log('old - App version', check.remote);
        setTimeout(() => {
          this.updateAppNotice();
        }, 2000);
      } else {
        console.log('equal - app version updated', check.remote);
      }
    } catch (e) {
      console.log('App store version check error', e.message);
    }
  };

  updateAppNotice = () => {
    const APP_STORE_LINK =
      'itms-apps://itunes.apple.com/au/app/apple-store/1521677056?mt=8';
    const PLAY_STORE_LINK = 'market://details?id=com.evolution.myid';
    Alert.alert(
      'Update Available',
      'Please Update app from the ' +
      (Platform.OS == 'ios' ? 'app store' : 'play store') +
      '.',
      [
        {
          text: 'Update Now',
          onPress: () => {
            if (Platform.OS == 'ios') {
              Linking.openURL(APP_STORE_LINK).catch(err =>
                console.error('An error occurred', err),
              );
            } else {
              Linking.openURL(PLAY_STORE_LINK).catch(err =>
                console.error('An error occurred', err),
              );
            }
          },
        },
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
        },
      ],
    );
  };

  btnPress() {
    //this.props.navigation.navigate('ResetPassword')
    var context = this;
    var navigation = context.props.navigation;
    // DefaultPreference.clear('user_data')
    //  alert(imageWidth)
    DefaultPreference.get('user_data').then(function (value) {
      if (value) {
        let jsonData = JSON.parse(value);
        if (jsonData.passcodeResetComplete != undefined) {
          if (
            context.state.pushNotificationData &&
            context.state.pushNotificationData.MsgID
          ) {
            console.log(
              'PUSHHHHH __________________OPEN 222_1 :',
              context.state.pushNotificationData || '',
            );
            navigation.navigate('PasscodeLogin', {
              PUSH_NOTIFI_DATA: context.state.pushNotificationData,
            });
          } else {
            // navigation.navigate("PasscodeLogin", { PUSH_NOTIFI_DATA: "" }); //cj
            navigation.navigate('Carousel', {
              TYPE: 'PasscodeLogin',
            }); //cj
            // CarouselScreen
          }
        } else {
          // navigation.navigate('LoginScreen'); //cj
          navigation.navigate('Carousel', { TYPE: 'LoginScreen' }); //cj
        }
      } else {
        // navigation.navigate('LoginScreen'); //cj
        navigation.navigate('Carousel', { TYPE: 'LoginScreen' }); //cj
      }
    });
  }

  handleOpenURL(event) {
    console.log(event.url);
    const route = event.url.replace(/.*?:\/\//g, '');
    console.log(route);
    alert(route.split('=')[1]);
    if (route.split('=')[1] != '') {
      this.props.dispatch(resetPasswordValidate(route.split('=')[1]));
    }

    // do something with the url, in our case navigate(route)
  }

  checkPermission = async () => {
    try {
      const enabled = await messaging().hasPermission();
      if (enabled) {
        this.getFcmToken();
        //console.log("CheckPermission Done ",);
      } else {
        this.requestPermission();
        //console.log("CheckPermission Request ",);
      }
    } catch (error) {
      console.log('Chec permission error happen :', error);
    }
  };

  getFcmToken = async () => {
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
      console.log('FIREBASE TOKEN: ', fcmToken);
      DefaultPreference.set('firebase_token', fcmToken).then(function () {
        console.log('FIREBASE TOKEN SAVE DONE');
      });
    } else {
      console.log('Failed', 'No firebase token received');
    }
  };

  requestPermission = async () => {
    try {
      await
        messaging()
          .requestPermission()
          .then(() => {
            this.getFcmToken();
          });
      // User has authorised
    } catch (error) {
      // User has rejected permissions
      console.log('User has rejected permissions :', error);
    }
  };

  createNotificationChannel = () => {
    // Build a android notification channel
    const channel = new messaging.notifications.Android.Channel(
      'evolution', // channelId
      'Evolution Australia', // channel name
      messaging().notifications.Android.Importance.High, // channel importance
    ).setDescription('Used for getting notification'); // channel description
    // Create the android notification channel
    messaging().notifications().android.createChannel(channel);
  };

  async createNotificationListeners() {
    /*
     * Triggered when a particular notification has been received in foreground
     * */
    this.notificationListener = messaging()
      .notifications()
      .onNotification(notification => {
        unreadCount = unreadCount + 1;
        console.log('unreadCount ------------- :', unreadCount);

        if (Platform.OS === 'android') {
          const localNotification = new firebase.notifications.Notification({
            sound: 'default',
            show_in_foreground: true,
          })
            .setNotificationId(notification.notificationId)
            .setTitle(notification.title)
            .setSubtitle(notification.subtitle)
            .setBody(notification.body)
            .setData(notification.data)
            .android.setAutoCancel(true)
            .android.setChannelId('evolution') // e.g. the id you chose above
            .android.setSmallIcon('@mipmap/ic_launcher_round') // create this icon in Android Studio
            .android.setColor('#000000') // you can set a color here
            .android.setPriority(messaging().notifications.Android.Priority.High);

          messaging()
            .notifications()
            .displayNotification(localNotification)
            .catch(err => console.error(err));
        } else if (Platform.OS === 'ios') {
          const localNotification = new messaging().notifications.Notification()
            .setNotificationId(notification.notificationId)
            .setTitle(notification.title)
            .setSubtitle(notification.subtitle)
            .setBody(notification.body)
            .setData(notification.data)
            .setSound('default')
            .ios.setBadge(notification.ios.badge);

          messaging()
            .notifications()
            .displayNotification(localNotification)
            .catch(err => console.error(err));
        }
      });

    //Android & IOS both => When user click on notification at foreground- get message Content
    this.notificationOpenedListener = messaging()
      .notifications()
      .onNotificationOpened(notificationOpen => {
        const { _body, data } =
          (notificationOpen && notificationOpen.notification) || {};
        console.log(
          'PUSH ------------------------------------------------------------------- :',
          data || '',
        );
        console.log('onPressing Notofication at Foreground :', data || '');
        // this.setState({ pushNotifiData: data })
        this.navigateScreenPushClick(data);
      });

    //Android & IOS both => Call Background & at Exit the app
    const notificationOpen = await messaging()
      .notifications()
      .getInitialNotification();
    if (notificationOpen) {
      const { _body, data } =
        (notificationOpen && notificationOpen.notification) || {};
      console.log(
        '3 notificationOpen Background :',
        notificationOpen.notification || '',
      );

      this.navigateScreenPushClick(data);
    } else {
      console.log('3 notificationOpen Background------');
    }

    // this.messageListener = firebase.messaging().onMessage((message) => {
    //   console.log("Finally Catch Comming Notification:");
    //   console.log(JSON.stringify(message));
    // });
  }

  navigateScreenPushClick(pushNotificationData) {
    console.log(
      'PUSHHHHH __________________OPEN :',
      pushNotificationData || '',
    );
    unreadCount = 0;
    var context = this;
    var navigation = context.props.navigation;

    DefaultPreference.get('user_data').then(function (value) {
      if (value) {
        let jsonData = JSON.parse(value);
        if (jsonData.passcodeResetComplete != undefined) {
          if (
            global.session &&
            global.session.access_token &&
            global.session.access_token != ''
          ) {
            if (
              pushNotificationData &&
              pushNotificationData.Type &&
              pushNotificationData.MsgID
            ) {
              if (
                pushNotificationData.Type == 'post' ||
                pushNotificationData.Type == 'Post'
              ) {
                navigation.navigate('PostScreen', {
                  PUSH_NOTIFI_DATA: pushNotificationData,
                });
              } else {
                navigation.navigate('NotificationScreen', {
                  PUSH_NOTIFI_DATA: pushNotificationData,
                });
              }
            } else {
              navigation.navigate('MyIdScreen', {
                user_data: false,
              });
            }
          } else {
            context.setState({
              pushNotificationData: pushNotificationData,
            });
          }
        } else {
          navigation.navigate('LoginScreen');
        }
      } else {
        navigation.navigate('LoginScreen');
      }
    });
  }

  getNewsData() {
    var context = this;

    let requestPath =
      global.API_ENDPOINT +
      '/api/ImageAPI/GetActiveSliderImages?isExternal=true';
    console.log('DEBUG: Get NEws request.', requestPath);

    context.setState({ showScreenLoading: true });
    fetch(requestPath, {
      method: 'GET',
    })
      .then(response => response.text())
      .then(result => {
        context.setState({ showScreenLoading: false });
        let resultJson = JSON.parse(result);
        console.log('DEBUG: Get Slider request success. ', resultJson);

        var dataList = resultJson && resultJson.length > 0 ? resultJson : [];
        context.setState({ pages: dataList });
      })
      .catch(error => {
        console.log('DEBUG: Get Slider request error. ', error);
        context.setState({ showScreenLoading: false });
        showMessage({
          message: 'Error',
          description:
            'Unknown server error. Please check your internet connection. Contact support if issue prevails.',
          type: 'danger',
        });
      });
  }

  onPressLearnMore = () => {
    if (this.state.pages && this.state.pages.length > 0) {
      var currentPage = this.carousel && this.carousel.getCurrentPage();
      var learnMoreURL = this.state.pages[currentPage].WebUrl;
      if (learnMoreURL && learnMoreURL != '') {
        Platform.OS === 'ios'
          ? this.props.navigation.navigate('PortalIconInfoScreenCarousel', {
            WEB_URL: learnMoreURL,
            TITLE: '',
          })
          : Linking.openURL(learnMoreURL);
      }
    }
  };

  // onPressPrevious = () => {
  // this.movePage(this.state.page - 1);
  // this.startTimer()
  // }

  // onPressNext = () => {
  // this.movePage(this.state.page + 1);
  // this.startTimer()
  // }

  onPressLogin = () => {
    var context = this;
    var navigation = context.props.navigation;

    // navigation.navigate("PasscodeLogin", { PUSH_NOTIFI_DATA: "" }); //cj
    DefaultPreference.get('user_data').then(function (value) {
      if (value) {
        let jsonData = JSON.parse(value);
        console.log('XXXXXXXXXXXXXXXXXXXXX ', jsonData);
        if (jsonData.passcodeResetComplete != undefined) {
          if (
            context.state.pushNotificationData &&
            context.state.pushNotificationData.MsgID
          ) {
            navigation.navigate('PasscodeLogin', {
              PUSH_NOTIFI_DATA: context.state.pushNotificationData,
            });
          } else {
            navigation.navigate('PasscodeLogin', {
              PUSH_NOTIFI_DATA: '',
            }); //cj
          }
        } else {
          navigation.navigate('LoginScreen');
        }
      } else {
        navigation.navigate('LoginScreen');
      }
    });
  };

  onPressJobs = async () => {
    var context = this;
    var navigation = context.props.navigation;
    // navigation.navigate('JobPost');
    navigation.navigate('Option');

    // const permission = await getNotificationBadgeSetting()
    // if (permission === 'enabled') {
    //   const badgeCount = await getBadgeCount()
    //   await setBadgeCount(badgeCount - 1)
    // } else {
    //   console.log("Badge permission has not yet been granted. I'll ask the user later")
    // }

    // setNotificationBadgeCount(12);
    // updateNotificationBadgeCount();

    // ShortcutBadge.setCount(3);

    // ShortcutBadge.getCount((count) => {
    //   console.log("Badge permission has not yet been granted....3333", count)
    //   ShortcutBadge.setCount(count - 1);
    //   console.log("Badge permission has not yet been granted....4444")
    // });
  };

  // movePage = (page) => {
  // if (this.state.animationsAreEnabled) {
  //   this.viewPager.current.setPage(page);
  // } else {
  //   this.viewPager.current.setPageWithoutAnimation(page);
  // }
  // };

  onPressShortCources = async () => {
    var context = this;
    var navigation = context.props.navigation;
   // navigation.navigate('ShortCourses');
    navigation.navigate('ShortCoursesRegister');
    
    // var context = this;
    // var navigation = context.props.navigation;
    // navigation.navigate('JobPost');
  };

  renderPage(page) {
    return (
      <View key={page.ImageID} style={styles.imageView}>
        <Image
          style={styles.image}
          source={{ uri: page.ImageUrl }}
          resizeMode="contain"
        />
      </View>
    );
  }

  render() {
    const { pages } = this.state;
    var context = this;

    return (
      <SafeAreaView style={styles.container}>
        <Spinner
          visible={this.state.showScreenLoading}
          textContent={'Loading...'}
        />
        <View style={styles.flex1}>
          <View style={styles.logoContainer}>
            <Image
              style={styles.logoImage}
              source={require('../../../../assets/images/evolution_logo.png')}
              resizeMode="contain"
            />
            <Text style={styles.logoText}>
              {'Evolution Hospitality\nInstitute'}
            </Text>
          </View>
          <Text style={styles.description}>
            {'Bringing 5-Star Education To The Hospitality Industry'}
          </Text>
          {pages && pages.length > 0 ? (
            <Carousel
              delay={6000}
              style={styles.viewPager}
              autoplay
              pageInfo={false}
              currentPage={0}
              bullets
              bulletsContainerStyle={{ marginBottom: scale(-45) }}
              bulletStyle={{
                height: 8,
                width: 8,
                backgroundColor: '#E5E5E5',
                margin: 4,
                borderRadius: 5,
              }}
              chosenBulletStyle={{
                height: 8,
                width: 8,
                backgroundColor: hexToRgb(Colors.TINT_PINK_COLOR, 0.34),
                margin: 4,
                borderRadius: 5,
              }}
              // onAnimateNextPage={(p) => console.log(p)}
              ref={this.setCarouselRef}>
              {pages.map(p => this.renderPage(p))}
            </Carousel>
          ) : (
            <View style={styles.viewPager} />
          )}
          <TouchableOpacity
            style={styles.learnMoreButton}
            onPress={this.onPressLearnMore}>
            <Text style={styles.learnMoreText}>{'LEARN MORE'}</Text>
          </TouchableOpacity>
          { this.state.isUserLogin == false ? 
          <View style={styles.courseBody}>
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            colors={[
                Colors.GRADIENT.GRADIENT_START,
                Colors.GRADIENT.GRADIENT_END
            ]}
            style={[styles.courseButtonLinerLayout]}>
            <TouchableOpacity
              activeOpacity={0.5}
              style={styles.courseButtonContainer}
              onPress={() => this.onPressShortCources()}>
              <View style={styles.courseButtonIconContainer}>
                <Image
                  source={ICONS.STUDENT_PORTAL}
                  style={{ width: 34, height: 43, tintColor: '#FFFFFF'}}
                />
              </View>
              <Text style={styles.courseButtonTextLabel} numberOfLines={2}>
                Register and explore Courses
              </Text>
              <Image source={ICONS.ARROW} style={styles.arrow} />
            </TouchableOpacity>
            </LinearGradient>
          </View>  : null }
          <View style={styles.actionContainer}>
            <ContainedButton
              style={styles.buttonContainer}
              onPress={() => this.onPressLogin()}
              label="LOGIN"
            />
            <ContainedButton
              style={styles.buttonContainer}
              onPress={() => this.onPressJobs()}
              label="JOBS"
            />
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

export default StartScreen;

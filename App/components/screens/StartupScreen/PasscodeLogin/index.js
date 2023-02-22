/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
import React, {Component} from 'react';
import DeviceInfo from 'react-native-device-info';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableOpacity,
} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import Spinner from 'react-native-loading-spinner-overlay';
import SMSVerifyCode from 'react-native-sms-verifycode';
import styles from './styles';
import DefaultPreference from 'react-native-default-preference';
import {Colors, scale} from '../../../../styles';
import {BottomBackButton} from '../../uiElements/Button';

class PasscodeLogin extends Component {
  fieldRef = React.createRef();
  constructor(props) {
    super(props);
    this.state = {
      loginsignupstate: 1,
      text: '',
      //password_confirm: '',
      pushNotifiData: '',
      spinner: false,
    };
  }

  componentDidMount() {
    var context = this;
    var navigation = context.props.navigation;

    const {PUSH_NOTIFI_DATA} = navigation.state.params;

    DefaultPreference.get('firebase_token').then(function (value) {
      if (PUSH_NOTIFI_DATA && PUSH_NOTIFI_DATA.MsgID) {
        context.setState({
          firebaseToken: value,
          pushNotifiData: PUSH_NOTIFI_DATA,
        });
      } else {
        context.setState({firebaseToken: value, pushNotifiData: ''});
      }
    });
  }

  onInputChangeText = text => {
    this.setState({text});

    this.setState({text}, () => {
      if (text.length === 6) {
        Keyboard.dismiss();
        this.onPressLogin();
      }
    });
  };

  blur = () => this.verifycode.blur();

  reset = () => this.verifycode.reset();

  bindRef = ref => {
    this.verifycode = ref;
  };

  // onInputChangeText = text => {
  //   this.setState({ text: text },
  //     () => {
  //       if (this.state.text.length >= 6) {
  //         this.onPressLogin();
  //         Keyboard.dismiss();
  //       }
  //     });

  // };

  onPressLogin() {
    this.setState({callFunction: true});
    this.onPressPasswordReset();
  }

  async onPressPasswordReset() {
    let {text} = this.state;
    console.log('DEBUG: Reset Passcode.', text);
    console.log(
      'Password:',
      text,
      //' - Confirm Passcode:',
      //password_confirm,
    );
    var navigation = this.props.navigation;
    // eslint-disable-next-line consistent-this
    var context = this;
    // eslint-disable-next-line eqeqeq
    if (!text || text.trim() == '') {
      console.log('DEBUG: Reset Passcode.');
      showMessage({
        message: 'Passcode',
        description: 'Please enter the passcode.',
        type: 'danger',
      });
      return;
    }

    console.log('Debug: Get user_data in reset Passcode');
    DefaultPreference.get('user_data').then(function (user_data) {
      var jsonUserData = JSON.parse(user_data);
      let devId = DeviceInfo.getUniqueId();

      console.log(
        'Debug: Get user_data in reset Passcode done',
        jsonUserData,
        'dev id:',
        devId,
      );

      // let requestPathStdInfo = global.API_ENDPOINT + '/api/AccountAPI/Login?' + 'passcode=' + text.trim() + '&DeviceID=' + devId;
      let requestPathStdInfo =
        global.API_ENDPOINT +
        '/api/AccountAPI/Login?' +
        'UserName=' +
        jsonUserData.eMail +
        '&passcode=' +
        text.trim() +
        '&DeviceID=' +
        devId;

      //let requestPathStdInfo='https://reqres.in/api/users?page=2&UserID='+jsonUserData.ID+'&passcode='+text.trim()+'&DeviceID='+devId
      console.log('DEBUG: Passcodelogin', requestPathStdInfo);
      context.setState({spinner: true});
      fetch(requestPathStdInfo, {
        method: 'GET',
      })
        .then(stdInfoResponse => stdInfoResponse.text())
        .then(stdInfoResponseTxt => {
          context.setState({spinner: false});
          // stdInfoResponseTxt='{ "ImageUrl": "sdsdsd", "IsPassWordReset": true, "ID": "0bf2fb0e-64fb-4d56-a36e-2b14d3bd65d2", "StudentID": "123123", "Name": "abcd", "Address": "100, adadad Rd", "Phone": "0774837837", "EnteredBy": "00000000-0000-0000-0000-000000000000", "EnteredOn": "0001-01-01T00:00:00", "eMail": "abcd@efb.lk", "StudentImageUploads": [], "AspNetUser": null }'
          console.log('DEBUG: Passcode login success. ', stdInfoResponseTxt);
          let jsonPasrsedData = JSON.parse(stdInfoResponseTxt);
          // eslint-disable-next-line eqeqeq

          if (jsonPasrsedData && jsonPasrsedData.Message) {
            context.setState({text: ''});
            context.reset();
            if (jsonPasrsedData.Message != '') {
              showMessage({
                message: 'Invalid Passcode',
                description: jsonPasrsedData.Message,
                type: 'danger',
              });
            } else {
              showMessage({
                message: 'Invalid Passcode',
                description: 'Please enter a valid passcode for this device.',
                type: 'danger',
              });
            }
          } else {
            global.session = jsonPasrsedData;
            context.submitFirebaseToken();
            // navigation.navigate('MyIdScreen', {
            //   user_data: false,
            // });
          }
        })
        .catch(error => {
          console.log(
            'Recall777-------------------------------------- ',
            context.state.callFunction,
          );
          if (context.state.callFunction) {
            context.setState({callFunction: false});
            console.log('Recall777--------------------------------------');
            context.onPressPasswordReset();
          } else {
            context.setState({spinner: false, text: ''});
            console.log('DEBUG:  Password reset request failed.', error);
            showMessage({
              message: 'Error',
              description:
                'Unknown server error. Please check your internet connection. Contact support if issue prevails.',
              type: 'danger',
            });
          }
        });
    });
  }

  async submitFirebaseToken() {
    var context = this;
    let {firebaseToken} = this.state;

    var navigation = this.props.navigation;
    console.log(
      'GET Firebase Token in Passcode Login ------------------------------',
      firebaseToken,
    );
    DefaultPreference.get('user_data').then(function (user_data) {
      var jsonUserData = JSON.parse(user_data);
      let devId = DeviceInfo.getUniqueId();
      let deviceType = Platform.OS === 'ios' ? 1 : 2;

      let requestPathFirebaseDetails =
        global.API_ENDPOINT +
        '/api/AccountAPI/SaveFirebaseDetais?token=' +
        firebaseToken +
        '&deviceType=' +
        deviceType;

      console.log('DEBUG: PostFirebaseDetails', requestPathFirebaseDetails);
      context.setState({spinner: true});

      fetch(requestPathFirebaseDetails, {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + global.session.access_token,
        },
      })
        .then(firebaseDetailsResponse => firebaseDetailsResponse.text())
        .then(firebaseDetailsResponseTxt => {
          context.setState({spinner: false});
          console.log(
            'DEBUG: PostFirebaseDetails SUCCESS. ',
            firebaseDetailsResponseTxt,
          );

          if (
            context.state.pushNotifiData &&
            context.state.pushNotifiData.MsgID
          ) {
            if (
              context.state.pushNotifiData.Type == 'post' ||
              context.state.pushNotifiData.Type == 'Post'
            ) {
              navigation.navigate('PostScreen', {
                PUSH_NOTIFI_DATA: context.state.pushNotifiData,
              });
            } else {
              navigation.navigate('NotificationScreen', {
                PUSH_NOTIFI_DATA: context.state.pushNotifiData,
              });
            }
          } else {
            navigation.navigate('MyIdScreen', {
              user_data: false,
            });
          }
        })
        .catch(error => {
          context.setState({spinner: false});
          console.log('DEBUG: PostFirebaseDetails FAILED.', error);

          navigation.navigate('MyIdScreen', {
            user_data: false,
          });
        });
    });
  }

  changeLoginSignUpState() {
    // eslint-disable-next-line eqeqeq
    if (this.state.loginsignupstate == 1) {
      this.setState({loginsignupstate: 2});
    } else {
      this.setState({loginsignupstate: 1});
    }
  }

  getForgotPassword() {
    var context = this;

    DefaultPreference.get('user_data').then(function (user_data) {
      var jsonUserData = JSON.parse(user_data);
      let requestPath =
        global.API_ENDPOINT +
        '/API/AccountAPI/SendPasscodeReset?StudentID=' +
        jsonUserData.StudentID;
      console.log('DEBUG: Get Forgot Password request.', requestPath);

      context.setState({spinner: true});
      fetch(requestPath, {
        method: 'POST',
      })
        .then(response => response.text())
        .then(result => {
          context.setState({spinner: false});
          let resultJson = JSON.parse(result);
          console.log(
            'DEBUG: Get Forgot Password request success. ',
            resultJson,
          );

          showMessage({
            message: 'Success',
            description:
              'We sent you an email with instructions to reset your passcode.',
            type: 'success',
          });
        })
        .catch(error => {
          console.log('DEBUG: Get Forgot Password request error. ', error);
          context.setState({spinner: false});
          showMessage({
            message: 'Error',
            description:
              'Unknown server error. Please check your internet connection. Contact support if issue prevails.',
            type: 'danger',
          });
        });
    });
  }

  render() {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        style={{flex: 1}}>
        <SafeAreaView style={styles.container}>
          <Spinner visible={this.state.spinner} textContent={'Loading...'} />
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <Text style={styles.title}>Login With Passcode</Text>
            <Text style={styles.description}>
              {'Please enter your\npasscode for easy login'}
            </Text>
            <View style={styles.otpContainer}>
              <View style={styles.otpSecureView}>
                <View
                  style={{
                    ...styles.otpSecureViewItem,
                    backgroundColor:
                      this.state.text && this.state.text.length > 0
                        ? Colors.TINT_PINK_COLOR
                        : Colors.TRANSPARENT,
                  }}
                />
                <View
                  style={{
                    ...styles.otpSecureViewItem,
                    backgroundColor:
                      this.state.text && this.state.text.length > 1
                        ? Colors.TINT_PINK_COLOR
                        : Colors.TRANSPARENT,
                  }}
                />
                <View
                  style={{
                    ...styles.otpSecureViewItem,
                    backgroundColor:
                      this.state.text && this.state.text.length > 2
                        ? Colors.TINT_PINK_COLOR
                        : Colors.TRANSPARENT,
                  }}
                />
                <View
                  style={{
                    ...styles.otpSecureViewItem,
                    backgroundColor:
                      this.state.text && this.state.text.length > 3
                        ? Colors.TINT_PINK_COLOR
                        : Colors.TRANSPARENT,
                  }}
                />
                <View
                  style={{
                    ...styles.otpSecureViewItem,
                    backgroundColor:
                      this.state.text && this.state.text.length > 4
                        ? Colors.TINT_PINK_COLOR
                        : Colors.TRANSPARENT,
                  }}
                />
                <View
                  style={{
                    ...styles.otpSecureViewItem,
                    backgroundColor:
                      this.state.text && this.state.text.length > 5
                        ? Colors.TINT_PINK_COLOR
                        : Colors.TRANSPARENT,
                  }}
                />
              </View>
              <SMSVerifyCode
                ref={this.bindRef}
                autoFocus
                verifyCodeLength={6}
                containerPaddingVertical={0}
                containerPaddingLeft={scale(120)}
                containerPaddingRight={scale(120)}
                codeViewBorderColor={Colors.TINT_PINK_COLOR}
                focusedCodeViewBorderColor={Colors.TINT_PINK_COLOR}
                codeViewWidth={scale(15)}
                codeViewHeight={scale(15)}
                codeViewBorderWidth={1}
                codeViewBorderRadius={scale(15) / 2}
                codeViewBackgroundColor={Colors.TRANSPARENT}
                containerBackgroundColor={Colors.TRANSPARENT}
                coverColor={Colors.TINT_PINK_COLOR}
                codeFontSize={1}
                onInputCompleted={this.onInputCompleted}
                onInputChangeText={this.onInputChangeText}
              />
            </View>
            <TouchableOpacity
              style={styles.forgotPasscodeButton}
              onPress={() => this.getForgotPassword()}>
              <Text style={styles.forgotPasscodeText}>Forgot Passcode</Text>
            </TouchableOpacity>
          </ScrollView>
          <View style={styles.backContainer}>
            <BottomBackButton onPress={() => this.props.navigation.goBack()} />
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    );
  }
}

export default PasscodeLogin;

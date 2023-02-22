/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Linking,
  Alert,
  AppState,
} from 'react-native';
import DefaultPreference from 'react-native-default-preference';
import {showMessage} from 'react-native-flash-message';
import moment from 'moment';
import HamNavigationHeader from '../../uiElements/HamNavigationHeader';
import styles from './styles';
import Ionicon from 'react-native-vector-icons/Ionicons';
import {Colors, scale} from '../../../../styles';
import QRCode from 'react-native-qrcode-svg';
import checkVersion from 'react-native-store-version';
import deviceInfoModule from 'react-native-device-info';

class Search extends Component {
  fieldRef = React.createRef();

  constructor(props) {
    super(props);
    this.state = {
      isLogged: false,
      visible: true,
      firstName: '',
      lastName: '',
      mobile: '',
      address: '',
      profileImageUrl: '',
      studentId: '',
      email: '',
      DateOfExpire: '',
      relCount: 0,
      IsExpire: false,
      IsInactive: false,
      SignInBlock: false,
      isBarCodeHidden: true,
    };
  }

  componentDidMount() {
    this.setState({callFunction: true});
    this.updateData();
    this.props.navigation.addListener('didFocus', () => {
      this.setState({callFunction: true});
      this.updateData();
    });
    AppState.addEventListener('change', this._handleAppStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  _handleAppStateChange = nextState => {
    if (nextState === 'active') {
      this.checkAppUpdate();
    }
  };

  checkAppUpdate = async () => {
    const version = deviceInfoModule.getVersion();

    try {
      const check = await checkVersion({
        version,
        iosStoreURL:
          'https://apps.apple.com/au/app/evolution-australia/id1521677056?mt=8',
        androidStoreURL:
          'https://play.google.com/store/apps/details?id=com.evolution.myid',
      });

      if (check.result === 'new') {
        setTimeout(() => {
          this.updateAppNotice();
        }, 2000);
      } else if (check.result === 'old') {
        console.log('old - App version');
        setTimeout(() => {
          this.updateAppNotice();
        }, 2000);
      } else {
        console.log('equal - app version updated');
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

  updateData() {
    console.log('updateData-----------------------------------------');
    this.generateBarcodeDateTime();

    var context = this;
    this.setState({relCount: 1});
    const user_data = this.props.navigation.getParam('user_data', false);
    context.setState({spinner: true});
    if (user_data) {
      let resultJson = JSON.parse(user_data);
      this.setState({
        userType: resultJson.StudentTypeName,
        firstName: resultJson.FirstName,
        lastName: resultJson.LastName,
        mobile: resultJson.Phone,
        address: resultJson.Address,
        barcode: resultJson.StudentID,
        profileImageUrl: resultJson.ImageUrl,
        studentId: resultJson.StudentID,
        email: resultJson.eMail,
        IsExpire: resultJson.IsExpire,
        IsInactive: resultJson.IsInactive,
        SignInBlock: resultJson.SignInBlock,
        DateOfExpire: resultJson.sDateOfExpire,
      });
      console.log('DEBUG: MyID navigation data received', resultJson);
      context.setState({spinner: false});
    } else {
      context.setState({spinner: true});
      let requestPath = global.API_ENDPOINT + '/api/StudentAPI/GetStudentInfo';
      console.log('DEBUG: GetStudentInfo', requestPath);
      fetch(requestPath, {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + global.session.access_token,
        },
      })
        .then(response => response.text())
        .then(result => {
          context.setState({spinner: false});
          console.log('DEBUG: GetStudentInfo request success. ', result);

          var resultJson = JSON.parse(result);
          resultJson.passcodeResetComplete = true;
          DefaultPreference.set('user_data', JSON.stringify(resultJson)).then(
            function () {
              console.log('Update USER INFO OBJ', resultJson);
            },
          );

          this.setState({
            userType: resultJson.StudentTypeName,
            firstName: resultJson.FirstName,
            lastName: resultJson.LastName,
            mobile: resultJson.Phone,
            address: resultJson.Address,
            barcode: resultJson.StudentID,
            profileImageUrl: resultJson.ImageUrl,
            studentId: resultJson.StudentID,
            email: resultJson.eMail,
            IsExpire: resultJson.IsExpire,
            IsInactive: resultJson.IsInactive,
            SignInBlock: resultJson.SignInBlock,
            DateOfExpire: resultJson.sDateOfExpire,
          });
        })
        .catch(error => {
          if (context.state.callFunction) {
            context.setState({callFunction: false});
            console.log('Recal MY id --------------------------------------');
            context.updateData();
          } else {
            context.setState({spinner: false});
            console.log('DEBUG: GetStudentInfo request failed.', error);
            showMessage({
              message: 'Error',
              description:
                'Unknown server error. Please check your internet connection. Contact support if issue prevails.',
              type: 'danger',
            });
          }
        });
    }
  }

  refreshDataFromServer = () => {
    var context = this;
    this.setState({relCount: 1});
    context.setState({spinner: true});
    let requestPath = global.API_ENDPOINT + '/api/StudentAPI/GetStudentInfo';
    console.log('DEBUG: GetStudentInfo', requestPath);
    fetch(requestPath, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + global.session.access_token,
      },
    })
      .then(response => response.text())
      .then(result => {
        context.setState({spinner: false});
        console.log('DEBUG: GetStudentInfo request success. ', result);

        var resultJson = JSON.parse(result);
        resultJson.passcodeResetComplete = true;
        DefaultPreference.set('user_data', JSON.stringify(resultJson)).then(
          function () {
            console.log('Update USER INFO OBJ', resultJson);
          },
        );

        this.setState(
          {
            userType: resultJson.StudentTypeName,
            firstName: resultJson.FirstName,
            lastName: resultJson.LastName,
            mobile: resultJson.Phone,
            address: resultJson.Address,
            barcode: resultJson.StudentID,
            profileImageUrl: resultJson.ImageUrl,
            studentId: resultJson.StudentID,
            email: resultJson.eMail,
            IsExpire: resultJson.IsExpire,
            IsInactive: resultJson.IsInactive,
            SignInBlock: resultJson.SignInBlock,
            DateOfExpire: resultJson.sDateOfExpire,
          },
          () => {
            this.generateBarcodeDateTime();
          },
        );
      })
      .catch(error => {
        if (context.state.callFunction) {
          context.setState({callFunction: false});
          console.log('Recal MY id --------------------------------------');
          context.updateData();
        } else {
          context.setState({spinner: false});
          console.log('DEBUG: GetStudentInfo request failed.', error);
          showMessage({
            message: 'Error',
            description:
              'Unknown server error. Please check your internet connection. Contact support if issue prevails.',
            type: 'danger',
          });
        }
      });
  };

  generateBarcodeDateTime = () => {
    var dateTime = moment().format('DD-hh:mm:ssA');
    // 25-01:36:27PM

    if (this.state.isBarCodeHidden) {
      this.setState({
        currentDateTime: dateTime,
        isBarCodeHidden: false,
      });

      setTimeout(() => {
        // console.log('------------------- Time out ---------------------- ');
        this.setState({isBarCodeHidden: true});
      }, 6000);
    } else {
      // this.setState({currentDateTime: dateTime});
    }
  };

  render() {
    const barcodeNew = this.state.barcode
      ? `${this.state.barcode.valueOf()}-${this.state.currentDateTime}`
      : '';

    return (
      <SafeAreaView style={styles.container}>
        <HamNavigationHeader
          {...this.props}
          screenTitle={
            this.state.userType
              ? this.state.userType === 'Student' ||
                this.state.userType === 'student'
                ? 'Student ID'
                : 'Staff ID'
              : 'MY ID'
          }
        />
        <ScrollView>
          <View style={styles.formContainer}>
            <View style={styles.centerContainer}>
              <Image
                style={styles.logoImage}
                source={require('../../../../assets/images/evolution_logo.png')}
                resizeMode="contain"
              />
            </View>
            <View style={styles.avatarContainer}>
              <Image
                resizeMode="cover"
                style={[
                  styles.avatar,
                  {
                    borderBottomRightRadius:
                      this.state.IsExpire ||
                      this.state.IsInactive ||
                      this.state.SignInBlock
                        ? scale(20)
                        : 0,
                  },
                ]}
                source={{uri: this.state.profileImageUrl}}
              />
              <View style={styles.inactiveContainer}>
                {this.state.IsExpire && (
                  <View style={styles.inactiveView}>
                    <Text style={styles.inactiveText}>EXPIRED!</Text>
                  </View>
                )}
                {this.state.IsInactive && (
                  <View style={styles.inactiveView}>
                    <Text style={styles.inactiveText}>DEACTIVATED!</Text>
                  </View>
                )}
                {this.state.SignInBlock && (
                  <View style={styles.inactiveView}>
                    <Text style={styles.inactiveText}>
                      PLEASE CONTACT FINANCE DEPARTMENT!
                    </Text>
                  </View>
                )}
              </View>
            </View>
            <View style={styles.centerContainer}>
              <Text style={styles.fNameText}>{this.state.firstName}</Text>
              <Text style={styles.lNameText}>{this.state.lastName}</Text>
            </View>
            <View style={styles.detailCardContainer}>
              <View style={styles.detailsContainer}>
                <View style={styles.detailView}>
                  <Text style={styles.detailTitle}>
                    {this.state.userType
                      ? this.state.userType === 'Student' ||
                        this.state.userType === 'student'
                        ? 'Student ID'
                        : 'Staff ID'
                      : 'MY ID'}
                  </Text>
                  <Text style={styles.detailText}>{this.state.studentId}</Text>
                </View>
                <View style={styles.detailSeparator} />
                <View style={styles.detailView}>
                  <Text style={styles.detailTitle}>Expiry Date</Text>
                  <Text style={styles.detailText}>
                    {this.state.DateOfExpire}
                  </Text>
                </View>
              </View>
              <View>
                {this.state.IsExpire ||
                this.state.IsInactive ||
                this.state.SignInBlock ? null : (
                  <View style={styles.qrCodeView}>
                    <TouchableOpacity
                      activeOpacity={0.5}
                      disabled={!this.state.isBarCodeHidden}
                      onPress={this.refreshDataFromServer}
                      style={styles.qrCodeContainer}>
                      <View>
                        {this.state.barcode && !this.state.isBarCodeHidden ? (
                          <QRCode
                            color={Colors.BLACK_COLOR}
                            backgroundColor={Colors.WHITE_COLOR}
                            value={barcodeNew}
                            size={scale(114)}
                          />
                        ) : null}
                      </View>
                      {this.state.isBarCodeHidden ? (
                        <Ionicon
                          name="md-refresh"
                          color={Colors.TINT_PINK_COLOR}
                          size={40}
                        />
                      ) : null}
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </View>
            <View style={styles.emailDetailsContainer}>
              <View style={styles.emailDetailSeparator} />
              <View style={styles.detailView}>
                <Text style={styles.detailTitle}>E-mail</Text>
                <Text style={styles.detailText}>{this.state.email}</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default Search;

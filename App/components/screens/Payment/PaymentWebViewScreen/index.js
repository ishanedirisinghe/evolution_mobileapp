import React, {Component, useState} from 'react';
import {View, Dimensions, SafeAreaView} from 'react-native';
import {WebView} from 'react-native-webview';

import Spinner from 'react-native-loading-spinner-overlay';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const imageWidth = Dimensions.get('window').width;
import NavBarWithBack from '../../uiElements/NavBarWithBack';

import styles from './styles';
import NavigationHeader from '../../uiElements/NavigationHeader';
import DeviceInfo from 'react-native-device-info';
import { showMessage } from 'react-native-flash-message';
import DefaultPreference from 'react-native-default-preference';

class Search extends Component {
  fieldRef = React.createRef();

  constructor(props) {
    super(props);
    var userData = props.navigation.state.params.userData_value;
    const is_main_view = this.props.navigation.getParam('IS_MAIN_VIEW', '');
    this.state = {
      is_main_view: is_main_view,
      userData: userData,
      spinner: false,
      count: 12,
      showScreenLoading: false,
    };

    //this.handlePaymentStatus = this.handlePaymentStatus.bind(this);
  }

  componentDidMount() {
    var context = this;
    const {WEB_URL} = this.props.navigation.state.params;
    const {TITLE} = this.props.navigation.state.params;
    this.setState({
     // web_url: 'https://applyonline.evolution.edu.au/jotform/hospitality/jotform_thanyou_page.php?axcelerate_id=14051099',
      web_url: WEB_URL,
      title: TITLE,
    });

    console.log('dddd___DDDD__DDD_DD_DD_D_D_', this.state.is_main_view);
  }

  componentDidUpdate() {}

  showSpinner() {
    console.log('Show Spinner');
    this.setState({spinner: true});
  }

  hideSpinner() {
    console.log('Hide Spinner');
    this.setState({spinner: false});
  }

  handlePaymentStatus(axcelerateID) {
    if (this.state.is_main_view == true) {
      setTimeout(() => {
        this.props.navigation.popToTop();
        var navigation = this.props.navigation;
        navigation.navigate('MyIdScreen', {
          user_data: false,
        });
      }, 8000);
    } else {
      this.handlePaymentPostStatus(axcelerateID);
    }
  }

  handlePaymentPostStatus(axcelerateID) {
    var context = this;

    this.showSpinner();
    let scStudentID = this.state.userData.SCStudentID;
    let devId = DeviceInfo.getUniqueId();
    let requestPath = global.API_ENDPOINT + '/API/CourseAPI/PostStatus';

    console.log('DEBUG: PostStatus', requestPath);
    console.log('DEBUG: PostStatus + data ', scStudentID, axcelerateID, devId);
    fetch(requestPath, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        SCStudentID: scStudentID,
        IsSucess: true,
        StudentID: axcelerateID,
        DeviceID: devId,
      }),
      // body: JSON.stringify({
      //   SCStudentID: 94,
      //   IsSucess: true,
      //   StudentID: 10042987,
      //   DeviceID: devId,
      // }),
    })
      .then(addPostCommentResponse => addPostCommentResponse.text())
      .then(result => {
        console.log('DEBUG: handle Payment Post Status', result);
        let resultJson = JSON.parse(result);
        if (resultJson && resultJson.Message && resultJson.Message != '') {
          this.hideSpinner();
          showMessage({
            message: 'Error',
            description: resultJson.Message,
            type: 'danger',
          });
        } else {
          context.setState({spinner: false});

          global.session = resultJson.tokenDetails.access_token;
          console.log('DEBUG: Token request success.', global.session);

          let userDataObject = JSON.stringify(resultJson.jsonStudent);
          console.log('User stringify', userDataObject);

          DefaultPreference.set('user_data', userDataObject).then(function () {});

          DefaultPreference.get('user_data').then(function (user_data) {
            console.log('User default Object -> ', user_data);
          });

          setTimeout(() => {
            this.props.navigation.navigate('PasscodeLogin', {});
          }, 3000);

        }
      })
      .catch(error => {
        this.hideSpinner();
        console.log('DEBUG: Add Short Course request failed.', error);
        showMessage({
          message: 'Error',
          description:
            'Unknown server error. Please check your internet connection. Contact support if issue prevails.',
          type: 'danger',
        });
      });
  }

  onShouldStartLoadWithRequest(navigator) {
    function handlePaymentStatus(axcelerateID) {
      var context = this;
      let courseCatID = 60;
      let requestPath =
        global.API_ENDPOINT +
        '/API/CourseAPI/PostStatus?SCStudentID=' +
        courseCatID +
        '&IsSucess=true&StudentNo=' +
        axcelerateID;
      console.log('DEBUG: URL ****', requestPath);

      // this.showSpinner()
      fetch(requestPath, {
        method: 'POST',
      })
        .then(response => response.text())
        .then(result => {
          // this.hideSpinner()
          let resultJson = JSON.parse(result);
          console.log('DEBUG: POST Save data success. ', resultJson);


          // this.forceUpdate();

          setTimeout(() => {
            console.log('new - App version');
            this.props.navigation.navigate('PaymnetSuccessScreen', {});
          }, 6000);
        })
        .catch(error => {
          //  this.hideSpinner();
          showMessage({
            message: 'Error',
            description:
              'Unknown server error. Please check your internet connection. Contact support if issue prevails.',
            type: 'danger',
          });
        });
    }

    if (navigator.url) {
      // console.log("payment url types true ", navigator.url);
      // let parts = navigator.url.split("?");
      // if (parts.includes('World')) {
      //     onsole.log(" split words -> ", parts);
      // }
      let redirectURL =
        'https://applyonline.evolution.edu.au/jotform/hospitality/jotform_thanyou_page.php?axcelerate_id=14051099';
      if (redirectURL.includes('axcelerate_id')) {
        console.log('payment url types true____', redirectURL);
        // console.log("userData_>>>>>>>>>", this.state.userData);
        let parts = redirectURL.split('?');
        if (parts.length > 0) {
          let splitIdString = parts[1];
          if (splitIdString.includes('axcelerate_id')) {
            let axcelerateID = splitIdString.split('=');
            console.log(' split words ->_>>>>>>>>>', axcelerateID[1]);
            handlePaymentStatus(axcelerateID[1]);
          }
        }
      }

      return true;
    } else {
      console.log('payment url types _false', navigator.url);
      return false;
    }
  }

  render() {
    return (
      <SafeAreaView style={styles.centerContainer}>
        <NavigationHeader {...this.props} screenTitle={this.state.title} />
        <View style={styles.flex1}>
          <Spinner visible={this.state.spinner} textContent={'Loading...'} />
          <WebView
            ref="webview"
            style={styles.webView}
            source={{uri: this.state.web_url}}
            onLoadStart={() => this.showSpinner()}
            onLoad={() => this.hideSpinner()}
            //onNavigationStateChange={this._onURLChanged.bind(this)}
            // onMessage={(event) => { this.onMessage(event) }}
          //  javaScriptEnabled={true}
          //  domStorageEnabled={true}
          //  injectedJavaScript={this.state.cookie}
            startInLoadingState={false}
            useWebKit={true}
            // onShouldStartLoadWithRequest={this.onShouldStartLoadWithRequest} //for iOS
            // onNavigationStateChange ={this.onShouldStartLoadWithRequest} // for android
            onNavigationStateChange={navState => {
              if (navState.url.includes('axcelerate_id')) {
                console.log('Words found');
                let parts = navState.url.split('?');
                if (parts.length > 0) {
                  let splitIdString = parts[1];
                  if (splitIdString.includes('axcelerate_id')) {
                    let axcelerateID = splitIdString.split('=');
                    console.log(' split words ->_>>>>>>>>>', axcelerateID[1]);
                    this.handlePaymentStatus(axcelerateID[1]);
                  }
                }
              }
            }}
          />
        </View>
      </SafeAreaView>
    );
  }
}

export default Search;

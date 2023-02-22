import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  SafeAreaView,
  FlatList,
  Linking,
  Platform,
  AppState,
  TouchableOpacity,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import styles from './styles';
import NavigationHeader from '../../../uiElements/NavigationHeader';
import { ContainedButton } from '../../../uiElements/Button';
import { showMessage } from 'react-native-flash-message';
import HTML from 'react-native-render-html';

class Search extends Component {
  fieldRef = React.createRef();

  constructor(props) {
    super(props);
    // this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    var course_cat_id = props.navigation.state.params.course_cat_id;
    var courseCatName = props.navigation.state.params.courseCatName;
    var userData = props.navigation.state.params.userData;
    this.state = {
      course_cat_id: course_cat_id,
      courseCatName: courseCatName,
      userData: userData,
      appState: AppState.currentState,
      isLogged: false,
      visible: true,
      showScreenLoading: false,
      pages: [],
    };
  }

  componentDidMount() {
    AppState.addEventListener('change', this._handleAppStateChange);
    this.getShortCourseList();
    this.props.navigation.addListener('didFocus', () => { });
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  _handleAppStateChange = nextAppState => {
    if (
      this.state.appState.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      // console.log('App has come to the foreground!')
    }
    this.setState({ appState: nextAppState });
  };

  onPressGoBack = () => {
    this.props.navigation.goBack();
  };

  getShortCourseList() {
    var context = this;

    let courseCatID = this.state.course_cat_id
    let requestPath =
      global.API_ENDPOINT + '/API/CourseAPI/GetCourseList?courseCatID=' + courseCatID;
      console.log('DEBUG: URL ****', requestPath);

    context.setState({ showScreenLoading: true });
    fetch(requestPath, {
      method: 'GET',
    })
      .then(response => response.text())
      .then(result => {
        context.setState({ showScreenLoading: false });
        let resultJson = JSON.parse(result);
        console.log('DEBUG: Get ShortCourse request success. ', resultJson);

        var dataList = resultJson && resultJson.length > 0 ? resultJson : [];
        context.setState({ pages: dataList });
      })
      .catch(error => {
        context.setState({ showScreenLoading: false });
        showMessage({
          message: 'Error',
          description:
            'Unknown server error. Please check your internet connection. Contact support if issue prevails.',
          type: 'danger',
        });
      });
  }

  onPressLearnMore = item => {
    var learnMoreURL = item.WebUrl;
    Platform.OS === 'ios'
      ? this.props.navigation.navigate('PortalIconInfoScreenCarousel', {
        WEB_URL: learnMoreURL,
        TITLE: 'Course Details',
      })
      : Linking.openURL(learnMoreURL);
  };

  renderImageView = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.listItemContainer}
        // onPress={() => this.onPressCoursesRegister(item)}
      >
        <View style={styles.headerContainer}>
          <Image style={styles.imageView} source={{uri: item.ImageUrl}} />
          <Text
            style={styles.courseTitleText}
            numberOfLines={2}
            ellipsizeMode="tail">
            {item.ShortCourseName + '  ' + item.CourseValue}
          </Text>
          {/* <Text style={styles.courseDescriptionText}>
            {item.ShortCourseDesc}
          </Text> */}
          <HTML
            containerStyle={styles.htmlContainer}
            html={item.ShortCourseDesc}
          />
          <ContainedButton
            style={styles.buttonContainer}
            onPress={() => this.onPressCoursesRegister(item)}
            label="Apply Now"
          />
        </View>
      </TouchableOpacity>
    );
  };

  onPressCoursesRegister = item => {
    // var context = this;
    // var navigation = context.props.navigation;
    // navigation.navigate('ShortCoursesRegister', {
    //   COURSESDATA: item,
    // });

    // var paymentURL = "https://www.jotform.com/221791414062450";
    // Platform.OS === 'ios'
    //     ? this.props.navigation.navigate(
    //           'PaymentWebViewScreen',
    //           {
    //               WEB_URL: paymentURL,
    //               TITLE: 'Course Registration'
    //           }
    //       )
    //     : Linking.openURL(paymentURL);

        var paymentURL = item.JotFormLink;

          this.props.navigation.navigate(
                  'PaymentWebViewScreen',
                  {
                      WEB_URL: paymentURL,
                      TITLE: 'Course Registration',
                      IS_MAIN_VIEW: false,
                      userData_value: this.state.userData

                  }
              )
  };

  render() {
    const { pages } = this.state;
    var context = this;
    var navigation = context.props.navigation;

    return (
      <SafeAreaView style={styles.container}>
        <NavigationHeader
          screenTitle={this.state.courseCatName}
          onPressBackButton={() => this.onPressGoBack()}
        />
        <View style={styles.flex1}>
          <Spinner
            visible={this.state.showScreenLoading}
            textContent={'Loading...'}
          />
          {/* <TouchableOpacity
            onPress={() => navigation.navigate('UserInfo')}>
            <Text style={{ alignSelf: 'center' }}>{'Load Stripe View'}</Text>
          </TouchableOpacity> */}
          <FlatList
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.listView}
            keyExtractor={item => String(item.ImageID)}
            data={pages}
            renderItem={this.renderImageView}
          />
        </View>
      </SafeAreaView>
    );
  }
}

export default Search;

import React, {Component} from 'react';
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
import {ContainedButton} from '../../../uiElements/Button';
import { showMessage } from 'react-native-flash-message';

class Search extends Component {
  fieldRef = React.createRef();

  constructor(props) {
    super(props);
    // this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    var paramsUserData = props.navigation.state.params.userRegisterObject;
    this.state = {
      coursesData: paramsUserData,
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
    this.props.navigation.addListener('didFocus', () => {});
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
    this.setState({appState: nextAppState});
  };

  onPressGoBack = () => {
    this.props.navigation.goBack();
  };

  getShortCourseList() {
    var context = this;

    console.log('DEBUG: Get ShortCourse List  _______A', this.state.coursesData);

    let requestPath =
      global.API_ENDPOINT + '/API/CourseAPI/GetCourseCategoryList';

    context.setState({showScreenLoading: true});
    fetch(requestPath, {
      method: 'GET',
    })
      .then(response => response.text())
      .then(result => {
        context.setState({showScreenLoading: false});
        let resultJson = JSON.parse(result);
        console.log('DEBUG: Get ShortCourse request success. ', resultJson);

        var dataList = resultJson && resultJson.length > 0 ? resultJson : [];
        context.setState({pages: dataList});
      })
      .catch(error => {
        context.setState({showScreenLoading: false});
        showMessage({
          message: 'Error',
          description:
            'Unknown server error. Please check your internet connection. Contact support if issue prevails.',
          type: 'danger',
        });
      });
  }

  renderImageView = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.GridViewContainer}
        onPress={() => this.onPressCoursesRegister(item)}>
        <View>
          <Text style={styles.GridViewTextLayout}> {item.CourseCatName} </Text>
        </View>
      </TouchableOpacity>
    );
  };

  onPressCoursesRegister = item => {
     this.props.navigation.navigate('ShortCourses', {
      course_cat_id: item.CourseCatID,
      courseCatName: item.CourseCatName,
      userData: this.state.coursesData,
    });


    // var paymentURL = 'https://www.daraz.lk/';

    // this.props.navigation.navigate('PaymentWebViewScreen', {
    //   WEB_URL: paymentURL,
    //   TITLE: 'Course Registration Test',
    // });

  };

  render() {
    const {pages} = this.state;
    var context = this;
    var navigation = context.props.navigation;
    const { coursesData } = this.state;

    return (
      <SafeAreaView style={styles.container}>
        <NavigationHeader
          screenTitle={'Course Category'}
          onPressBackButton={() => this.onPressGoBack()}
        />
        <Spinner
          visible={this.state.showScreenLoading}
          textContent={'Loading...'}
        />
        <View style={styles.container}>
          <FlatList
            data={pages}
            renderItem={this.renderImageView}
            numColumns={2}
          />
        </View>
      </SafeAreaView>
    );
  }
}

export default Search;

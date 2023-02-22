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
import {ContainedButton} from '../../../uiElements/Button';
import { showMessage } from 'react-native-flash-message';
import HamNavigationHeader from '../../../uiElements/HamNavigationHeader';

class Search extends Component {
  fieldRef = React.createRef();

  constructor(props) {
    super(props);
    this.state = {
      coursesData: '',
      appState: AppState.currentState,
      isLogged: false,
      visible: true,
      showScreenLoading: false,
      pages: [],
    };
  }

  componentDidMount() {
    AppState.addEventListener('change', this._handleAppStateChange);
    this.props.navigation.addListener('didFocus', () => {
        this.getShortCourseList();
    });

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
    //  this.props.navigation.navigate('ShortCourses', {
    //   course_cat_id: item.CourseCatID,
    //   userData: this.state.coursesData,
    // });


    this.props.navigation.navigate('MainCoursesListScreen', {
        category_Id: item.CourseCatID,
        courseCatName: item.CourseCatName
    });

  };

  render() {
    const {pages} = this.state;
    var context = this;

    return (
      <SafeAreaView style={styles.container}>
        <HamNavigationHeader {...this.props} screenTitle="Explore Courses" />
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

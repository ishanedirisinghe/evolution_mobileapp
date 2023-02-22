import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    Dimensions,
    SafeAreaView,
    FlatList,
    TouchableOpacity,
    Linking,
    Keyboard,
    BackHandler,
    TouchableWithoutFeedback,
    Platform
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { showMessage } from 'react-native-flash-message';
import styles from './styles';
import NavigationHeader from '../../../uiElements/NavigationHeader';
import { scale, Colors } from '../../../../../styles';
import { ContainedButton } from '../../../uiElements/Button';
import HTML from 'react-native-render-html';
const windowWidth = Dimensions.get('window').width;
const HTMLContentWidth = windowWidth - scale(80); // 20 ~ Horizontal Margin + 20 Horizontal Padding

const DismissKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        {' '}
        {children}
    </TouchableWithoutFeedback>
);

class Search extends Component {
  fieldRef = React.createRef();

  constructor(props) {
    super(props);
    const courseCategory_ID = this.props.navigation.getParam('category_Id', '');
    const courseCatName = this.props.navigation.getParam('courseCatName', '');
    this.state = {
      category_Id: courseCategory_ID,
      courseCatName: courseCatName,
      isLogged: false,
      visible: true,
      showScreenLoading: false,
      pages: [],
    };
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

  componentDidMount() {
    var context = this;

    this.getShortCourseList();
    // this.props.navigation.addListener('didFocus', () => {
    //   this.updateData();
    // });
  }

  componentWillMount() {
    BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }

  componentWillUnmount() {
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }

  handleBackButtonClick() {
    this.onPressGoBack();
    return true;
  }

  getShortCourseList() {
    var context = this;
    let courseCatID = this.state.category_Id;
    console.log('wwwwwwww_', this.state.category_Id);
    let requestPath =
      global.API_ENDPOINT +
      '/API/CourseAPI/GetCourseList?courseCatID=' +
      courseCatID;
    console.log('DEBUG: URL ****', requestPath);

    context.setState({showScreenLoading: true});
    fetch(requestPath, {
      method: 'GET',
    })
      .then(response => response.text())
      .then(result => {
        context.setState({showScreenLoading: false});
        let resultJson = JSON.parse(result);
        console.log('DEBUG: Get ShortCourse request success.___', resultJson);

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

  onPressLearnMore = item => {
    var learnMoreURL = item.WebUrl;
    Platform.OS === 'ios'
      ? this.props.navigation.navigate('PortalIconInfoScreenCarousel', {
          WEB_URL: learnMoreURL,
          TITLE: 'Course Details',
        })
      : Linking.openURL(learnMoreURL);
  };

  onPressGoBack = () => {
    // this.props.navigation.state.params.onGoBack(this.state.currentPostIndex, this.state.currentPost);
    this.props.navigation.goBack();
  };

  renderImageView = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.listItemContainer}
        //onPress={() => this.onPressCoursesRegister(item)}
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
    var paymentURL = item.JotFormLink;
    console.log('DEBUG: URL ****', paymentURL);
    this.props.navigation.navigate('PaymentWebViewScreen', {
      WEB_URL: paymentURL,
      TITLE: 'Course Registration',
      IS_MAIN_VIEW: true,
      userData_value: this.state.userData,
    });

    // const selCategorysss = this.props.navigation.getParam("userData_value", "");
    // const selCategory = this.props.navigation.getParam("IS_MAIN_VIEW", "");
  };

  render() {
    const {pages} = this.state;
    var context = this;

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

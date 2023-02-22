/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Image, View, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import {
  createDrawerNavigator,
  DrawerNavigatorItems,
} from 'react-navigation-drawer';
import Icon from 'react-native-vector-icons/AntDesign';

import DrawerBar from '../screens/uiElements/DrawerBar';

//import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import PropsTypes from 'prop-types';
// import { connect } from 'react-redux';

//StartupScreens
import PasscodeLogin from '../screens/StartupScreen/PasscodeLogin';
import LoginScreen from '../screens/StartupScreen/LoginScreen';
import SplashScreen from '../screens/StartupScreen/Splash';
import ResetPassword from '../screens/StartupScreen/ResetPassword';
import Passcode from '../screens/StartupScreen/Passcode';
import Option from '../screens/JobPosts/OptionScreen';
import EmployerType from '../screens/JobPosts/EmployerTypeScreen';
import JobPost from '../screens/JobPosts/JobPostScreen';
import JobPostDetail from '../screens/JobPosts/JobPostDetailScreen';
import MyJobPosts from '../screens/JobPosts/MyJobPosts';
import CreateJobPost from '../screens/JobPosts/CreateJobPostScreen';
import JobPostSummary from '../screens/JobPosts/JobPostSummaryScreen';
import JobPostLogin from '../screens/JobPosts/JobPostLogin';
import JobPostForgotPassword from '../screens/JobPosts/JobPostForgotPassword';
import CustomerDetail from '../screens/JobPosts/CustomerDetailScreen';
import ApplicantsList from '../screens/JobPosts/ApplicantsListScreen';
import ApplicantDetails from '../screens/JobPosts/ApplicantDetailsScreen';
import InquiryList from '../screens/JobPosts/InquiryListScreen';
import CreateInquiry from '../screens/JobPosts/CreateInquiryScreen';
import InquiryDetail from '../screens/JobPosts/InquiryDetailScreen';
import JobPostChangePassword from '../screens/JobPosts/JobPostChangePassword';
import PaymentScreen from '../screens/Payment/PaymentScreen';

//Setting
import SettingScreen from '../screens/Setting/SettingScreen';

//About us
import AboutUsScreen from '../screens/AboutUs/AboutUsScreen';

//News
import NewsScreen from '../screens/News/NewsScreen';

//Notification list
import NotificationScreen from '../screens/Notification/NotificationScreen';

//Portal icon
import MyBusinessCardScreen from '../screens/MyBusinessCardScreen';

//Portal icon
import PortalIconScreen from '../screens/PortalIcon/PortalIconScreen';

import PortalIconInfoScreen from '../screens/PortalIcon/PortalIconInfoScreen';

//MyIdScreen
import MyIdScreen from '../screens/MyId/MyIdScreen';
import { ScrollView } from 'react-native-gesture-handler';

//Job post home screens
import JobPostHomeScreen from '../screens/JobPostsHome/JobPostHomeScreen';
import JobPostHomeDetailScreen from '../screens/JobPostsHome/JobPostHomeDetailScreen';

//Posts
import PostScreen from '../screens/Post/PostScreen';
import PostDetailScreen from '../screens/Post/PostDetailScreen';
import MyPostScreen from '../screens/Post/MyPostScreen';
import CreatePostScreen from '../screens/Post/CreatePostScreen';

//Short Cources
import ShortCourses from '../screens/StartupScreen/ShortCourses/ShortCoursesListScreen';
import ShortCoursesRegister from '../screens/StartupScreen/ShortCourses/ShortCoursesRegisterScreen';
import CourseCategoryScreen from '../screens/StartupScreen/ShortCourses/CourseCategoryScreen';
import UserInfo from '../screens/UserInfo';

//Payment Success
import PaymnetSuccessScreen from '../screens/Payment/PaymentScreen/PaymnetSuccessScreen';

import PaymentWebViewScreen from '../screens/Payment/PaymentWebViewScreen';

import MainExploreCoursesScreen from '../screens/StartupScreen/ShortCourses/MainExploreCoursesScreen';
import MainCoursesListScreen from '../screens/StartupScreen/ShortCourses/MainCoursesListScreen';


const StartNavigator = createStackNavigator(
  {
    Splash: {
      screen: SplashScreen,
      navigationOptions: {
        header: () => null,
      },
    },

    PortalIconInfoScreenCarousel: {
      screen: PortalIconInfoScreen,
      navigationOptions: {
        header: () => null,
      },
    },

    LoginScreen: {
      screen: LoginScreen,
      navigationOptions: {
        header: () => null,
      },
    },
    ResetPassword: {
      screen: ResetPassword,
      navigationOptions: {
        header: () => null,
      },
    },
    PasscodeLogin: {
      screen: PasscodeLogin,
      navigationOptions: {
        header: () => null,
      },
    },
    Passcode: {
      screen: Passcode,
      navigationOptions: {
        header: () => null,
      },
    },
    Option: {
      screen: Option,
      navigationOptions: {
        header: () => null,
      },
    },
    EmployerType: {
      screen: EmployerType,
      navigationOptions: {
        header: () => null,
      },
    },
    JobPost: {
      screen: JobPost,
      navigationOptions: {
        header: () => null,
      },
    },
    JobPostDetail: {
      screen: JobPostDetail,
      navigationOptions: {
        header: () => null,
      },
    },
    MyJobPosts: {
      screen: MyJobPosts,
      navigationOptions: {
        header: () => null,
      },
    },
    CreateJobPost: {
      screen: CreateJobPost,
      navigationOptions: {
        header: () => null,
      },
    },
    JobPostSummary: {
      screen: JobPostSummary,
      navigationOptions: {
        header: () => null,
      },
    },
    JobPostLogin: {
      screen: JobPostLogin,
      navigationOptions: {
        header: () => null,
      },
    },
    JobPostForgotPassword: {
      screen: JobPostForgotPassword,
      navigationOptions: {
        header: () => null,
      },
    },
    CustomerDetail: {
      screen: CustomerDetail,
      navigationOptions: {
        header: () => null,
      },
    },
    ApplicantsList: {
      screen: ApplicantsList,
      navigationOptions: {
        header: () => null,
      },
    },
    ApplicantDetails: {
      screen: ApplicantDetails,
      navigationOptions: {
        header: () => null,
      },
    },
    InquiryList: {
      screen: InquiryList,
      navigationOptions: {
        header: () => null,
      },
    },
    CreateInquiry: {
      screen: CreateInquiry,
      navigationOptions: {
        header: () => null,
      },
    },
    InquiryDetail: {
      screen: InquiryDetail,
      navigationOptions: {
        header: () => null,
      },
    },
    JobPostChangePassword: {
      screen: JobPostChangePassword,
      navigationOptions: {
        header: () => null,
      },
    },
    ShortCourses: {
      screen: ShortCourses,
      navigationOptions: {
        header: () => null,
      },
    },
    ShortCoursesRegister: {
      screen: ShortCoursesRegister,
      navigationOptions: {
        header: () => null,
      },
    },
    CourseCategoryScreen: {
      screen: CourseCategoryScreen,
      navigationOptions: {
        header: () => null,
      },
    },
    UserInfo: {
      screen: UserInfo,
      navigationOptions: {
        header: () => null,
      },
    },
    PaymentScreen: {
      screen: PaymentScreen,
      navigationOptions: {
        header: () => null,
      },
    },
    PaymnetSuccessScreen: {
      screen: PaymnetSuccessScreen,
      navigationOptions: {
        header: () => null,
      },
    },
    PaymentWebViewScreen: {
      screen: PaymentWebViewScreen,
      navigationOptions: {
        header: () => null,
      },
    },
  },
  {
    navigationOptions: {
      headerStyle: {
        elevation: 0,
        shadowOpacity: 0,
      },
    },
    // transitionConfig: () => fromLeft(1000),
    // transitionConfig: () => fromLeft(1000)
  },
);

//qr screen navigations
const MyId = createStackNavigator({
  MyIdScreen: {
    screen: MyIdScreen,
    navigationOptions: {
      header: null,
    },
    navigatorStyle: {
      navBarHidden: true,
    },
  },
});

//Profile screen
const Setting = createStackNavigator({
  SettingScreen: {
    screen: SettingScreen,
    navigationOptions: {
      header: null,
    },
    navigatorStyle: {
      navBarHidden: true,
    },
  },
});

//About Us screen
const AboutUs = createStackNavigator({
  AboutUsScreen: {
    screen: AboutUsScreen,
    navigationOptions: {
      header: null,
    },
    navigatorStyle: {
      navBarHidden: true,
    },
  },
});

//News screen
const News = createStackNavigator({
  NewsScreen: {
    screen: NewsScreen,
    navigationOptions: {
      header: null,
    },
    navigatorStyle: {
      navBarHidden: true,
    },
  },
  PortalIconInfoScreenNews: {
    screen: PortalIconInfoScreen,
    navigationOptions: {
      header: null,
    },
    navigatorStyle: {
      navBarHidden: true,
    },
  },
});

//Posts screen
const PostStack = createStackNavigator({
  PostScreen: {
    screen: PostScreen,
    navigationOptions: {
      header: null,
    },
    navigatorStyle: {
      navBarHidden: true,
    },
  },
  PostDetailScreen: {
    screen: PostDetailScreen,
    navigationOptions: {
      header: () => null,
    },
    navigatorStyle: {
      navBarHidden: true,
    },
  },
  MyPostScreen: {
    screen: MyPostScreen,
    navigationOptions: {
      header: () => null,
    },
    navigatorStyle: {
      navBarHidden: true,
    },
  },
  CreatePostScreen: {
    screen: CreatePostScreen,
    navigationOptions: {
      header: () => null,
    },
    navigatorStyle: {
      navBarHidden: true,
    },
  },
});

//Job Post Home screen
const JobPostHome = createStackNavigator({
  JobPostHomeScreen: {
    screen: JobPostHomeScreen,
    navigationOptions: {
      header: null,
    },
    navigatorStyle: {
      navBarHidden: true,
    },
  },
  JobPostHomeDetailScreen: {
    screen: JobPostHomeDetailScreen,
    navigationOptions: {
      header: null,
    },
    navigatorStyle: {
      navBarHidden: true,
    },
  },
});

// const PostStack = createStackNavigator({
//   PostScreen: { screen: PostScreen },
//   PostDetailScreen: { screen: PostDetailScreen },
//   MyPostScreen: { screen: MyPostScreen },
//   CreatePostScreen: { screen: CreatePostScreen },
// },
//   {
//     initialRouteName: 'PostScreen',
//     navigationOptions: {
//       header: () => null,
//     },
//     navigatorStyle: {
//       navBarHidden: true,
//     },
//   }
// );

//Notification screen
const Notification = createStackNavigator({
  NotificationScreen: {
    screen: NotificationScreen,
    navigationOptions: {
      header: null,
    },
    navigatorStyle: {
      navBarHidden: true,
    },
  },
});

// MyBusinessCard screen
const MyBusinessCard = createStackNavigator({
  MyBusinessCardScreen: {
    screen: MyBusinessCardScreen,
    navigationOptions: {
      header: null,
    },
    navigatorStyle: {
      navBarHidden: true,
    },
  },
});

//ExploreCourses
const ExploreCourses = createStackNavigator({
  ExploreCoursesScreen: {
    screen: MainExploreCoursesScreen,
    navigationOptions: {
      header: null,
    },
    navigatorStyle: {
      navBarHidden: true,
    },
  },
  MainCoursesListScreen: {
    screen: MainCoursesListScreen,
    navigationOptions: {
      header: null,
    },
    navigatorStyle: {
      navBarHidden: true,
    },
  },
  PaymentWebViewScreen: {
    screen: PaymentWebViewScreen,
    navigationOptions: {
      header: null,
    },
    navigatorStyle: {
      navBarHidden: true,
    },
  },
});


//Profile screen
const PortalIcon = createStackNavigator({
  PortalIconScreen: {
    screen: PortalIconScreen,
    navigationOptions: {
      header: null,
    },
    navigatorStyle: {
      navBarHidden: true,
    },
  },
  PortalIconInfoScreen: {
    screen: PortalIconInfoScreen,
    navigationOptions: {
      header: null,
    },
    navigatorStyle: {
      navBarHidden: true,
    },
  },
});

//Short Cources screen
const ShortCoursesHome = createStackNavigator({
  ShortCourses: {
    screen: ShortCourses,
    navigationOptions: {
      header: null,
    },
    navigatorStyle: {
      navBarHidden: true,
    },
  },
});

// const CustomDrawerContentComponent = props => {
//   return (
//     <ScrollView>
//       <View style={{alignItems: 'center'}}>
//         <Image
//           style={styles.drawerImage}
//           source={require('../images/nav.png')}
//         />
//       </View>
//       <DrawerNavigatorItems style={{marginTop: 30, size: 30}} {...props} />
//     </ScrollView>
//   );
// };

// const TabView = createDrawerNavigator(
//   {
//     MyId: {
//       screen: MyId,
//       navigationOptions: {
//         drawerLabel: 'MY ID',
//         drawerIcon: () => <Icon name="home" size={20} color="red" />,
//       },
//     },

//     PortalIcon: {
//       screen: PortalIcon,
//       navigationOptions: {
//         drawerLabel: 'Portal Icons',
//         drawerIcon: () => <Icon name="link" size={20} color="red" />,
//       },
//     },

//     Notification: {
//       screen: Notification,
//       navigationOptions: {
//         drawerLabel: 'Notifications',
//         drawerIcon: () => <Icon name="bells" size={20} color="red" />,
//       },
//     },

//     AboutUs: {
//       screen: AboutUs,
//       navigationOptions: {
//         drawerLabel: 'About Us',
//         drawerIcon: () => <Icon name="infocirlceo" size={20} color="red" />,
//       },
//     },

//     Setting: {
//       screen: Setting,
//       navigationOptions: {
//         drawerLabel: 'Settings',
//         drawerIcon: () => <Icon name="setting" size={20} color="red" />,
//       },
//     },
//   },
//   {
//     contentComponent: CustomDrawerContentComponent,
//     contentOptions: {
//       inactiveTintColor: '#000000',
//       activeTintColor: '#1eacff',
//       showIcon: true,
//     },
//   },
// );

const TabView = createDrawerNavigator(
  {
    MyId: { screen: MyId },
    MyBusinessCard: { screen: MyBusinessCard },
    PortalIcon: { screen: PortalIcon },
    Notification: { screen: Notification },
    News: { screen: News },
    Post: { screen: PostStack },
    JobPost: { screen: JobPostHome },
    AboutUs: { screen: AboutUs },
    Setting: { screen: Setting },
    ShortCourses: { screen: ShortCoursesHome },
    ExploreCourses: { screen: ExploreCourses },
  },
  {
    navigationOptions: {
      drawerLockMode: 'locked-open',
      cardStack: {
        gesturesEnabled: false,
      },
    },
    headerMode: 'none',
    initialRouteName: 'MyId',
    // disableGestures: true,
    //drawerLockMode: 'locked-open',
    overlayColor: 'rgba(0, 0, 0, 0.70)',
    initialRouteName: 'MyId',
    drawerWidth: wp('80%'),
    // contentComponent: props => <DrawerBar {...props} />,
    contentComponent: DrawerBar,
    contentOptions: {
      inactiveTintColor: '#000000',
      activeTintColor: '#1eacff',
      showIcon: true,
    },
  },
);

const getstart = false;

const createRootNavigator = createSwitchNavigator(
  {
    StartNavigator: {
      screen: StartNavigator,
    },
    TabView: {
      screen: TabView,
    },
  },
  {
    initialRouteName: getstart ? 'TabView' : 'StartNavigator',
  },
);

const App = createAppContainer(createRootNavigator);

export default App;

const styles = StyleSheet.create({
  drawerImage: {
    width: 150,
    height: 150,
    justifyContent: 'center',
  },
});

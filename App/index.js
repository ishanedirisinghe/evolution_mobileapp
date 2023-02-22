import { View, StyleSheet } from 'react-native';
import Navigators from './components/navigators/Appnavigators';
import React, { useEffect } from 'react';
import messaging from '@react-native-firebase/messaging';
import RNBootSplash from 'react-native-bootsplash';

//global.API_ENDPOINT = 'http://fmwebhosting.australiaeast.cloudapp.azure.com/evolution'; // LIVE

//global.API_ENDPOINT = 'https://ehi-apps.azurewebsites.net'; // DEV
 
global.API_ENDPOINT = 'http://221.121.154.219/Attendance'; // Live
  
//global.API_ENDPOINT = 'http://mobileapp.evolution.edu.au/WebPortal'; // New Server

import FlashMessage from 'react-native-flash-message';


const App = () => {
  state = {
    spinner: false,
  };

  async function checkApplicationPermission() {
    const authorizationStatus = await messaging().requestPermission();

    if (authorizationStatus === messaging.AuthorizationStatus.AUTHORIZED) {
      console.log('User has notification permissions enabled.');
    } else if (authorizationStatus === messaging.AuthorizationStatus.PROVISIONAL) {
      console.log('User has provisional notification permissions.');
    } else {
      console.log('User has notification permissions disabled');
    }
  }

  useEffect(() => {
    checkApplicationPermission();
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    RNBootSplash.hide({ fade: true });
  }, []);

  return (
    <View style={styles.flex1}>
      {/* <GeneralStatusBarColor backgroundColor="#C7003B"
      barStyle="light-content"/> */}
      <Navigators />
      <FlashMessage />
    </View>
  );

}

export default App

const styles = StyleSheet.create({
  flex1: {
    flex: 1,
  },
});

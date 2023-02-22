import React, {useState, useEffect, Component} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import styles from './styles';
import Spinner from 'react-native-loading-spinner-overlay';
import axios from 'axios';
import qs from 'qs';
import { showMessage } from 'react-native-flash-message';

const PaymnetSuccessScreen = ({navigation}) => {
  const [spinner, setSpinner] = useState(false);

  const handlePayment = () => {
    setSpinner(true);
    console.log("handlePayment_ID", navigation.state.params.ShortCourseApplyID);
    axios
      .post(global.API_ENDPOINT + "/API/ShortCourseAPI/CreatePaymentIntent", {}, {
        params: {
          ShortCourseApplyID: navigation.state.params.ShortCourseApplyID,
        }
      })
      .then(response => {
        console.log("submitted 2nd", response);
        setSpinner(false);
        if (response?.data.client_secret) {
         // handleFinalPayment(response.data.client_secret);
        }
      })
      .catch(err => {
        if (err && err.response) {
          setSpinner(false);
          console.log('failed_andlePayment', err.response.data.Message);
          showMessage({
            message: 'Error',
            description: err.response.data.error.message,
            type: 'danger'
          });
        }
      });
  }

  return (
    <SafeAreaView style={styles.container}>
       <Spinner visible={spinner} textContent={'Loading...'} />
        <View style={styles.logoImageContainer}>
          <Image
            style={styles.paymentImageView}
            source={require('../../../../../assets/images/successful_payment.png')}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.titleText}>{'Thank You!'}</Text>
        <Text style={styles.textContainer}>
          {'Selected course has bees successfully registered.'}
        </Text>
        <View style={styles.logoImageContainer}>
          <Image
            style={styles.logoImage}
            source={require('../../../../../assets/images/evolution_logo.png')}
            resizeMode="contain"
          />
        </View>
      <TouchableOpacity
        style={styles.webLinkTouch}
        onPress={() => {
          navigation.navigate('ShortCourses');
        }}>
        <Text style={styles.webLinkText}>Back to Courses</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default PaymnetSuccessScreen;

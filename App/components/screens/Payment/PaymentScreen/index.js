import React, { useState, useEffect, Component } from 'react';
import { View, Text, Button } from 'react-native';
import {
  initStripe,
  StripeProvider,
  CardForm,
  useStripe,
} from '@stripe/stripe-react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import axios from 'axios';
import qs from 'qs';
// import { PUBLISHABLE_KEY, TOKEN } from '@env';
import styles from './styles';
import { showMessage } from 'react-native-flash-message';

//const PUBLISHABLE_KEY = "pk_live_51KJ3kfD0gASjlsWleBxLkPY7a6B1MgFy8r8iwjQWF9sRi3sq5SKEf3JDKuwVtu5BoWTacd19B4xaDOGSXXMFy6kc00GP7OAOXl"
const PUBLISHABLE_KEY = "pk_test_51KJ3kfD0gASjlsWlmusJ0L3bwfUk435dZ1zAwJNqp26DEIa83cKppQNg5X6mB9XoY4GEazSQGs7UtahzCGP95Mao00iZEKGgZU"
//const TOKEN = "c2tfbGl2ZV81MUhGREEwRExQT1d2TjJOTGpXamFjcXpWZ1dRZWc4eUgweGJEeHl1Q1RReVlzUk5uSzVEVDlOU0kwdlBNMGl4Qzk5dzJSZ0lsdnVWa3NSbTV3ZHozT1lpSTAwQlNZZmIyTGk6"
const TOKEN = "cGtfdGVzdF81MUtKM2tmRDBnQVNqbHNXbG11c0owTDNid2ZVazQzNWRaMXpBd0pOcXAyNkRFSWE4M2NLcHBRTmc1WDZtQjlYb1k0R0VhelNRR3M3VXRhaHpDR1A5NU1hbzAwaVpFS0dnWlU="

const PaymentScreen = ({ navigation }) => {
  const [spinner, setSpinner] = useState(false);
  const [card, setCard] = useState(null);
  const { confirmPayment, presentPaymentSheet } = useStripe();

  console.log("navigation.state.params.ShortCourseApplyID", navigation.state.params.ShortCourseApplyID);

  useEffect(() => {
    initStripe({
      publishableKey: PUBLISHABLE_KEY,
    });
  }, []);

  const handlePayment = () => {
    console.log("handlePayment_ID", navigation.state.params.ShortCourseApplyID);
    axios
      .post(global.API_ENDPOINT + "/API/ShortCourseAPI/CreatePaymentIntent", {}, {
        params: {
          ShortCourseApplyID: navigation.state.params.ShortCourseApplyID,
        }
      })
      .then(response => {
        console.log("submitted 2nd", response);
        if (response?.data.client_secret) {
          handleFinalPayment(response.data.client_secret);
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

  const handleFinalPayment = async (secret) => {
    console.log("secret", secret);
    const { error, paymentIntent } = await confirmPayment(secret, {
      type: 'Card'
    })

    console.log("paymentIntent_", paymentIntent);

    if (error) {
      console.log("stripe error_", error);
      handlePaymentStatus(false, false);
      setSpinner(false);
      showMessage({
        message: 'Error',
        description: error.message ? error.message : 'Something went wrong with stripe!',
        type: 'danger'
      });
    } else {
      handlePaymentStatus(true, true);
      // showMessage({
      //   message: 'Success',
      //   description:
      //     'Selected course has bees successfully registered.',
      //   type: 'success'
      // });
    }
  }


  const handlePaymentStatus = (isStatus, paymentIntentStatus) => {
    axios
      .post(global.API_ENDPOINT + '/API/ShortCourseAPI/PostPaymentStatus', {
        ShortCourseApplicantID: navigation.state.params.ShortCourseApplyID,
        IsSucess: isStatus,
        ReceiptNo: '',
      })
      .then(response => {
        console.log('response', response);
        setSpinner(false);
        if (paymentIntentStatus) {
          navigation.navigate('PaymnetSuccessScreen');
        }
      })
      .catch(err => {
        if (err && err.response) {
          setSpinner(false);
          console.log('failed', err.response.data.Message);
          showMessage({
            message: 'Error',
            description: err.response.data.Message,
            type: 'danger',
          });
        }
      });
  };

  const requestWithCard = async () => {
    setSpinner(true);
    const cardDetail = {
      'card[name]': card.brand,
      'card[number]': card.number,
      'card[exp_month]': card.expiryMonth,
      'card[exp_year]': card.expiryYear,
    };


    axios
      .post('https://api.stripe.com/v1/tokens', qs.stringify(cardDetail), {
        headers: {
          Authorization: `Basic ${TOKEN}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
      .then(response => {
        if (response.status === 200) {
          console.log('submiited 1st', response);
          handlePayment();
        }
      })
      .catch(err => {
        if (err && err.response) {
          setSpinner(false);
          console.log('failed', err.response);
          showMessage({
            message: 'Error',
            description: err.response.data.error.message,
            type: 'danger'
          });
        }
      });
  };

  return (
    <StripeProvider publishableKey={PUBLISHABLE_KEY}>
      <View style={styles.container}>
        <Spinner visible={spinner} textContent={'Loading...'} />
        <Text style={styles.titleText}>{'Payment Screen'}</Text>
        <Text style={styles.courseTitleText}>
          {navigation.state.params.CoursesData.ShortCourseName +
            '  ' +
            navigation.state.params.CoursesData.CourseValue}
        </Text>
        <CardForm
          style={{
            height: 400,
          }}
          onFormComplete={details => {
            console.log('details', details);
            setCard(details);
          }}
          dangerouslyGetFullCardDetails={true}
        />
        <Button
          style={styles.button}
          title="Checkout"
          onPress={requestWithCard}
        />
        <Button
          style={styles.button}
          title="Go Back to previous screen"
          onPress={() => navigation.goBack()}
        />
      </View>
    </StripeProvider>
  );
};

export default PaymentScreen;

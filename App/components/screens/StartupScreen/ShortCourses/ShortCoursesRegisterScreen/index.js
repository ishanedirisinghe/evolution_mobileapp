/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
import React, {Component, useState} from 'react';
import {
  View,
  Text,
  Dimensions,
  SafeAreaView,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  Image,
  Linking,
  TouchableOpacity,
  Alert
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {showMessage} from 'react-native-flash-message';
import EntypoIcons from 'react-native-vector-icons/Entypo';
import RNPickerSelect from 'react-native-picker-select';
import DatePicker from 'react-native-datepicker';
import Buttons from '../../../uiElements/Buttons/RoundButtons';
import {COUNTRY_LIST} from '../../../../Utility/countryList';
import {MAIN_FONT} from '../../../../Utility/FontsStyle/font';

const imageWidth = Dimensions.get('window').width;

const phizIcon = require('../../../../images/phiz.png');

const DismissKeyboard = ({children}) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {' '}
    {children}
  </TouchableWithoutFeedback>
);

const countryPlaceholder = {
  label: 'Select Country*',
  value: null,
  color: Colors.TEXT.PLACEHOLDER_COLOR,
};
import NavigationHeader from '../../../uiElements/NavigationHeader';
import {styles, pickerSelectStyles} from './styles';
import {OutlinedTextInput} from '../../../uiElements/TextInput';
import {Colors, Fonts, NormalizeText} from '../../../../../styles';
import {ContainedButton} from '../../../uiElements/Button';

const ICON_CALENDAR = require('../../../../../assets/images/calendar.png');
class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true,
      spinner: false,
      isCurrentViewCustomerDetail: true,
      FirstName: '',
      LastName: '',
      country: '',
      email: '',
      Phone: '',
      requierments: '',
      date: '',
      passcode: '',
      confirmPasscode: '',
      isVerfiyEmail: false,
      isVerfiyPasscodeField: false,
      emailVerfiyObject: null,
      emailVerfiyTextName: 'Verify Email',
      OTPCode: '',
      verifyItemDisable: false,
    };

    this.changeState = this.changeState.bind(this);
  }

  componentDidMount() {
 
  }

  async addCustomerDetails() {
    var context = this;

    let emailAddress = context.state.email.toLowerCase();
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let validEmail = re.test(String(emailAddress).toLowerCase());

    let passcodeLength = this.state.passcode.length
    let confirmPasscodeLength = this.state.confirmPasscode.length
    console.log('context.state ', passcodeLength, confirmPasscodeLength);

    if (!context.state.FirstName || context.state.FirstName.trim() == '') {
      showMessage({
        message: 'First Name',
        description: 'Please enter the First Name.',
        type: 'danger',
      });
      return;
    } else if (!context.state.LastName || context.state.LastName.trim() == '') {
      showMessage({
        message: 'Last Name',
        description: 'Please enter the Last Name.',
        type: 'danger',
      });
      return;
    } else if (!context.state.date || context.state.date.trim() == '') {
      showMessage({
        message: 'Date of Birth',
        description: 'Please enter the Date of Birth.',
        type: 'danger',
      });
      return;
    } else if (!emailAddress || emailAddress.trim() == '' || !validEmail) {
      showMessage({
        message: 'Email',
        description: 'Please enter a valid Email.',
        type: 'danger',
      });
      return;
    } else if (!context.state.passcode || context.state.passcode.trim() == '') {
      showMessage({
        message: 'passcode',
        description: 'Please enter a Passcode.',
        type: 'danger',
      });
      return;
    } else if (passcodeLength < 6) {  
      showMessage({
        message: 'Passcode',
        description: 'Passcode length must be at least 6 characters',
        type: 'danger',
      });
      return;
    } else if (!context.state.confirmPasscode || context.state.confirmPasscode.trim() == '') {
      showMessage({
        message: 'Confirm Passcode',
        description: 'Please enter a Confirm Passcode.',
        type: 'danger',
      });
      return;
    }else if (confirmPasscodeLength < 6) {
      showMessage({
        message: 'Confirm Passcode',
        description: 'Confirm Passcode length must be at least 6 characters',
        type: 'danger',
      });
      return;
    } else if (context.state.passcode.trim() != context.state.confirmPasscode.trim()) {
      showMessage({
          message: 'passcode',
          description:
              "'New Passcode' and 'Confirm Passcode' does not match.",
          type: 'danger'
      });
      return;
    }else if (!context.state.Phone || context.state.Phone.trim() == '') {
      showMessage({
        message: 'Phone',
        description: 'Please enter the Phone No.',
        type: 'danger',
      });
      return;
    } else if (!context.state.country || context.state.country.trim() == '') {
      showMessage({
        message: 'Country',
        description: 'Please select Country.',
        type: 'danger',
      });
      return;
    } else if (!context.state.isVerfiyEmail) {
      showMessage({
        message: 'Email',
        description: 'Please verify your email.',
        type: 'danger',
      });
      return;
    } else {
      Keyboard.dismiss();

      var countryValue = COUNTRY_LIST.filter(
        item => item.value == context.state.country,
      ).map(({label, value}) => ({label, value}));

      context.setState({spinner: true});

      let requestPath = global.API_ENDPOINT + '/API/CourseAPI/SaveApplicant';

      console.log('DEBUG: add ShortCourseAPI', requestPath);
      fetch(requestPath, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          firstname: context.state.FirstName.trim(),
          lastName: context.state.LastName.trim(),
          DateOfBirth: context.state.date,
          email: context.state.email,
          mobile: context.state.Phone.trim(),
          country: countryValue.length > 0 ? countryValue[0].label : '',
          passcode: context.state.passcode,
        }),
      })
        .then(addPostCommentResponse => addPostCommentResponse.text())
        .then(result => {
          console.log('DEBUG: Short Course------', result);
          let resultJson = JSON.parse(result);
          if (resultJson && resultJson.Message && resultJson.Message != '') {
            context.setState({spinner: false});
            showMessage({
              message: 'Error',
              description: resultJson.Message,
              type: 'danger',
            });
          } else {
            context.setState({
              spinner: false,
              topic: '',
              description: '',
            });
            showMessage({
              message: 'Success',
              description: 'Personal details captured successfully.',
              type: 'success',
            });

            // this.props.navigation.navigate('PaymentScreen', {
            //     ShortCourseApplyID: resultJson.ShortCourseApplyID,
            //     CoursesData: coursesData
            // })

            var navigation = context.props.navigation;
            navigation.navigate('CourseCategoryScreen', {
              userRegisterObject: resultJson,
            });
          }
        })
        .catch(error => {
          context.setState({spinner: false});
          console.log('DEBUG: Add Short Course request failed.', error);
          showMessage({
            message: 'Error',
            description:
              'Unknown server error. Please check your internet connection. Contact support if issue prevails.',
            type: 'danger',
          });
        });
    }
  }

  clickEmailVerfiyButton() {
    if (!this.state.isVerfiyPasscodeField) {
      this.verifyEmailAddress();
    } else {
      this.sendOTPCode();
    }
  }

  async verifyEmailAddress() {
    var context = this;

    let emailAddress = context.state.email.toLowerCase();
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let validEmail = re.test(String(emailAddress).toLowerCase());

    if (!emailAddress || emailAddress.trim() == '' || !validEmail) {
      showMessage({
        message: 'Email',
        description: 'Please enter a valid Email.',
        type: 'danger',
      });
      return;
    }

    Keyboard.dismiss();

    let requestPath =
      global.API_ENDPOINT +
      '/API/CourseAPI/SendEmailVerifiacation?EmailAddress=' +
      emailAddress;
    console.log('DEBUG: URL SendEmailVerifiaction', requestPath);

    context.setState({spinner: true});
    fetch(requestPath, {
      method: 'POST',
    })
      .then(response => response.text())
      .then(result => {
        context.setState({spinner: false});
        let resultJson = JSON.parse(result);
        console.log('DEBUG: POST Save data success. ', resultJson);

        if (resultJson || resultJson != '') {
          this.state.emailVerfiyObject = resultJson;
          console.log('DEBUG: emailVerfiyObject', this.state.emailVerfiyObject);
          this.changeState();
        }
      })
      .catch(error => {
        context.setState({spinner: false});
        showMessage({
          message: 'Error',
          description:
            'Unknown server error. Please check your internet connection. Contact support if issue prevails.',
          type: 'danger',
        });
      });
  }

  async sendOTPCode() {
    var context = this;

    if (!context.state.OTPCode || context.state.OTPCode.trim() == '') {
      showMessage({
        message: 'passcode',
        description: 'Please enter a OTP Code.',
        type: 'danger',
      });
      return;
    }

    Keyboard.dismiss();

    context.setState({spinner: true});

    let requestPath = global.API_ENDPOINT + '/API/CourseAPI/SendOTP';

    console.log('DEBUG: SendOTP', requestPath);
    fetch(requestPath, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        EmailVerificationID:
          context.state.emailVerfiyObject.EmailVerificationID,
        OTP: context.state.OTPCode.trim(),
      }),
    })
      .then(addPostCommentResponse => addPostCommentResponse.text())
      .then(result => {
        console.log('DEBUG: email send otp', result);
        let resultJson = JSON.parse(result);
        if (resultJson && resultJson.Message && resultJson.Message != '') {
          context.setState({spinner: false});
          showMessage({
            message: 'Error',
            description: resultJson.Message,
            type: 'danger',
          });
        } else {
          context.setState({spinner: false});
          showMessage({
            message: 'Success',
            description: 'Your email is verified.',
            type: 'success',
          });

          this.setState({
            isVerfiyEmail: true,
            emailVerfiyTextName: 'Verified',
            verifyItemDisable: true,
          });
        }
      })
      .catch(error => {
        context.setState({spinner: false});
        console.log('DEBUG: Add Short Course request failed.', error);
        showMessage({
          message: 'Error',
          description:
            'Unknown server error. Please check your internet connection. Contact support if issue prevails.',
          type: 'danger',
        });
      });
  }

  changeState = () => {
    this.setState({isVerfiyPasscodeField: true, emailVerfiyTextName: 'Submit'});
  };

  onChangeTextEmailAddress = () => {
    Alert.alert('Alert', 'You must have access to the entered email address. The OTP code will be sent for email verification', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel'),
        style: 'cancel',
      },
      {text: 'OK', onPress: () => console.log('OK')},
    ]);
  };

  onChangeTextPasscode = () => {
    Alert.alert('Alert', 'The entered Passcode will be used to login to APP', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel'),
        style: 'cancel',
      },
      {text: 'OK', onPress: () => console.log('OK')},
    ]);
  };

  render() {
    const {isCurrentViewCustomerDetail} = this.state;

    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.flex1}>
          <NavigationHeader
            {...this.props}
            screenTitle={isCurrentViewCustomerDetail ? '' : 'Add Job'}
          />
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : null}
            style={styles.flex1}>
            <Spinner visible={this.state.spinner} textContent={'Loading...'} />
            <ScrollView keyboardShouldPersistTaps="handled">
              <View style={styles.centerView}>
                <Image
                  style={styles.logoImage}
                  source={require('../../../../../assets/images/evolution_logo.png')}
                  resizeMode="contain"
                />
                <Text style={styles.titleText}>User Registration</Text>
                <Text style={styles.courseTitleText}>
                  {/* {(coursesData &&
                                        coursesData.ShortCourseName + " - AUD " + coursesData.Price ) ||
                                        ''} */}
                </Text>
              </View>
              <View style={styles.formView}>
                <Text style={styles.inputLabelText}>First Name</Text>
                <OutlinedTextInput
                  textInputProps={{
                    placeholder: 'First Name*',
                    value: this.state.FirstName,
                  }}
                  onChangeText={text =>
                    this.setState({
                      FirstName: text,
                    })
                  }
                />
                <View style={styles.H20} />
                <Text style={styles.inputLabelText}>Last Name</Text>
                <OutlinedTextInput
                  textInputProps={{
                    placeholder: 'Last Name*',
                    value: this.state.LastName,
                  }}
                  onChangeText={text =>
                    this.setState({
                      LastName: text,
                    })
                  }
                />
                <View style={styles.H20} />
                <Text style={styles.inputLabelText}>Date of Birth</Text>
                <View style={styles.datePickerContainer}>
                  <DatePicker
                    style={styles.width100}
                    date={this.state.date}
                    mode="date"
                    placeholder={'Date of Birth*'}
                    format="YYYY-MM-DD"
                    // minDate={new Date()}
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    iconSource={ICON_CALENDAR}
                    customStyles={{
                      dateIcon: {
                        width: 24,
                        height: 24,
                      },
                      dateInput: {
                        alignItems: 'flex-start',
                        borderWidth: 0,
                      },
                      placeholderText: {
                        fontFamily: Fonts.medium,
                        fontSize: NormalizeText(14),
                        color: Colors.TEXT.PLACEHOLDER_COLOR,
                      },
                      dateText: {
                        fontFamily: Fonts.medium,
                        fontSize: NormalizeText(14),
                        color: Colors.TEXT.PRIMARY_COLOR,
                      },
                    }}
                    onDateChange={date => {
                      this.setState({
                        date,
                        dateRequired: false,
                        timeRequired: false,
                      });
                    }}
                  />
                </View>
                <View style={styles.H20} />
                <Text style={styles.inputLabelText}>email-address</Text>
                <OutlinedTextInput
                  textInputProps={{
                    keyboardType: 'email-address',
                    placeholder: 'E-Mail*',
                    value: this.state.email,
                  }}
                  onChangeText={text =>
                    this.setState({
                      email: text,
                    })
                  }
                  onBlur={() => this.onChangeTextEmailAddress()}
                />
                <View style={styles.logoContainer}>
                  {this.state.isVerfiyPasscodeField ? (
                    <View style={styles.logoContainer1}>
                      <Text style={styles.inputLabelText}>OTP Code</Text>
                      <OutlinedTextInput
                        editable={!this.state.verifyItemDisable}
                        selectTextOnFocus={!this.state.verifyItemDisable}
                        textInputProps={{
                          maxLength: 6,
                          keyboardType: 'numeric',
                          placeholder: 'OTP Code',
                          value: this.state.OTPCode,
                        }}
                        onChangeText={text =>
                          this.setState({
                            OTPCode: text,
                          })
                        }
                      />
                    </View>
                  ) : (
                    <View></View>
                  )}
                  <TouchableOpacity
                    disabled={this.state.verifyItemDisable}
                    style={[
                      styles.emailVerifyButton,
                      this.state.isVerfiyEmail
                        ? styles.isVerifyed
                        : styles.isNotVerifyed,
                    ]}
                    onPress={() => {
                      this.clickEmailVerfiyButton();
                    }}>
                    <Text style={styles.emailVerifyText}>
                      {/* {this.state.isVerfiyEmail
                      ? 'Verifyed Email'
                      : 'Verify Email'} */}
                      {this.state.emailVerfiyTextName}
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.H20} />
                <Text style={styles.inputLabelText}>PassCode</Text>
                <OutlinedTextInput
                  textInputProps={{
                    maxLength: 6,
                    keyboardType: 'numeric',
                    placeholder: 'PassCode*',
                    value: this.state.passcode,
                  }}
                  onChangeText={text =>
                    this.setState({
                      passcode: text,
                    })
                  }
                  onBlur={() => this.onChangeTextPasscode()}
                />
                <View style={styles.H20} />
                <Text style={styles.inputLabelText}>Confirm PassCode</Text>
                <OutlinedTextInput
                  textInputProps={{
                    maxLength: 6,
                    keyboardType: 'numeric',
                    placeholder: 'Confirm PassCode*',
                    value: this.state.confirmPasscode,
                  }}
                  onChangeText={text =>
                    this.setState({
                      confirmPasscode: text,
                    })
                  }
                />
                <View style={styles.H20} />
                <Text style={styles.inputLabelText}>Phone</Text>
                <OutlinedTextInput
                  textInputProps={{
                    keyboardType: 'number-pad',
                    placeholder: 'Phone*',
                    value: this.state.Phone,
                  }}
                  onChangeText={text =>
                    this.setState({
                      Phone: text,
                    })
                  }
                />
                <View style={styles.H20} />
                <Text style={styles.inputLabelText}>Country</Text>
                <View style={styles.pickerContainer}>
                  <RNPickerSelect
                    ref={input => {
                      this.stateTextInput = input;
                    }}
                    style={{
                      ...pickerSelectStyles,
                      placeholder: styles.pickerPlaceholder,
                    }}
                    items={COUNTRY_LIST}
                    placeholder={countryPlaceholder}
                    onValueChange={value => {
                      this.setState({
                        country: value,
                      });
                    }}
                    value={this.state.country}
                    onUpArrow={() => {
                      this.addressLine2TextInput.focus();
                    }}
                    onDownArrow={() => {
                      this.emailTextInput.focus();
                    }}
                    Icon={() => {
                      return (
                        <EntypoIcons
                          name="chevron-thin-down"
                          size={16}
                          color={Colors.INPUT_BORDER_COLOR}
                          style={styles.pickerIcon}
                        />
                      );
                    }}
                  />
                </View>
                <View style={styles.H20} />
                <View style={styles.actionContainer}>
                  <ContainedButton
                    onPress={() => {
                      this.addCustomerDetails();
                    }}
                    label="SUBMIT"
                  />
                </View>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </View>
    );
  }
}

export default Search;

import React, { Component, useState} from 'react';
import {
    View,
    Text,
    Image,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    KeyboardAvoidingView,
    StyleSheet,
    Platform
} from 'react-native';
import EntypoIcons from 'react-native-vector-icons/Entypo';
import RNPickerSelect from 'react-native-picker-select';
import { showMessage } from 'react-native-flash-message';
import DefaultPreference from 'react-native-default-preference';
import HamNavigationHeader from '../../uiElements/HamNavigationHeader';
import ImagePicker from 'react-native-image-crop-picker';
import Spinner from 'react-native-loading-spinner-overlay';
import styles from './styles';
import {
    Colors,
    Fonts,
    NormalizeText,
    scale,
    Spacing
} from '../../../../styles';
import { OutlinedTextInput } from '../../uiElements/TextInput';
import { ContainedButton } from '../../uiElements/Button';
import { COUNTRY_LIST } from '../../../Utility/countryList';

// const stateItems = [
//     { label: 'NSW', value: 'NSW' },
//     { label: 'VIC', value: 'VIC' },
//     { label: 'QLD', value: 'QLD' },
//     { label: 'SA', value: 'SA' },
//     { label: 'WA', value: 'WA' },
//     { label: 'TAS', value: 'TAS' },
//     { label: 'NT', value: 'NT' },
//     { label: 'OVS (Overseas)', value: 'OVS' }
// ];

const countryPlaceholder = {
    label: 'Select Country*',
    value: null,
    color: Colors.TEXT.PLACEHOLDER_COLOR
};

const statePlaceholder = {
    label: 'Select state',
    value: null,
    color: Colors.TEXT.PLACEHOLDER_COLOR
};
const ICON_PIC_UPLOAD = require('../../../../assets/images/ic_upload_pic.png');

class Search extends Component {
 // const [getStateItems, setStateValue] = useState([]);
  
    fieldRef = React.createRef();

    constructor(props) {
        super(props);
        this.state = {
            isLogged: false,
            visible: true,
            Phone: '',
            OfficeMobile: '',
            BuildingName: '',
            UnitDetail: '',
            StreetNumber: '',
            StreetName: '',
            Postcode: '',
            Suburb: '',
            State: '',
            Country: '',
            PrimaryEmail: '',
            SecondaryEmail: '',
            image: '',
            imageToUpload: false,
            imageBase64: false,
            spinner: false,
            countryEnable: false,
            stateItems: []
        };
    }

    refreshPage() {
        var imgContext = this;
        let requestPath =
            global.API_ENDPOINT + '/api/StudentAPI/GetStudentInfo';
        console.log('DEBUG: GetStudentInfo', requestPath);
        imgContext.setState({ spinner: true });
        fetch(requestPath, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + global.session.access_token
            }
        })
            .then(response => response.text())
            .then(result => {
                imgContext.setState({ spinner: false });
                console.log('DEBUG: GetStudentInfo request success. ', result);
                let resultJson = JSON.parse(result);
                this.setState({ Phone: resultJson.Phone });
                this.setState({ OfficeMobile: resultJson.OfficeMobile });
                this.setState({ BuildingName: resultJson.BuildingName });
                this.setState({ UnitDetail: resultJson.UnitDetail });
                this.setState({ StreetNumber: resultJson.StreetNumber });
                this.setState({ StreetName: resultJson.StreetName });
                this.setState({ image: resultJson.ImageUrl });
                this.setState({ Postcode: resultJson.Postcode });
                this.setState({ Suburb: resultJson.Suburb });
                this.setState({ State: resultJson.State });
                this.setState({ PrimaryEmail: resultJson.eMail });
                this.setState({ SecondaryEmail: resultJson.SecondaryEmail });

                var countryValue  = COUNTRY_LIST.filter((item) => item.label == resultJson.Country).map(({label, value}) => ({label, value}));
                console.log('Setting vvvvv_____ ', countryValue);
                this.setState({ Country: countryValue.length > 0 ? countryValue[0].value : '' })
                console.log('Setting vvvvv_____ ', this.state.Country);
               // this.getStateData()
               
            })
            .catch(error => {
                if (imgContext.state.callFunction) {
                    imgContext.setState({ callFunction: false });
                    imgContext.refreshPage();
                } else {
                    imgContext.setState({ spinner: false });
                    console.log('DEBUG: GetStudentInfo request failed.', error);
                    showMessage({
                        message: 'Error',
                        description:
                            'Unknown server error. Please check your internet connection. Contact support if issue prevails.',
                        type: 'danger'
                    });
                }
            });
    }

    componentDidMount() {
        this.setState({ callFunction: true });
        this.getStateData();
        this.props.navigation.addListener('didFocus', payload => {
            this.setState({ callFunction: true });
            this.getStateData();
        });
    }

    componentWillReceiveProps(nextPropsSetting) {
        console.log(
            'Setting--------- componentWillReceiveProps -------------.:'
        );
    }

    uploadImage(doneCallBack) {
        var context = this;
        DefaultPreference.get('user_data').then(function(user_data) {
            console.log('Image to uplaod ---', context.state.imageToUpload);
            let jsonDataForImage = JSON.parse(user_data);
            var myHeaders = new Headers();
            myHeaders.append(
                'Authorization',
                'Bearer ' + global.session.access_token
            );
            myHeaders.append('Content-Type', 'text/plain');
            var raw = context.state.imageToUpload.data; //"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";

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            fetch(
                global.API_ENDPOINT +
                    '/Utility/PostUserImage?userid=' +
                    jsonDataForImage.ID,
                requestOptions
            )
                .then(response => response.text())
                .then(result => {
                    if (result && result == 'True') {
                        doneCallBack(true);
                    } else {
                        doneCallBack(false);
                    }
                    console.log('POSTMAN--------------', result);
                })
                .catch(error => {
                    console.log('POSTMAN--------------', 'error', error);
                    doneCallBack(false);
                });
        });
    }

    onPressProfileUpdate() {
        this.setState({ callFunction: true });
        this.profileUpdate();
    }

    async profileUpdate() {
        console.log('spinner ------------------ ', this.state.spinner);
        if (!this.state.Phone || this.state.Phone.trim() == '') {
            showMessage({
                message: 'Phone',
                description: 'Please enter the phone number.',
                type: 'danger'
            });
            return;
        }

        // if (!this.state.OfficeMobile || this.state.OfficeMobile.trim() == '') {
        //     showMessage({
        //         message: 'Office Phone',
        //         description: 'Please enter the office phone number.',
        //         type: 'danger'
        //     });
        //     return;
        // }

        if (!this.state.BuildingName || this.state.BuildingName == '') {
            this.state.BuildingName = ' ';
        }
        if (!this.state.UnitDetail || this.state.UnitDetail == '') {
            this.state.UnitDetail = ' ';
        }
        if (!this.state.StreetNumber || this.state.StreetNumber.trim() == '') {
            showMessage({
                message: 'Street Number',
                description: 'Please enter the Street Number.',
                type: 'danger'
            });
            return;
        }
        if (!this.state.StreetName || this.state.StreetName.trim() == '') {
            console.log('DEBUG: Reset Passcode.');
            showMessage({
                message: 'StreetName',
                description: 'Please enter the Street Name.',
                type: 'danger'
            });
            return;
        }
        if (!this.state.Postcode || this.state.Postcode.trim() == '') {
            console.log('DEBUG: Reset Passcode.');
            showMessage({
                message: 'Postcode',
                description: 'Please enter the Post code.',
                type: 'danger'
            });
            return;
        }
        if (!this.state.Suburb || this.state.Suburb.trim() == '') {
            console.log('DEBUG: Reset Passcode.');
            showMessage({
                message: 'Suburb ',
                description: 'Please enter the Suburb.',
                type: 'danger'
            });
            return;
        }
        if (!this.state.State || this.state.State.trim() == '') {
            console.log('DEBUG: Reset Passcode.');
            showMessage({
                message: 'State ',
                description: 'Please select the State.',
                type: 'danger'
            });
            return;
        }
        if (
            !['NSW', 'VIC', 'QLD', 'SA', 'WA', 'TAS', 'NT', 'ACT', 'OTH', 'OVS'].includes(
                this.state.State.trim().toUpperCase()
            )
        ) {
            showMessage({
                message: 'Suburb ',
                description: 'Please select valied State Code.',
                type: 'danger'
            });
            return;
        }

        if (!this.state.Country || this.state.Country.trim() == ''
        ) {
            showMessage({
                message: 'Country',
                description: 'Please select Country.',
                type: 'danger'
            });
            return;
        }

        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let validEmail = re.test(
            String(this.state.SecondaryEmail).toLowerCase()
        );
        if (
            !this.state.SecondaryEmail ||
            this.state.SecondaryEmail.trim() == '' ||
            !validEmail
        ) {
            console.log('DEBUG: Reset Passcode.');
            showMessage({
                message: 'Secondary Email',
                description: 'Please enter a valid Secondary Email.',
                type: 'danger'
            });
            return;
        }
        var stateObj = this.state;
        var context = this;
        this.setState({ spinner: true });

        if (stateObj.imageToUpload) {
            this.uploadImage(function name(isSuccess) {
                context.onSettingUpdate(stateObj, context);
            });
        } else {
            context.onSettingUpdate(stateObj, context);
        }
    }

    onSettingUpdate(stateObj, context) {
        DefaultPreference.get('user_data').then(function(user_data) {
            var jsonUserData = JSON.parse(user_data);
            console.log(
                'Debug: Get user_data in reset Passcode done',
                jsonUserData
            );

            var countryValue = COUNTRY_LIST.filter(
                item => item.value == stateObj.Country
            ).map(({ label, value }) => ({ label, value }));

            var setCountryVal = countryValue.length > 0 ? countryValue[0].label : ''

            //let requestPathStdInfo='https://reqres.in/api/users?page=2&UserID='+jsonUserData.ID+'&passcode='+password.trim()+'&DeviceID='+devId
            let requestPathStdInfo =
                global.API_ENDPOINT +
                '/api/StudentAPI/UpdateStudent?UserID=' +
                jsonUserData.ID +
                '&UnitDetail=' +
                stateObj.UnitDetail +
                '&BuildingName=' +
                stateObj.BuildingName +
                '&StreetNumber=' +
                stateObj.StreetNumber +
                '&StreetName=' +
                stateObj.StreetName +
                '&Suburb=' +
                stateObj.Suburb +
                '&SecondaryEmail=' +
                stateObj.SecondaryEmail +
                '&Phone=' +
                stateObj.Phone +
                '&OfficeMobile=' +
                stateObj.OfficeMobile +
                '&Postcode=' +
                stateObj.Postcode +
                '&Country=' +
                setCountryVal +
                '&State=' +
                stateObj.State;
            console.log('DEBUG: Setting update', requestPathStdInfo);
            fetch(requestPathStdInfo, {
                method: 'GET',
                headers: {
                    Authorization: 'Bearer ' + global.session.access_token
                }
            })
                .then(stdInfoResponse => stdInfoResponse.text())
                .then(stdInfoResponseTxt => {
                    context.setState({ spinner: false });

                    console.log(
                        'DEBUG: Setting update  success. ',
                        stdInfoResponseTxt
                    );
                    let jsonPasrsedData = JSON.parse(stdInfoResponseTxt);
                    if (
                        jsonPasrsedData &&
                        jsonPasrsedData.Message == undefined
                    ) {
                        context.setState({ spinner: false });
                        showMessage({
                            message: 'Success',
                            description: 'Settings updated successfully.',
                            type: 'success'
                        });
                    } else {
                        context.setState({ spinner: false });
                        showMessage({
                            message: 'Error',
                            description:
                                jsonPasrsedData && jsonPasrsedData.Message != ''
                                    ? jsonPasrsedData.Message
                                    : 'Unknown server error. Please check your internet connection. Contact support if issue prevails.',
                            type: 'danger'
                        });
                    }
                })
                .catch(error => {
                    if (context.state.callFunction) {
                        context.setState({ callFunction: false });
                        console.log(
                            'Recall profile update --------------------------------------'
                        );
                        context.profileUpdate();
                    } else {
                        context.setState({ spinner: false });
                        console.log(
                            'DEBUG:  Setting update request failed.',
                            error
                        );
                        showMessage({
                            message: 'Error',
                            description:
                                'Unknown server error. Please check your internet connection. Contact support if issue prevails.',
                            type: 'danger'
                        });
                    }
                });
        });
    }

    onImageUpload() {
        console.log('on image uplaod clicked');
        ImagePicker.openPicker({
            multiple: false,
            waitAnimationEnd: false,
            includeExif: true,
            includeBase64: true,
            forceJpg: true
        })
            .then(image => {
                console.log('Selected img path', image);
                console.log('Image Size = ', image.size);
                if (image.size > 5000000) {
                    showMessage({
                        message: 'Max Image Size Exceeded',
                        description:
                            'Please select an image with size less than 5MB.',
                        type: 'danger',
                        duration: 3000
                    });
                } else {
                    this.setState({
                        imageToUpload: image
                    });
                    this.setState({
                        image: image.path
                    });
                }
            })
            .catch(e => alert(e));
    }

    getStateData() {
      
      var context = this;

      let requestPath =
          global.API_ENDPOINT +
          '/API/StudentAPI/GetStates';

      context.setState({ spinner: false });
      fetch(requestPath, {
          method: 'GET',
          headers: {
              Authorization: 'Bearer ' + global.session.access_token
          }
      })
          .then(response => response.text())
          .then(result => {
              context.setState({ spinner: false });
              let resultJson = JSON.parse(result);
              console.log('DEBUG: Get States request success. ', resultJson);

              var dataList =
                  resultJson && resultJson.length > 0 ? resultJson : [];

              const fetchedStates = dataList.map(item => {
                return {
                  label: item.Value,
                  value: item.Label,
                };
              });
              console.log('DEBUG: fetchedStates Data : ', fetchedStates);
              context.setState({stateItems: fetchedStates});

              this.refreshPage();
          })
          .catch(error => {
              context.setState({ spinner: false });
              showMessage({
                  message: 'Error',
                  description:
                      'Unknown server error. Please check your internet connection. Contact support if issue prevails.',
                  type: 'danger'
              });
          });
  }

    render() {
        let data = [
            {
                value: 'NSW'
            },
            {
                value: 'VIC'
            },
            {
                value: 'QLD'
            },
            {
                value: 'SA'
            },
            {
                value: 'WA'
            },
            {
                value: 'TAS'
            },
            {
                value: 'NT'
            },
            {
                value: 'ACT'
            }
        ];
        return (
          <SafeAreaView style={styles.container}>
            <HamNavigationHeader {...this.props} screenTitle="Edit Profile" />
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : null}
              style={styles.flex1}>
              <ScrollView keyboardShouldPersistTaps="always">
                <Spinner
                  visible={this.state.spinner}
                  textContent={'Loading...'}
                />
                <View style={styles.formContainer}>
                  <View style={styles.flex1}>
                    <View>
                      <Image
                        resizeMode="cover"
                        style={styles.avatar}
                        source={{uri: this.state.image}}
                      />
                      <TouchableOpacity
                        onPress={this.onImageUpload.bind(this)}
                        style={styles.avatarUploadTouch}>
                        <Image
                          source={ICON_PIC_UPLOAD}
                          resizeMode="contain"
                          style={styles.avatarUploadIcon}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={styles.inputContainer}>
                    <Text style={styles.inputLabelText}>Primary Email</Text>
                    <OutlinedTextInput
                      textInputProps={{
                        editable: false,
                        selectTextOnFocus: false,
                        placeholder: 'Primary Email',
                        keyboardType: 'email-address',
                        value: this.state.PrimaryEmail,
                      }}
                      onChangeText={text =>
                        this.setState({
                          PrimaryEmail: text,
                        })
                      }
                    />
                  </View>
                  <View style={styles.inputContainer}>
                    <Text style={styles.inputLabelText}>Secondary Email</Text>
                    <OutlinedTextInput
                      textInputProps={{
                        placeholder: 'Secondary Email',
                        keyboardType: 'email-address',
                        value: this.state.SecondaryEmail,
                        onSubmitEditing: () => {
                          this.unitTextInput.focus();
                        },
                      }}
                      onChangeText={text =>
                        this.setState({
                          SecondaryEmail: text,
                        })
                      }
                    />
                  </View>
                  <View style={styles.inputContainer}>
                    <Text style={styles.inputLabelText}>Unit Details</Text>
                    <OutlinedTextInput
                      textInputProps={{
                        ref: input => {
                          this.unitTextInput = input;
                        },
                        placeholder: 'Unit Details',
                        value: this.state.UnitDetail,
                        onSubmitEditing: () => {
                          this.buildingTextInput.focus();
                        },
                      }}
                      onChangeText={text =>
                        this.setState({
                          UnitDetail: text,
                        })
                      }
                    />
                  </View>
                  <View style={styles.inputContainer}>
                    <Text style={styles.inputLabelText}>Building Name</Text>
                    <OutlinedTextInput
                      textInputProps={{
                        ref: input => {
                          this.buildingTextInput = input;
                        },
                        placeholder: 'Building Name',
                        value: this.state.BuildingName,
                        onSubmitEditing: () => {
                          this.streetNoTextInput.focus();
                        },
                      }}
                      onChangeText={text =>
                        this.setState({
                          BuildingName: text,
                        })
                      }
                    />
                  </View>
                  <View style={styles.inputContainer}>
                    <Text style={styles.inputLabelText}>Street No.</Text>
                    <OutlinedTextInput
                      textInputProps={{
                        ref: input => {
                          this.streetNoTextInput = input;
                        },
                        placeholder: 'Street No.',
                        value: this.state.StreetNumber,
                        onSubmitEditing: () => {
                          this.streetNameTextInput.focus();
                        },
                      }}
                      onChangeText={text =>
                        this.setState({
                          StreetNumber: text,
                        })
                      }
                    />
                  </View>
                  <View style={styles.inputContainer}>
                    <Text style={styles.inputLabelText}>Street Name</Text>
                    <OutlinedTextInput
                      textInputProps={{
                        ref: input => {
                          this.streetNameTextInput = input;
                        },
                        placeholder: 'Street Name',
                        value: this.state.StreetName,
                        onSubmitEditing: () => {
                          this.postCodeTextInput.focus();
                        },
                      }}
                      onChangeText={text =>
                        this.setState({
                          StreetName: text,
                        })
                      }
                    />
                  </View>
                  <View style={styles.inputContainer}>
                    <Text style={styles.inputLabelText}>Post Code</Text>
                    <OutlinedTextInput
                      textInputProps={{
                        ref: input => {
                          this.postCodeTextInput = input;
                        },
                        keyboardType: 'numeric',
                        placeholder: 'Post Code',
                        value: this.state.Postcode,
                        onSubmitEditing: () => {
                          this.suburbTextInput.focus();
                        },
                      }}
                      onChangeText={text =>
                        this.setState({
                          Postcode: text,
                        })
                      }
                    />
                  </View>

                  <View style={styles.inputContainer}>
                    <Text style={styles.inputLabelText}>Suburb</Text>
                    <OutlinedTextInput
                      textInputProps={{
                        ref: input => {
                          this.suburbTextInput = input;
                        },
                        placeholder: 'Suburb',
                        value: this.state.Suburb,
                        onSubmitEditing: () => {
                          this.stateTextInput.togglePicker();
                        },
                      }}
                      onChangeText={text =>
                        this.setState({
                          Suburb: text,
                        })
                      }
                    />
                  </View>
                  <View style={styles.inputContainer}>
                    <Text style={styles.inputLabelText}>State</Text>
                    <View style={styles.pickerContainer}>
                      <RNPickerSelect
                        ref={input => {
                          this.stateTextInput = input;
                        }}
                        items={this.state.stateItems}
                        placeholder={statePlaceholder}
                        onValueChange={value => {
                          console.log('Selected img path_', value);
                          if(value == null || value == "OVS"){
                            this.setState({
                                State: value,
                                Country: '',
                                countryEnable: false
                              })
                          } else {
                            this.setState({
                                State: value,
                                Country: 'AU',
                                countryEnable: true
                              })
                          }
                          this.forceUpdate();
                        }}
                        style={{
                          ...pickerSelectStyles,
                          placeholder: styles.pickerPlaceholder,
                        }}
                        value={this.state.State}
                        onUpArrow={() => {
                          this.suburbTextInput.focus();
                        }}
                        onDownArrow={() => {
                          this.phoneTextInput.focus();
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
                  </View>
                  {/* <View style={styles.inputContainer}>
                                <Text style={styles.inputLabelText}>
                                    Country
                                </Text>
                                <OutlinedTextInput
                                    textInputProps={{
                                       // editable: false,
                                        placeholder: 'Country',
                                        value: 'Australia'
                                    }}
                                />
                            </View> */}
                  <View style={styles.inputContainer}>
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
                        disabled={this.state.countryEnable}
                        items={COUNTRY_LIST}
                        placeholder={countryPlaceholder}
                        onValueChange={value => {
                          this.setState({
                            Country: value,
                          });
                        }}
                        value={this.state.Country}
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
                  </View>
                  <View style={styles.inputContainer}>
                    <Text style={styles.inputLabelText}>Phone</Text>
                    <OutlinedTextInput
                      textInputProps={{
                        ref: input => {
                          this.phoneTextInput = input;
                        },
                        keyboardType: 'number-pad',
                        placeholder: 'Phone',
                        value: this.state.Phone,
                      }}
                      onChangeText={text =>
                        this.setState({
                          Phone: text,
                        })
                      }
                    />
                  </View>
                  <View style={styles.inputContainer}>
                    <Text style={styles.inputLabelText}>Office Phone</Text>
                    <OutlinedTextInput
                      textInputProps={{
                        ref: input => {
                          this.phoneTextInput = input;
                        },
                        keyboardType: 'number-pad',
                        placeholder: 'Office Phone',
                        value: this.state.OfficeMobile,
                      }}
                      onChangeText={text =>
                        this.setState({
                          OfficeMobile: text,
                        })
                      }
                    />
                  </View>
                  <View style={styles.actionContainer}>
                    <ContainedButton
                      onPress={this.onPressProfileUpdate.bind(this)}
                      label="UPDATE"
                    />
                  </View>
                </View>
              </ScrollView>
            </KeyboardAvoidingView>
          </SafeAreaView>
        );
    }
}

export const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        height: scale(60),
        width: '100%',
        fontFamily: Fonts.medium,
        fontSize: NormalizeText(14),
        color: Colors.TEXT.PRIMARY_COLOR,
        alignItems: 'center',
        padding: Spacing.x20
    },
    inputAndroid: {
        height: scale(60),
        width: '100%',
        fontFamily: Fonts.medium,
        fontSize: NormalizeText(14),
        color: Colors.TEXT.PRIMARY_COLOR,
        alignItems: 'center',
        padding: Spacing.x20
    }
});

export default Search;

/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
import React, { Component, useState } from 'react';
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
    Alert
} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import Spinner from 'react-native-loading-spinner-overlay';
import ImagePicker from 'react-native-image-crop-picker';
import { showMessage } from 'react-native-flash-message';
import EntypoIcons from 'react-native-vector-icons/Entypo';
import RNPickerSelect from 'react-native-picker-select';
import { RFValue } from 'react-native-responsive-fontsize';
import CheckBox from 'react-native-check-box';
import DatePicker from 'react-native-datepicker';
import {
    actions,
    RichEditor,
    RichToolbar
} from 'react-native-pell-rich-editor';
import Buttons from '../../uiElements/Buttons/RoundButtons';
import ADD_LINK from '../../uiElements/AddLink';
import { COUNTRY_LIST } from '../../../Utility/countryList';
import { MAIN_FONT } from '../../../Utility/FontsStyle/font';

const imageWidth = Dimensions.get('window').width;

const phizIcon = require('../../../images/phiz.png');

const DismissKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        {' '}
        {children}
    </TouchableWithoutFeedback>
);

const countryPlaceholder = {
    label: 'Select Country*',
    value: null,
    color: Colors.TEXT.PLACEHOLDER_COLOR
};
const jobCategoryPlaceholder = {
    label: 'Select Job Category*',
    value: null,
    color: Colors.TEXT.PLACEHOLDER_COLOR
};
import NavigationHeader from '../../uiElements/NavigationHeader';
import { styles, pickerSelectStyles } from './styles';
import { OutlinedTextInput } from '../../uiElements/TextInput';
import {
    Colors,
    Fonts,
    NormalizeText,
    Spacing,
    verticalScale
} from '../../../../styles';
import { ContainedButton } from '../../uiElements/Button';

const ICON_CALENDAR = require('../../../../assets/images/calendar.png');
class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogged: false,
            visible: true,
            spinner: false,
            showLinkPopup: false,
            isCurrentViewCustomerDetail: true,
            showCustomerDetails: false,
            CustomerName: '',
            ContactName: '',
            AddressLine1: '',
            AddressLine2: '',
            country: '',
            webSite: '',
            email: '',
            Phone: '',
            coveringLetter: false,
            jobTitle: '',
            jobDescription: '',
            duties: '',
            requierments: '',
            date: '',
            webUrl: '',
            jobCategoryList: [],
            JobCatID: ''
            // CustomerName: 'asd',
            // ContactName: 'ad',
            // AddressLine1: 'zcc',
            // AddressLine2: '',
            // country: 'AU',
            // webSite: 'google.com',
            // email: 'arunzz6@mailinator.com',
            // Phone: '0775324252',
            // coveringLetter: false,
            // jobTitle: 'qqwe',
            // jobDescription: 'dsdff',
            // duties: 'wee',
            // requierments: 'efew',
            // date: '2021-02-27',
            // webUrl: 'www.asd.com'
        };
    }

    componentDidMount() {
        var context = this;
        this.getJobCategoryList();
        const { TYPE, JOB_USER } = this.props.navigation.state.params; // TYPE = NEW_USER , EXISTING_USER
        if (TYPE && TYPE == 'EXISTING_USER') {
            context.setState({
                screenType: TYPE,
                isCurrentViewCustomerDetail: false,
                jobUser: JOB_USER
            });
        } else {
            context.setState({
                screenType: TYPE,
                isCurrentViewCustomerDetail: true,
                jobUser: null
            });
        }
    }

    setNewLoginUserData = loginJobUser => {
        console.log('NEW USER LOGIN--------------------------:', loginJobUser);
        if (
            loginJobUser &&
            loginJobUser.CustomerID &&
            loginJobUser.CustomerID > 0
        ) {
            this.setState({
                screenType: 'EXISTING_USER',
                jobUser: loginJobUser
            });
        }
    };

    getJobCategoryList() {
        var context = this;

        let requestPath =
            global.API_ENDPOINT + '/api/JobPostAPI/GetJobCategoryList';

        context.setState({ spinner: true });
        fetch(requestPath, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            }
        })
            .then(response => response.text())
            .then(result => {
                context.setState({ spinner: false });
                let resultJson = JSON.parse(result);
                console.log(
                    'DEBUG: Get job category request success. ',
                    resultJson
                );

                var dataList =
                    resultJson && resultJson.length > 0 ? resultJson : [];
                context.setState({ jobCategoryList: dataList });
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

    onKeyBoard = () => {
        // TextInput.State.currentlyFocusedField() && this.setState({emojiVisible: false});
    };

    editorInitializedCallback() {
        console.log('Toolbar click, selected items (insert end callback):');
        this.richText.registerToolbar(function(items) {
            console.log(
                'Toolbar click, selected items (insert end callback):',
                items
            );
        });
    }

    clearContent() {
        var context = this;
        context.setState({ postTitle: '', initHTML: '' });
        this.richText.setContentHTML('');
        this.richText.blurContentEditor();
    }

    isValidURL(string) {
        var res = string.match(
            /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
        );
        return res !== null;
    }

    async addCustomerDetails() {
        var context = this;
        console.log('context.state ', context.state);
        if (
            !context.state.CustomerName ||
            context.state.CustomerName.trim() == ''
        ) {
            showMessage({
                message: 'Company Name',
                description: 'Please enter the Company Name.',
                type: 'danger'
            });
            return;
        } else if (
            !context.state.ContactName ||
            context.state.ContactName.trim() == ''
        ) {
            showMessage({
                message: 'Contact Name',
                description: 'Please enter the Contact Name.',
                type: 'danger'
            });
            return;
        } else if (
            !context.state.AddressLine1 ||
            context.state.AddressLine1.trim() == ''
        ) {
            showMessage({
                message: 'Address Line1',
                description: 'Please enter the Address Line1.',
                type: 'danger'
            });
            return;
        } else if (
            !context.state.country ||
            context.state.country.trim() == ''
        ) {
            showMessage({
                message: 'Country',
                description: 'Please select Country.',
                type: 'danger'
            });
            return;
        } else if (!context.state.email || context.state.email.trim() == '') {
            showMessage({
                message: 'Email',
                description: 'Please enter the Email.',
                type: 'danger'
            });
            return;
        } else if (!context.state.Phone || context.state.Phone.trim() == '') {
            showMessage({
                message: 'Phone',
                description: 'Please enter the Phone No.',
                type: 'danger'
            });
            return;
        } else {
            const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            let validEmail = re.test(String(context.state.email.toLowerCase()));
            if (!validEmail) {
                showMessage({
                    message: 'Email',
                    description: 'Please enter a valid Email.',
                    type: 'danger'
                });
                return;
            } else if (
                context.state.webSite.trim() != '' &&
                !context.isValidURL(context.state.webSite.trim())
            ) {
                showMessage({
                    message: 'Web Site',
                    description: 'Please enter a valid Web Site.',
                    type: 'danger'
                });
                return;
            } else {
                //
                Keyboard.dismiss();
                context.onCheckIsExisingUser(
                    context,
                    true,
                    context.state.email.toLowerCase()
                );
            }
        }
    }

    async addJobPost() {
        var context = this;
        var postData = {};

        if (context.state.screenType == 'NEW_USER') {
            postData.CustomerName = context.state.CustomerName.trim();
            postData.ContactName = context.state.ContactName.trim();
            postData.AddressLine1 = context.state.AddressLine1.trim();
            postData.AddressLine2 = context.state.AddressLine2.trim();
            postData.CountryCode = context.state.country.trim();
            postData.WebSite = context.state.webSite.trim();
            postData.Email = context.state.email.toLowerCase();
            postData.TelNo = context.state.Phone.trim();
            postData.IsCoveringLetterRequired = context.state.coveringLetter;
        }

        let html = await context.richText.getContentHtml();
        if (!context.state.JobCatID || isNaN(context.state.JobCatID)) {
            console.log('context.JobCatID ', context.state.JobCatID);
            showMessage({
                message: 'Job Category',
                description: 'Please select Job Category.',
                type: 'danger'
            });
            return;
        } else if (
            !context.state.jobTitle ||
            context.state.jobTitle.trim() == ''
        ) {
            showMessage({
                message: 'Job Title',
                description: 'Please enter the Job Title.',
                type: 'danger'
            });
            return;
        } else if (
            !context.state.jobDescription ||
            context.state.jobDescription.trim() == ''
        ) {
            showMessage({
                message: 'Job Description',
                description: 'Please enter the Job Description.',
                type: 'danger'
            });
            return;
        } else if (!context.state.duties || context.state.duties.trim() == '') {
            showMessage({
                message: 'Duties',
                description: 'Please enter the Duties.',
                type: 'danger'
            });
            return;
        } else if (
            !context.state.requierments ||
            context.state.requierments.trim() == ''
        ) {
            showMessage({
                message: 'Requierments',
                description: 'Please enter the Requierments.',
                type: 'danger'
            });
            return;
        } else if (!context.state.date || context.state.date.trim() == '') {
            showMessage({
                message: 'Expire Date',
                description: 'Please enter the Expire Date.',
                type: 'danger'
            });
            return;
        } else if (!html || html.trim() == '') {
            showMessage({
                message: 'Job Post Content',
                description: 'Please enter the Job Post Content.',
                type: 'danger'
            });
            return;
        } else {
            if (
                context.state.webUrl.trim() != '' &&
                !context.isValidURL(context.state.webUrl.trim())
            ) {
                showMessage({
                    message: 'Web Url',
                    description: 'Please enter a valid Web Url.',
                    type: 'danger'
                });
                return;
            } else {
                Keyboard.dismiss();

                postData.JobTitle = context.state.jobTitle.trim();
                postData.JobDescription = context.state.jobDescription.trim();
                postData.Duties = context.state.duties.trim();
                postData.Requierments = context.state.requierments.trim();
                postData.ExpireDate = context.state.date.trim();
                postData.WebUrl = context.state.webUrl.trim();
                postData.AddionalInfo = html;
                postData.JobCatID = context.state.JobCatID;

                var navigation = context.props.navigation;
                if (context.state.screenType == 'EXISTING_USER') {
                    postData.CustomerID = context.state.jobUser.CustomerID;
                    navigation.navigate('JobPostSummary', {
                        TYPE: context.state.screenType,
                        JOB_POST: postData,
                        JOB_CATEGORY_LIST: context.state.jobCategoryList
                    }); // TYPE = NEW_USER , EXISTING_USER
                } else {
                    navigation.navigate('JobPostSummary', {
                        TYPE: context.state.screenType,
                        JOB_POST: postData,
                        JOB_CATEGORY_LIST: context.state.jobCategoryList
                    }); // TYPE = NEW_USER , EXISTING_USER
                }
            }
        }
    }

    onCheckIsExisingUser(context, isSubmitPost, emailAddress) {
        let requestPath =
            global.API_ENDPOINT +
            '/api/JobPostAPI/IsExisingUser?email=' +
            emailAddress;

        console.log('DEBUG: IsExisingUser', requestPath);
        fetch(requestPath, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            }
        })
            .then(response => response.text())
            .then(responseTxt => {
                console.log('DEBUG: IsExisingUser RES ', responseTxt);
                if (responseTxt == true || responseTxt == 'true') {
                    Alert.alert(
                        'Email already exists',
                        'This email already exists. Please try a diffferent email address or login to your existing email',
                        [
                            {
                                text: 'Change Email',
                                onPress: () => this.onPressClearEmail()
                            },
                            {
                                text: 'Login',
                                onPress: () => this.onPressGotoLogin()
                            }
                        ],
                        { cancelable: false }
                    );
                } else {
                    if (isSubmitPost) {
                        // var navigation = context.props.navigation;
                        // navigation.navigate('JobPostSummary', { TYPE: context.state.screenType, JOB_POST: postData }); // TYPE = NEW_USER , EXISTING_USER

                        context.setState({
                            isCurrentViewCustomerDetail: false
                        });
                    }
                }
            })
            .catch(error => {
                console.log('DEBUG: Add post request failed.', error);
                showMessage({
                    message: 'Error',
                    description:
                        'Unknown server error. Please check your internet connection. Contact support if issue prevails.',
                    type: 'danger'
                });
            });
    }

    onPressGotoLogin = () => {
        this.props.navigation.navigate('JobPostLogin', {
            TYPE: 'ADD_POST',
            onGoBack: loginJobUser => {
                this.setNewLoginUserData(loginJobUser);
            }
        }); // TYPE = POST_LIST , ADD_POST
    };

    onPressClearEmail = () => {
        this.setState({ email: '' });
    };

    /**
     * editor change data
     * @param {string} html
     */
    // handleChange(html) {
    handleChange = html => {};

    /**
     * editor height change
     * @param {number} height
     */
    handleHeightChange(height) {
        console.log('editor height change:', height);
    }

    onPressAddImage() {
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
                if (image.size > 1000000) {
                    showMessage({
                        message: 'Max Image Size Exceeded',
                        description:
                            'Please select an image with size less than 1MB.',
                        type: 'danger',
                        duration: 3000
                    });
                } else {
                    this.richText.insertImage(
                        `data:${image.mime};base64,${image.data}`
                    );
                    this.richText.blurContentEditor();
                }
            })
            .catch(e => alert(e));
    }

    onInsertLink() {
        this.setState({ showLinkPopup: true });
    }

    onLinkDone = (title, url) => {
        var context = this;
        context.setState({ showLinkPopup: false });
        if (title != '' && url != '') {
            this.richText.insertLink(title, url);
        }
    };

    onPressShowHideCustomerDetails = () => {
        this.setState({ showCustomerDetails: !this.state.showCustomerDetails });
    };

    render() {
        const {
            screenType,
            isCurrentViewCustomerDetail,
            currentPost,
            pageTitle,
            buttonText,
            postTitle,
            initHTML
        } = this.state;

        return (
            <View style={styles.container}>
                <SafeAreaView style={styles.flex1}>
                    <NavigationHeader
                        {...this.props}
                        screenTitle={
                            isCurrentViewCustomerDetail ? '' : 'Add Job'
                        }
                    />
                    <KeyboardAvoidingView
                        behavior={Platform.OS === 'ios' ? 'padding' : null}
                        style={styles.flex1}>
                        <Spinner
                            visible={this.state.spinner}
                            textContent={'Loading...'}
                        />

                        {isCurrentViewCustomerDetail ? (
                            // New User Details view
                            <ScrollView keyboardShouldPersistTaps="handled">
                                <View style={styles.centerView}>
                                    <Image
                                        style={styles.logoImage}
                                        source={require('../../../../assets/images/evolution_logo.png')}
                                        resizeMode="contain"
                                    />
                                    <Text style={styles.titleText}>
                                        Employer Registration
                                    </Text>
                                </View>
                                <View style={styles.formView}>
                                    <OutlinedTextInput
                                        textInputProps={{
                                            placeholder: 'Company Name*',
                                            value: this.state.CustomerName
                                        }}
                                        onChangeText={text =>
                                            this.setState({
                                                CustomerName: text
                                            })
                                        }
                                    />
                                    <View style={styles.H20} />
                                    <OutlinedTextInput
                                        textInputProps={{
                                            placeholder: 'Contact Name*',
                                            value: this.state.ContactName
                                        }}
                                        onChangeText={text =>
                                            this.setState({
                                                ContactName: text
                                            })
                                        }
                                    />
                                    <View style={styles.H20} />
                                    <OutlinedTextInput
                                        textInputProps={{
                                            placeholder: 'Address Line 1*',
                                            value: this.state.AddressLine1
                                        }}
                                        onChangeText={text =>
                                            this.setState({
                                                AddressLine1: text
                                            })
                                        }
                                    />
                                    <View style={styles.H20} />
                                    <OutlinedTextInput
                                        textInputProps={{
                                            placeholder: 'Address Line 2',
                                            value: this.state.AddressLine2
                                        }}
                                        onChangeText={text =>
                                            this.setState({
                                                AddressLine2: text
                                            })
                                        }
                                    />
                                    <View style={styles.H20} />
                                    <View style={styles.pickerContainer}>
                                        <RNPickerSelect
                                            ref={input => {
                                                this.stateTextInput = input;
                                            }}
                                            style={{
                                                ...pickerSelectStyles,
                                                placeholder:
                                                    styles.pickerPlaceholder
                                            }}
                                            items={COUNTRY_LIST}
                                            placeholder={countryPlaceholder}
                                            onValueChange={value => {
                                                this.setState({
                                                    country: value
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
                                                        color={
                                                            Colors.INPUT_BORDER_COLOR
                                                        }
                                                        style={
                                                            styles.pickerIcon
                                                        }
                                                    />
                                                );
                                            }}
                                        />
                                    </View>
                                    <View style={styles.H20} />
                                    <OutlinedTextInput
                                        textInputProps={{
                                            placeholder: 'Web Site',
                                            value: this.state.webSite
                                        }}
                                        onChangeText={text =>
                                            this.setState({
                                                webSite: text
                                            })
                                        }
                                    />
                                    <View style={styles.H20} />
                                    <OutlinedTextInput
                                        textInputProps={{
                                            keyboardType: 'email-address',
                                            placeholder: 'E-Mail*',
                                            value: this.state.email
                                        }}
                                        onChangeText={text =>
                                            this.setState({
                                                email: text
                                            })
                                        }
                                    />
                                    <View style={styles.H20} />
                                    <OutlinedTextInput
                                        textInputProps={{
                                            keyboardType: 'number-pad',
                                            placeholder: 'Phone*',
                                            value: this.state.Phone
                                        }}
                                        onChangeText={text =>
                                            this.setState({
                                                Phone: text
                                            })
                                        }
                                    />
                                    <View style={styles.H20} />
                                    <CheckBox
                                        style={styles.checkBox}
                                        rightTextStyle={styles.checkBoxText}
                                        onClick={() => {
                                            this.setState({
                                                coveringLetter: !this.state
                                                    .coveringLetter
                                            });
                                        }}
                                        isChecked={this.state.coveringLetter}
                                        checkedImage={
                                            <Image
                                                style={styles.checkedIcon}
                                                source={require('../../../images/checked.png')}
                                            />
                                        }
                                        unCheckedImage={
                                            <Image
                                                style={styles.unCheckedIcon}
                                                source={require('../../../images/uncheck.png')}
                                            />
                                        }
                                        rightText={'Covering Letter Required'}
                                    />
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
                        ) : (
                            <View style={styles.flex1}>
                                <ScrollView keyboardShouldPersistTaps="handled">
                                    <View style={styles.formView}>
                                        <View style={styles.pickerContainer}>
                                            <RNPickerSelect
                                                ref={input => {
                                                    this.stateTextInput = input;
                                                }}
                                                style={{
                                                    ...pickerSelectStyles,
                                                    placeholder:
                                                        styles.pickerPlaceholder
                                                }}
                                                items={this.state.jobCategoryList.map(
                                                    obj => ({
                                                        key: obj.JobCatID,
                                                        label: obj.JobCatName,
                                                        value: obj.JobCatID
                                                    })
                                                )}
                                                placeholder={
                                                    jobCategoryPlaceholder
                                                }
                                                onValueChange={value => {
                                                    this.setState({
                                                        JobCatID: value
                                                    });
                                                }}
                                                value={this.state.JobCatID}
                                                Icon={() => {
                                                    return (
                                                        <EntypoIcons
                                                            name="chevron-thin-down"
                                                            size={16}
                                                            color={
                                                                Colors.INPUT_BORDER_COLOR
                                                            }
                                                            style={
                                                                styles.pickerIcon
                                                            }
                                                        />
                                                    );
                                                }}
                                            />
                                        </View>
                                        <View style={styles.H20} />
                                        <OutlinedTextInput
                                            textInputProps={{
                                                placeholder: 'Job Title*',
                                                value: this.state.jobTitle
                                            }}
                                            onChangeText={text =>
                                                this.setState({
                                                    jobTitle: text
                                                })
                                            }
                                        />
                                        <View
                                            style={[
                                                styles.inputContainer,
                                                styles.textAreaHeight
                                            ]}>
                                            <TextInput
                                                multiline
                                                style={styles.textAreaText}
                                                placeholder="Job Discription*"
                                                value={
                                                    this.state.jobDescription
                                                }
                                                onChangeText={text =>
                                                    this.setState({
                                                        jobDescription: text
                                                    })
                                                }
                                            />
                                        </View>
                                        <View
                                            style={[
                                                styles.inputContainer,
                                                styles.textAreaHeight
                                            ]}>
                                            <TextInput
                                                multiline
                                                style={styles.textAreaText}
                                                placeholder="Duties*"
                                                value={this.state.duties}
                                                onChangeText={text =>
                                                    this.setState({
                                                        duties: text
                                                    })
                                                }
                                            />
                                        </View>
                                        <View style={styles.H20} />
                                        <OutlinedTextInput
                                            textInputProps={{
                                                placeholder: 'Requierments*',
                                                value: this.state.requierments
                                            }}
                                            onChangeText={text =>
                                                this.setState({
                                                    requierments: text
                                                })
                                            }
                                        />
                                        <View
                                            style={styles.datePickerContainer}>
                                            <DatePicker
                                                style={styles.width100}
                                                date={this.state.date}
                                                mode="date"
                                                placeholder={'Expire Date*'}
                                                format="YYYY-MM-DD"
                                                minDate={new Date()}
                                                confirmBtnText="Confirm"
                                                cancelBtnText="Cancel"
                                                iconSource={ICON_CALENDAR}
                                                customStyles={{
                                                    dateIcon: {
                                                        width: 24,
                                                        height: 24
                                                    },
                                                    dateInput: {
                                                        alignItems:
                                                            'flex-start',
                                                        borderWidth: 0
                                                    },
                                                    placeholderText: {
                                                        fontFamily:
                                                            Fonts.medium,
                                                        fontSize: NormalizeText(
                                                            14
                                                        ),
                                                        color:
                                                            Colors.TEXT
                                                                .PLACEHOLDER_COLOR
                                                    },
                                                    dateText: {
                                                        fontFamily:
                                                            Fonts.medium,
                                                        fontSize: NormalizeText(
                                                            14
                                                        ),
                                                        color:
                                                            Colors.TEXT
                                                                .PRIMARY_COLOR
                                                    }
                                                }}
                                                onDateChange={date => {
                                                    this.setState({
                                                        date,
                                                        dateRequired: false,
                                                        timeRequired: false
                                                    });
                                                }}
                                            />
                                        </View>
                                        <View style={styles.H20} />
                                        <OutlinedTextInput
                                            textInputProps={{
                                                placeholder: 'Web Url',
                                                value: this.state.webUrl
                                            }}
                                            onChangeText={text =>
                                                this.setState({
                                                    webUrl: text
                                                })
                                            }
                                        />
                                        <View>
                                            <RichEditor
                                                editorStyle={
                                                    styles.richTextEditor
                                                }
                                                containerStyle={
                                                    styles.richTextAreaContainer
                                                }
                                                ref={r => {
                                                    this.richText = r;
                                                }}
                                                style={styles.richTextArea}
                                                placeholder={
                                                    'Job Post Content*'
                                                }
                                                initialContentHTML={initHTML}
                                                editorInitializedCallback={() =>
                                                    this.editorInitializedCallback()
                                                }
                                                onChange={this.handleChange}
                                                onHeightChange={
                                                    this.handleHeightChange
                                                }
                                            />
                                        </View>
                                    </View>
                                </ScrollView>
                                <View style={styles.bottomContainer}>
                                    <RichToolbar
                                        style={styles.toolbar}
                                        getEditor={() => this.richText}
                                        iconTint={Colors.TOOLBAR_TINT_COLOR}
                                        selectedIconTint={'#2095F2'}
                                        disabledIconTint={'#8b8b8b'}
                                        onPressAddImage={() =>
                                            this.onPressAddImage()
                                        }
                                        onInsertLink={() => this.onInsertLink()}
                                        iconSize={24} // default 50
                                        actions={[
                                            actions.keyboard,
                                            actions.undo,
                                            actions.redo,
                                            actions.insertImage,
                                            actions.insertLink,
                                            actions.setStrikethrough,
                                            actions.checkboxList,
                                            actions.insertOrderedList,
                                            actions.blockquote,
                                            actions.alignLeft,
                                            actions.alignCenter,
                                            actions.alignRight,
                                            actions.code,
                                            actions.line,
                                            actions.heading1,
                                            actions.heading4
                                        ]}
                                        iconMap={{
                                            insertEmoji: phizIcon,
                                            [actions.heading1]: ({
                                                tintColor
                                            }) => (
                                                <Text
                                                    style={[
                                                        styles.tib,
                                                        { color: tintColor }
                                                    ]}>
                                                    H1
                                                </Text>
                                            ),
                                            [actions.heading4]: ({
                                                tintColor
                                            }) => (
                                                <Text
                                                    style={[
                                                        styles.tib,
                                                        { color: tintColor }
                                                    ]}>
                                                    H3
                                                </Text>
                                            )
                                        }}
                                    />
                                    <View style={styles.actionContainer}>
                                        <ContainedButton
                                            onPress={() => {
                                                this.addJobPost();
                                            }}
                                            label="CONTINUE"
                                        />
                                    </View>
                                </View>
                            </View>
                        )}
                    </KeyboardAvoidingView>
                </SafeAreaView>
                {this.state.showLinkPopup ? (
                    <View style={styles.linkPopupBaseView}>
                        <ADD_LINK onPressClose={this.onLinkDone} />
                    </View>
                ) : null}
            </View>
        );
    }
}

export default Search;

import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    Dimensions,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    Linking,
    KeyboardAvoidingView,
    Keyboard,
    BackHandler,
    TouchableWithoutFeedback,
    Platform
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import DocumentPicker from 'react-native-document-picker';
import Spinner from 'react-native-loading-spinner-overlay';
import DefaultPreference from 'react-native-default-preference';
import moment from 'moment';
import { showMessage } from 'react-native-flash-message';
import CheckBox from 'react-native-check-box';

import {
    actions,
    RichEditor,
    RichToolbar
} from 'react-native-pell-rich-editor';
import HTML from 'react-native-render-html';
import ADD_LINK from '../../uiElements/AddLink';
import styles from './styles';
import NavigationHeader from '../../uiElements/NavigationHeader';
import { scale, Colors } from '../../../../styles';
import { OutlinedTextInput } from '../../uiElements/TextInput';
import { ContainedButton } from '../../uiElements/Button';
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
        this.page = 1;
        this.loadAllData = false;
        this.state = {
            spinner: false,
            isRefreshing: false,
            showLinkPopup: false,
            error: '',
            UglyWordsList: [],
            commentList: [],
            jobPost: {},
            coveringLetter: true,
            name: '',
            email: '',
            phone: '',
            resumeName: '',
            resumeUrl: '',
            resumeFile: null,
            coveringLetterName: '',
            coveringLetterUrl: '',
            coveringLetterFile: null,
            initHTML: ''
        };
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }

    componentDidMount() {
        var context = this;
        const { JOB_POST } = this.props.navigation.state.params;
        context.setState({
            spinner: false,
            isRefreshing: false,
            error: '',
            jobPost: JOB_POST
        });

        this.updateData();
        // this.props.navigation.addListener('didFocus', () => {
        //   this.updateData();
        // });
    }

    updateData() {
        var context = this;
        DefaultPreference.get('user_data').then(function(user_data) {
            let userData = JSON.parse(user_data);
            console.log(
                'XXXXXXXXXXX-----------------------------------------------.',
                userData
            );
            context.setState({
                name: userData.Name,
                email: userData.eMail,
                phone: userData.Phone
            });
        });
    }

    componentWillMount() {
        BackHandler.addEventListener(
            'hardwareBackPress',
            this.handleBackButtonClick
        );
    }

    componentWillUnmount() {
        BackHandler.removeEventListener(
            'hardwareBackPress',
            this.handleBackButtonClick
        );
    }

    handleBackButtonClick() {
        this.onPressGoBack();
        return true;
    }

    editorInitializedCallback() {
        console.log('Toolbar click, selected items (insert end callback):');
        this.richText.registerToolbar(function(items) {
            console.log(
                'Toolbar click, selected items (insert end callback):',
                items
            );
        });
    }

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

    handleCheckNewComment(context, newComment) {
        return context.state.commentList(
            item => newComment.CommentID === item.CommentID
        );
    }

    onPressGoBack = () => {
        // this.props.navigation.state.params.onGoBack(this.state.currentPostIndex, this.state.currentPost);
        this.props.navigation.goBack();
    };

    onPressLike = () => {};

    onPressComment = () => {
        this.commentTextInput.focus();
    };

    onPressAddNewComment = () => {};

    onPressApplyButton() {}

    openUrl = url => {
        var urlUpdated = url;
        if (!url.startsWith('http')) {
            urlUpdated = 'http://' + url;
        }
        Linking.openURL(urlUpdated);
    };

    async onPressUploadResume() {
        try {
            const res = await DocumentPicker.pick({
                type: [
                    DocumentPicker.types.pdf,
                    DocumentPicker.types.doc,
                    DocumentPicker.types.docx,
                    DocumentPicker.types.ppt,
                    DocumentPicker.types.pptx
                ]
            });
            console.log(
                res.uri,
                res.type, // mime type
                res.name,
                res.size
            );

            this.setState({
                resumeName: res.name,
                resumeUrl: res.uri,
                resumeFile: res
            });
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                // User cancelled the picker, exit any dialogs or menus and move on
            } else {
                throw err;
            }
        }
    }

    async onPressUploadCoveringLetter() {
        try {
            const res = await DocumentPicker.pick({
                type: [
                    DocumentPicker.types.pdf,
                    DocumentPicker.types.doc,
                    DocumentPicker.types.docx,
                    DocumentPicker.types.ppt,
                    DocumentPicker.types.pptx
                ]
            });
            console.log(
                res.uri,
                res.type, // mime type
                res.name,
                res.size
            );

            this.setState({
                coveringLetterName: res.name,
                coveringLetterUrl: res.uri,
                coveringLetterFile: res
            });
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                // User cancelled the picker, exit any dialogs or menus and move on
            } else {
                throw err;
            }
        }
    }

    async applyJobPost() {
        var context = this;
        const IsCoveringLetterRequired =
            context.state.jobPost &&
            context.state.jobPost.IsCoveringLetterRequired
                ? true
                : false;

        let emailAddress = context.state.email.toLowerCase();
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let validEmail = re.test(String(emailAddress));

        var html = '';
        if (IsCoveringLetterRequired && !context.state.coveringLetter) {
            html = await this.richText.getContentHtml();
        }

        if (!context.state.name || context.state.name.trim() == '') {
            showMessage({
                message: 'Applicant Name',
                description: 'Please enter the Applicant Name.',
                type: 'danger'
            });
            return;
        } else if (!emailAddress || emailAddress.trim() == '' || !validEmail) {
            showMessage({
                message: 'Applicant Email',
                description: 'Please enter a valid Email.',
                type: 'danger'
            });
            return;
        } else if (!context.state.phone || context.state.phone.trim() == '') {
            showMessage({
                message: 'Applicant Phone No',
                description: 'Please enter the Applicant Phone No.',
                type: 'danger'
            });
            return;
        } else if (
            !context.state.resumeUrl ||
            context.state.resumeUrl.trim() == ''
        ) {
            showMessage({
                message: 'Resume',
                description: 'Please upload tha Resume.',
                type: 'danger'
            });
            return;
        } else if (
            IsCoveringLetterRequired &&
            context.state.coveringLetter &&
            (!context.state.coveringLetterUrl ||
                context.state.coveringLetterUrl.trim() == '')
        ) {
            showMessage({
                message: 'Covering Letter',
                description: 'Please upload the Covering Letter.',
                type: 'danger'
            });
            return;
        } else if (
            IsCoveringLetterRequired &&
            !context.state.coveringLetter &&
            (!html || html.trim() == '')
        ) {
            showMessage({
                message: 'Covering Letter',
                description: 'Please enter the Covering Letter.',
                type: 'danger'
            });
            return;
        } else {
            Keyboard.dismiss();

            var date = moment().format('MM/DD/YYYY');
            const formData = new FormData();
            formData.append('JobPostingID', context.state.jobPost.JobPostingID);
            formData.append('ApplicantName', context.state.name.trim());
            formData.append('ApplicantTelNo', context.state.phone.trim());
            formData.append('ApplicantEmail', emailAddress.trim());
            formData.append('ApplicantDate', date);
            formData.append('CVPath', context.state.resumeFile);

            if (IsCoveringLetterRequired) {
                if (context.state.coveringLetter) {
                    formData.append('CLPath', context.state.coveringLetterFile);
                    formData.append('CoveringLetter', '');
                } else {
                    formData.append('CLPath', '');
                    formData.append('CoveringLetter', html);
                }
            } else {
                formData.append('CLPath', '');
                formData.append('CoveringLetter', '');
            }

            console.log(
                'FORM DATA----------------------------------',
                formData
            );
            context.setState({ spinner: true });
            let requestPath = global.API_ENDPOINT + '/api/JobPostAPI/ApplyJob';

            fetch(requestPath, {
                method: 'POST',
                body: formData,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then(response => response.text())
                .then(result => {
                    console.log(
                        'FORM DATA RESPONSE----------------------------------',
                        result
                    );
                    let resultJson = JSON.parse(result);
                    context.setState({ spinner: false });
                    // if (resultJson && resultJson.Message && (resultJson.Message != "")) {
                    //   showMessage({
                    //     message: 'Error',
                    //     description: resultJson.Message,
                    //     type: 'danger',
                    //   });
                    // } else {
                    //   showMessage({
                    //     message: 'Success',
                    //     description: 'You have applied successfully.',
                    //     type: 'success',
                    //   });
                    //   context.clearContent();
                    // }

                    if (resultJson && resultJson.Message == undefined) {
                        showMessage({
                            message: 'Success',
                            description: 'You have applied successfully.',
                            type: 'success'
                        });
                        context.clearContent();
                    } else {
                        showMessage({
                            message: 'Error',
                            description:
                                resultJson && resultJson.Message != ''
                                    ? resultJson.Message
                                    : 'Unknown server error. Please check your internet connection. Contact support if issue prevails.',
                            type: 'danger'
                        });
                    }
                })
                .catch(error => {
                    context.setState({ spinner: false });
                    console.log(
                        'FORM DATA RESPONSE----------------------------------',
                        error
                    );
                    showMessage({
                        message: 'Error',
                        description:
                            'Unknown server error. Please check your internet connection. Contact support if issue prevails.',
                        type: 'danger'
                    });
                });
        }
    }

    clearContent() {
        var context = this;
        if (!context.state.coveringLetter) {
            this.richText.setContentHTML('');
            this.richText.blurContentEditor();
        }
        context.setState({
            coveringLetter: true,
            name: '',
            email: '',
            phone: '',
            resumeName: '',
            resumeUrl: '',
            resumeFile: null,
            coveringLetterName: '',
            coveringLetterUrl: '',
            coveringLetterFile: null,
            initHTML: ''
        });
    }

    render() {
        const { jobPost, initHTML } = this.state;
        const companyWebSite =
            jobPost && jobPost.customer && jobPost.customer.WebSite != ''
                ? jobPost.customer.WebSite
                : '';

        return (
            <View style={styles.container}>
                <SafeAreaView style={styles.flex1}>
                    <NavigationHeader
                        onPressBackButton={() => this.onPressGoBack()}
                        screenTitle=""
                    />
                    <KeyboardAvoidingView
                        behavior={Platform.OS === 'ios' ? 'padding' : null}
                        style={styles.flex1}>
                        <ScrollView style={styles.flex1}>
                            <Spinner
                                visible={this.state.spinner}
                                textContent={'Loading...'}
                            />
                            {jobPost.IsExpired ? (
                                <View style={styles.inactiveView}>
                                    <Text style={styles.inactiveText}>
                                        Application is filled
                                    </Text>
                                </View>
                            ) : null}
                            <View style={styles.flex1}>
                                <View style={styles.logoContainer}>
                                    <Image
                                        source={require('../../../../assets/images/ic_job.png')}
                                        resizeMode="contain"
                                        style={styles.logoImage}
                                    />
                                </View>
                                <Text style={styles.postHeaderText}>
                                    {jobPost.JobTitle}
                                </Text>
                                <View style={styles.jobItemView}>
                                    <View>
                                        <Text style={styles.titleText}>
                                            {'Description'}
                                        </Text>
                                        <Text style={styles.detailText}>
                                            {jobPost.JobDescription}
                                        </Text>
                                    </View>
                                    <View style={styles.marginT20}>
                                        <Text style={styles.titleText}>
                                            {'Duties'}
                                        </Text>
                                        <Text style={styles.detailText}>
                                            {jobPost.Duties}
                                        </Text>
                                    </View>
                                    <View style={styles.marginT20}>
                                        <Text style={styles.titleText}>
                                            {'Requierments'}
                                        </Text>
                                        <Text style={styles.detailText}>
                                            {jobPost.Requierments}
                                        </Text>
                                    </View>
                                    {jobPost.WebUrl !== '' ? (
                                        <View style={styles.marginT20}>
                                            <Text style={styles.titleText}>
                                                {'WebUrl'}
                                            </Text>
                                            <Text
                                                style={styles.detailText}
                                                onPress={() =>
                                                    this.openUrl(jobPost.WebUrl)
                                                }>
                                                {jobPost.WebUrl}
                                            </Text>
                                        </View>
                                    ) : null}

                                    {jobPost.AddionalInfo !== '' ? (
                                        <View style={styles.marginT20}>
                                            <Text style={styles.titleText}>
                                                {'Info'}
                                            </Text>
                                            <HTML
                                                containerStyle={
                                                    styles.detailHTML
                                                }
                                                html={jobPost.AddionalInfo}
                                                contentWidth={HTMLContentWidth}
                                            />
                                        </View>
                                    ) : null}
                                    <View style={styles.marginT20}>
                                        <Text style={styles.titleText}>
                                            {'Created Date'}
                                        </Text>
                                        <Text style={styles.detailText}>
                                            {moment(jobPost.EnteredOn).format(
                                                'DD/MM/YYYY'
                                            )}
                                        </Text>
                                    </View>
                                </View>
                                <View style={styles.companyItemView}>
                                    <View>
                                        <Text style={styles.titleText}>
                                            {'Company Name'}
                                        </Text>
                                        <Text style={styles.detailText}>
                                            {jobPost &&
                                                jobPost.customer &&
                                                jobPost.customer.CustomerName}
                                        </Text>
                                    </View>
                                    <View style={styles.marginT20}>
                                        <Text style={styles.titleText}>
                                            {'Contact Number'}
                                        </Text>
                                        <Text style={styles.detailText}>
                                            {jobPost &&
                                                jobPost.customer &&
                                                jobPost.customer.TelNo}
                                        </Text>
                                    </View>

                                    <View style={styles.marginT20}>
                                        <Text style={styles.titleText}>
                                            {'Email Address'}
                                        </Text>
                                        <Text style={styles.detailText}>
                                            {jobPost &&
                                                jobPost.customer &&
                                                jobPost.customer.Email}
                                        </Text>
                                    </View>
                                    {companyWebSite !== '' ? (
                                        <View style={styles.marginT20}>
                                            <Text style={styles.titleText}>
                                                {'WebSite'}
                                            </Text>
                                            <Text
                                                style={styles.detailText}
                                                onPress={() =>
                                                    this.openUrl(companyWebSite)
                                                }>
                                                {companyWebSite}
                                            </Text>
                                        </View>
                                    ) : null}
                                </View>
                                {!jobPost.IsExpired ? (
                                    <View style={styles.formView}>
                                        <Text style={styles.applyJobTitleText}>
                                            Apply to This Job
                                        </Text>
                                        <OutlinedTextInput
                                            textInputProps={{
                                                placeholder: 'Applicant Name*',
                                                value: this.state.name,
                                                onSubmitEditing: () => {
                                                    this.emailTextInput.focus();
                                                }
                                            }}
                                            onChangeText={text =>
                                                this.setState({
                                                    name: text
                                                })
                                            }
                                        />
                                        <View style={styles.H20} />
                                        <OutlinedTextInput
                                            textInputProps={{
                                                ref: input => {
                                                    this.emailTextInput = input;
                                                },
                                                keyboardType: 'email-address',
                                                placeholder:
                                                    'Applicant E-Mail*',
                                                value: this.state.email,
                                                onSubmitEditing: () => {
                                                    this.phoneTextInput.focus();
                                                }
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
                                                ref: input => {
                                                    this.phoneTextInput = input;
                                                },
                                                keyboardType: 'number-pad',
                                                placeholder:
                                                    'Applicant Phone No*',
                                                value: this.state.phone
                                            }}
                                            onChangeText={text =>
                                                this.setState({
                                                    phone: text
                                                })
                                            }
                                        />
                                        <View style={styles.H20} />
                                        <TouchableOpacity
                                            activeOpacity={0.5}
                                            style={styles.fileUploadContainer}
                                            onPress={this.onPressUploadResume}>
                                            <Text
                                                style={[
                                                    styles.fileUploadText,
                                                    {
                                                        color: this.state
                                                            .resumeName
                                                            ? Colors.TEXT
                                                                  .PRIMARY_COLOR
                                                            : Colors.TEXT
                                                                  .PLACEHOLDER_COLOR
                                                    }
                                                ]}>
                                                {this.state.resumeName
                                                    ? this.state.resumeName
                                                    : 'Browse your file'}
                                            </Text>
                                        </TouchableOpacity>

                                        {jobPost &&
                                        jobPost.IsCoveringLetterRequired ? (
                                            <View style={styles.clContainer}>
                                                <Text style={styles.clText}>
                                                    {'Covering Letter'}
                                                </Text>
                                                <CheckBox
                                                    style={styles.checkBox}
                                                    rightTextStyle={
                                                        styles.checkBoxText
                                                    }
                                                    onClick={() => {
                                                        this.setState({
                                                            coveringLetter: !this
                                                                .state
                                                                .coveringLetter
                                                        });
                                                    }}
                                                    isChecked={
                                                        this.state
                                                            .coveringLetter
                                                    }
                                                    checkedImage={
                                                        <Image
                                                            style={
                                                                styles.checkedIcon
                                                            }
                                                            source={require('../../../images/checked.png')}
                                                        />
                                                    }
                                                    unCheckedImage={
                                                        <Image
                                                            style={
                                                                styles.unCheckedIcon
                                                            }
                                                            source={require('../../../images/uncheck.png')}
                                                        />
                                                    }
                                                    rightText={
                                                        'Upload covering letter'
                                                    }
                                                />

                                                {this.state.coveringLetter ? (
                                                    <>
                                                        <View
                                                            style={styles.H20}
                                                        />
                                                        <TouchableOpacity
                                                            activeOpacity={0.5}
                                                            style={
                                                                styles.fileUploadContainer
                                                            }
                                                            onPress={
                                                                this
                                                                    .onPressUploadCoveringLetter
                                                            }>
                                                            <Text
                                                                style={[
                                                                    styles.fileUploadText,
                                                                    {
                                                                        color: this
                                                                            .state
                                                                            .coveringLetterName
                                                                            ? Colors
                                                                                  .TEXT
                                                                                  .PRIMARY_COLOR
                                                                            : Colors
                                                                                  .TEXT
                                                                                  .PLACEHOLDER_COLOR
                                                                    }
                                                                ]}>
                                                                {this.state
                                                                    .coveringLetterName
                                                                    ? this.state
                                                                          .coveringLetterName
                                                                    : 'Browse your covering letter'}
                                                            </Text>
                                                        </TouchableOpacity>
                                                    </>
                                                ) : (
                                                    <View
                                                        style={{
                                                            width: '100%',
                                                            flex: 1
                                                        }}>
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
                                                            style={
                                                                styles.richTextArea
                                                            }
                                                            placeholder={
                                                                'Please input covering letter content'
                                                            }
                                                            initialContentHTML={
                                                                initHTML
                                                            }
                                                            editorInitializedCallback={() =>
                                                                this.editorInitializedCallback()
                                                            }
                                                            onChange={
                                                                this
                                                                    .handleChange
                                                            }
                                                            onHeightChange={
                                                                this
                                                                    .handleHeightChange
                                                            }
                                                        />

                                                        <RichToolbar
                                                            style={
                                                                styles.toolbar
                                                            }
                                                            getEditor={() =>
                                                                this.richText
                                                            }
                                                            iconTint={
                                                                Colors.TOOLBAR_TINT_COLOR
                                                            }
                                                            selectedIconTint={
                                                                '#2095F2'
                                                            }
                                                            disabledIconTint={
                                                                '#8b8b8b'
                                                            }
                                                            onPressAddImage={() =>
                                                                this.onPressAddImage()
                                                            }
                                                            onInsertLink={() =>
                                                                this.onInsertLink()
                                                            }
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
                                                                [actions.heading1]: ({
                                                                    tintColor
                                                                }) => (
                                                                    <Text
                                                                        style={[
                                                                            styles.tib,
                                                                            {
                                                                                color: tintColor
                                                                            }
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
                                                                            {
                                                                                color: tintColor
                                                                            }
                                                                        ]}>
                                                                        H3
                                                                    </Text>
                                                                )
                                                            }}
                                                        />
                                                    </View>
                                                )}
                                            </View>
                                        ) : null}
                                    </View>
                                ) : null}
                                {!jobPost.IsExpired ? (
                                    <View style={styles.actionContainer}>
                                        <ContainedButton
                                            onPress={() => this.applyJobPost()}
                                            label="APPLY"
                                        />
                                    </View>
                                ) : null}
                            </View>
                        </ScrollView>
                    </KeyboardAvoidingView>
                </SafeAreaView>
                {this.state.showLinkPopup ? (
                    <View>
                        <ADD_LINK onPressClose={this.onLinkDone} />
                    </View>
                ) : null}
            </View>
        );
    }
}

export default Search;

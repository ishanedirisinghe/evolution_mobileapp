import React, { Component } from 'react';
import {
    View,
    Text,
    SafeAreaView,
    ScrollView,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
    Platform
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import ImagePicker from 'react-native-image-crop-picker';
import DefaultPreference from 'react-native-default-preference';
import { showMessage } from 'react-native-flash-message';
import {
    actions,
    RichEditor,
    RichToolbar
} from 'react-native-pell-rich-editor';
import ADD_LINK from '../../uiElements/AddLink';
import styles from './styles';
import NavigationHeader from '../../uiElements/NavigationHeader';
import { OutlinedTextInput } from '../../uiElements/TextInput';
import { Colors } from '../../../../styles';
import { ContainedButton } from '../../uiElements/Button';


const phizIcon = require('../../../images/phiz.png');
const htmlIcon = require('../../../images/h5.png');

const DismissKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        {' '}
        {children}
    </TouchableWithoutFeedback>
);
class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogged: false,
            visible: true,
            spinner: false,
            showLinkPopup: false
        };
        // this.richText = React.createRef();
    }

    onPressProfileUpdate() {
        // this.setState({ callFunction: true });
        // this.profileUpdate();
    }

    componentDidMount() {
        // Appearance.addChangeListener(this.themeChange);
        // Keyboard.addListener('keyboardDidShow', this.onKeyBoard);
        var context = this;
        const { TYPE, POST } = this.props.navigation.state.params; // TYPE = ADD , UPDATE , VIEW
        if (TYPE && TYPE == 'UPDATE') {
            // context.setState({ screenType: "UPDATE", currentPost: POST, pageTitle: "Update Post", buttonText: "Update", postTitle: "Spotify is adding users faster than it thought it would", initHTML: `<h4>Spotify is adding users faster than it thought it would</h4><div>After a short COVID-19 related slump in Q1 2020 and a rebound in Q2, Spotify saw big growth in subscriber numbers for its latest earnings period. The service now counts 320 million active and 144 million paid users, up from 299 million and 138 million last</div><div>The company took in correspondingly more revenue, pulling in €1.98 billion ($2.32 billion), or 14 percent more than last quarter. However, it still lost €101 million ($118 million).</div><div><br></div><div><ul><li>Engadget</li><li>TechCrunch</li><li>Gizmodo</li></ul><div>Everything You Need to Know About the New Google TV</div></div><div><br><div><img src="https://www.sheldonbrown.com/images/scb_eagle_contact.jpeg"</div><br></div>` })
            context.setState({
                screenType: 'UPDATE',
                currentPost: POST,
                pageTitle: 'Update Post',
                buttonText: 'Update',
                postTitle: POST && POST.PostTitle ? POST.PostTitle : '',
                initHTML: POST && POST.PostContent ? POST.PostContent : ''
            });
        } else if (TYPE && TYPE == 'VIEW') {
            context.setState({
                screenType: 'VIEW',
                currentPost: POST,
                pageTitle: 'View Post',
                buttonText: '',
                postTitle: POST && POST.PostTitle ? POST.PostTitle : '',
                initHTML: POST && POST.PostContent ? POST.PostContent : ''
            });
        } else {
            context.setState({
                screenType: 'ADD',
                currentPost: null,
                pageTitle: 'Add Post',
                buttonText: 'Add',
                postTitle: '',
                initHTML: ''
            });
        }
    }

    // componentWillUnmount() {
    //     // Appearance.removeChangeListener(this.themeChange);
    //     Keyboard.removeListener('keyboardDidShow', this.onKeyBoard);
    // }

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

    async save() {
        let html = await this.richText.getContentHtml();

        if (!this.state.postTitle || this.state.postTitle.trim() == '') {
            showMessage({
                message: 'Post Title',
                description: 'Please enter the Post Title.',
                type: 'danger'
            });
            return;
        }

        if (!html || html.trim() == '') {
            showMessage({
                message: 'Post Content',
                description: 'Please enter the Post Content.',
                type: 'danger'
            });
            return;
        }

        Keyboard.dismiss();
        var stateObj = this.state;
        var context = this;
        this.setState({ spinner: true });

        // html = html.replace(`src="`, "src=\'");
        // html = html.replace(`">`, "\'>");

        console.log(
            'Create post Content ------------------------------- : ',
            html
        );

        if (stateObj.screenType == 'ADD') {
            context.onCreateNewPost(context, stateObj.postTitle, html);
        } else {
            context.onUpdatePost(
                context,
                stateObj.currentPost.PostID,
                stateObj.postTitle,
                html
            );
        }
    }

    onCreateNewPost(context, postTitle, html) {
        DefaultPreference.get('user_data').then(function(user_data) {
            var jsonUserData = JSON.parse(user_data);
            console.log(
                'Create post Content ------------------------------- : ',
                html
            );

            // let requestPath = global.API_ENDPOINT + '/api/PostAPI/SavePost?StudentID=' + jsonUserData.StudentID + '&Title=' + postTitle + '&PostContent=' + html;
            // let requestPath = global.API_ENDPOINT + '/api/PostAPI/SavePost?StudentID=8019505&Title=' + postTitle + '&PostContent=' + html;

            let requestPath = global.API_ENDPOINT + '/api/PostAPI/SavePost';

            console.log('DEBUG: add post', requestPath);
            fetch(requestPath, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    Authorization: 'Bearer ' + global.session.access_token
                },
                body: JSON.stringify({
                    StudentID: jsonUserData.StudentID,
                    PostTitle: postTitle,
                    PostContent: html
                })
            })
                .then(addPostResponse => addPostResponse.text())
                .then(addPostResponseTxt => {
                    context.setState({ spinner: false });

                    console.log(
                        'DEBUG: Add post success. ',
                        addPostResponseTxt
                    );
                    showMessage({
                        message: 'Success',
                        description: 'Post added successfully.',
                        type: 'success'
                    });
                    context.clearContent();
                })
                .catch(error => {
                    // if (context.state.callFunction) {
                    //   context.setState({ callFunction: false });
                    //   console.log('Recall Add post --------------------------------------');
                    //   context.save();

                    // } else {
                    context.setState({ spinner: false });
                    console.log('DEBUG: Add post request failed.', error);
                    showMessage({
                        message: 'Error',
                        description:
                            'Unknown server error. Please check your internet connection. Contact support if issue prevails.',
                        type: 'danger'
                    });
                    // }
                });
        });
    }

    onUpdatePost(context, postID, postTitle, html) {
        DefaultPreference.get('user_data').then(function(user_data) {
            var jsonUserData = JSON.parse(user_data);
            console.log(
                'Debug: Get user_data in reset Passcode done',
                jsonUserData
            );

            // let requestPath = global.API_ENDPOINT + '/api/PostAPI/editpost?postid=' + postID + '&Title=' + postTitle + '&PostContent=' + html;
            let requestPath = global.API_ENDPOINT + '/api/PostAPI/editpost';

            console.log('DEBUG: update post', requestPath);
            fetch(requestPath, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    Authorization: 'Bearer ' + global.session.access_token
                },
                body: JSON.stringify({
                    PostID: postID,
                    PostTitle: postTitle,
                    PostContent: html
                })
            })
                .then(updatePostResponse => updatePostResponse.text())
                .then(updatePostResponseTxt => {
                    context.setState({ spinner: false });

                    console.log(
                        'DEBUG: update post success. ',
                        updatePostResponseTxt
                    );
                    showMessage({
                        message: 'Success',
                        description: 'Post updated successfully.',
                        type: 'success'
                    });
                    context.richText.blurContentEditor();
                })
                .catch(error => {
                    // if (context.state.callFunction) {
                    //   context.setState({ callFunction: false });
                    //   console.log('Recall Update post --------------------------------------');
                    //   context.save();

                    // } else {
                    context.setState({ spinner: false });
                    console.log('DEBUG: Update post request failed.', error);
                    showMessage({
                        message: 'Error',
                        description:
                            'Unknown server error. Please check your internet connection. Contact support if issue prevails.',
                        type: 'danger'
                    });
                    // }
                });
        });
    }

    /**
     * editor change data
     * @param {string} html
     */
    // handleChange(html) {
    handleChange = html => {
        // var context = this;
        // var string = html
        // var replaceArray = ["this","is","an"];
        // for (var i = replaceArray.length - 1; i >= 0; i--) {
        //   string = string.replace(replaceArray[i], "");
        // }
        // this.setState({ initHTML: string })
        // if (string != html) {
        //   this.richText.setContentHTML(string);
        // }
    };

    /**
     * editor height change
     * @param {number} height
     */
    handleHeightChange(height) {
        console.log('editor height change:', height);
    }

    insertHTML() {
        this.richText.insertHTML(
            '<span style="color: blue; padding:0 10px;">HTML</span>'
        );
    }

    onPressAddImage() {
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
                if (image.size > 1000000) {
                    showMessage({
                        message: 'Max Image Size Exceeded',
                        description:
                            'Please select an image with size less than 1MB.',
                        type: 'danger',
                        duration: 3000
                    });
                } else {
                    //   this.setState({
                    //     imageToUpload: image,
                    //   });
                    //   this.setState({
                    //     image: image.path,
                    //   });

                    this.richText.insertImage(
                        `data:${image.mime};base64,${image.data}`
                    );
                    this.richText.blurContentEditor();
                    // <Image source={{uri: `data:${image.mime};base64,${image.data}`}} />
                }
            })
            .catch(e => alert(e));

        // insert URL
        // this.richText.insertImage(
        //     'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/100px-React-icon.svg.png',
        // );
        // insert base64
        // this.richText.current?.insertImage(`data:${image.mime};base64,${image.data}`);
        // this.richText.current?.blurContentEditor();

        // this.richText.insertImage(`data:image/png;base64,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`);
        // this.richText.blurContentEditor();
    }

    onInsertLink() {
        // this.richText.current?.insertLink('Google', 'http://google.com');
        // this.linkModal.current?.setModalVisible(true);

        this.setState({ showLinkPopup: true });
    }

    onLinkDone = (title, url) => {
        var context = this;
        context.setState({ showLinkPopup: false });
        if (title != '' && url != '') {
            this.richText.insertLink(title, url);
        }
    };

    render() {
        const {
            screenType,
            currentPost,
            pageTitle,
            buttonText,
            postTitle,
            initHTML
        } = this.state;
        console.log('--------------------', initHTML);
        return (
            <View style={styles.container}>
                <SafeAreaView style={styles.flex1}>
                    <NavigationHeader {...this.props} screenTitle={pageTitle} />
                    <KeyboardAvoidingView
                        behavior={Platform.OS === 'ios' ? 'padding' : null}
                        style={styles.flex1}>
                        <ScrollView keyboardShouldPersistTaps="handled">
                            <Spinner
                                visible={this.state.spinner}
                                textContent={'Loading...'}
                            />
                            <View style={styles.formView}>
                                <OutlinedTextInput
                                    textInputProps={{
                                        placeholder: 'Title',
                                        value: this.state.postTitle,
                                        editable:
                                            screenType && screenType === 'VIEW'
                                                ? false
                                                : true
                                    }}
                                    onChangeText={text =>
                                        this.setState({
                                            postTitle: text
                                        })
                                    }
                                />
                                <RichEditor
                                    disabled={
                                        screenType && screenType === 'VIEW'
                                            ? true
                                            : false
                                    }
                                    editorStyle={styles.richTextEditor}
                                    containerStyle={
                                        styles.richTextAreaContainer
                                    }
                                    ref={r => {
                                        this.richText = r;
                                    }}
                                    style={styles.richTextArea}
                                    placeholder={'Please input post content'}
                                    initialContentHTML={initHTML}
                                    editorInitializedCallback={() =>
                                        this.editorInitializedCallback()
                                    }
                                    onChange={this.handleChange}
                                    onHeightChange={this.handleHeightChange}
                                />
                            </View>
                        </ScrollView>
                        <View style={styles.toolbarContainer}>
                            <RichToolbar
                                style={styles.toolbar}
                                getEditor={() => this.richText}
                                flatContainerStyle={styles.flatStyle}
                                disabled={
                                    screenType && screenType === 'VIEW'
                                        ? true
                                        : false
                                }
                                iconTint={Colors.TOOLBAR_TINT_COLOR}
                                selectedIconTint={'#2095F2'}
                                disabledIconTint={'#8b8b8b'}
                                onPressAddImage={() => this.onPressAddImage()}
                                onInsertLink={() => this.onInsertLink()}
                                iconSize={24} // default 50
                                actions={[
                                    // // 'insertVideo',
                                    // ...defaultActions,
                                    // actions.setStrikethrough,
                                    // actions.heading1,
                                    // actions.heading4,
                                    // // 'insertEmoji',
                                    // 'insertHTML',
                                    actions.keyboard,
                                    actions.undo,
                                    actions.redo,
                                    // actions.insertVideo,
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
                                    // 'insertEmoji',
                                    // 'insertHTML',
                                    // 'fontSize',
                                ]} // default defaultActions
                                iconMap={{
                                    insertEmoji: phizIcon,
                                    [actions.heading1]: ({ tintColor }) => (
                                        <Text
                                            style={[
                                                styles.tib,
                                                { color: tintColor }
                                            ]}>
                                            H1
                                        </Text>
                                    ),
                                    [actions.heading4]: ({ tintColor }) => (
                                        <Text
                                            style={[
                                                styles.tib,
                                                { color: tintColor }
                                            ]}>
                                            H3
                                        </Text>
                                    ),
                                    insertHTML: htmlIcon
                                }}
                                insertHTML={this.insertHTML}
                            />
                        </View>
                        <View style={styles.actionContainer}>
                            {screenType && screenType !== 'VIEW' ? (
                                <ContainedButton
                                    onPress={() => {
                                        this.save();
                                    }}
                                    label={buttonText}
                                />
                            ) : null}
                        </View>
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

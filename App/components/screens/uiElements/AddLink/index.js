/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView
} from 'react-native';

import Icon from 'react-native-vector-icons/AntDesign';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import Buttons from '../Buttons/RoundButtons';
import styles from './styles';
import { ContainedButton } from '../Button';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            link: ''
        };
    }

    // componentDidMount() {
    //     var context = this;

    // }

    render() {
        return (
            <View style={styles.container}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : null}
                    style={styles.centerContainer}>
                    <View style={styles.innerContainer}>
                        <View style={styles.popupTitleView}>
                            <Text style={styles.popupTitleText} numberOfLines={1}>Add link</Text>
                            <TouchableOpacity style={styles.closeView} onPress={() => this.props.onPressClose("", "")}>
                                <Icon name="close" size={25} color="black" />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.scrollContainer}>
                            <View style={styles.textContainer}>
                                <Text style={styles.inputLabelText}>Title</Text>
                                <View style={styles.inputViewContainer}>
                                    <TextInput
                                        ref={(input) => { this.textTextInput = input; }}
                                        style={styles.inputTextView}
                                        value={this.state.text}
                                        autoFocus={true}
                                        placeholder={'Title'}
                                        onChangeText={text => this.setState({ text: text })}
                                        inlineImagePadding={2}
                                    />
                                </View>

                                <Text style={{ ...styles.inputLabelText, marginTop: 20 }}>Link</Text>
                                <View style={styles.inputViewContainer}>
                                    <TextInput
                                        ref={(input) => { this.linkTextInput = input; }}
                                        style={styles.inputTextView}
                                        placeholder="http(s)://"
                                        value={this.state.link}
                                        onChangeText={text => this.setState({ link: text })}
                                        inlineImagePadding={2}
                                    />
                                </View>
                                <View style={{ alignItems: 'center', paddingTop: wp('5%'), paddingBottom: wp('2%') }}>
                                <ContainedButton
                                        onPress={() => this.props.onPressClose(this.state.text, this.state.link)}
                                        label="ADD"
                                    />
                                </View>
                            </View>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </View>
        );
    }
}

export default Search;
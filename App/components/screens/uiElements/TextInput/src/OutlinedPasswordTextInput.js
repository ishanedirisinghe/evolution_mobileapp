import React, { Component } from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    TextInput,
    View,
    Image
} from 'react-native';
import PropTypes from 'prop-types';
import {
    scale,
    Colors,
    Spacing,
    NormalizeText,
    Fonts,
    verticalScale
} from '../../../../../styles';

const showIcon = require('../../../../../assets/images/password/show.png');
const hideIcon = require('../../../../../assets/images/password/hide.png');

class OutlinedPasswordTextInput extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hideText: true
        };
    }

    onPressIcon = () => {
        this.setState({ hideText: !this.state.hideText });
    };

    render() {
        const { hideText } = this.state;
        const { textInputProps, onChangeText } = this.props;

        return (
            <View style={styles.container}>
                <TextInput
                    {...textInputProps}
                    multiline={false}
                    autoCapitalize="none"
                    autoCorrect={false}
                    spellCheck={false}
                    editable
                    secureTextEntry={hideText}
                    style={styles.textInput}
                    underlineColorAndroid={Colors.TRANSPARENT}
                    onChangeText={onChangeText}
                />
                <TouchableOpacity
                    onPress={this.onPressIcon}
                    style={styles.showPasswordTouch}>
                    <Image
                        resizeMode="contain"
                        style={styles.showPasswordImage}
                        source={hideText ? showIcon : hideIcon}
                    />
                </TouchableOpacity>
            </View>
        );
    }
}

OutlinedPasswordTextInput.propTypes = {
    onChangeText: PropTypes.func.isRequired,
    textInputProps: PropTypes.any
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        borderRadius: Spacing.x12,
        borderWidth: 1,
        borderColor: Colors.INPUT_BORDER_COLOR,
        alignItems: 'center',
        height: verticalScale(60)
    },
    textInput: {
        flex: 1,
        fontSize: NormalizeText(14),
        fontFamily: Fonts.regular,
        color: Colors.TEXT.PRIMARY_COLOR,
        marginLeft: Spacing.x20,
        marginRight: Spacing.x10
    },
    showPasswordTouch: {
        padding: Spacing.x10
    },
    showPasswordImage: {
        height: scale(19),
        width: scale(20),
        tintColor: Colors.TINT_GRAY
    }
});

export default OutlinedPasswordTextInput;

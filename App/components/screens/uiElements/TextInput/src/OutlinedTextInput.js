import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import PropTypes from 'prop-types';
import {
    Colors,
    Spacing,
    NormalizeText,
    Fonts,
    verticalScale
} from '../../../../../styles';

const OutlinedTextInput = ({ textInputProps, onChangeText, onBlur }) => {
    return (
        <View style={styles.container}>
            <TextInput
                multiline={false}
                autoCapitalize="none"
                autoCorrect={false}
                spellCheck={false}
                editable
                style={styles.textInput}
                underlineColorAndroid={Colors.TRANSPARENT}
                onChangeText={onChangeText}
                onBlur={onBlur}
                {...textInputProps}
            />
        </View>
    );
};

OutlinedTextInput.propTypes = {
    onChangeText: PropTypes.func.isRequired,
    onBlur: PropTypes.func,
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
        height: verticalScale(60),
        paddingHorizontal: Spacing.x20
    },
    textInput: {
        flex: 1,
        fontSize: NormalizeText(14),
        fontFamily: Fonts.regular,
        color: Colors.TEXT.PRIMARY_COLOR
    }
});

export default OutlinedTextInput;

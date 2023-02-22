import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import PropTypes from 'prop-types';
import {
    scale,
    Colors,
    Spacing,
    NormalizeText,
    Fonts
} from '../../../../../styles';
import LinearGradient from 'react-native-linear-gradient';

const ContainedButton = ({ style, styleText, onPress, label }) => {
    return (
        <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            colors={[
                Colors.GRADIENT.GRADIENT_START,
                Colors.GRADIENT.GRADIENT_END
            ]}
            style={[styles.container, style]}>
            <TouchableOpacity style={styles.buttonTouch} onPress={onPress}>
                <Text style={[styles.buttonText, styleText]}>{label}</Text>
            </TouchableOpacity>
        </LinearGradient>
    );
};

ContainedButton.propTypes = {
    style: PropTypes.any,
    styleText: PropTypes.string,
    label: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        borderRadius: scale(12)
    },
    buttonTouch: {
        width: '100%',
        paddingVertical: Spacing.y18
    },
    buttonText: {
        textAlign: 'center',
        fontFamily: Fonts.semi_bold,
        fontSize: NormalizeText(16),
        color: Colors.TEXT.SECONDARY_COLOR
    }
});

export { ContainedButton };

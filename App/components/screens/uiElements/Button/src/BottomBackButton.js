import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View, Image } from 'react-native';
import PropTypes from 'prop-types';
import {
    scale,
    Colors,
    Spacing,
    NormalizeText,
    Fonts
} from '../../../../../styles';

const BottomBackButton = ({ onPress }) => {
    return (
        <TouchableOpacity style={styles.buttonTouch} onPress={onPress}>
            <View style={styles.container}>
                <Image
                    style={styles.arrowImage}
                    resizeMode="contain"
                    source={require('../../../../../assets/images/back.png')}
                />
                <Text style={styles.buttonText}>Back</Text>
            </View>
        </TouchableOpacity>
    );
};

BottomBackButton.propTypes = {
    onPress: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    buttonTouch: { padding: Spacing.x10 },
    arrowImage: {
        width: scale(12),
        height: scale(10)
    },
    buttonText: {
        marginLeft: Spacing.x4,
        fontSize: NormalizeText(14),
        fontFamily: Fonts.medium,
        color: Colors.TEXT.TINT_BLUE_COLOR
    }
});

export { BottomBackButton };

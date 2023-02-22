import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors, NormalizeText, Fonts, Spacing } from '../../../../styles';

const chevronBback = require('../../../../assets/images/chevron_back.png');

export default class NavigationHeaderTwoRButton extends Component {
    constructor() {
        super();
    }

    onPressBack = () => {
        this.props.onPressBackButton
            ? this.props.onPressBackButton()
            : this.props.navigation.goBack();
    };

    render() {
        const { screenTitle, rightButtonFirst, rightButtonSecond } = this.props;

        const titleView =
            screenTitle && screenTitle !== '' ? (
                <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={styles.screenTitle}>
                    {screenTitle}
                </Text>
            ) : null;

        const leftButtonView = (
            <TouchableOpacity
                style={styles.buttonTouch}
                onPress={this.onPressBack}>
                <Image
                    resizeMode="contain"
                    style={styles.leftButtonImage}
                    source={chevronBback}
                />
            </TouchableOpacity>
        );

        const emptyLeftButtonView = rightButtonSecond ? (
            <View style={styles.buttonTouch} />
        ) : null;

        const rightButtonFirstView = rightButtonFirst ? (
            <TouchableOpacity
                style={styles.buttonTouch}
                onPress={rightButtonFirst.onPress}>
                <Image
                    resizeMode="contain"
                    style={styles.rightButtonImage}
                    source={rightButtonFirst.image}
                />
            </TouchableOpacity>
        ) : (
            <View style={styles.buttonTouch} />
        );

        const rightButtonSecondView = rightButtonSecond ? (
            <TouchableOpacity
                style={styles.buttonTouch}
                onPress={rightButtonSecond.onPress}>
                <Image
                    resizeMode="contain"
                    style={styles.rightButtonImage}
                    source={rightButtonSecond.image}
                />
            </TouchableOpacity>
        ) : (
            <View style={styles.buttonTouch} />
        );

        return (
            <View style={styles.container}>
                {leftButtonView}
                {emptyLeftButtonView}
                {titleView}
                <View style={styles.rightButtonContainer}>
                    {rightButtonFirstView}
                    {rightButtonSecondView}
                </View>
            </View>
        );
    }
}

NavigationHeaderTwoRButton.propTypes = {
    navigation: PropTypes.object,
    screenTitle: PropTypes.string,
    rightButtonFirst: PropTypes.object,
    rightButtonSecond: PropTypes.object,
    onPressBackButton: PropTypes.func
};

NavigationHeaderTwoRButton.defaultProps = {
    screenTitle: '',
    rightButtonFirst: null,
    rightButtonSecond: null
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    rightButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    leftButtonImage: {
        height: 18.5,
        width: 22.5
    },
    rightButtonImage: {
        height: 24,
        width: 24
    },
    buttonTouch: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 52,
        height: 52
    },
    screenTitle: {
        marginHorizontal: Spacing.x10,
        flex: 1,
        fontSize: NormalizeText(20),
        textAlign: 'center',
        color: Colors.TEXT.PRIMARY_COLOR,
        fontFamily: Fonts.medium
    }
});

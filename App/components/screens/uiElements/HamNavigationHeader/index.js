import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Colors, NormalizeText, Fonts, Spacing} from '../../../../styles';

const chevronBback = require('../../../../assets/images/ham_icon.png');

export default class HamNavigationHeader extends Component {
  constructor() {
    super();
  }

  onPressBack = () => {
    this.props.onPressBackButton
      ? this.props.onPressBackButton()
      : this.props.navigation.openDrawer();
  };

  render() {
    const {screenTitle, rightButton} = this.props;

    const titleView =
      screenTitle && screenTitle !== '' ? (
        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.screenTitle}>
          {screenTitle}
        </Text>
      ) : null;

    const leftButtonView = (
      <TouchableOpacity style={styles.buttonTouch} onPress={this.onPressBack}>
        <Image
          resizeMode="contain"
          style={styles.leftButtonImage}
          source={chevronBback}
        />
      </TouchableOpacity>
    );

    const rightButtonView = rightButton ? (
      <TouchableOpacity
        style={styles.buttonTouch}
        onPress={rightButton.onPress}>
        <Image
          resizeMode="contain"
          style={styles.rightButtonImage}
          source={rightButton.image}
        />
      </TouchableOpacity>
    ) : (
      <View style={styles.buttonTouch} />
    );

    return (
      <View style={styles.container}>
        {leftButtonView}
        {titleView}
        {rightButtonView}
      </View>
    );
  }
}

HamNavigationHeader.propTypes = {
  navigation: PropTypes.object,
  screenTitle: PropTypes.string,
  rightButton: PropTypes.object,
  onPressBackButton: PropTypes.func,
};

HamNavigationHeader.defaultProps = {
  screenTitle: '',
  rightButton: null,
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  leftButtonImage: {
    height: 19,
    width: 34.4,
  },
  rightButtonImage: {
    height: 24,
    width: 24,
  },
  buttonTouch: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 52,
    height: 52,
  },
  screenTitle: {
    marginHorizontal: Spacing.x10,
    flex: 1,
    fontSize: NormalizeText(20),
    textAlign: 'center',
    color: Colors.TEXT.PRIMARY_COLOR,
    fontFamily: Fonts.medium,
  },
});

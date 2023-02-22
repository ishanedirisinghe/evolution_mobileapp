/* eslint-disable no-unused-vars */
/* eslint-disable no-dupe-keys */
/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {Dimensions} from 'react-native';
import {PropTypes} from 'prop-types';
import {Dropdown} from 'react-native-material-dropdown';
import {
  widthPercentageToDP as wp,
  listenOrientationChange as lor,
  removeOrientationListener as rol,
} from 'react-native-responsive-screen';

import styles from './styles';

class DropdownList extends Component {
  componentDidMount() {
    lor(this);
  }

  componentWillUnmount() {
    rol();
  }

  render() {
    const {
      placeholderText,
      dataArray,
      onChangeText,
      value,
      onFocus,
      topofDropdoenItem,
      dropdownPositionNum,
    } = this.props;

    const top = topofDropdoenItem || 25;

    return (
      <Dropdown
        placeholder={placeholderText}
        data={dataArray}
        value={value}
        rippleInsets={{top: wp('5%'), bottom: wp('10%')}}
        dropdownMargins={{min: 12, max: 20}}
        dropdownOffset={{top: top, left: 5}}
        dropdownPosition={dropdownPositionNum}
        labelFontSize={wp('20%')}
        fontSize={wp('4%')}
        baseColor="#777777"
        textColor="#777777"
        itemColor="#000"
        selectedItemColor="#000"
        style={styles.dropdownalign}
        onChangeText={onChangeText}
        overlayStyle={{
          paddingTop: wp('20%'),
        }}
        onFocus={onFocus}
        containerStyle={{
          height: wp('10%'),
          marginVertical: wp('2%'),
          justifyContent: 'center',
          backgroundColor: '#ffffff',
          borderRadius: 5,
          borderWidth: 1,
          borderColor: '#777777',
          labelFontSize: wp('5%'),
          marginTop: wp('3%'),
          paddingLeft: wp('3%'),
          paddingRight: wp('3%'),
        }}
        rippleOpacity={0.54}
        inputContainerStyle={{borderBottomWidth: 0, labelFontSize: 20}}
        animationDuration={0}
      />
    );
  }
}

DropdownList.propTypes = {
  placeholderText: PropTypes.string,
  dataArray: PropTypes.array,
  onChangeText: PropTypes.func,
  onFocus: PropTypes.func,
  value: PropTypes.string,
  secureTextEntry: PropTypes.boolen,
  name: PropTypes.string,
  value: PropTypes.string,
  maxLength: PropTypes.number,
  topofDropdoenItem: PropTypes.number,
  dropdownPositionNum: PropTypes.number,
  dropdownwidth: PropTypes.number,
};

export default DropdownList;

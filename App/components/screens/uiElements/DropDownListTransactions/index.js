import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {PropTypes} from 'prop-types';
import {Dropdown} from 'react-native-material-dropdown';

import styles from './styles';

const imageWidth = Dimensions.get('window').width;

class DropdownList extends Component {
  render() {
    const {
      placeholderText,
      dataArray,
      labelColor,
      onChangeText,
      value,
      secureTextEntry,
      name,
      maxLength,
    } = this.props;
       
    const color = labelColor || '#ffffff';

    return (
      <View style={styles.wrapper}>
        <Dropdown
          placeholder={placeholderText}
          data={dataArray}
          rippleInsets={{top: 0, bottom: 0}}
          labelFontSize={17}
          baseColor="#777777"
          textColor="#777777"
          itemColor="#000"
          selectedItemColor="#000"
          containerStyle={{
            justifyContent: 'center',
            marginBottom: 25,
            marginRight: 10,
            marginLeft: 10,
          }}
          inputContainerStyle={{borderBottomWidth: 0}}
          animationDuration={0}
        />
      </View>
    );
  }
}

DropdownList.propTypes = {
  placeholderText: PropTypes.string,
  dataArray: PropTypes.array,
  onChangeText: PropTypes.func,
  value: PropTypes.string,
  secureTextEntry: PropTypes.boolen,
  name: PropTypes.string,
  maxLength: PropTypes.number,
};

export default DropdownList;

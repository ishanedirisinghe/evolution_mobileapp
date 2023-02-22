import React, { Component } from 'react';
import { ActivityIndicator, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import styles from './styles';

class Loading extends Component {
    state = {
      
    }

  static getDerivedStateFromProps(props, state) {
    const { params } = props.navigation.state;
    if (props.requestSucess === true && params !== null) {
      if(params !== undefined && params.success === true){
        params.success();
      }
    }
    return {
      ...state,
    }
  }

  render() {
    const animating = this.props.animating;
    return (
      <View style={styles.container}>
        <ActivityIndicator
          animating={animating}
          color={EStyleSheet.value('#777777')}
          size="large"
          style={styles.activityIndicator} />
      </View>
    )
  }
}
export default Loading;
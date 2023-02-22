import React, { Component } from 'react';
import { View, Image,Text, TouchableHighlight,StyleSheet,Dimensions,TouchableOpacity} from 'react-native';
import { PropTypes } from 'prop-types'
import {widthPercentageToDP as wp, heightPercentageToDP as hp, listenOrientationChange as lor,
  removeOrientationListener as rol} from 'react-native-responsive-screen';

import styles from './styles';

const imageWidth = Dimensions.get('window').width;


class RoundBubble extends Component{
   
   render(){

    const { text,
      btnfontSize,
      onPress,
      btntxtncolor,
      btnbackgroundColor,
      btnMarginLeft,btnMarginRight,
      bubbleBottomText
    } = this.props;
   
    const fontSize=btnfontSize || 14;
     const color=btntxtncolor || '#ffffff'
     const backgroundColor=btnbackgroundColor || '#000000'
    
     const marginLeft=btnMarginLeft || 20;
     const marginRight =btnMarginRight || 20;


       return(
         <View style={styles.btnwrapper}>
         <TouchableOpacity style={[{backgroundColor},styles.wrapper]} onPress={onPress}>
             <Text style={[{fontSize,color},styles.buttonText]}>{text}</Text>
          </TouchableOpacity>
        <Text style={{fontSize:wp('3%')}}>{bubbleBottomText}</Text>
         </View>
       
       ); 
   } 
 
}

RoundBubble.propTypes={
    text:PropTypes.string,
    onPress:PropTypes.func,
    btnfontSize:PropTypes.number,
    btntxtcolor:PropTypes.string,
    btnbackgroundColor:PropTypes.string,
    btnHight:PropTypes.number,
    btnWidth:PropTypes.number,
    ç:PropTypes.string,
    disabled:PropTypes.boolean,
   
}

export default RoundBubble;
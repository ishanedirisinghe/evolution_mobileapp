import React, { Component } from 'react';
import { View, Image,Text, TouchableHighlight,StyleSheet,Dimensions,TouchableOpacity} from 'react-native';
import { PropTypes } from 'prop-types'

import styles from './styles';
import Icon from 'react-native-vector-icons/Ionicons';

const imageWidth = Dimensions.get('window').width;


class RoundButtonWithImage extends Component{
    
   render(){

    const { text,
      onPress,
      btnfontSize,
      btntxtncolor,
      btnImage,
      btnbackgroundColor,
      btnWidth,
      btnHight,
      btnImageHight,
      btnMarginLeft,btnMarginRight,
      disabled } = this.props;
   
    const fontSize=btnfontSize || 14;
     const color=btntxtncolor || '#ffffff'
     const btnImageName=btnImage || ''
     const backgroundColor=btnbackgroundColor || '#000000'
     const width=btnWidth || 150;
     const height=btnHight || 50;
     const imageHeight=btnImageHight || 25;
     const marginLeft=btnMarginLeft || 20;
     const marginRight =btnMarginRight || 20;


       return(
         <View style={[{width,height},styles.btnwrapper]}>
         <TouchableOpacity style={[{backgroundColor,alignContent: 'center', justifyContent: 'center'},styles.wrapper]} onPress={onPress} disabled={disabled}>
            <Icon style={{paddingLeft: 65, height: imageHeight}} name="md-refresh" size={imageHeight} color='#fff'/> 
          </TouchableOpacity>
         </View>
       
       ); 
   } 
 
}

RoundButtonWithImage.propTypes={
    text:PropTypes.string,
    onPress:PropTypes.func,
    btnfontSize:PropTypes.number,
    btntxtcolor:PropTypes.string,
    btnImage:PropTypes.string,
    btnbackgroundColor:PropTypes.string,
    btnHight:PropTypes.number,
    btnImageHight:PropTypes.number,
    btnWidth:PropTypes.number,
    btnMarginLeft:PropTypes.number,
    btnMarginLeft:PropTypes.number,
    disabled:PropTypes.boolean,
   
}

export default RoundButtonWithImage;
import React, { Component } from 'react';
import { View,
    Text,
    TouchableHighlight,
    StyleSheet,
    Dimensions,
    TextInput,
    Image

 } from 'react-native';
import { PropTypes } from 'prop-types';
import {widthPercentageToDP as wp, heightPercentageToDP as hp, listenOrientationChange as lor,
    removeOrientationListener as rol} from 'react-native-responsive-screen';


import styles from './styles';

const imageWidth = Dimensions.get('window').width;

class PasswordEye extends Component{
    componentDidMount() {
        lor(this);
      }
      
      componentWillUnmount() {
        rol();
      }
  

    render(){

        const { placeholder,dataArray,labelColor,imagepath, onChangeText,value,onPressEyeButton,
            secureTextEntry,name,maxLength,
            txtinputPaddingTop,
             } =this.props;
       
        const color=labelColor || '#ffffff'
        const paddingTop =txtinputPaddingTop || wp('2.5%');

         

        return(
            <View style={styles.wrapper}>
             
             <View style={[{paddingTop},styles.eyewrapper]}>
                 <View style={styles.passtest}>
                   <TextInput 
                   onChangeText={onChangeText}
                   placeholder={placeholder}
                   value={value}
                   
                   fontSize = {wp('3.5%')}
                   secureTextEntry={secureTextEntry}/>
                 </View>
                 <TouchableHighlight onPress={onPressEyeButton}>  
                    <View style={{padding:wp('2.5%')}}>
                  
                    <Image
                        style={styles.stretch}
                        source={imagepath}
                    />
                  
                    </View>
                    </TouchableHighlight>
             </View>
            </View>
        );
    }
}

PasswordEye.propTypes = {
    placeholder:PropTypes.string,
    dataArray:PropTypes.array,
    onChangeText:PropTypes.func,
    onPressEyeButton:PropTypes.func,
    value:PropTypes.string,
    imagepath:PropTypes.string,
    secureTextEntry:PropTypes.boolen,
    name:PropTypes.string,
    maxLength:PropTypes.number,
    txtinputPaddingTop:PropTypes.number,
 
}

export default PasswordEye;

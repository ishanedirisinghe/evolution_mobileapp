/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/Octicons';
import IconFeather from 'react-native-vector-icons/Feather';

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { RFValue } from "react-native-responsive-fontsize";

import { MAIN_FONT } from "../../../Utility/FontsStyle/font"



class NavBarDefault extends React.Component {

    route = () => {
        const { onPress } = this.props;
        onPress();
    }

    onPressBurger = () => {
        const { onPressBurger } = this.props;
        onPressBurger();
    }

    render() {
        return (
            <View style={styles.navbar}>
               
                    <View style={{flexDirection:'row'}}>
                    {/* <TouchableOpacity onPress={() => this.route()}>
                        <Image
                            style={{ width: wp('5%'), height: wp('5%'), marginLeft: 10,marginBottom:5}}
                            source={require('../../images/arrow.png')}
                        />
                    </TouchableOpacity> */}
                    <View style={{marginLeft:wp('3%'),flex:1, alignSelf:'center', }}>
                            <IconFeather 
                                        name='menu' 
                                        size={30} 
                                        color='#fff' 
                                       onPress={() => this.onPressBurger()}
                                    
                                />
                    </View>
                    
                      
                    <View style={{justifyContent:'center'}}>
                    {/* fontSize: wp('8.5%') */}
                         <Text style={{ fontFamily: MAIN_FONT.font_bold, fontSize: RFValue(23), alignSelf:'center', color:'white' }}>{this.props.name}</Text> 
                    </View>
                    <View style={{justifyContent:'center',flex:1}}>
                    
    
                    
                     </View>
           
                    {/* <TouchableOpacity onPress={() => this.route()}>
                        <Image
                            style={{ width: 20, height: 20, marginRight: 10,marginBottom:5,}}
                            source={require('../../images/arrow.png')}
                        />
                    </TouchableOpacity> */}
                </View>
            </View>
        );
    }
}

const styles = {
    navbar: {
        width: wp('100%'),
        height: 60,
        backgroundColor: '#841c7c',
        elevation: 0,
        justifyContent: 'center',
    }
}

export default NavBarDefault;

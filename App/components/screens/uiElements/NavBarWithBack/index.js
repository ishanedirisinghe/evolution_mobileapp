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
import Icon from 'react-native-vector-icons/Ionicons';
import IconFeather from 'react-native-vector-icons/Feather';

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { RFValue } from "react-native-responsive-fontsize";

//components
import { MAIN_FONT } from "../../../Utility/FontsStyle/font"


class NavBarDefault extends React.Component {

    route = () => {
        const { onPress } = this.props;
        onPress();
    }

    onPressBack = () => {
        const { onPressBack } = this.props;
        onPressBack();
    }

    render() {
        return (
            <View style={styles.navbar}>
                <View style={{ alignSelf:'center', flexDirection:'row' }}>
                <IconFeather style={{ alignSelf:'center', paddingLeft:wp('4%'), paddingRight:wp('4%'), alignSelf:'center' }} name="arrow-left" size={30} color='#fff'  onPress={()=>this.onPressBack()}/> 
                    <View style={{ flex: 1, marginRight: wp('8%') + 30 }}>
                         {/* <Text style={{  fontSize: wp('5.6%'),alignSelf:'center',color:'#fff' }}>{this.props.name}</Text> */}
                         <Text style={{ fontFamily: MAIN_FONT.font_bold, fontSize: RFValue(23), alignSelf:'center', color:'white' }} numberOfLines={1} >{this.props.name}</Text>
                    </View>
                </View>


                    {/* <Icon 
                                name='filter'
                                size={wp('5%')}
                                color='black'
                                onPress={()=>this.onPressStar()}
                                style={{
                                   marginRight: wp('5%'),
                                }} 
                          />
                 */}

                    {/* <TouchableOpacity onPress={() => this.route()}>
                        <Image
                            style={{ width: 20, height: 20, marginRight: 10,marginBottom:5,}}
                            source={require('../../images/arrow.png')}
                        />
                    </TouchableOpacity> */}
                </View>
           
        );
    }
}

const styles = {
    navbar: {
        // height:(wp('15%')),
        // backgroundColor: '#777',
        // height:(wp('20%')),
        width: wp('100%'),
        height: 60,
        backgroundColor: '#841c7c',
        flexDirection:'row',
        elevation: 0,
        alignContent: 'center',
    }
}

export default NavBarDefault;

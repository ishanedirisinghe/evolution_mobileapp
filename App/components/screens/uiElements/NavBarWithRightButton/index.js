import React from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity
} from 'react-native';

import IconFeather from 'react-native-vector-icons/Feather';


import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFValue } from "react-native-responsive-fontsize";

//components
import { MAIN_FONT } from "../../../Utility/FontsStyle/font"

class NavBarDefault extends React.Component {

    route = () => {
        const { onPress } = this.props;
        onPress();
    }

    onPressLeftButtonAction = () => {
        const { onPressLeftButtonAction } = this.props;
        onPressLeftButtonAction();
    }

    onPressRightButtonAction = () => {
        if (this.props.rightIcon && this.props.rightIcon != '') {
            const { onPressRightButtonAction } = this.props;
            onPressRightButtonAction();
        }
        
    }

    onPressSecondRightButtonAction = () => {
        const { onPressSecondRightButtonAction } = this.props;
        onPressSecondRightButtonAction();
    }

    render() {
        return (
            <View style={styles.navbar}>
                <View style={{ alignSelf: 'center', flexDirection: 'row' }}>
                    <IconFeather style={{ ...styles.leftIcon }} name={this.props.leftIcon} size={30} color='#fff' onPress={() => this.onPressLeftButtonAction()} />
                    <View style={{ ...styles.titleView, marginLeft: (this.props.rightIconSecond && this.props.rightIconSecond != '') ? wp('5%') + 30 : wp('1%') }}>
                        <Text style={{ fontFamily: MAIN_FONT.font_bold, fontSize: RFValue(23), alignSelf: 'center', color: 'white' }} numberOfLines={1}>{this.props.title}</Text>
                    </View>

                    {this.props.rightIconSecond && this.props.rightIconSecond != '' ?
                        <IconFeather style={{ ...styles.rightIconSecond, marginRight: wp('2%') }} name={this.props.rightIconSecond} size={30} color='#fff' onPress={() => this.onPressSecondRightButtonAction()} />
                        : null}

                    <IconFeather style={{ ...styles.rightIcon, paddingLeft: (this.props.rightIconSecond && this.props.rightIconSecond != '') ? wp('2%') : wp('4%') }} name={this.props.rightIcon} size={30} color='#fff' onPress={() => this.onPressRightButtonAction()} />
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
        flexDirection: 'row',
        elevation: 0,
        alignContent: 'center',
    },
    titleView: {
        flex: 1,
        justifyContent: 'center',
        marginLeft: wp('1%'),
        marginRight: wp('1%'),
    },
    leftIcon: {
        alignSelf: 'center',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: wp('4%'),
        paddingRight: wp('4%'),
    },
    rightIcon: {
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: wp('4%'),
        paddingRight: wp('4%'),
    },
    rightIconSecond: {
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: wp('3%'),
        paddingRight: wp('1%'),
    },
}

export default NavBarDefault;

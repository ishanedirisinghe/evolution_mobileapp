
import EStyleSheet from 'react-native-extended-stylesheet';
import { Dimensions } from 'react-native';
const imageWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: imageWidth / 380 });
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFValue } from "react-native-responsive-fontsize";

import { MAIN_COLOR } from "../../../../Utility/Colors"
import { MAIN_FONT } from "../../../../Utility/FontsStyle/font"

export default EStyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: MAIN_COLOR.BACKGROUND_COLOR_THEME
    },

    list: {
        flex: 1,
        width: wp('100%'),
     },
  
     listSeparator: {
        height: 1, 
        width: '100%', 
        backgroundColor: '#CED0CE'
     },

     indicatorView: {
        height: 60, 
        width: '100%', 
        justifyContent: "center",
        alignItems: 'center',
     },

     postDateText: {
        marginTop: wp('1%'),
        fontFamily: MAIN_FONT.font_regular,
        fontSize: RFValue(12),
        color: "#808080", 
     },

     noDataText: {
      fontFamily: MAIN_FONT.font_medium,
      fontSize: RFValue(16),
      flex: 1, 
      position: 'absolute', 
      top: 50, 
      width: wp('100%'),
      textAlign: 'center',
      padding: 10, 
      color: 'gray',
    },

    listItem:{
        flex:1,
        width: wp('100%'),
        paddingLeft: wp('3%'),
        paddingRight: wp('3%'),
        paddingTop: wp('3%'),
        paddingBottom: wp('3%'),
        borderBottomWidth: 1,
        borderColor: '#BEBEBE',
        backgroundColor: "#F2F2F2"
    },

    postTitleText: {
        fontFamily: MAIN_FONT.font_semi_bold,
        fontSize: RFValue(15),
        color: "#841c7c", 
     },

     postDescriptionText: {
        marginTop: wp('1%'),
        fontFamily: MAIN_FONT.font_medium,
        fontSize: RFValue(13),
        color: "#000000", 
     },
});
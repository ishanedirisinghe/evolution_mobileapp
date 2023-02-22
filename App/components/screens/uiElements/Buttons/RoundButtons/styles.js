
import EStyleSheet from 'react-native-extended-stylesheet';
import {
  Dimensions,
  PixelRatio
} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import { MAIN_FONT } from "../../../../Utility/FontsStyle/font"

const imageWidth = Dimensions.get('window').width;


export default EStyleSheet.create({
    wrapper: {
   
        // alignItems: 'center',
        paddingTop:wp('3%'),
        paddingBottom:wp('3%'),
        borderRadius:25,
       
        // paddingTop: StatusBar.currentHeight,
        // paddingBottom: StatusBar.currentHeight
      },
      buttonText: {
        fontFamily: MAIN_FONT.font_medium,
        alignItems: 'center',
        textAlign:'center',
      },
      btnwrapper:{
       
       
        marginTop:15,
       
        
      }
});

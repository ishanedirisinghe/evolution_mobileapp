
import EStyleSheet from 'react-native-extended-stylesheet';
import {
  Dimensions,
  PixelRatio
} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp, listenOrientationChange as lor,
  removeOrientationListener as rol} from 'react-native-responsive-screen';

const imageWidth = Dimensions.get('window').width;

export default EStyleSheet.create({
    wrapper: {
   
        // alignItems: 'center',
        borderWidth:1,
        borderColor:'rgba(0,0,0,0.2)',
        alignItems:'center',
        justifyContent:'center',
        width:wp('8%'),
        height:wp('8%'),
        borderRadius:50,
       
        // paddingTop: StatusBar.currentHeight,
        // paddingBottom: StatusBar.currentHeight
      },
      buttonText: {
         
        alignItems: 'center',
        fontWeight:'bold',
       
      
        textAlign:'center',
      },
      btnwrapper:{
       
       alignItems:'center',
        marginTop:15,
       
        
      }
});

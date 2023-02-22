import EStyleSheet from 'react-native-extended-stylesheet';
import {
  Dimensions,
  PixelRatio
} from 'react-native';

const imageWidth = Dimensions.get('window').width;
EStyleSheet.build({$rem: imageWidth / 380});
import {widthPercentageToDP as wp, heightPercentageToDP as hp, listenOrientationChange as lor,
  removeOrientationListener as rol} from 'react-native-responsive-screen';

export default EStyleSheet.create({
    wrapper:{
       
       
        marginVertical:'3%',
       
        backgroundColor:'#ffffff',
        borderRadius:5,
        borderWidth:1,
        borderColor:'#777777',
      
       
       
  },
  eyewrapper:{
   
    flexDirection:'row',
    justifyContent:'space-between',

 //   paddingTop: Platform.OS === 'ios' ? "23rem" : wp('4%'),
    
  },
  passtest:{
   
    marginLeft:wp('1%'),
    paddingRight:wp('5%'),
    paddingTop: Platform.OS === 'ios' ? "0rem" : 0,
  },
  stretch:{
   
  }
    
});
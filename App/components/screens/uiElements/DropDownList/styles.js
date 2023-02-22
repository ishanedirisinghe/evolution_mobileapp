import EStyleSheet from 'react-native-extended-stylesheet';
import {
  Dimensions,
  PixelRatio
} from 'react-native';

const imageWidth = Dimensions.get('window').width;
EStyleSheet.build({$rem: imageWidth / 380});
import {widthPercentageToDP as wp, heightPercentageToDP as hp,listenOrientationChange as lor,
  removeOrientationListener as rol} from 'react-native-responsive-screen';


export default EStyleSheet.create({
    wrapper:{
        width:wp('28%'),
        height:37,
        marginVertical:wp('3%'),
        justifyContent:'center',
        backgroundColor:'#ffffff',
        borderRadius:5,
        borderWidth:1,
        borderColor:'#777777',    
    
    },
    dropdownalign:{
      paddingBottom:"4rem",
      
        
    
    }

});
import EStyleSheet from 'react-native-extended-stylesheet';
import {
  Dimensions,
  PixelRatio
} from 'react-native';

const imageWidth = Dimensions.get('window').width;

export default EStyleSheet.create({
    wrapper:{
        width:140,
        height:40,
        marginVertical:'3%',
        justifyContent:'center',
        backgroundColor:'#ffffff',
        borderRadius:5,
        borderWidth:1,
        borderColor:'#777777'
       
    },
    label:{
        fontWeight:'700',
        marginBottom:5,
    },
    inputfield:{
    
       
        height:55,
        fontSize:15,
       
        alignItems: 'center',
        justifyContent:'center',
        paddingLeft:30,
        paddingBottom:22,
        color:'#777777',
        marginHorizontal:25
    },
    InputIcons:{
        position:'absolute',
       color:'#777777',
       marginLeft:20,
      
       
    }
});
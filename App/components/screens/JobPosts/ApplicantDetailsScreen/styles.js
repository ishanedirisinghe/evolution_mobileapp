import EStyleSheet from 'react-native-extended-stylesheet';
import { Dimensions } from 'react-native';
const imageWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: imageWidth / 380 });
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFValue } from "react-native-responsive-fontsize";

import { MAIN_COLOR } from "../../../Utility/Colors"
import { MAIN_FONT } from "../../../Utility/FontsStyle/font"

export default EStyleSheet.create({
    centerContainer:{
        flex: 1,
        backgroundColor: MAIN_COLOR.BACKGROUND_COLOR_THEME
    },
    iteminterest: {
        height: wp('30%'),
        width: wp('45%'),
        borderRadius: 5,
    },
    iteminterest1: {
        flex: 1,
        paddingLeft: wp('3%'),
        paddingRight: wp('5%'),


    },
    textversion: {
        marginTop: wp('1%'),
        color: '#841c7c',
        fontSize: wp('5%'),
        textAlign: 'center',
    },
    
      inputViewContainer: {
        height: 40,
        marginTop: wp('1%'),
        paddingLeft: wp('2%'),
        paddingRight: wp('2%'),
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1.2,
        borderBottomColor: '#841c7c',
        borderTopLeftRadius: 3,
        borderTopRightRadius: 3,
        backgroundColor: '#ffffff'
      },
      inputImage: {
        marginRight: wp('2%')
      },
      inputTextView: {
        flex: 1,
        height: 40,
        fontFamily: MAIN_FONT.font_medium,
        fontSize: RFValue(13),
        width: '100%',
        color: "#000000",
        borderColor: '#841c7c',
        borderBottomWidth: 0,
      },
      root: {
        flex: 1,
        paddingTop: 20,
        backgroundColor:'#eee',
        flexDirection: 'column', 
        justifyContent: 'flex-end', 
    },
    main: {
        flex: 1,
        marginTop: 10,
        paddingLeft: 30,
        paddingRight: 30,
        paddingBottom: 1,
        alignItems: 'stretch',
    },
    textEditor: { 
        flex: 1,
        color:'#000000',
        backgroundColor : '#FFFFFF'
    },
    toolbarContainer: {
        minHeight: 35
    },
    menuOptionText: {
        textAlign: 'center',
        paddingTop: 5,
        paddingBottom: 5
    },
    divider: {
        marginVertical: 0,
        marginHorizontal: 0,
        borderBottomWidth: 1,
        borderColor: '#eee'
    },

    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    nav: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 5,
    },
    rich: {
        minHeight: 300,
        flex: 1,
    },
    richBar: {
        height: 50,
        backgroundColor: '#F5FCFF',
    },
    scroll: {
        backgroundColor: '#ffffff',
    },
    item: {
        borderBottomWidth: 2,
        borderColor: '#e8e8e8',
        flexDirection: 'row',
        height: 40,
        alignItems: 'center',
        paddingHorizontal: 15,
    },
    
    input: {
        flex: 1,
    },
    
    tib: {
        textAlign: 'center',
        color: '#515156',
    },

    customerHeaderLabelText: {
        flex: 1,
        fontFamily: MAIN_FONT.font_medium,
        fontSize: RFValue(13),
        color: "#000000"
      },

      checkedBox: {
        width: 30,
        height: 30
    },

    checkBoxLabel: {
        fontFamily: MAIN_FONT.font_medium,
        fontSize: RFValue(13),
    },

    datePicker: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        // marginLeft: Platform.OS === "ios" ? -wp("1%") : 0,
      },

      titleLabelText: {
        fontFamily: MAIN_FONT.font_medium,
        fontSize: RFValue(12),
        color: "#505050"
      },

      valueLabelText: {
        fontFamily: MAIN_FONT.font_medium,
        fontSize: RFValue(16),
        color: "#000000",
        marginTop: wp('0.5%'),
        marginBottom: wp('4%')
      },

      buttonView: {
        height: 50,
        width: wp('80%'),
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#841c7c',
        borderRadius: 25
    },
    
    buttonText: {
        fontFamily: MAIN_FONT.font_medium,
        fontSize: RFValue(17),
        color: "#FFFFFF"
    },

});

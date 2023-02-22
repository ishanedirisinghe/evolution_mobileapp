import EStyleSheet from 'react-native-extended-stylesheet';
import { Dimensions } from 'react-native';
const imageWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: imageWidth / 380 });
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import { RFValue } from 'react-native-responsive-fontsize';
import { Colors, Fonts, hexToRgb } from '../../../../styles';

export default EStyleSheet.create({
    centerContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },

    container: {
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: hexToRgb(Colors.BLACK_COLOR, 0.63)
        // position: "absolute",
    },

    innerContainer: {
        width: wp('85%'),
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        borderWidth: 0,
        borderColor: '#FFFFFF',
        alignItems: 'center'
    },

    closeView: {
        marginRight: 10,
        width: 35,
        height: 35,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        right: 0
    },

    scrollContainer: {
        width: wp('85%'),
        marginTop: wp('3%'),
        marginBottom: 15,
        paddingLeft: wp('4%'),
        paddingRight: wp('4%')
    },

    textContainer: {},

    popupTitleView: {
        height: 45,
        width: '100%',
        justifyContent: 'center',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },

    popupTitleText: {
        fontFamily: Fonts.bold,
        fontSize: RFValue(14),
        marginRight: 50,
        marginLeft: wp('4%')
    },

    separatorView: {
        width: '100%',
        height: 1,
        marginTop: 4,
        backgroundColor: '#D0D0D0'
    },

    notificationTitleText: {
        fontFamily: Fonts.semi_bold,
        fontSize: RFValue(15),
        color: '#841c7c'
    },

    notificationDescriptionText: {
        fontFamily: Fonts.regular,
        fontSize: RFValue(13),
        marginTop: wp('3%'),
        marginBottom: wp('2%'),
        color: '#000000'
    },

    notificationDateText: {
        fontFamily: Fonts.regular,
        fontSize: RFValue(12),
        marginTop: wp('0%'),
        color: '#484848'
    },

    inputViewContainer: {
        height: 40,
        marginTop: wp('1%'),
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1.2,
        borderBottomColor: '#841c7c',
        borderTopLeftRadius: 3,
        borderTopRightRadius: 3,
        backgroundColor: '#ffffff'
    },

    inputLabelText: {
        fontFamily: Fonts.medium,
        fontSize: RFValue(12),
        color: '#505050'
    },

    inputTextView: {
        flex: 1,
        height: 40,
        fontFamily: Fonts.medium,
        fontSize: RFValue(13),
        width: '100%',
        color: '#000000',
        borderColor: '#841c7c',
        borderBottomWidth: 0
    }
});

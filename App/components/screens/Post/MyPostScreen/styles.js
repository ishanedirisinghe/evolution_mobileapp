import { StyleSheet } from 'react-native';
import {
    Colors,
    Fonts,
    NormalizeText,
    Spacing,
    verticalScale
} from '../../../../styles';

export default StyleSheet.create({
    flex1: { flex: 1 },
    container: {
        flex: 1,
        backgroundColor: Colors.BACKGROUND_COLOR
    },
    listContentContainer: {
        paddingVertical: Spacing.y10
    },
    listSeparator: {
        backgroundColor: Colors.BACKGROUND_COLOR,
        height: Spacing.y20
    },
    indicatorView: {
        height: verticalScale(60),
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    noDataText: {
        fontFamily: Fonts.medium,
        fontSize: NormalizeText(16),
        flex: 1,
        textAlign: 'center',
        color: Colors.TEXT.DISABLE_COLOR
    }
});

// listItemRead: {
//     flex: 1,
//     width: wp('100%'),
//     paddingLeft: wp('3%'),
//     paddingRight: wp('3%'),
//     paddingTop: wp('3%'),
//     paddingBottom: wp('3%'),
//     borderBottomWidth: 1,
//     borderColor: '#BEBEBE',
//     backgroundColor: '#F2F2F2'
// },

// notificationTitleText: {
//     fontFamily: MAIN_FONT.font_semi_bold,
//     fontSize: RFValue(15),
//     color: '#841c7c'
// },

// notificationStatusText: {
//     marginTop: wp('1%'),
//     fontFamily: MAIN_FONT.font_medium,
//     fontSize: RFValue(13)
// },

// notificationDateText: {
//     fontFamily: MAIN_FONT.font_regular,
//     fontSize: RFValue(12),
//     color: '#808080'
// },

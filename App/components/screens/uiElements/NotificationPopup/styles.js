import { StyleSheet } from 'react-native';
import {
    Colors,
    Fonts,
    hexToRgb,
    NormalizeText,
    Spacing,
    verticalScale
} from '../../../../styles';

export default StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: hexToRgb(Colors.BLACK_COLOR, 0.63)
    },
    innerContainer: {
        maxHeight: '85%',
        width: '85%',
        backgroundColor: Colors.BACKGROUND_COLOR,
        borderRadius: 10,
        alignItems: 'center'
    },
    popupTitleView: {
        height: verticalScale(46),
        width: '100%',
        flexDirection: 'row',
        paddingHorizontal: Spacing.x10,
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        backgroundColor: Colors.TINT_COLOR
    },
    popupTitleText: {
        flex: 1,
        fontFamily: Fonts.bold,
        fontSize: NormalizeText(14),
        marginRight: 10,
        color: Colors.TEXT.SECONDARY_COLOR
    },
    closeView: {
        width: 35,
        height: 35,
        alignItems: 'center',
        justifyContent: 'center'
    },
    scrollContainer: {
        padding: 10
    },
    separatorView: {
        width: '100%',
        height: 1,
        marginVertical: Spacing.y10,
        backgroundColor: Colors.SEPARATOR_COLOR
    },
    notificationTitleText: {
        fontFamily: Fonts.semi_bold,
        fontSize: NormalizeText(15),
        color: Colors.TEXT.TINT_COLOR
    },
    notificationDateText: {
        fontFamily: Fonts.regular,
        fontSize: NormalizeText(12),
        marginTop: Spacing.y2,
        color: Colors.TEXT.GRAY_COLOR
    },
    notificationDescriptionText: {
        fontFamily: Fonts.regular,
        fontSize: NormalizeText(13),
        color: Colors.TEXT.PRIMARY_COLOR
    }
});

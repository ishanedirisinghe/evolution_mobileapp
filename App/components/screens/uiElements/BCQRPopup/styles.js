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
    qrCodeContainer: {
        aspectRatio: 1,
        width: '100%',
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.WHITE_COLOR
    },
    qrCodeImage: {
        aspectRatio: 1,
        width: '100%'
    }
});

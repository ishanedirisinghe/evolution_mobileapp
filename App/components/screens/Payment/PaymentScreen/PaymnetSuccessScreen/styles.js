import { StyleSheet } from 'react-native';
import {
    Colors,
    Fonts,
    NormalizeText,
    scale,
    Spacing,
    verticalScale
} from '../../../../../styles';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.BACKGROUND_COLOR,
       // justifyContent: 'center',
      //  alignItems: 'center',
    },
    logoImageContainer: {
        marginTop: verticalScale(40),
        marginBottom: Spacing.y6,
        alignItems: 'center'
    },
    paymentImageView: {
        width: scale(120),
        height: scale(120),
        marginTop: verticalScale(30),
        marginBottom: verticalScale(20),

    },
    logoImage: {
        width: scale(140),
        height: scale(55)
    },
    textContainer: {
        marginTop: Spacing.y28,
        marginHorizontal: Spacing.x34
    },
    titleText: {
        textAlign: 'center',
        fontFamily: Fonts.bold,
        fontSize: NormalizeText(22),
        color: Colors.TEXT.PRIMARY_COLOR
    },
    enterTextBold: {
        fontFamily: Fonts.medium,
        fontSize: NormalizeText(13),
        color: Colors.TEXT.TINT_BLUE_COLOR
    },
    webLinkTouch: {
        padding: Spacing.x10,
        marginBottom: Spacing.y16,
        flex: 1,
        justifyContent: 'flex-end',
    },
    webLinkText: {
        textAlign: 'center',
        fontFamily: Fonts.medium,
        fontSize: NormalizeText(14),
        color: Colors.TINT_PINK_COLOR
    },
});

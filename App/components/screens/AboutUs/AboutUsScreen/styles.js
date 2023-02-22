import { StyleSheet } from 'react-native';
import {
    Colors,
    Fonts,
    NormalizeText,
    scale,
    Spacing,
    verticalScale
} from '../../../../styles';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.BACKGROUND_COLOR
    },
    centerContainer: {
        flex: 1
    },
    logoImageContainer: {
        marginTop: verticalScale(72),
        marginBottom: Spacing.y6,
        alignItems: 'center'
    },
    logoImage: {
        width: scale(171),
        height: scale(66)
    },
    textContainer: {
        marginTop: Spacing.y28,
        marginHorizontal: Spacing.x34
    },
    titleText: {
        textAlign: 'center',
        fontFamily: Fonts.medium,
        fontSize: NormalizeText(16),
        color: Colors.TEXT.PRIMARY_COLOR
    },
    enterTextBold: {
        fontFamily: Fonts.medium,
        fontSize: NormalizeText(13),
        color: Colors.TEXT.TINT_BLUE_COLOR
    },
    enterTextNormal: {
        textAlign: 'justify',
        fontFamily: Fonts.light,
        fontSize: NormalizeText(13),
        color: Colors.TEXT.PRIMARY_COLOR,
        marginBottom: Spacing.y20
    },
    webLinkTouch: {
        padding: Spacing.x10,
        marginBottom: Spacing.y16
    },
    webLinkText: {
        textAlign: 'center',
        fontFamily: Fonts.medium,
        fontSize: NormalizeText(14),
        color: Colors.TINT_PINK_COLOR
    },
    versionText: {
        marginTop: Spacing.y4,
        textAlign: 'center',
        fontFamily: Fonts.medium,
        fontSize: NormalizeText(14),
        color: Colors.BLACK_COLOR
    }
});

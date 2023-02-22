import { StyleSheet } from 'react-native';
import {
    Fonts,
    scale,
    Colors,
    NormalizeText,
    Spacing,
    verticalScale
} from '../../../../styles';

export default StyleSheet.create({
    H20: { height: Spacing.y20 },
    flex1: {
        flex: 1
    },
    container: {
        flex: 1,
        backgroundColor: Colors.BACKGROUND_COLOR
    },
    scrollViewContent: {
        flexGrow: 1
    },
    centerView: {
        alignItems: 'center'
    },
    formView: {
        alignItems: 'center',
        marginHorizontal: Spacing.x50
    },
    logoImage: {
        marginTop: verticalScale(120),
        width: scale(195),
        height: scale(74)
    },
    loginText: {
        marginTop: Spacing.y42,
        textAlign: 'center',
        fontFamily: Fonts.medium,
        fontSize: NormalizeText(26),
        color: Colors.TEXT.PRIMARY_COLOR
    },
    descriptionText: {
        marginVertical: Spacing.y20,
        textAlign: 'center',
        fontFamily: Fonts.regular,
        fontSize: NormalizeText(14),
        color: Colors.TEXT.DISABLE_COLOR
    },
    actionContainer: {
        marginTop: Spacing.y20
    },
    fgContainer: {
        marginVertical: Spacing.y14,
        flexDirection: 'row',
        alignItems: 'center'
    },
    fgText: {
        fontSize: NormalizeText(13),
        fontFamily: Fonts.regular,
        color: Colors.TEXT.PRIMARY_COLOR
    },
    resetTouch: {
        paddingHorizontal: Spacing.x6,
        paddingVertical: Spacing.y10
    },
    resetText: {
        fontSize: NormalizeText(13),
        fontFamily: Fonts.regular,
        color: Colors.TEXT.TINT_BLUE_COLOR
    },
    backContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginBottom: Spacing.y20
    }
});

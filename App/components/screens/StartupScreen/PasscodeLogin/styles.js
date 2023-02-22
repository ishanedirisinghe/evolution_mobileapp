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
    title: {
        textAlign: 'center',
        marginTop: Spacing.y42,
        fontFamily: Fonts.medium,
        fontSize: NormalizeText(26),
        color: Colors.TEXT.PRIMARY_COLOR
    },
    description: {
        textAlign: 'center',
        marginTop: verticalScale(128),
        fontFamily: Fonts.regular,
        fontSize: NormalizeText(14),
        color: Colors.TEXT.DISABLE_COLOR
    },
    otpContainer: {
        marginTop: Spacing.y32
    },
    otpSecureView: {
        position: 'absolute',
        flexDirection: 'row',
        height: scale(15),
        left: scale(120),
        right: scale(120),
        justifyContent: 'space-between',
        bottom: 0
    },
    otpSecureViewItem: {
        width: scale(15),
        height: scale(15),
        borderColor: Colors.TINT_PINK_COLOR,
        borderWidth: 1,
        borderRadius: scale(15) / 2
    },
    backContainer: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginBottom: Spacing.y20
    },
    forgotPasscodeButton: {
        marginTop: Spacing.y36,
        paddingVertical: Spacing.y6,
        justifyContent: 'center',
        alignItems: 'center',
    },
    forgotPasscodeText: {
        fontFamily: Fonts.medium,
        fontSize: NormalizeText(13),
        color: Colors.TEXT.TINT_COLOR,
    }
});

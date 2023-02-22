import { StyleSheet } from 'react-native';
import {
    Fonts,
    scale,
    Colors,
    NormalizeText,
    verticalScale,
    Spacing
} from '../../../../styles';

export default StyleSheet.create({
    flex1: { flex: 1 },
    container: {
        flex: 1,
        backgroundColor: Colors.BACKGROUND_COLOR
    },
    centerView: {
        alignItems: 'center'
    },
    logoImage: {
        marginTop: verticalScale(120),
        width: scale(195),
        height: scale(74)
    },
    titleText: {
        marginTop: Spacing.y16,
        textAlign: 'center',
        fontFamily: Fonts.medium,
        fontSize: NormalizeText(26),
        color: Colors.TEXT.PRIMARY_COLOR
    },
    actionContainer: {
        flex: 1,
        marginBottom: verticalScale(100),
        marginHorizontal: scale(60),
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    buttonContainer: {
        marginTop: Spacing.y20
    },
    backContainer: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginBottom: Spacing.y20
    }
});

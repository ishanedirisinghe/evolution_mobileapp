import { StyleSheet } from 'react-native';
import {
    Colors,
    Fonts,
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
    titleText: {
        textAlign: 'center',
        marginTop: Spacing.y42,
        fontFamily: Fonts.medium,
        fontSize: NormalizeText(26),
        color: Colors.TEXT.PRIMARY_COLOR
    },
    descriptionText: {
        marginTop: verticalScale(160),
        marginBottom: Spacing.y20,
        textAlign: 'center',
        fontFamily: Fonts.regular,
        fontSize: NormalizeText(14),
        color: Colors.TEXT.DISABLE_COLOR
    },
    actionContainer: {
        marginTop: Spacing.y20
    },
    backContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginBottom: Spacing.y20
    }
});

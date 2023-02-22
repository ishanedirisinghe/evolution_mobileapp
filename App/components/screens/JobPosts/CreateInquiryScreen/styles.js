import { StyleSheet } from 'react-native';
import {
    Colors,
    Fonts,
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
    formView: {
        marginHorizontal: Spacing.x20,
        marginTop: Spacing.y20
    },
    inputContainer: {
        marginTop: Spacing.y20,
        flex: 1,
        flexDirection: 'row',
        borderRadius: Spacing.x12,
        borderWidth: 1,
        borderColor: Colors.INPUT_BORDER_COLOR,
        alignItems: 'flex-start',
        padding: Spacing.x20
    },
    textAreaHeight: {
        height: verticalScale(150)
    },
    textAreaText: {
        fontSize: NormalizeText(14),
        fontFamily: Fonts.regular,
        color: Colors.TEXT.PRIMARY_COLOR
    },
    actionContainer: {
        marginHorizontal: Spacing.x20,
        marginVertical: Spacing.y20
    }
});

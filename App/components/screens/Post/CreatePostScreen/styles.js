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
    richTextAreaContainer: {
        borderWidth: 1,
        marginTop: Spacing.y20,
        borderRadius: Spacing.x12,
        borderColor: Colors.INPUT_BORDER_COLOR
    },
    richTextArea: {
        minHeight: verticalScale(460)
    },
    richTextEditor: {
        flex: 1,
        fontFamily: Fonts.regular,
        fontSize: NormalizeText(14),
        color: Colors.TEXT.PRIMARY_COLOR
    },
    toolbarContainer: {
        marginHorizontal: Spacing.x20,
        marginTop: Spacing.y10
    },
    toolbar: {
        height: verticalScale(60),
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: Colors.TRANSPARENT,
        borderColor: Colors.INPUT_BORDER_COLOR
    },
    tib: {
        textAlign: 'center',
        color: '#515156'
    },
    flatStyle: {
        paddingHorizontal: 12
    },
    actionContainer: {
        marginHorizontal: Spacing.x20,
        marginTop: Spacing.y30,
        marginBottom: Spacing.y20
    }
});

import { StyleSheet } from 'react-native';
import {
    Fonts,
    scale,
    Colors,
    NormalizeText,
    Spacing,
    verticalScale
} from '../../../../styles';

export const styles = StyleSheet.create({
    H20: { height: Spacing.y20 },
    width100: {
        width: '100%'
    },
    flex1: {
        flex: 1
    },
    container: {
        flex: 1,
        backgroundColor: Colors.BACKGROUND_COLOR
    },
    centerView: {
        alignItems: 'center'
    },
    logoImage: {
        marginTop: Spacing.y10,
        width: scale(173),
        height: scale(65)
    },
    titleText: {
        marginTop: Spacing.y6,
        textAlign: 'center',
        fontFamily: Fonts.medium,
        fontSize: NormalizeText(20),
        color: Colors.TEXT.PRIMARY_COLOR
    },
    formView: {
        marginHorizontal: Spacing.x20,
        marginTop: Spacing.y20
    },
    pickerContainer: {
        width: '100%',
        borderRadius: Spacing.x12,
        borderWidth: 1,
        borderColor: Colors.INPUT_BORDER_COLOR,
        alignItems: 'center',
        height: scale(60)
    },
    pickerPlaceholder: {
        color: Colors.TEXT.PLACEHOLDER_COLOR,
        fontFamily: Fonts.regular,
        fontSize: NormalizeText(14)
    },
    pickerIcon: {
        marginTop: Spacing.x20,
        marginRight: Spacing.x20
    },
    checkBox: {
        flex: 1
    },
    checkedIcon: {
        width: 30,
        height: 30,
        tintColor: Colors.TINT_PINK_COLOR
    },
    unCheckedIcon: {
        width: 30,
        height: 30,
        tintColor: Colors.INPUT_BORDER_COLOR
    },
    checkBoxText: {
        fontFamily: Fonts.medium,
        fontSize: NormalizeText(14),
        color: Colors.TEXT.PRIMARY_COLOR
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
    datePickerContainer: {
        paddingVertical: Spacing.y10,
        paddingHorizontal: Spacing.x18,
        marginTop: Spacing.y20,
        borderRadius: Spacing.x12,
        borderWidth: 1,
        borderColor: Colors.INPUT_BORDER_COLOR
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
        marginVertical: Spacing.y20
    },
    richTextAreaContainer: {
        borderWidth: 1,
        marginVertical: Spacing.y20,
        borderRadius: Spacing.x12,
        borderColor: Colors.INPUT_BORDER_COLOR
    },
    richTextArea: {
        minHeight: 200
    },
    richTextEditor: {
        flex: 1,
        fontFamily: Fonts.regular,
        fontSize: NormalizeText(14),
        color: Colors.TEXT.PRIMARY_COLOR
    },
    bottomContainer: {
        borderTopWidth: 1,
        borderTopColor: Colors.SEPARATOR_COLOR,
        paddingHorizontal: Spacing.x20
    },
    toolbar: {
        height: verticalScale(60),
        borderWidth: 1,
        marginTop: Spacing.y10,
        borderRadius: 10,
        backgroundColor: Colors.TRANSPARENT,
        borderColor: Colors.INPUT_BORDER_COLOR
    },
    tib: {
        textAlign: 'center',
        color: '#515156'
    }
});

export const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        height: scale(60),
        width: '100%',
        fontFamily: Fonts.medium,
        fontSize: NormalizeText(14),
        color: Colors.TEXT.PRIMARY_COLOR,
        alignItems: 'center',
        padding: Spacing.x20
    },
    inputAndroid: {
        height: scale(60),
        width: '100%',
        fontFamily: Fonts.medium,
        fontSize: NormalizeText(14),
        color: Colors.TEXT.PRIMARY_COLOR,
        alignItems: 'center',
        padding: Spacing.x20
    }
});

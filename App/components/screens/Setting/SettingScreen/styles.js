import { StyleSheet, Dimensions } from 'react-native';
import {
    Colors,
    Fonts,
    NormalizeText,
    scale,
    Spacing
} from '../../../../styles';

const windowWidth = Dimensions.get('window').width;
const avatorSize = windowWidth - Spacing.x40;

export default StyleSheet.create({
    flex1: {
        flex: 1
    },
    container: {
        flex: 1,
        backgroundColor: Colors.BACKGROUND_COLOR
    },
    formContainer: {
        paddingTop: Spacing.y14,
        paddingBottom: Spacing.y16,
        paddingHorizontal: Spacing.x20
    },
    avatar: {
        width: avatorSize,
        height: avatorSize,
        borderRadius: scale(20)
    },
    avatarUploadTouch: {
        position: 'absolute',
        top: Spacing.x10,
        right: Spacing.x10,
        width: scale(58),
        height: scale(58),
        borderRadius: scale(15),
        backgroundColor: Colors.TINT_PINK_COLOR,
        justifyContent: 'center',
        alignItems: 'center'
    },
    avatarUploadIcon: {
        tintColor: Colors.WHITE_COLOR,
        width: scale(30),
        height: scale(23.6)
    },
    inputContainer: {
        marginTop: Spacing.y20
    },
    inputLabelText: {
        fontFamily: Fonts.medium,
        fontSize: NormalizeText(14),
        color: Colors.TINT_BLUE_COLOR,
        marginBottom: Spacing.y4
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
    actionContainer: {
        marginTop: Spacing.y20
    }
});

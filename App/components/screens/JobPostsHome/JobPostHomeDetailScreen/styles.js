import { StyleSheet } from 'react-native';
import {
    scale,
    Spacing,
    Colors,
    Fonts,
    NormalizeText,
    verticalScale
} from '../../../../styles';

export default StyleSheet.create({
    marginT20: { marginTop: Spacing.y20 },
    H20: { height: Spacing.y20 },
    container: {
        flex: 1,
        backgroundColor: Colors.BACKGROUND_COLOR
    },
    flex1: {
        flex: 1
    },
    logoContainer: {
        alignSelf: 'center',
        backgroundColor: Colors.TINT_BLUE_COLOR,
        width: scale(72),
        height: scale(65),
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },
    logoImage: {
        width: scale(30),
        height: scale(26.3)
    },
    jobItemView: {
        backgroundColor: Colors.JOBS.BG_BLUE_COLOR,
        marginTop: Spacing.y20,
        marginHorizontal: Spacing.x20,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        paddingHorizontal: Spacing.x20,
        paddingVertical: Spacing.y26
    },
    companyItemView: {
        backgroundColor: Colors.JOBS.BG_PING_COLOR,
        marginHorizontal: Spacing.x20,
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12,
        paddingHorizontal: Spacing.x20,
        paddingVertical: Spacing.y26
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: Spacing.y20
    },
    postHeaderText: {
        flex: 1,
        fontFamily: Fonts.medium,
        fontSize: NormalizeText(18),
        color: Colors.TEXT.PRIMARY_COLOR,
        margin: Spacing.y12,
        textAlign: 'center'
    },
    titleText: {
        fontFamily: Fonts.medium,
        fontSize: NormalizeText(14),
        color: Colors.TEXT.PRIMARY_COLOR
    },
    detailText: {
        fontFamily: Fonts.light,
        fontSize: NormalizeText(14),
        color: Colors.TEXT.PRIMARY_COLOR,
        marginTop: 2
    },
    detailHTML: {
        marginTop: 2,
        height: 'auto',
        width: '100%'
    },
    formView: {
        marginHorizontal: Spacing.x20,
        marginTop: Spacing.y20
    },
    applyJobTitleText: {
        fontFamily: Fonts.medium,
        fontSize: NormalizeText(14),
        color: Colors.TEXT.PRIMARY_COLOR,
        marginBottom: Spacing.y10
    },
    fileUploadContainer: {
        flex: 1,
        flexDirection: 'row',
        borderRadius: Spacing.x12,
        borderWidth: 1,
        borderColor: Colors.INPUT_BORDER_COLOR,
        alignItems: 'center',
        height: scale(60)
    },
    fileUploadText: {
        flex: 1,
        padding: Spacing.x20,
        fontSize: NormalizeText(14),
        fontFamily: Fonts.regular
    },
    clContainer: {
        marginTop: Spacing.y20
    },
    clText: {
        fontFamily: Fonts.regular,
        fontSize: NormalizeText(14),
        color: Colors.TEXT.PRIMARY_COLOR
    },
    checkBox: {
        flex: 1,
        marginTop: Spacing.y6
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
    richTextAreaContainer: {
        borderWidth: 1,
        marginTop: Spacing.y20,
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
    },
    actionContainer: {
        marginHorizontal: Spacing.x20,
        marginVertical: Spacing.y20
    },
    inactiveText: {
        textAlign: 'center',
        fontFamily: Fonts.bold,
        fontSize: NormalizeText(14),
        color: Colors.TEXT.SECONDARY_COLOR
    },
    inactiveView: {
        marginTop: Spacing.y10,
        padding: 8,
        backgroundColor: Colors.TINT_PINK_COLOR,
        marginBottom: Spacing.y10
    }
});

import { StyleSheet } from 'react-native';
import { Colors, Fonts, NormalizeText, Spacing } from '../../../../styles';

export default StyleSheet.create({
    flex1: {
        flex: 1
    },
    container: {
        flex: 1,
        backgroundColor: Colors.BACKGROUND_COLOR
    },
    formContainer: {
        paddingTop: Spacing.y10,
        paddingBottom: Spacing.y16,
        paddingHorizontal: Spacing.x20
    },
    detailsContainer: {
        backgroundColor: Colors.JOBS.BG_BLUE_COLOR,
        borderRadius: 10,
        paddingVertical: Spacing.y10
    },
    detailView: {
        paddingHorizontal: Spacing.x14
    },
    detailTitle: {
        fontFamily: Fonts.medium,
        fontSize: NormalizeText(13),
        color: Colors.TEXT.DARK_GRAY_COLOR
    },
    detailText: {
        fontFamily: Fonts.medium,
        fontSize: NormalizeText(16),
        color: Colors.TEXT.PRIMARY_COLOR
    },
    detailSeparatorL: {
        height: 1,
        width: '80%',
        marginVertical: Spacing.y8,
        backgroundColor: Colors.WHITE_COLOR
    },
    detailSeparatorR: {
        height: 1,
        width: '80%',
        alignSelf: 'flex-end',
        marginVertical: Spacing.y8,
        backgroundColor: Colors.WHITE_COLOR
    },
    actionContainer: {
        marginHorizontal: Spacing.x20,
        marginVertical: Spacing.y20
    }
});

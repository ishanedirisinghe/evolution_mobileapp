import { Platform, StyleSheet } from 'react-native';
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
        flex: 2,
        backgroundColor: Colors.BACKGROUND_COLOR
    },
    scrollContentContainer: {
        paddingTop: Spacing.y8,
        paddingBottom: Spacing.x16
    },
    detailView: {
        flex: 1,
        flexDirection: 'column'
    },
    titleText: {
        marginHorizontal: Spacing.x16,
        fontFamily: Fonts.semi_bold,
        fontSize: NormalizeText(16),
        color: Colors.TEXT.TINT_COLOR
    },
    descriptionText: {
        marginHorizontal: Spacing.x16,
        marginTop: Spacing.x4,
        fontFamily: Fonts.regular,
        fontSize: NormalizeText(14),
        color: Colors.TEXT.PRIMARY_COLOR
    },
    separatorView: {
        flex: 1,
        height: 1,
        marginTop: Spacing.x16,
        marginHorizontal: Spacing.x16,
        backgroundColor: Colors.SEPARATOR_COLOR
    },
    commentItemView: {
        paddingHorizontal: Spacing.x16,
        marginTop: Spacing.y16,
        flex: 1,
        flexDirection: 'column'
    },
    contentView: {
        flex: 1,
        flexDirection: 'row',
        paddingBottom: 2
    },
    commentUserTextView: {
        padding: 4,
        flex: 1,
        backgroundColor: Colors.JOBS.BG_PING_COLOR
    },
    commentText: {
        fontFamily: Fonts.medium,
        fontSize: NormalizeText(12),
        marginTop: 2,
        color: Colors.TEXT.PRIMARY_COLOR
    },
    commentDateTimeText: {
        marginLeft: 4,
        marginTop: 2,
        color: Colors.TEXT.GRAY_COLOR,
        fontFamily: Fonts.medium,
        fontSize: NormalizeText(10)
    },

    addCommentItemView: {
        flexDirection: 'column',
        borderColor: Colors.SEPARATOR_COLOR,
        borderTopWidth: 1,
        paddingVertical: Spacing.y10,
        paddingHorizontal: Spacing.x16
    },
    addCommentUserTextView: {
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: '#F4F4F4',
        paddingVertical: Platform.OS === 'ios' ? 14 : 8,
        paddingHorizontal: 14,
        borderRadius: 20
    },
    inputTextView: {
        flex: 1,
        fontFamily: Fonts.medium,
        fontSize: NormalizeText(13),
        color: Colors.TEXT.PRIMARY_COLOR
    },
    postCommentAcction: {
        width: 25,
        height: 25,
        justifyContent: 'center',
        alignItems: 'center'
    },
    indicatorView: {
        height: verticalScale(60),
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    }
});

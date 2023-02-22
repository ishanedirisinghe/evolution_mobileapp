import { StyleSheet } from 'react-native';
import { Colors, Fonts, NormalizeText, Spacing } from '../../../../styles';

export default StyleSheet.create({
    flex1: { flex: 1 },
    postContentContainer: { flex: 1 },
    postContentView: {
        paddingHorizontal: Spacing.x10
    },
    actionMainContainer: {
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        paddingBottom: Spacing.y10,
        backgroundColor: Colors.BACKGROUND_PURPLE_COLOR
    },
    listItemContainer: {
        backgroundColor: Colors.BACKGROUND_PURPLE_COLOR,
        marginHorizontal: Spacing.x20,
        borderRadius: 20,
        paddingTop: Spacing.y16
    },
    postUserView: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: Spacing.x18
    },
    postUserImage: {
        width: 50,
        height: 50,
        borderRadius: 15
    },
    postUserTextView: {
        flex: 1,
        marginLeft: Spacing.x10
    },
    postUserNameText: {
        fontFamily: Fonts.medium,
        fontSize: NormalizeText(14),
        color: Colors.TEXT.PRIMARY_COLOR
    },
    postDateTimeText: {
        fontFamily: Fonts.medium,
        fontSize: NormalizeText(10),
        color: Colors.TEXT.GRAY_COLOR
    },
    postTitleText: {
        marginHorizontal: Spacing.x18,
        marginVertical: Spacing.y10,
        fontFamily: Fonts.regular,
        fontSize: NormalizeText(16),
        color: Colors.TEXT.PRIMARY_COLOR
    },
    postSeeMoreView: {
        marginTop: Spacing.y6,
        paddingLeft: Spacing.x18,
        paddingVertical: Spacing.y4
    },
    postCountView: {
        flex: 1,
        height: 44,
        flexDirection: 'row'
    },
    postLikeCountView: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: Spacing.x22
    },
    postCountItemText: {
        fontFamily: Fonts.regular,
        fontSize: NormalizeText(10),
        marginLeft: Spacing.x4,
        color: Colors.TEXT.PRIMARY_COLOR
    },
    postCommentCountView: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    postSeeMoreText: {
        fontFamily: Fonts.semi_bold,
        fontSize: NormalizeText(12),
        color: Colors.TEXT.GRAY_COLOR
    },
    postActionContainer: {
        marginTop: Spacing.y6,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: Spacing.x18
    },
    postActionView: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    postActionItemView: {
        marginLeft: Spacing.x16,
        padding: 4,
        justifyContent: 'center',
        alignItems: 'center'
    },
    messageIcon: {
        width: 22,
        height: 20
    },
    postCommentView: {
        flex: 1,
        marginTop: -Spacing.y14,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        paddingTop: Spacing.y10,
        paddingBottom: Spacing.y22,
        backgroundColor: Colors.BACKGROUND_PURPLE_COLOR
    }
});

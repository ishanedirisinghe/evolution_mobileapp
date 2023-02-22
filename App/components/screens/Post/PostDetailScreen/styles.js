import { Platform, StyleSheet } from 'react-native';
import { Colors, Fonts, NormalizeText, Spacing } from '../../../../styles';

export default StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.BACKGROUND_COLOR },
    flex1: {
        flex: 1
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
    htmlContainer: {
        height: 'auto',
        marginHorizontal: Spacing.x18
    },
    messageIcon: {
        width: 22,
        height: 20
    },
    postActionView: {
        marginVertical: Spacing.x16,
        backgroundColor: Colors.BACKGROUND_PURPLE_COLOR,
        flex: 1,
        height: 44,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    postActionItemView: {
        padding: 8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    commentDateTimeText: {
        marginLeft: Spacing.x28 + 50,
        marginTop: 2,
        color: Colors.TEXT.GRAY_COLOR,
        fontFamily: Fonts.regular,
        fontSize: NormalizeText(11)
    },
    addCommentItemView: {
        borderColor: '#BEBEBE',
        borderTopWidth: 1,
        paddingVertical: Spacing.x14,
        paddingHorizontal: Spacing.x18
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
        height: 60,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    }
});

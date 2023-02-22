import { StyleSheet } from 'react-native';
import { Colors, Fonts, NormalizeText, Spacing } from '../../../../styles';

export default StyleSheet.create({
    contentView: {
        flex: 1,
        flexDirection: 'row',
        paddingHorizontal: Spacing.x18,
        marginTop: Spacing.y10
    },
    commentUserImage: {
        width: 50,
        height: 50,
        marginRight: Spacing.x10,
        borderRadius: 20
    },
    commentUserTextView: {
        flex: 1,
        backgroundColor: Colors.COMMENT_TEXT_BG,
        paddingHorizontal: Spacing.x16,
        paddingVertical: Spacing.y12,
        borderRadius: 15
    },
    commentUserNameText: {
        fontFamily: Fonts.medium,
        fontSize: NormalizeText(14),
        color: Colors.TEXT.PRIMARY_COLOR
    },
    commentText: {
        fontFamily: Fonts.regular,
        fontSize: NormalizeText(12),
        marginTop: 2,
        color: Colors.TEXT.PRIMARY_COLOR
    }
});

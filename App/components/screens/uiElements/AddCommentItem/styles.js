import { StyleSheet } from 'react-native';
import { Colors, Fonts, NormalizeText, Spacing } from '../../../../styles';

export default StyleSheet.create({
    contentView: {
        flex: 1,
        flexDirection: 'row',
        paddingHorizontal: Spacing.x18,
        marginTop: Spacing.y10
    },
    addCommentUserImage: {
        width: 50,
        height: 50,
        marginRight: Spacing.x10,
        borderRadius: 20
    },
    addCommentUserTextView: {
        flex: 1,
        backgroundColor: Colors.COMMENT_TEXT_BG,
        padding: Spacing.x16,
        borderRadius: 15
    },
    addCommentText: {
        fontFamily: Fonts.regular,
        fontSize: NormalizeText(12),
        color: Colors.COMMENT_TEXT_PLACEHOLDER
    }
});

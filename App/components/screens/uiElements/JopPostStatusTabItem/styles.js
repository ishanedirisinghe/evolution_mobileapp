import { StyleSheet } from 'react-native';
import { Fonts, NormalizeText, scale, Spacing } from '../../../../styles';

export default StyleSheet.create({
    container: {
        borderRadius: scale(12)
    },
    tabTouch: {
        paddingHorizontal: Spacing.x26,
        paddingVertical: Spacing.y10
    },
    labelText: {
        fontFamily: Fonts.medium,
        fontSize: NormalizeText(14)
    }
});

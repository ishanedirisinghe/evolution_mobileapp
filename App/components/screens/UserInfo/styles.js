import { StyleSheet } from 'react-native';
import {
    Fonts,
    scale,
    Colors,
    NormalizeText,
    Spacing,
    verticalScale
} from '../../../styles';

export const styles = StyleSheet.create({
    H20: { height: Spacing.y20 },
    contianer: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: Spacing.x20,
        backgroundColor: Colors.BACKGROUND_COLOR
    },
    title: {
        marginTop: Spacing.y42,
        textAlign: 'center',
        fontFamily: Fonts.medium,
        fontSize: NormalizeText(26),
        color: Colors.TEXT.PRIMARY_COLOR
    },
    formView: {
        flex: 3,
        alignItems: 'center',
        paddingHorizontal: Spacing.x10,
    },
    actionContainer: {
        flex: 1,
        marginTop: Spacing.y20,
        paddingHorizontal: Spacing.x10,
        backgroundColor: Colors.BACKGROUND_COLOR
    },
});
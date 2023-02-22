import { StyleSheet } from 'react-native';
import {
    Colors,
    Fonts,
    NormalizeText,
    scale,
    Spacing
} from '../../../../styles';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.BACKGROUND_COLOR
    },
    body: { flex: 1, marginTop: Spacing.y10, marginHorizontal: Spacing.x20 },
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        height: scale(110),
        marginTop: Spacing.y20,
        backgroundColor: Colors.JOBS.BG_BLUE_COLOR,
        borderRadius: 15
    },
    buttonIconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        height: scale(110),
        width: scale(110),
        borderRightWidth: 1,
        borderRightColor: Colors.BACKGROUND_COLOR
    },
    buttonTextLabel: {
        flex: 1,
        fontFamily: Fonts.regular,
        fontSize: NormalizeText(18),
        color: Colors.TEXT.PRIMARY_COLOR,
        marginLeft: Spacing.x30
    },
    arrow: {
        marginRight: Spacing.x24,
        width: 9.3,
        height: 16.6
    }
});

import { StyleSheet } from 'react-native';
import {
    Colors,
    Fonts,
    NormalizeText,
    Spacing,
    verticalScale
} from '../../../../styles';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.BACKGROUND_COLOR
    },
    centerContainer: {
        flex: 1
    },
    list: {
        flex: 1
    },
    listContentContainer: {
        paddingVertical: Spacing.y10
    },
    listSeparator: {
        backgroundColor: Colors.BACKGROUND_COLOR,
        height: Spacing.y20
    },
    indicatorView: {
        height: verticalScale(60),
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    noDataText: {
        fontFamily: Fonts.medium,
        fontSize: NormalizeText(16),
        flex: 1,
        textAlign: 'center',
        color: Colors.TEXT.DISABLE_COLOR
    }
});

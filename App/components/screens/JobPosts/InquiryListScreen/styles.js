import { StyleSheet } from 'react-native';
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
        flex: 1,
        backgroundColor: Colors.BACKGROUND_COLOR
    },
    listViewContent: { paddingVertical: Spacing.y16 },
    listItemContainer: {
        backgroundColor: Colors.JOBS.BG_BLUE_COLOR,
        marginVertical: Spacing.y10,
        marginHorizontal: Spacing.x20,
        borderRadius: 12,
        padding: 20
    },
    itemTitleText: {
        flex: 1,
        fontFamily: Fonts.medium,
        fontSize: NormalizeText(16),
        color: Colors.TEXT.PRIMARY_COLOR
    },
    itemDescriptionText: {
        fontFamily: Fonts.light,
        fontSize: NormalizeText(12),
        color: Colors.TEXT.PRIMARY_COLOR,
        marginTop: Spacing.y10
    },
    indicatorView: {
        height: verticalScale(60),
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    noDataText: {
        flex: 1,
        fontFamily: Fonts.regular,
        fontSize: NormalizeText(16),
        position: 'absolute',
        marginTop: verticalScale(80),
        width: '100%',
        textAlign: 'center',
        padding: Spacing.x10,
        color: Colors.TEXT.DISABLE_COLOR
    },
    actionContainer: {
        marginHorizontal: Spacing.x20,
        marginVertical: Spacing.y20
    }
});

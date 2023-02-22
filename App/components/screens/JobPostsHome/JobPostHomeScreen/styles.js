import { StyleSheet } from 'react-native';
import {
    Colors,
    Fonts,
    NormalizeText,
    scale,
    Spacing,
    verticalScale
} from '../../../../styles';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.BACKGROUND_COLOR
    },
    flex1: {
        flex: 1
    },
    listItemContainer: {
        backgroundColor: Colors.JOBS.BG_BLUE_COLOR,
        marginVertical: Spacing.y10,
        marginHorizontal: Spacing.x20,
        borderRadius: 12
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: Spacing.y20
    },
    jobIconContainer: {
        backgroundColor: Colors.TINT_BLUE_COLOR,
        borderTopRightRadius: 8,
        borderBottomRightRadius: 8,
        paddingHorizontal: Spacing.x14,
        paddingVertical: Spacing.y12
    },
    jobIcon: {
        width: scale(16),
        height: verticalScale(14.5)
    },
    postTitleText: {
        flex: 1,
        fontFamily: Fonts.medium,
        fontSize: NormalizeText(16),
        color: Colors.TEXT.PRIMARY_COLOR,
        marginLeft: Spacing.x10,
        marginRight: Spacing.x20
    },
    postDescriptionText: {
        fontFamily: Fonts.light,
        fontSize: NormalizeText(12),
        color: Colors.TEXT.PRIMARY_COLOR,
        marginTop: Spacing.y10,
        marginLeft: scale(54),
        marginRight: Spacing.x20,
        marginBottom: Spacing.y20
    },
    indicatorView: {
        height: verticalScale(60),
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
    postDateText: {
        fontFamily: Fonts.light,
        fontSize: NormalizeText(12),
        color: Colors.TEXT.PRIMARY_COLOR,
        marginLeft: scale(54),
        marginRight: Spacing.x20,
        marginBottom: Spacing.y10
    }
});

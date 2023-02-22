import { Platform, StyleSheet, Dimensions } from 'react-native';
import {
    Colors,
    Fonts,
    NormalizeText,
    Spacing,
    verticalScale,
    scale
} from '../../../../../styles';
const windowWidth = Dimensions.get('window').width;
const avatorSize = windowWidth - Spacing.x40;

export default StyleSheet.create({
    flex1: {
        flex: 1
    },
    container: {
        flex: 2,
        backgroundColor: Colors.BACKGROUND_COLOR
    },
    indicatorView: {
        height: verticalScale(60),
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    listView: {
        alignItems: 'center',
        paddingBottom: Spacing.y20
    },
    imageView: {
        width: avatorSize,
        height: 220,
        borderTopRightRadius: 12,
        borderTopLeftRadius: 12
    },
    listItemContainer: {
        backgroundColor: Colors.JOBS.BG_BLUE_COLOR,
        marginVertical: Spacing.y10,
        marginHorizontal: Spacing.x20,
        borderRadius: 12
    },
    headerContainer: {
        flexDirection: 'column',
        alignItems: 'center'
    },
    courseTitleText: {
        fontFamily: Fonts.medium,
        fontSize: NormalizeText(16),
        color: Colors.TEXT.DARK_BLACK_COLOR,
        marginLeft: Spacing.x10,
        marginRight: Spacing.x20,
        textAlign: 'center',
        paddingBottom: Spacing.y20,
        paddingTop: Spacing.y20
    },
    courseDescriptionText: {
        fontFamily: Fonts.light,
        fontSize: NormalizeText(12),
        color: Colors.TEXT.PRIMARY_COLOR,
        marginLeft: Spacing.y20,
        marginRight: Spacing.x20,
        marginBottom: Spacing.y20,
        textAlign: 'center'
    },
    buttonContainer: {
        marginTop: Spacing.y10,
        borderRadius: 0,
        borderBottomRightRadius: 12,
        borderBottomLeftRadius: 12
    },
    htmlContainer: {
        height: 'auto',
        marginLeft: Spacing.y20,
        marginRight: Spacing.x20,
        marginBottom: Spacing.y20,
    },
});

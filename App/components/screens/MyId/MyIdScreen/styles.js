import { StyleSheet, Dimensions } from 'react-native';
import {
    Colors,
    Fonts,
    NormalizeText,
    scale,
    Spacing
} from '../../../../styles';
const windowWidth = Dimensions.get('window').width;
const avatorSize = windowWidth - Spacing.x40;

export default StyleSheet.create({
    flex1: {
        flex: 1
    },
    container: {
        flex: 1,
        backgroundColor: Colors.BACKGROUND_COLOR
    },
    formContainer: {
        paddingTop: Spacing.y10,
        paddingBottom: Spacing.y16,
        paddingHorizontal: Spacing.x20
    },
    avatarContainer: {
        marginVertical: Spacing.y16
    },
    avatar: {
        width: avatorSize,
        height: avatorSize,
        borderTopRightRadius: scale(20),
        borderTopLeftRadius: scale(20),
        borderBottomLeftRadius: scale(20)
    },
    inactiveContainer: {
        position: 'absolute',
        left: 0,
        right: 0
    },
    inactiveView: {
        marginTop: Spacing.y24,
        padding: 8,
        backgroundColor: 'red'
    },
    inactiveText: {
        textAlign: 'center',
        fontFamily: Fonts.bold,
        fontSize: NormalizeText(14),
        color: Colors.TEXT.SECONDARY_COLOR
    },
    fNameText: {
        fontFamily: Fonts.medium,
        fontSize: NormalizeText(17),
        color: Colors.TEXT.TINT_BLUE_COLOR
    },
    lNameText: {
        marginTop: -Spacing.y6,
        fontFamily: Fonts.medium,
        fontSize: NormalizeText(19),
        color: Colors.TEXT.TINT_BLUE_COLOR
    },
    logoImageContainer: {
        flex: 1,
        justifyContent: 'space-around'
    },
    centerContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    logoImage: {
        width: scale(150),
        height: scale(57)
    },
    detailCardContainer: {
        borderColor: Colors.JOBS.BG_BLUE_COLOR,
        borderTopWidth: 3,
        borderLeftWidth: 3,
        borderRightWidth: 3,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        marginTop: Spacing.y16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start'
    },
    detailsContainer: {
        flex: 1,
        backgroundColor: Colors.JOBS.BG_BLUE_COLOR,
        // borderTopLeftRadius: 10,
        paddingVertical: Spacing.y8
    },
    qrCodeView: {
        flex: 1,
        marginHorizontal: Spacing.x6,
        justifyContent: 'center',
        alignItems: 'center'
    },
    qrCodeContainer: {
        width: scale(114),
        height: scale(114),
        justifyContent: 'center',
        alignItems: 'center'
    },
    detailView: {
        paddingHorizontal: Spacing.x14
    },
    detailTitle: {
        fontFamily: Fonts.medium,
        fontSize: NormalizeText(14),
        color: Colors.TEXT.DARK_GRAY_COLOR
    },
    detailText: {
        fontFamily: Fonts.medium,
        fontSize: NormalizeText(17),
        color: Colors.TEXT.PRIMARY_COLOR
    },
    detailSeparator: {
        height: 1,
        width: '100%',
        marginVertical: Spacing.y8,
        backgroundColor: Colors.WHITE_COLOR
    },
    emailDetailsContainer: {
        borderBottomWidth: 3,
        borderLeftWidth: 3,
        borderRightWidth: 3,
        borderColor: Colors.JOBS.BG_BLUE_COLOR,
        backgroundColor: Colors.JOBS.BG_BLUE_COLOR,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        paddingBottom: Spacing.y8
    },
    emailDetailTitle: {
        fontFamily: Fonts.medium,
        fontSize: NormalizeText(12),
        color: Colors.TEXT.DARK_GRAY_COLOR
    },
    emailDetailSeparator: {
        height: 1,
        width: '100%',
        backgroundColor: Colors.WHITE_COLOR,
        marginBottom: Spacing.y8
    }
});

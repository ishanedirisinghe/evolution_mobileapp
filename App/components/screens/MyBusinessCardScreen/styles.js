import { StyleSheet, Dimensions } from 'react-native';
import { Colors, Fonts, NormalizeText, scale, Spacing } from '../../../styles';
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
        borderTopRightRadius: scale(20),
        borderTopLeftRadius: scale(20),
        backgroundColor: Colors.TINT_PINK_COLOR
    },
    avatar: {
        width: avatorSize,
        height: avatorSize,
        borderTopRightRadius: scale(20),
        borderTopLeftRadius: scale(20),
        borderBottomRightRadius: scale(100)
    },
    nameContainer: {
        marginTop: -1,
        paddingVertical: Spacing.y8,
        paddingHorizontal: Spacing.x20,
        backgroundColor: Colors.TINT_PINK_COLOR
    },
    fNameText: {
        width: '70%',
        fontFamily: Fonts.medium,
        fontSize: NormalizeText(24),
        color: Colors.TEXT.SECONDARY_COLOR
    },
    lNameText: {
        marginTop: -10,
        width: '70%',
        fontFamily: Fonts.medium,
        fontSize: NormalizeText(24),
        color: Colors.TEXT.SECONDARY_COLOR
    },
    designationText: {
        width: '70%',
        fontFamily: Fonts.regular,
        fontSize: NormalizeText(13),
        color: Colors.TEXT.SECONDARY_COLOR
    },
    qrCodeContainer: {
        position: 'absolute',
        bottom: Spacing.y14,
        right: Spacing.x14,
        width: 112,
        height: 112,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.WHITE_COLOR
    },
    qrCodeImage: {
        width: 104,
        height: 104
    },
    logoImageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: Spacing.y16
    },
    logoImage: {
        width: scale(167),
        height: scale(63)
    },
    detailsContainer: {
        backgroundColor: Colors.JOBS.BG_BLUE_COLOR,
        borderBottomLeftRadius: scale(20),
        borderBottomRightRadius: scale(20)
    },
    detailBody: {
        paddingHorizontal: Spacing.x20,
        marginBottom: Spacing.y36
    },
    detailView: {
        marginTop: Spacing.y20,
        flexDirection: 'row',
        alignItems: 'center'
    },
    detailIcon: {
        width: 20,
        height: 20 // Image size should need to maintain same square size
    },
    detailText: {
        flex: 1,
        marginLeft: Spacing.x14,
        fontFamily: Fonts.medium,
        fontSize: NormalizeText(16),
        color: Colors.TEXT.SECONDARY_COLOR
    },
    siteLinkText: {
        textAlign: 'center',
        fontFamily: Fonts.medium,
        fontSize: NormalizeText(12),
        color: Colors.TEXT.SECONDARY_COLOR,
        marginBottom: Spacing.y10
    }
});

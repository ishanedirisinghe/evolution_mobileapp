import { StyleSheet } from 'react-native';
import { Colors, Fonts, NormalizeText, scale, Spacing } from '../../../../styles';

export default StyleSheet.create({
    flex1: { flex: 1 },
    container: {
        flex: 1,
        backgroundColor: Colors.BACKGROUND_COLOR
    },
    centerContainer: {
        flex: 1,
        backgroundColor: Colors.BACKGROUND_COLOR
    },
    notificationList: {
        flex: 1
    },
    notificationListContianer: {
        paddingHorizontal: Spacing.x20
    },
    listItemRead: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginTop: Spacing.y10,
        backgroundColor: Colors.JOBS.BG_BLUE_COLOR,
        paddingHorizontal: Spacing.x16,
        paddingVertical: Spacing.y14,
        borderRadius: scale(14)
    },
    listItemUnRead: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginTop: Spacing.y10,
        backgroundColor: Colors.TINT_PINK_COLOR,
        paddingHorizontal: Spacing.x16,
        paddingVertical: Spacing.y14,
        borderRadius: scale(14)
    },
    listItemDetailContainer: {
        flex: 1,
        marginLeft: Spacing.x16
    },
    unreadIcon: { width: 24, height: 24 },
    readIcon: { width: 20, height: 20 },
    notificationTitleText: {
        flex: 1,
        fontFamily: Fonts.medium,
        fontSize: NormalizeText(14),
        color: Colors.TEXT.SECONDARY_COLOR
    },
    notificationDescriptionText: {
        marginVertical: 2,
        lineHeight: 20,
        fontFamily: Fonts.light,
        fontSize: NormalizeText(13),
        color: Colors.TEXT.SECONDARY_COLOR
    },
    notificationDateText: {
        fontFamily: Fonts.medium,
        fontSize: NormalizeText(10),
        color: Colors.TEXT.SECONDARY_COLOR
    },
    noNotificationText: {
        textAlign: 'center',
        flex: 1,
        fontFamily: Fonts.medium,
        fontSize: NormalizeText(16),
        marginHorizontal: Spacing.x20,
        color: Colors.TEXT.DISABLE_COLOR
    }
});

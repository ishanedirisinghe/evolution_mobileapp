import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Colors, Fonts, NormalizeText, scale, Spacing } from '../../../../styles';
import { MAIN_FONT } from '../../../Utility/FontsStyle/font';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.BACKGROUND_COLOR
    },
    scrollView: { paddingLeft: Spacing.x36 },
    menuText: {
        marginTop: Spacing.y36,
        fontFamily: Fonts.medium,
        fontSize: NormalizeText(20),
        color: Colors.TEXT.PRIMARY_COLOR
    },
    menuSeparator: {
        width: '100%',
        height: 1,
        marginTop: Spacing.y14,
        marginBottom: Spacing.y30,
        backgroundColor: Colors.SEPARATOR_COLOR
    },
    itemSeparator: {
        width: '100%',
        height: 1,
        marginVertical: Spacing.y30,
        backgroundColor: Colors.SEPARATOR_COLOR
    },
    drawerItem: {
        width: '100%',
        paddingVertical: Spacing.y10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    itemIconContainer: {
        width: 35,
        height: 35,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center'
    },
    itemIcon: { width: 16, height: 16 },
    itemText: {
        flex: 1,
        fontFamily: Fonts.medium,
        fontSize: NormalizeText(16),
        marginLeft: Spacing.x16,
        color: Colors.TEXT.PRIMARY_COLOR
    },
    countItem: {
        minWidth: 24,
        height: 24,
        marginRight: Spacing.x10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12,
        backgroundColor: 'red'
    },
    countText: {
        fontFamily: Fonts.semi_bold,
        fontSize: NormalizeText(12),
        paddingLeft: 7,
        paddingRight: 7,
        color: Colors.TEXT.SECONDARY_COLOR
    }
});

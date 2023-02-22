import { StyleSheet } from 'react-native';
import { scale, Spacing } from '../../../../styles';

export default StyleSheet.create({
    flex1: { flex: 1 },
    container: {
        flex: 1
    },
    listView: {
        alignItems: 'center',
        paddingBottom: Spacing.y20
    },
    imageTouch: {
        marginTop: Spacing.y20
    },
    imageView: {
        height: scale(228),
        width: scale(374),
        borderRadius: scale(12)
    }
});

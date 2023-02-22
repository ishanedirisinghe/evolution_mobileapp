import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Colors } from '../../../../styles';
import styles from './styles';

export default class App extends React.Component {
    render() {
        const { INDEX, SELECTED_INDEX, KEY, LABEL } = this.props;
        const startColor =
            INDEX === SELECTED_INDEX
                ? Colors.GRADIENT.GRADIENT_START
                : Colors.BACKGROUND_COLOR;
        const endColor =
            INDEX === SELECTED_INDEX
                ? Colors.GRADIENT.GRADIENT_END
                : Colors.BACKGROUND_COLOR;
        return (
            <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                colors={[startColor, endColor]}
                style={styles.container}>
                <TouchableOpacity
                    style={styles.tabTouch}
                    onPress={() => this.props.onPress(INDEX, KEY)}>
                    <Text
                        style={{
                            ...styles.labelText,
                            color:
                                INDEX === SELECTED_INDEX
                                    ? Colors.TEXT.SECONDARY_COLOR
                                    : Colors.TEXT.PRIMARY_COLOR
                        }}>
                        {LABEL}
                    </Text>
                </TouchableOpacity>
            </LinearGradient>
        );
    }
}

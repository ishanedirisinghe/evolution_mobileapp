/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

import Icon from 'react-native-vector-icons/AntDesign';

import styles from './styles';

class BCQRPopup extends Component {
    fieldRef = React.createRef();

    constructor(props) {
        super(props);
        this.state = {
            qrCodeUrl: props.URL
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.innerContainer}>
                    <View style={styles.popupTitleView}>
                        <Text style={styles.popupTitleText} numberOfLines={1}>
                            Evolution Australia
                        </Text>
                        <TouchableOpacity
                            style={styles.closeView}
                            onPress={() => this.props.onPressClose()}>
                            <Icon name="close" size={25} color="white" />
                        </TouchableOpacity>
                    </View>

                    <View
                        style={styles.qrCodeContainer}
                        onPress={this.showQRModal}>
                        <Image
                            style={styles.qrCodeImage}
                            resizeMode="cover"
                            source={{
                                uri: this.state.qrCodeUrl
                            }}
                        />
                    </View>
                </View>
            </View>
        );
    }
}

export default BCQRPopup;

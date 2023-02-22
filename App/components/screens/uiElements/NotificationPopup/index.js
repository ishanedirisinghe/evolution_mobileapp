/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';

import moment from 'moment';
import Icon from 'react-native-vector-icons/AntDesign';

import styles from './styles';

class Search extends Component {
    fieldRef = React.createRef();

    constructor(props) {
        super(props);
        this.state = {
            notifiTitle: props.TITLE,
            notifiMessage: props.MESSAGE,
            notifiTime: props.TIME
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

                    <ScrollView
                        contentContainerStyle={styles.scrollContainer}
                        bounces={false}
                        showsVerticalScrollIndicator={false}>
                        <View>
                            <Text style={styles.notificationTitleText}>
                                {this.state.notifiTitle}
                            </Text>
                            <Text style={styles.notificationDateText}>
                                {moment(this.state.notifiTime).format(
                                    'DD/MM/YYYY h:mm A'
                                )}
                            </Text>
                            <View style={styles.separatorView} />
                            <Text style={styles.notificationDescriptionText}>
                                {this.state.notifiMessage}
                            </Text>
                        </View>
                    </ScrollView>
                </View>
            </View>
        );
    }
}

export default Search;

/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import {
    View,
    Image,
    SafeAreaView,
    FlatList,
    Linking,
    Platform,
    AppState,
    TouchableOpacity
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import styles from './styles';
import HamNavigationHeader from '../../uiElements/HamNavigationHeader';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            appState: AppState.currentState,
            isLogged: false,
            visible: true,
            showScreenLoading: false,
            pages: []
        };
    }

    componentDidMount() {
        AppState.addEventListener('change', this._handleAppStateChange);
        this.getNewsData();
        this.props.navigation.addListener('didFocus', () => {});
    }

    componentWillUnmount() {
        AppState.removeEventListener('change', this._handleAppStateChange);
    }

    _handleAppStateChange = nextAppState => {
        if (
            this.state.appState.match(/inactive|background/) &&
            nextAppState === 'active'
        ) {
            // console.log('App has come to the foreground!')
        }
        this.setState({ appState: nextAppState });
    };

    getNewsData() {
        var context = this;

        let requestPath =
            global.API_ENDPOINT +
            '/api/ImageAPI/GetActiveSliderImages?isExternal=true';

        context.setState({ showScreenLoading: true });
        fetch(requestPath, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + global.session.access_token
            }
        })
            .then(response => response.text())
            .then(result => {
                context.setState({ showScreenLoading: false });
                let resultJson = JSON.parse(result);
                console.log('DEBUG: Get NEws request success. ', resultJson);

                var dataList =
                    resultJson && resultJson.length > 0 ? resultJson : [];
                context.setState({ pages: dataList });
            })
            .catch(error => {
                context.setState({ showScreenLoading: false });
                showMessage({
                    message: 'Error',
                    description:
                        'Unknown server error. Please check your internet connection. Contact support if issue prevails.',
                    type: 'danger'
                });
            });
    }

    onPressLearnMore = item => {
        var learnMoreURL = item.WebUrl;
        if (learnMoreURL && learnMoreURL !== '') {
            Platform.OS === 'ios'
                ? this.props.navigation.navigate('PortalIconInfoScreenNews', {
                      WEB_URL: learnMoreURL,
                      TITLE: ''
                  })
                : Linking.openURL(learnMoreURL);
        }
    };

    renderImageView = ({ item }) => {
        return (
            <TouchableOpacity
                style={styles.imageTouch}
                onPress={() => this.onPressLearnMore(item)}>
                <Image
                    style={styles.imageView}
                    source={{ uri: item.ImageUrl }}
                    resizeMode="contain"
                />
            </TouchableOpacity>
        );
    };

    render() {
        const { pages } = this.state;

        return (
            <SafeAreaView style={styles.container}>
                <HamNavigationHeader {...this.props} screenTitle="News" />
                <View style={styles.flex1}>
                    <Spinner
                        visible={this.state.showScreenLoading}
                        textContent={'Loading...'}
                    />
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.listView}
                        keyExtractor={item => String(item.ImageID)}
                        data={pages}
                        renderItem={this.renderImageView}
                    />
                </View>
            </SafeAreaView>
        );
    }
}

export default Search;

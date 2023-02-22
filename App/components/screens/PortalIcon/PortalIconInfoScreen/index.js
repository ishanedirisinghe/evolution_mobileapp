import React, {Component} from 'react';
import {View, Dimensions, SafeAreaView} from 'react-native';
import {WebView} from 'react-native-webview';

import Spinner from 'react-native-loading-spinner-overlay';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const imageWidth = Dimensions.get('window').width;
import NavBarWithBack from '../../uiElements/NavBarWithBack';

import styles from './styles';
import NavigationHeader from '../../uiElements/NavigationHeader';

class Search extends Component {
  fieldRef = React.createRef();

  constructor(props) {
    super(props);
    this.state = {
      spinner: false,
    };
  }

  componentDidMount() {
    const {WEB_URL} = this.props.navigation.state.params;
    const {TITLE} = this.props.navigation.state.params;
    this.setState({web_url: WEB_URL, title: TITLE});
  }

  showSpinner() {
    console.log('Show Spinner');
    this.setState({spinner: true});
  }

  hideSpinner() {
    console.log('Hide Spinner');
    this.setState({spinner: false});
  }

  render() {
    return (
      <SafeAreaView style={styles.centerContainer}>
        <NavigationHeader {...this.props} screenTitle={this.state.title} />
        <View style={styles.flex1}>
          <Spinner visible={this.state.spinner} textContent={'Loading...'} />
          <WebView
            ref="webview"
            style={styles.webView}
            source={{uri: this.state.web_url}}
            onLoadStart={() => this.showSpinner()}
            onLoad={() => this.hideSpinner()}
            //onNavigationStateChange={this._onURLChanged.bind(this)}
            // onMessage={(event) => { this.onMessage(event) }}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            injectedJavaScript={this.state.cookie}
            startInLoadingState={false}
            useWebKit={true}
          />
        </View>
      </SafeAreaView>
    );
  }
}

export default Search;

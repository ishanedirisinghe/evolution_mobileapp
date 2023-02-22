import React, {Component} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Linking,
  Image,
} from 'react-native';
import HamNavigationHeader from '../../uiElements/HamNavigationHeader';
import styles from './styles';
import deviceInfoModule from 'react-native-device-info';

class App extends Component {
  fieldRef = React.createRef();

  constructor(props) {
    super(props);
    this.state = {
      isLogged: false,
      visible: true,
    };
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <HamNavigationHeader {...this.props} screenTitle="About Us" />
        <ScrollView style={styles.centerContainer}>
          <View style={styles.logoImageContainer}>
            <Image
              style={styles.logoImage}
              source={require('../../../../assets/images/evolution_logo.png')}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.titleText}>
            {'Evolution Hospitality Institute\n(RTO# 91256)'}
          </Text>
          <View style={styles.textContainer}>
            <Text style={styles.enterTextNormal}>
              A name that in the business of training hospitality and education
              has set itself up as a leader.
            </Text>
            <Text style={styles.enterTextNormal}>
              Institution has received four national and state awards throughout
              its lifespan. The institute has taken on displaced and
              disadvantaged students and helped them to complete their training.
            </Text>
            <Text style={styles.enterTextNormal}>
              The industry wants good basic skills, hygiene standards,
              communication and social understanding of the workplace. The
              advance skills are tailored once they are in the work place.
            </Text>
            <Text style={styles.enterTextNormal}>
              This is “Hospitality”, this is what
              <Text style={styles.enterTextBold}>
                {' Evolution Hospitality Institute '}
              </Text>{' '}
              is achieving now and will continue to do into the future.
            </Text>
          </View>
        </ScrollView>
        <TouchableOpacity
          style={styles.webLinkTouch}
          onPress={() => {
            Linking.openURL('https://www.evolution.edu.au/');
          }}>
          <Text style={styles.webLinkText}>www.evolution.edu.au</Text>
          <Text style={styles.versionText}>
            {deviceInfoModule.getVersion()}
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}

export default App;

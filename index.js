/**
 * @format
 */
import React from 'react'
import { AppRegistry, UIManager } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import messaging from '@react-native-firebase/messaging';
import 'react-native-gesture-handler'

UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);

// Register background handler
messaging().setBackgroundMessageHandler(async remoteMessage => {

    try {
        console.log('Message handled in the background!', JSON.stringify(remoteMessage));

    } catch (e) {
        console.log("Firebase error", e)
    }
});


function HeadlessCheck({ isHeadless }) {
    if (isHeadless) {
        // App has been launched in the background by iOS, ignore
        return null;
    }

    return <App />;
}


AppRegistry.registerComponent(appName, () => HeadlessCheck);

import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import Signin from './src/screens/auth/Signin'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/screens/home/Home';
import { Provider } from 'react-redux';
import { configStore, store } from './src/redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import Navigation from './src/screens/components/Navigation';
import SplashScreen from 'react-native-splash-screen';
import PushNotification, {Importance} from 'react-native-push-notification';


const App = ({ navigation }) => {
  const Stack = createNativeStackNavigator();
  const { Store, persistor } = configStore();

  useEffect(() => {
    SplashScreen.hide();
    PushNotification.createChannel(
      {
        channelId: "channel-id", // (required)
        channelName: "My channel", // (required)
        channelDescription: "A channel to categorise your notifications", // (optional) default: undefined.
        playSound: false, // (optional) default: true
        soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
        importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
        vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
      },
      (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
    );
  }, [])
  
  return (
    <Provider store={Store}>
      <PersistGate loading={null} persistor={persistor}>
        <Navigation />
      </PersistGate>
    </Provider>
  )
}

export default App

const styles = StyleSheet.create({})
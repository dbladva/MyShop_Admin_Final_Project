import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Signin from './src/screens/auth/Signin'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/screens/home/Home';
import { Provider } from 'react-redux';
import { configStore, store } from './src/redux/store';
import { PersistGate } from 'redux-persist/integration/react';


const App = ({navigation}) => {
  const Stack = createNativeStackNavigator();

  const { Store, persistor } = configStore();
  return (
    <Provider store={Store}>
       <PersistGate loading={null} persistor={persistor}>
    <NavigationContainer>
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Signin" component={Signin} />
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  </NavigationContainer>
  </PersistGate>
  </Provider>
  )
}

export default App

const styles = StyleSheet.create({})
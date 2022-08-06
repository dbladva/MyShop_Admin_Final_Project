import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Signin from '../auth/Signin';
import Home from '../home/Home';
import { useDispatch, useSelector } from 'react-redux';
import { userUid } from '../../redux/action/auth.action';
import { SpinnerCircular } from 'spinners-react';

const Navigation = () => {
    const Stack = createNativeStackNavigator();
    const dispatch = useDispatch()

    const uid = useSelector(state => state.auth)

    useEffect(() => {
        dispatch(userUid())
    }, [])

    console.log('Loadinggggggggggggggggggg',uid.isLoading);
    return (
        uid.isLoading === true ? 
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' ,backgroundColor: 'white'}}> 
         <SpinnerCircular enabled={true} />
        </View> 
        :
        uid.user !== null ?
            <NavigationContainer>
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="Home" component={Home} />
                </Stack.Navigator>
            </NavigationContainer>
            :
            <NavigationContainer>
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="Signin" component={Signin} />
                </Stack.Navigator>
            </NavigationContainer>
    )
}

export default Navigation

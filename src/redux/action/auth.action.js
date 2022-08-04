import * as ActionType from '../ActionType'
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-community/async-storage';

export const signinUserEmail = (email, password,navigation) => async (dispatch) => {
    auth()
        .signInWithEmailAndPassword(email, password)
        .then((user) => {
            if (user.user.emailVerified) {
                console.log('aaaaaaaaaaa', user.user.uid);
                AsyncStorage.setItem("user", user.user.uid);
                dispatch({ type: ActionType.SIGNIN_SUCCESS, payload: user.user })
                navigation.navigate('Home')
            } else {
                console.log("2", user);
                dispatch({ type: ActionType.USER_EMAIL, payload: "Please verify your email Address." })
            }
        })
        .catch((error) => {
            console.log("3");
            dispatch({ type: ActionType.AUTH_ERROR, payload: error.code })
        })
}

export const uid = () => async (dispatch) => {
    console.log('callllllled');
    try {
        const value = await AsyncStorage.getItem('user')
        if (value !== null) {
            console.log('Value', value);
        }else{
            console.log('error');
        }
        // dispatch({ type: ActionType.UID, payload: value })
    } catch (e) {
        console.log(e);
        // dispatch({ type: ActionType.AUTH_ERROR, payload: error.code })
    }
}

export const Loading = () => (dispatch) => {
    dispatch({ type: ActionType.LOADING_LOGIN });
}


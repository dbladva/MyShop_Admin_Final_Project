import * as ActionType from '../ActionType'
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-community/async-storage';

export const signinUserEmail = (email, password, navigation) => async (dispatch) => {
    auth()
        .signInWithEmailAndPassword(email, password)
        .then((user) => {
            if (user.user.emailVerified) {
                AsyncStorage.setItem("user", user.user.uid);
                dispatch({ type: ActionType.SIGNIN_SUCCESS, payload: user.user })
            } else {
                dispatch({ type: ActionType.USER_EMAIL, payload: "Please verify your email Address." })
            }
        })
        .catch((error) => {
            dispatch({ type: ActionType.AUTH_ERROR, payload: error.code })
        })
}

export const userUid = () => async (dispatch) => {
    // dispatch(Loading())
    try {
        const value = await AsyncStorage.getItem('user')
        if (value !== null) {
            console.log('Value', value);
        } else {
            // console.log(value);
        }
        dispatch({ type: ActionType.UID, payload: value})
    } catch (e) {
        // console.log(e);
        dispatch({ type: ActionType.AUTH_ERROR, payload: error.code })
    }
}

export const signoutEmail = () => (dispatch) => {
    // dispatch(Loading())
    try {
        auth()
            .signOut()
            .then(() => {
                AsyncStorage.clear()
                dispatch({ type: ActionType.SIGNOUT_USER, })
                dispatch(userUid())
            });
    } catch (e) {
        dispatch({ type: ActionType.AUTH_ERROR, payload: error.code })
    }
}
export const resetPasswordEmail = (email, navigation) => (dispatch) => {
    try {
        dispatch(Loading())
        auth()
            .sendPasswordResetEmail(email)
            .then(() => {
                // dispatch({type: ActionType.RESET_PASSWORD, payload: "Reset password link sent to your email address."})
                Alert.alert(
                    "Reset Password",
                    "Reset password link sent to your email address.",
                    [
                        { text: "OK", onPress: () => navigation.navigate('Login') }
                    ]
                );
            })
            .catch((error) => {
                dispatch({ type: ActionType.AUTH_ERROR, payload: error.code })
            })
    } catch (e) {
        dispatch({ type: ActionType.AUTH_ERROR, payload: error.code })
    }
}

export const Loading = () => (dispatch) => {
    dispatch({ type: ActionType.LOADING_LOGIN });
}


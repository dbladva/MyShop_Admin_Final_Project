import * as ActionType from '../ActionType'
import firestore from '@react-native-firebase/firestore';

export const uploadProduct = (data) => async (dispatch) => {
try {
    
} catch (error) {
    
}
}

export const loadingProduct = () => (dispatch) => {
    dispatch({ type: ActionType.LOADING_PRODUCT});
  }
  
  export const errorProduct = (error) => (dispatch) => {
    dispatch({ type: ActionType.ERROR_PRODUCT, payload: error })
  }
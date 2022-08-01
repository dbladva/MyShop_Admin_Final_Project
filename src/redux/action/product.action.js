import * as ActionType from '../ActionType'
import firestore from '@react-native-firebase/firestore';

export const uploadProduct = (data) => (dispatch) => {
  try {
    firestore()
      .collection('Product')
      .add({
        name: data.name,
        category: data.category,
        imgURl: data.productImage,
        details: data.discription,
        price: data.price,
      })
      .then(() => {
        console.log('User added!');
      })
      .catch((error) => {
        console.log(error);
      })
  } catch (error) {
    dispatch({ type: ActionType.ERROR_PRODUCT, payload: error })
  }
}

export const loadingProduct = () => (dispatch) => {
  dispatch({ type: ActionType.LOADING_PRODUCT });
}

export const errorProduct = (error) => (dispatch) => {
  dispatch({ type: ActionType.ERROR_PRODUCT, payload: error })
}
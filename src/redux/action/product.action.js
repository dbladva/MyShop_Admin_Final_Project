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

export const getproduct = () => async (dispatch) => {
  try {
    let data = [];
    await firestore()
      .collection('Product')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
          let d = {
            id: documentSnapshot.id,
            ...documentSnapshot.data()
          }
          data.push(d);
        });
      });
    dispatch({ type: ActionType.GET_PRODUCT, payload: data })
  } catch (error) {
    dispatch({ type: ActionType.ERROR_PRODUCT, payload: error })
  }
}

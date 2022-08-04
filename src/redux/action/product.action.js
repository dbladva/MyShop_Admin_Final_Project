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
        alert('Product added successfully!');
        dispatch(getproduct())
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

export const getProductDetail = (id) => async (dispatch) => {
  try {
    let data = [];
    await firestore()
      .collection('Product')
      .doc(id)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
          let d = {
            ...documentSnapshot.data()
          }
          data.push(d);
        });
      });
    dispatch({ type: ActionType.GET_PRODUCT_DETAIL, payload: data })
  } catch (error) {
    dispatch({ type: ActionType.ERROR_PRODUCT, payload: error })
  }
}


export const deleteProduct = (id) => async (dispatch) => {
  try {
    await firestore()
      .collection('Product')
      .doc(id)
      .delete()
      .then(() => {
        console.log('Product deleted!');
        dispatch(getproduct())
      });
  } catch (error) {
    dispatch({ type: ActionType.ERROR_PRODUCT, payload: error })
  }
}


export const updateProduct = (data,id) => (dispatch) => {
  // dispatch({ type: ActionType.UPDATE_PRODUCT, payload: data })
  try {
    firestore()
      .collection('Product')
      .doc(id)
      .update({
        name: data.name,
        category: data.category,
        imgURl: data.productImage,
        details: data.discription,
        price: data.price,
      })
      .then(() => {
        console.log('Product updated!');
        // dispatch({ type: ActionType.UPDATED_PRODUCT, payload: data })
        dispatch(getproduct())
      });
  } catch (error) {
    dispatch({ type: ActionType.AUTH_ERROR, payload: error.code })
  }

}
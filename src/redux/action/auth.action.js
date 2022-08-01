import * as ActionType from '../ActionType'
import firestore from '@react-native-firebase/firestore';

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

                // console.log(data)
                });
            });
        dispatch({ type: ActionType.GET_PRODUCT, payload: data })
    } catch (error) {
        // console.log(error);
    }
}
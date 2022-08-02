import { combineReducers } from "redux";
import { authReducer, productReducer } from "./product.reducer";


export const RootReducer = combineReducers({
product: productReducer,
})
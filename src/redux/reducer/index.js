import { combineReducers } from "redux";
import { authReducer } from "./auth.reducer";
import { productReducer } from "./product.reducer";



export const RootReducer = combineReducers({
    product: productReducer,
    auth: authReducer,
})
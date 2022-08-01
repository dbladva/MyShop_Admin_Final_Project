import { combineReducers } from "redux";
import { authReducer } from "./authReducer";

export const RootReducer = combineReducers({
auth: authReducer
})
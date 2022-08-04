import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { RootReducer } from "./reducer";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";   
import AsyncStorage from "@react-native-community/async-storage";

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: []
  }

  const persistedReducer = persistReducer(persistConfig, RootReducer)

  export const configStore = () => {
    const Store = createStore(persistedReducer,applyMiddleware(thunk))
    let persistor = persistStore(Store)
    return { Store, persistor }
  }
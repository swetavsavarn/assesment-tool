import { configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // or use 'redux-persist/lib/localStorage' for localStorage
import rootReducer from "./rootReducer";
import { rootApi } from "@/services/api";
import persistStore from "redux-persist/es/persistStore";
import { isDebugMode } from "@/utils";

const middlewares = [rootApi.middleware];

let blacklist = ['permissions', 'userAuth', "socket", "test"]


const persistConfig = {
  key: "root", // a unique key to identify the root of your Redux store in local storage
  storage, // the storage engine to use (e.g., localStorage, sessionStorage)
  // Optionally, you can specify specific state slices to persist:
  // whitelist: ['slice1', 'slice2'],
  blacklist
};

/* This code is configuring and creating a Redux store using the `configureStore` function from the
`@reduxjs/toolkit` library. */
const store = configureStore({
  reducer: persistReducer(persistConfig, rootReducer),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(middlewares),
  devTools: process.env.NODE_ENV !== "production",
});

export const persistor = persistStore(store);


export default store;

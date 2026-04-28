import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import ownerReducer from "./ownerSlice";
import mapSlice from "./mapSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    owner: ownerReducer,
    map: mapSlice
  },
  // ADD THIS MIDDLEWARE SECTION
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // This stops the "non-serializable value" error
        ignoredPaths: ['user.socket'],
        ignoredActions: ['user/setSocket'],
      },
    }),
});

// import { configureStore } from "@reduxjs/toolkit";
// import userReducer from "./userSlice";
// import ownerReducer from "./ownerSlice";

// import storage from "redux-persist/lib/storage";
// import { persistReducer, persistStore } from "redux-persist";

// const persistConfig = {
//   key: "user",
//   storage,
// };

// const persistedUserReducer = persistReducer(persistConfig, userReducer);

// export const store = configureStore({
//   reducer: {
//     user: persistedUserReducer,
//     owner: ownerReducer,
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: false,
//     }),
// });

// export const persistor = persistStore(store);
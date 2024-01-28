import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import { apiSlice } from "../features/api/apiSlice";
import authReducer from "../features/store/authReducer";



export const store = configureStore({
  reducer: {
      [apiSlice.reducerPath]: apiSlice.reducer,
      auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
          .concat(apiSlice.middleware)

})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>

setupListeners(store.dispatch);
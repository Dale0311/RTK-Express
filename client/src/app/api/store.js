import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './apiSlice';
import { authSlice } from '../../features/auth/authSlice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const authPersistConfig = { key: 'auth', storage };
const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authSlice.reducer),
  [apiSlice.reducerPath]: apiSlice.reducer,
});
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      apiSlice.middleware
    ),
});

export const persistor = persistStore(store);

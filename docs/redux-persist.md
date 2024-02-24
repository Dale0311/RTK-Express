### docu for redux persist

```node
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; //default to localstorage

//create a persistConfig, apply persist to a certain reducer
const authPersistConfig = { key: 'auth', storage };

// add all your reducer to a combineReducer
const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authSlice.reducer),
  [apiSlice.reducerPath]: apiSlice.reducer,
});

// modify your store
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      apiSlice.middleware
    ),
});

// create a persistor
export const persistor = persistStore(store);

// @main.jsx
import { store, persistor } from './app/api/store.js';
import { PersistGate } from 'redux-persist/integration/react';

<PersistGate persistor={persistor} loading={null}>
  <App />
</PersistGate>;
```

import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
// import storage from 'redux-persist/lib/storage';
import alertSliceReducer from './alertSlice';
import authReducer from './authSlice';

const combineReducer = combineReducers({
  authvalues: authReducer,
  alertpopup: alertSliceReducer,
});

export const makeConfiguredStore = () =>
  configureStore({
    reducer: combineReducer,
    devTools: process.env.NODE_ENV !== 'production',
    // devTools: true,
  });
export const makeStore = () => {
  const isServer = typeof window === 'undefined';
  if (isServer) {
    return makeConfiguredStore();
  } else {
    // we need it only on client side
    const storage = require('redux-persist/lib/storage');
    const persistConfig = {
      key: 'nextjs',
      whitelist: ['authvalues', 'alertpopup'], // make sure it does not clash with server keys
      storage: storage.default,
    };
    const persistedReducer = persistReducer(persistConfig, combineReducer);
    let store = configureStore({
      reducer: persistedReducer,
      middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
          serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
          },
        }),
      devTools: process.env.NODE_ENV !== 'production',
    });
    store.__persistor = persistStore(store); // Nasty hack
    return store;
  }
};

export const wrapper = createWrapper(makeStore);

import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer, persistStore } from 'redux-persist';
import gifReducer from './slices';
import { configureStore } from '@reduxjs/toolkit';

const persistSettings = {
  key: 'GIFINDER',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistSettings, gifReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);

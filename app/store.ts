import { combineReducers, configureStore } from '@reduxjs/toolkit';
import playlistIdReducer from '../features/playlistIdSlice';
import playlistReducer from '../features/playlistSlice';
import songReducer from '../features/songSlice';
import isPlayingReducer from '../features/isPlayingSlice';
import deviceIdReducer from '../features/deviceIdSlice';
import storage from 'redux-persist/lib/storage'; 
import {persistReducer} from 'redux-persist';
import {persistStore} from 'redux-persist';

// create the root reducer
const rootReducer = combineReducers({
  playlistId: playlistIdReducer,
  playlist: playlistReducer,
  song: songReducer,
  isPlaying: isPlayingReducer,
  deviceId: deviceIdReducer,
});

// Configuration object for redux-persist
const persistConfig = {
  key: 'root', // Key used for the local storage
  storage // Specify the storage engine, for web it's typically localStorage
};
// Create a persisted reducer using the root reducer and persist config
const persistedReducer = persistReducer(persistConfig, rootReducer);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch

export const store = configureStore({
  reducer: persistedReducer,
  // Additional middleware can be added here
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE', 'persist/PAUSE', 'persist/PURGE', 'persist/REGISTER'], // Necessary to ignore actions thrown by Redux Persist
      },
    }),
});

export const persistor = persistStore(store);
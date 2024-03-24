// Assuming this is in a file where you configure your store
import { configureStore } from '@reduxjs/toolkit';
import playlistIdReducer from '../features/playlistIdSlice';
import playlistReducer from '../features/playlistSlice';
// Define your store as usual
const store = configureStore({
  reducer: {
    playlistId: playlistIdReducer,
    playlist: playlistReducer,
  },
});

// Define the RootState type based on the store's state
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch

export default store;

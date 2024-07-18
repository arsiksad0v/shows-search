import { configureStore } from '@reduxjs/toolkit';
import showsReducer from './features/shows/showsSlice';

const store = configureStore({
  reducer: {
    shows: showsReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
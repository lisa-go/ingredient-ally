import { configureStore } from '@reduxjs/toolkit';
import pageSlice from './slices/pageSlice';

export const store = configureStore({
  reducer: {
    page: pageSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

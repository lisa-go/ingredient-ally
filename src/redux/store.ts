import { configureStore } from '@reduxjs/toolkit';
import pageSlice from './slices/pageSlice';
import inventorySlice from './slices/inventorySlice';

export const store = configureStore({
  reducer: {
    page: pageSlice,
    inventory: inventorySlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

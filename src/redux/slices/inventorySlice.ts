import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { defaultList } from '../../defaultList';

export interface Item {
  name: string;
  ingredients: string[] | undefined;
}

interface InventoryState {
  list: Item[] | null;
  process: boolean;
}

const initialState: InventoryState = {
  list:
    JSON.parse(localStorage.getItem('local-list') || '').length !== 0 ||
    JSON.parse(localStorage.getItem('local-list') || '') !== null ||
    JSON.parse(localStorage.getItem('local-list') || '') !== undefined
      ? JSON.parse(localStorage.getItem('local-list') || '')
      : defaultList,
  process: false,
};

export const inventorySlice = createSlice({
  name: 'inventory',
  initialState,
  reducers: {
    change: (state, action: PayloadAction<Item[] | null>) => {
      state.list = action.payload;
      state.process = false;
    },
    add: (state, action: PayloadAction<Item>) => {
      if (state.list) state.list = state.list.concat(action.payload);
      else state.list = [action.payload];
      state.process = false;
    },
    generate: (state) => {
      state.process = true;
    },
    completeGenerate: (state) => {
      state.process = false;
    },
  },
});

export const { change, add, generate, completeGenerate } =
  inventorySlice.actions;

export default inventorySlice.reducer;

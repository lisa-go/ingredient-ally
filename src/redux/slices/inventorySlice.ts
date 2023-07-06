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

const storedList = localStorage.getItem('local-list');
const parsedList = storedList ? JSON.parse(storedList) : null;

const initialState: InventoryState = {
  list:
    Array.isArray(parsedList) && parsedList.length > 0
      ? parsedList
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

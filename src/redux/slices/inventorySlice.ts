import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface Item {
  name: string;
  ingredients: string[];
}

interface InventoryState {
  list: Item[] | null;
  process: boolean;
}

const initialState: InventoryState = {
  list: null,
  process: false,
};

export const inventorySlice = createSlice({
  name: 'inventory',
  initialState,
  reducers: {
    change: (state, action: PayloadAction<Item[]>) => {
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

import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface Item {
  name: string;
  ingredients: string[];
}

interface InventoryState {
  list: Item[] | null;
}

const initialState: InventoryState = {
  list: null,
};

export const inventorySlice = createSlice({
  name: 'inventory',
  initialState,
  reducers: {
    change: (state, action: PayloadAction<Item[]>) => {
      state.list = action.payload;
    },
    add: (state, action: PayloadAction<Item>) => {
      if (state.list) state.list = state.list.concat(action.payload);
      else state.list = [action.payload];
    },
  },
});

export const { change, add } = inventorySlice.actions;

export default inventorySlice.reducer;

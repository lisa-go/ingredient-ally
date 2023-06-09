import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface PageState {
  current: number;
}

const initialState: PageState = {
  current: 0,
};

export const pageSlice = createSlice({
  name: 'page',
  initialState,
  reducers: {
    change: (state, action: PayloadAction<number>) => {
      state.current = action.payload;
    },
  },
});

export const { change } = pageSlice.actions;

export default pageSlice.reducer;

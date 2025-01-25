// src/features/counterSlice.js
import { createSlice } from '@reduxjs/toolkit';

const themeSlice = createSlice({
  name: 'theme',
  initialState: { light: true },
  reducers: {
    changeTheme: (state) => {
      state.light = !state.light;// Directly mutate state (thanks to Immer.js)
    }
  },
});

export const { changeTheme } = themeSlice.actions;
export default themeSlice.reducer;
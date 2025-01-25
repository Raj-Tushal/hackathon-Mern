// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './Slices/themeSlice';
import authReducer from './Slices/auth';
import searchReducer from './Slices/searchSlice';

export const store = configureStore({
  reducer: {
    themeReducer: themeReducer,
    auth: authReducer,
    search:searchReducer
  },

});

import { configureStore } from '@reduxjs/toolkit';
import bodyReducer from '../redux/bodySlice.ts';

export const store = configureStore({
  reducer: {
    body: bodyReducer,
  },
})
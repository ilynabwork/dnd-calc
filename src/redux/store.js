import { configureStore } from '@reduxjs/toolkit';
import calculatorReducer from './slices/calculatorSlice';

export default configureStore({
  reducer: {
    calculator: calculatorReducer,
  },
});
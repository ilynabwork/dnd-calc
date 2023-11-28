import { createSlice } from '@reduxjs/toolkit';
import { createNewItem, moveItemWithinArray } from './utils';


export const calculatorSlice = createSlice({
  name: 'calculator',
  initialState: {
    currentValue: '0',
    previousValue: null,
    operation: null,
    isCalculated: false,
    isConstructorMode: true,
    canvasItems: [],
    movedItems: [],
  },
  reducers: {
    addComponentToCanvas: (state, action) => {
      const existingItemIndex = state.canvasItems.findIndex(item => item.id === action.payload.id);

      if (existingItemIndex === -1) {
        // Добавляем новый элемент на холст с originType
        const newItem = createNewItem({
          ...action.payload,
          originType: action.payload.type  // Добавляем originType
        });
        state.canvasItems.push(newItem);
        state.movedItems.push(action.payload.type);
      } else {
        // Если элемент уже есть на холсте, просто перемещаем его
        const draggedItem = state.canvasItems[existingItemIndex];
        state.canvasItems.splice(existingItemIndex, 1);
        state.canvasItems.push(draggedItem);
      }
    },
    moveComponentWithinCanvas: (state, action) => {
      moveItemWithinArray(state.canvasItems, action.payload.dragIndex, action.payload.hoverIndex);
    },
    removeComponentFromCanvas: (state, action) => {
      state.canvasItems = state.canvasItems.filter(item => item.id !== action.payload);
      state.movedItems = state.movedItems.filter(id => id !== action.payload);
    },
    toggleMode: (state) => {
      state.isConstructorMode = !state.isConstructorMode;
    },
    appendValue: (state, action) => {
      if (state.isCalculated || state.currentValue === '0') {
        state.currentValue = action.payload;
        state.isCalculated = false;
      } else {
        state.currentValue += action.payload;
      }
    },
    setOperation: (state, action) => {
      if (!state.isCalculated) {
        state.previousValue = state.currentValue;
        state.currentValue = '';
      }
      state.operation = action.payload;
      state.isCalculated = false;
    },
    calculate: (state) => {
      if (state.operation && state.previousValue !== null) {
        const current = parseFloat(state.currentValue);
        const previous = parseFloat(state.previousValue);
        switch (state.operation) {
        case '+':
          state.currentValue = previous + current;
          break;
        case '-':
          state.currentValue = previous - current;
          break;
        case '*':
          state.currentValue = previous * current;
          break;
        case '/':
          state.currentValue = previous / current;
          break;
        default:
          state.currentValue = 0;
          break;
        }
        if (state.currentValue.toString().includes('.') && state.currentValue.toString().split('.')[1].length > 2) {
          state.currentValue = parseFloat(state.currentValue.toFixed(2));
        }

        state.currentValue = state.currentValue.toString();
        state.isCalculated = true;
        state.previousValue = null;
        state.operation = null;
      }
    },
  },
});

export const {
  addComponentToCanvas,
  removeComponentFromCanvas,
  toggleMode,
  appendValue,
  setOperation,
  calculate,
  moveComponentWithinCanvas,
} = calculatorSlice.actions;

export default calculatorSlice.reducer;


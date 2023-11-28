import { v4 as uuidv4 } from 'uuid';

export const createNewItem = (item) => ({
  ...item,
  id: uuidv4(),
});

export const moveItemWithinArray = (array, fromIndex, toIndex) => {
  const item = array[fromIndex];
  array.splice(fromIndex, 1);
  array.splice(toIndex, 0, item);
};
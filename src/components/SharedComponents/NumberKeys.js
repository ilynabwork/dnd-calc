import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { appendValue } from '../../redux/slices/calculatorSlice';
import { useDraggableComponent } from '../../hooks/useDraggableComponent';
import { selectIsConstructorMode, selectCanvasItems } from '../../redux/selectors';


const NumberKeys = () => {
  const dispatch = useDispatch();
  const numbers = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '0', ','];
  const isConstructorMode = useSelector(selectIsConstructorMode);
  const canvasItems = useSelector(selectCanvasItems);
  const isMoved = canvasItems.some(item => item.originType === 'number_keys');
  const { isDragging, drag } = useDraggableComponent('number_keys');
  const handleNumberClick = (value) => {
    if (!isConstructorMode) {
      dispatch(appendValue(value));
    }
  };

  return (
    <div className={`number-keys ${isMoved ? ' is-disabled' : ''}`} ref={drag} style={{ opacity: isMoved ? 0.5 : 1 }}>
      {numbers.map(number => (
        <button
          key={number}
          onClick={() => handleNumberClick(number)}
          className={`key number-key${number === '0' ? ' col-2 ' : ' '}${isConstructorMode ? 'constructor-mode' : ''}`}
        >
          {number}
        </button>
      ))}
    </div>
  );
};

export default NumberKeys;

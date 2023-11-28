import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setOperation } from '../../redux/slices/calculatorSlice';
import { useDraggableComponent } from '../../hooks/useDraggableComponent';
import { selectIsConstructorMode, selectCanvasItems } from '../../redux/selectors';

const OperatorKeys = () => {
  const dispatch = useDispatch();
  const operators = ['/', '*', '-', '+'];
  const isConstructorMode = useSelector(selectIsConstructorMode);
  const canvasItems = useSelector(selectCanvasItems);
  const isMoved = canvasItems.some(item => item.originType === 'operator_keys');
  const { isDragging, drag } = useDraggableComponent('operator_keys');
  const handleOperatorClick = (operator) => {
    if (!isConstructorMode) {
      dispatch(setOperation(operator));
    }
  };

  return (
    <div className={`operator-keys ${isMoved ? 'is-disabled' : ''}`} ref={drag} style={{ opacity: isMoved ? 0.5 : 1 }}>
      {operators.map(operator => (
        <button
          key={operator}
          onClick={() => handleOperatorClick(operator)}
          className={`key operator-key ${isConstructorMode ? 'constructor-mode' : ''}`}
        >
          {operator}
        </button>
      ))}
    </div>
  );
};

export default OperatorKeys;

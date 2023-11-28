import React from 'react';
import { useSelector } from 'react-redux';
import { useDraggableComponent } from '../../hooks/useDraggableComponent';
import { selectIsConstructorMode, selectCanvasItems } from '../../redux/selectors';

const Display = () => {
  const displayValue = useSelector((state) => state.calculator.currentValue);
  const isConstructorMode = useSelector(selectIsConstructorMode);
  const canvasItems = useSelector(selectCanvasItems);
  const isMoved = canvasItems.some(item => item.originType === 'display');
  const { isDragging, drag } = useDraggableComponent('display');
  return (
    <div
      className={`display ${isMoved ? 'is-disabled' : ''}`}
      ref={drag}
      style={{ opacity: isMoved ? 0.5 : 1 }}
    >
      <div className={`display__container ${isConstructorMode ? 'constructor-mode' : ''}`}>
        { displayValue }
      </div>
    </div>
  );
};

export default Display;

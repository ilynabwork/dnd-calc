import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { calculate } from '../../redux/slices/calculatorSlice';
import { useDraggableComponent } from '../../hooks/useDraggableComponent';
import { selectIsConstructorMode, selectCanvasItems } from '../../redux/selectors';

const EqualsKey = () => {
  const dispatch = useDispatch();
  const isConstructorMode = useSelector(selectIsConstructorMode);
  const canvasItems = useSelector(selectCanvasItems);
  const isMoved = canvasItems.some(item => item.originType === 'equal_key');
  const { isDragging, drag } = useDraggableComponent('equal_key');

  const handleEqualsClick = () => {
    if (!isConstructorMode) {
      dispatch(calculate());
    }
  };

  return (
    <div className={`equals-button ${isMoved ? ' is-disabled' : ''}`} ref={drag} style={{ opacity: isMoved ? 0.5 : 1 }}>
      <button onClick={handleEqualsClick} className={`key equals-key ${isConstructorMode ? 'constructor-mode' : ''}`}>
        =
      </button>
    </div>
  );
};

export default EqualsKey;

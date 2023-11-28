import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDrag, useDrop } from 'react-dnd';
import Display from '../SharedComponents/Display';
import NumberKeys from '../SharedComponents/NumberKeys';
import OperatorKeys from '../SharedComponents/OperatorKeys';
import EqualsKey from '../SharedComponents/EqualsKey';
import { removeComponentFromCanvas } from '../../redux/slices/calculatorSlice';
import { selectIsConstructorMode } from '../../redux/selectors';

const CanvasItem = ({ id, type, index, moveItem }) => {
  const dispatch = useDispatch();
  const isConstructorMode = useSelector(selectIsConstructorMode);
  const ref = useRef(null);

  const [{ isDragging }, drag] = useDrag({
    type: 'COMPONENT',
    item: { id, type, index },
    canDrag: isConstructorMode,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: 'COMPONENT',
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex !== hoverIndex) {
        moveItem(dragIndex, hoverIndex);
        item.index = hoverIndex;
      }
    },
  });

  const handleDoubleClick = () => {
    if (isConstructorMode) {
      dispatch(removeComponentFromCanvas(id));
    }
  };

  drag(drop(ref));

  const renderComponent = () => {
    switch (type) {
    case 'display':
      return <Display />;
    case 'number_keys':
      return <NumberKeys />;
    case 'operator_keys':
      return <OperatorKeys />;
    case 'equal_key':
      return <EqualsKey />;
    default:
      return null;
    }
  };

  return (
    <div
      ref={(node) => drag(drop(node))}
      className={`canvas-item${isDragging ? ' dragging' : ''}${type === 'display' ? ' is-first' : ''}`}
      onDoubleClick={handleDoubleClick}
    >
      {renderComponent()}
    </div>
  );
};

export default CanvasItem;

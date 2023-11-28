import { useDrag } from 'react-dnd';
import { useSelector } from 'react-redux';

export const useDraggableComponent = (type) => {
  const isConstructorMode = useSelector(state => state.calculator.isConstructorMode);
  const canvasItems = useSelector(state => state.calculator.canvasItems);
  const isMoved = canvasItems.some(item => item.type === type);

  const [{ isDragging }, drag] = useDrag({
    type: 'COMPONENT',
    item: { type },
    canDrag: isConstructorMode && !isMoved,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return { isDragging, drag };
};
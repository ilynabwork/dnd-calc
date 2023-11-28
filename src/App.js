import React from 'react';
import './App.css';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Display from './components/SharedComponents/Display';
import NumberKeys from './components/SharedComponents/NumberKeys';
import OperatorKeys from './components/SharedComponents/OperatorKeys';
import EqualsKey from './components/SharedComponents/EqualsKey';
import CalculatorCanvas from './components/CanvasComponents/Canvas';
import ToggleModeSwitch from './components/ToggleModeSwitch/ToggleModeSwitch';
import { useSelector, useDispatch } from 'react-redux';
import { toggleMode } from './redux/slices/calculatorSlice';

function App() {
  const dispatch = useDispatch();
  const isConstructorMode = useSelector(state => state.calculator.isConstructorMode);

  const handleToggleMode = () => {
    dispatch(toggleMode());
  };

  return (
    <div className="App">
      <DndProvider backend={HTML5Backend}>
        <div className={`palette${isConstructorMode ? ' constructor-mode' : ''}`}>
          <Display />
          <OperatorKeys />
          <NumberKeys />
          <EqualsKey />
        </div>
        <div className="canvas-area">
          <ToggleModeSwitch isConstructorMode={isConstructorMode} onToggle={handleToggleMode} />
          <CalculatorCanvas isConstructorMode={isConstructorMode} />
        </div>
      </DndProvider>
    </div>
  );
}

export default App;
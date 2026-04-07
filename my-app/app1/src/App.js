import { useState } from 'react';
import './App.css';

function App() {
  const [display, setDisplay] = useState('0');
  const [expression, setExpression] = useState('');
  const [prevValue, setPrevValue] = useState(null);
  const [operator, setOperator] = useState(null);
  const [justCalculated, setJustCalculated] = useState(false);

  const handleNumber = (num) => {
    if (justCalculated) {
      setDisplay(String(num));
      setExpression(String(num));
      setJustCalculated(false);
    } else {
      setDisplay(display === '0' ? String(num) : display + num);
      setExpression(expression + num);
    }
  };

  const handleDecimal = () => {
    if (!display.includes('.')) {
      setDisplay(display + '.');
      setExpression(expression + '.');
    }
  };

  const handleOperator = (op) => {
    setJustCalculated(false);
    setPrevValue(parseFloat(display));
    setOperator(op);
    setExpression(expression + ' ' + op + ' ');
    setDisplay('0');
  };

  const handleEquals = () => {
    if (operator === null || prevValue === null) return;
    const current = parseFloat(display);
    let result;
    switch (operator) {
      case '+': result = prevValue + current; break;
      case '-': result = prevValue - current; break;
      case '*': result = prevValue * current; break;
      case '/': result = current !== 0 ? prevValue / current : 'Error'; break;
      case '%': result = prevValue % current; break;
      default: return;
    }
    const rounded = typeof result === 'number'
      ? parseFloat(result.toFixed(10)).toString()
      : result;
    setDisplay(rounded);
    setExpression(expression + ' = ' + rounded);
    setPrevValue(null);
    setOperator(null);
    setJustCalculated(true);
  };

  const handleClear = () => {
    setDisplay('0');
    setExpression('');
    setPrevValue(null);
    setOperator(null);
    setJustCalculated(false);
  };

  const handleDelete = () => {
    if (justCalculated) return;
    setDisplay(display.length > 1 ? display.slice(0, -1) : '0');
  };

  const buttons = [
    { label: 'AC', action: handleClear, style: 'clear' },
    { label: '⌫', action: handleDelete, style: 'clear' },
    { label: '%', action: () => handleOperator('%'), style: 'op' },
    { label: '÷', action: () => handleOperator('/'), style: 'op' },
    { label: '7', action: () => handleNumber('7') },
    { label: '8', action: () => handleNumber('8') },
    { label: '9', action: () => handleNumber('9') },
    { label: '×', action: () => handleOperator('*'), style: 'op' },
    { label: '4', action: () => handleNumber('4') },
    { label: '5', action: () => handleNumber('5') },
    { label: '6', action: () => handleNumber('6') },
    { label: '−', action: () => handleOperator('-'), style: 'op' },
    { label: '1', action: () => handleNumber('1') },
    { label: '2', action: () => handleNumber('2') },
    { label: '3', action: () => handleNumber('3') },
    { label: '+', action: () => handleOperator('+'), style: 'op' },
    { label: '0', action: () => handleNumber('0'), style: 'wide' },
    { label: '.', action: handleDecimal },
    { label: '=', action: handleEquals, style: 'equals' },
  ];

  return (
    <div className="calculator">
      <div className="display">
        <div className="expression">{expression}</div>
        <div className="result">{display}</div>
      </div>
      <div className="buttons">
        {buttons.map((btn, i) => (
          <button
            key={i}
            onClick={btn.action}
            className={`btn ${btn.style || ''}`}
          >
            {btn.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default App;
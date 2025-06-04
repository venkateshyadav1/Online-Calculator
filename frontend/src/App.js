import React, { useState } from 'react';
import './App.css';

function App() {
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState('');

  const handleButtonClick = (value) => {
    if (value === '=') {
      calculateResult();
    } else if (value === 'C') {
      setExpression('');
      setResult('');
    } else {
      setExpression(expression + value);
    }
  };

  const calculateResult = async () => {
    try {
      const response = await fetch('http://localhost:8000/calculate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ expression }),
      });
      const data = await response.json();
      if (data.error) {
        setResult('Error');
      } else {
        setResult(data.result);
      }
    } catch (error) {
      setResult('Error');
    }
  };

  const buttons = [
    '7', '8', '9', '/',
    '4', '5', '6', '*',
    '1', '2', '3', '-',
    '0', '.', '=', '+',
    'C'
  ];

  return (
    <div className="App">
      <div className="calculator">
        <div className="display">
          <div className="expression">{expression}</div>
          <div className="result">{result}</div>
        </div>
        <div className="buttons">
          {buttons.map((btn) => (
            <button
              key={btn}
              onClick={() => handleButtonClick(btn)}
              className={btn === '=' ? 'equals' : btn === 'C' ? 'clear' : ''}
            >
              {btn}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;

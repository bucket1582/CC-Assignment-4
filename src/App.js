import React, { useState } from 'react';
import './App.css';

const BACKEND_BASE_URL = process.env.REACT_APP_BACKEND_URL;

export default function App() {
  const [inputX, setInputX] = useState('');
  const [inputY, setInputY] = useState('');
  const [x, setX] = useState(null);
  const [y, setY] = useState(null);
  const [sum, setSum] = useState('');
  const [prod, setProd] = useState('');
  const [error, setError] = useState(null);

  const calculate = async () => {
    if (inputX === '' || isNaN(inputX)) {
      setError('Please enter a valid number for x.');
      return;
    }

    if (inputY === '' || isNaN(inputY)) {
      setError('Please enter a valid number for y.');
      return;
    }

    setX(null);
    setY(null);
    setError(null);

    try {
      const respone = await fetch(`${BACKEND_BASE_URL}/sum_and_product?x=${inputX}&y=${inputY}`)
      const responseJson = await respone.json();
      if (responseJson.type === "success") {
        setSum(responseJson.sum);
        setProd(responseJson.prod);
      } else {
        setError("Failed to fetch sum and product results.");
      }

      setX(inputX);
      setY(inputY);

    } catch (err) {
      setError('Server error occurred.');
    }
  };

  return (
    <div>
      <h2>Calculate Sum and Product</h2>
      <input
        type="number"
        value={inputX}
        min="0"
        placeholder="Enter a number for X"
        onChange={e => setInputX(e.target.value)}
      />
      <input
        type="number"
        value={inputY}
        min="0"
        placeholder="Enter a number for Y"
        onChange={e => setInputY(e.target.value)}
      />
      <br />
      <button onClick={calculate} >
        Calculate
      </button>

      <div className="calcResult">
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {(x !== null && y !== null) && <p>X + Y = <strong>{sum}</strong></p>}
        {(x !== null && y !== null) && <p>X * Y = <strong>{prod}</strong></p>}
      </div>
    </div>
  );
}
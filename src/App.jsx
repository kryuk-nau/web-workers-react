import { useState, useRef, useEffect } from 'react';
import './App.css';

function App() {
  const [number, setNumber] = useState('');
  const [result, setResult] = useState('');
  const workerRef = useRef(null);

  // Безпечно очищуємо воркер при розмонтуванні
  useEffect(() => {
    return () => {
      if (workerRef.current && typeof workerRef.current.terminate === 'function') {
        workerRef.current.terminate();
      }
    };
  }, []);

  const handleCalculate = () => {
    if (number === '') return;

    // Безпечно зупиняємо попередній воркер, якщо він підтримує terminate
    if (workerRef.current && typeof workerRef.current.terminate === 'function') {
      workerRef.current.terminate();
    }

    setResult('Calculating...');

    workerRef.current = new Worker('/worker.js');

    workerRef.current.onmessage = (e) => {
      setResult(`Result: ${e.data}`);
    };

    workerRef.current.postMessage({ data: Number(number) });
  };

  return (
    <div className="app">
      <h1>Fibonacci 🌀</h1>
      <input 
        type="number" 
        placeholder="Insert a number" 
        value={number}
        onChange={(e) => setNumber(e.target.value)}
      />
      <button onClick={handleCalculate}>Calculate</button>
      <div className="result" data-testid="result">{result}</div>
    </div>
  );
}

export default App;

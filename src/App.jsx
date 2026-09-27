import { useState, useRef, useEffect } from 'react';
import './App.css';

function App() {
  const [number, setNumber] = useState('');
  const [result, setResult] = useState('');
  const workerRef = useRef(null);

  // Очищуємо воркер при розмонтуванні компонента
  useEffect(() => {
    return () => {
      if (workerRef.current) {
        workerRef.current.terminate();
      }
    };
  }, []);

  const handleCalculate = () => {
    if (number === '') return;

    // Додаткова вимога: зупиняємо попереднє обчислення, якщо воно ще триває
    if (workerRef.current) {
      workerRef.current.terminate();
    }

    // Поки значення обчислюється, виводимо "Calculating..."[cite: 5]
    setResult('Calculating...');

    // Створюємо новий веб-воркер[cite: 5]
    workerRef.current = new Worker('/worker.js');

    workerRef.current.onmessage = (e) => {
      // Результат виводиться у форматі Result: evaluated_fibonacci[cite: 5]
      setResult(`Result: ${e.data}`);
    };

    // Передаємо дані у форматі об'єкта { data: someValue }[cite: 5]
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

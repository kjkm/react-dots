import React, { useState } from 'react';
import './App.css';
import CLIWindow from './components/CLIWindow/CLIWindow';

function App() {
  const [dots, setDots] = useState([]);

  const handleDotClick = (e) => {
    const x = e.clientX;
    const y = e.clientY;
    const color = getRandomColor();

    const newDot = {
      x,
      y,
      color,
    };

    setDots([...dots, newDot]);
  };

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  return (
    <div className="dark-screen" onClick={handleDotClick}>
      {dots.map((dot, index) => (
        <div
          key={index}
          className="dot"
          style={{
            backgroundColor: dot.color,
            left: dot.x + 'px',
            top: dot.y + 'px',
          }}
        ></div>
      ))}
      <CLIWindow/>
    </div>
  );
}

export default App;
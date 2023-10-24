import React, { useState, useEffect } from 'react';

const Display = () => {
  const radius = 100;
  const thickness = 100;
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateCursorPosition = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', updateCursorPosition);

    return () => {
      window.removeEventListener('mousemove', updateCursorPosition);
    };
  }, []);

  return (
    <div className={'fixed top-0 left-0 w-full h-full pointer-events-none'}>
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" className={'opacity-80'}>
        <circle
          cx={cursorPosition.x}
          cy={cursorPosition.y}
          r={radius} // radius of center of element, control how much empty space can be available 
          stroke="black" // Ring color
          strokeWidth={thickness} // Ring thickness
          fill="transparent"
        />
      </svg>
    </div>
  );
};

export default Display;

import React, { useState, useEffect } from 'react';

const Display = () => {
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
    <div className="fixed top-0 left-0 w-full h-full pointer-events-none opacity-20 bg-slate-500">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" className='opacity-50'>
        <circle
          cx={cursorPosition.x}
          cy={cursorPosition.y}
          r={20} // You can adjust the thickness by changing the radius
          stroke="black" // Ring color
          strokeWidth={5} // Ring thickness
          fill="transparent"
        />
      </svg>
      <div className={'w-10 h-10 bg-pink-500'}>test</div>
    </div>
  );
}

export default Display;

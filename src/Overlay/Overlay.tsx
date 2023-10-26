import React, { useState, useEffect } from 'react';
import Settings from '../Settings/Settings';

type DisplayProps = {
  radius: number;
  opacity: number;
  width: number;
  color: string;
};

const Overlay = (props: DisplayProps) => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const isDev = true;
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
          r={props.radius ?? 100} // radius of center of element, control how much empty space can be available
          stroke="black" // Ring color
          strokeWidth={props.width ?? 200} // Ring thickness
          fill="transparent"
        />
      </svg>
      {isDev && ( // if in dev mode, display a small settings window at the bottom right corner of the screen
        <div className={'fixed bottom-0 right-0 bg-white p-2 text-xs'}>
          <Settings />
        </div>
      )}
    </div>
  );
};

export default Overlay;

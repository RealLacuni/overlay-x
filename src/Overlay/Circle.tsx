import { CircleFields } from '../../shared/types';
import React from 'react';

type CircleProps = {
  profile: CircleFields;
  cursorPosition: { x: number; y: number };
};

const calculateRadius = (thickness: number, offset: number) => {
  return 5*thickness + 3*offset;
};

const Circle = ({ profile, cursorPosition }: CircleProps) => {
  const { color, thickness, offset, opacity } = profile;
  const radius = calculateRadius(thickness, offset);
  return (
    <div className={`fixed bg-[${color}] top-0 left-0 w-full h-full pointer-events-none`}>
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style={{opacity: opacity}}>
        <circle
          cx={cursorPosition.x}
          cy={cursorPosition.y} 
          r={radius} // radius of center of element, control how much empty space can be available
          stroke={color} // Ring color
          strokeWidth={10*thickness} // Ring thickness
          fill="transparent"
        />
      </svg>
    </div>
  );
};

export default Circle;

import { CircleFields } from '../../shared/types';
import React from 'react';

type CircleProps = {
  profile: CircleFields;
  cursorPosition: {
    x: number;
    y: number;
  };
};

const calculateRadius = (size: number, offset: number) => {
  return size + offset;
};

const Circle = ({ profile, cursorPosition }: CircleProps) => {
  const { color, opacity } = profile;
  const offset = profile.offset*5;
  const size = profile.size == 100 ? 2000 : 5 * profile.size;
  const radius = calculateRadius(size, offset);
  return (
    <div className={`fixed bg-[${color}] top-0 left-0 w-full h-full pointer-events-none`}>
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style={{ opacity: opacity / 100 }}>
        {profile.inverse ? (
          <circle
            cx={cursorPosition.x}
            cy={cursorPosition.y}
            r={radius}
            stroke={color} // Ring color
            strokeWidth={2*size} // Ring size.
            fill="transparent"
          />
        ) : (
          <circle
            cx={cursorPosition.x}
            cy={cursorPosition.y}
            r={size} // radius of center of element, control how much empty space can be available
            fill={color}
          />
        )}
      </svg>
    </div>
  );
};
export default Circle;

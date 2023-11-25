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
  return (size + offset);
};

const Circle = ({ profile, cursorPosition }: CircleProps) => {
  const { color, offset = profile.offset*3, opacity } = profile;
  const size = profile.size == 100 ? 2000 : 5*profile.size;
  const radius = calculateRadius(size, offset);
  return (
    <div className={`fixed bg-[${color}] top-0 left-0 w-full h-full pointer-events-none`}>
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style={{ opacity: opacity / 100 }}>
        {profile.inverse ? (
          <circle
            cx={cursorPosition.x}
            cy={cursorPosition.y}
            r={radius + size / 2} // size / 2 just to try to keep the size relatively consistent with the inverse circle.
            stroke={color} // Ring color
            strokeWidth={size} // Ring size.
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

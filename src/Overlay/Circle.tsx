import { CircleFields } from '../../shared/types';
import React from 'react';

type CircleProps = {
  profile: CircleFields;
  cursorPosition: {
    x: number;
    y: number;
  };
  renderMiniature?: boolean;
};

const calculateRadius = (size: number, offset: number) => {
  return size + offset;
};

const Circle = ({ profile, cursorPosition, renderMiniature }: CircleProps) => {
  const { color, opacity } = profile;
  let offset = profile.offset * 5;
  let size = profile.size == 100 ? 2000 : 5 * profile.size;
  const scale = 0.15;
  if (renderMiniature) {
    size *= scale;
    offset *= 5*scale;
  }
  const radius = calculateRadius(size, offset);
  return (
    <div
      className={`${
        renderMiniature
          ? 'absolute bottom-0 right-0 w-36 h-36 bg-gray-200 rounded-lg'
          : 'fixed top-0 left-0 w-full h-full'
      } bg-[${color}] pointer-events-none`}
    >
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style={{ opacity: opacity / 100 }}>
        {profile.inverse ? (
          <circle
            cx={renderMiniature ? '50%' : cursorPosition.x}
            cy={renderMiniature ? '50%' : cursorPosition.y}
            r={radius}
            stroke={color} // Ring color
            strokeWidth={size} // Ring size.
            fill="transparent"
          />
        ) : (
          <circle
            cx={renderMiniature ? '50%' : cursorPosition.x}
            cy={renderMiniature ? '50%' : cursorPosition.y}
            r={size} // radius of center of element, control how much empty space can be available
            fill={color}
          />
        )}
      </svg>
    </div>
  );
};
export default Circle;

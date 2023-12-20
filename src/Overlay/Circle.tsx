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
  const scale = 0.02;
  if (renderMiniature) {
    size *= scale;
    offset *= scale;
  }
  const radius = calculateRadius(size, offset);
  return (
    <div
      className={`${
        renderMiniature
          ? 'absolute bottom-0 right-0 w-36 h-32 bg-gray-200 rounded-lg'
          : 'fixed top-0 left-0 w-full h-full'
      } bg-[${color}] pointer-events-none`}
    >
      <div className="absolute" style={{ left: '51%', top: '51%', transform: 'translate(-50%, -50%)' }}>
        <svg fill="#000000" width="10px" height="10px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M20.978 13.21a1 1 0 0 0-.396-1.024l-14-10a.999.999 0 0 0-1.575.931l2 17a1 1 0 0 0 1.767.516l3.612-4.416 3.377 5.46 1.701-1.052-3.357-5.428 6.089-1.218a.995.995 0 0 0 .782-.769z" />
        </svg>
      </div>
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style={{ opacity: opacity / 100 }}>
        {profile.inverse ? (
          <circle
            cx={renderMiniature ? '50%' : cursorPosition.x}
            cy={renderMiniature ? '50%' : cursorPosition.y}
            r={radius}
            stroke={color} // Ring color
            strokeWidth={2 * size} // Ring size.
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

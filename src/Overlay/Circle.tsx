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

const Circle = ({ profile, cursorPosition, renderMiniature }: CircleProps) => {
  const { color, opacity } = profile;
  let offset = 6 * profile.offset;
  let size = 5 * profile.size;
  if (!renderMiniature && profile.size == 100) {
    size = 2000;
  }
  if (profile.offset == 100) {
    offset = 2000;
  }

  const scale = 0.15;
  if (renderMiniature) {
    size *= scale;
    offset *= scale;
  }
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
            r={size + offset / 2}
            stroke={color} // Ring color
            strokeWidth={offset} // Ring size.
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

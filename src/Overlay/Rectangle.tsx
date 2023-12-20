import { RectangleFields } from '../../shared/types';
import React from 'react';

type RectangleProps = {
  profile: RectangleFields;
  cursorPosition: {
    x: number;
    y: number;
  };
  renderMiniature?: boolean;
};

const Rectangle = ({ profile, cursorPosition, renderMiniature }: RectangleProps) => {
  const { color, opacity } = profile;
  let offset = profile.offset;
  let width = profile.width;
  let height = profile.height;

  const scale = 0.5;
  if (renderMiniature) {
    offset *= scale;
    width *= scale;
    height *= scale;
  }

  return (
    <div
      className={`${
        renderMiniature
          ? 'absolute bottom-0 right-0 w-36 h-36 bg-gray-200 rounded-lg'
          : 'fixed top-0 left-0 w-full h-full'
      } bg-[${color}] pointer-events-none`}
    >
      {' '}
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style={{ opacity: opacity / 100 }}>
        {!profile.inverse ? (
          <rect
            x={renderMiniature ? `${50 - width / 2}%` : cursorPosition.x - width / 2}
            y={renderMiniature ? `${50 - height / 2}%` : cursorPosition.y - height / 2}
            width={width}
            height={height}
            fill={color}
          />
        ) : (
          <rect
            x={renderMiniature ? `${50 - width / 2 - offset/3}%` : cursorPosition.x - width / 2 - offset / 2}
            y={renderMiniature ? `${50 - height / 2 - offset/3}%` : cursorPosition.y - height / 2 - offset / 2}
            width={width + offset}
            height={height + offset}
            fill="transparent"
            stroke={color}
            strokeWidth={offset}
          />
        )}
      </svg>
    </div>
  );
};
export default Rectangle;

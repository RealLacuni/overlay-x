import { RectangleFields } from '../../shared/types';
import React from 'react';

type RectangleProps = {
  profile: RectangleFields;
  cursorPosition: {
    x: number;
    y: number;
  };
};

const Rectangle = ({ profile, cursorPosition }: RectangleProps) => {
  const { color, opacity } = profile;
  profile = { width: 200, height: 200, offset: 100, opacity: 80, inverse: true, color: '#000000' };
  return (
    <div className={`fixed bg-[${color}] top-0 left-0 w-full h-full pointer-events-none`}>
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style={{ opacity: opacity / 100 }}>
        {!profile.inverse ? (
          <rect x={cursorPosition.x - profile.width / 2} y={cursorPosition.y - profile.height / 2} width={profile.width} height={profile.height} fill={color} />
        ) : (
          <rect
            x={cursorPosition.x - profile.width / 2}
            y={cursorPosition.y - profile.height / 2}
            width={profile.width + profile.offset}
            height={profile.height + profile.offset}
            fill="transparent"
            stroke={'red'}
            strokeWidth={profile.height}
          />
        )}
      </svg>
    </div>
  );
};
export default Rectangle;

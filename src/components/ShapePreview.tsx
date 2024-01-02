import React, { useState } from 'react';
import Circle from '../Overlay/Circle';
import { CircleFields, RectangleFields } from '../../shared/types';
import Rectangle from '../Overlay/Rectangle';
import { useWatch } from 'react-hook-form';
import { ChevronUpDownIcon } from '@heroicons/react/24/solid';

type ShapePreviewProps = {
  shape: string;
};

const ShapePreview = ({ shape }: ShapePreviewProps) => {
  const [isMinimized, setIsMinimized] = useState(false);
  const fields = useWatch({
    name: `shapeInputs`
  });
  if (!fields) return <></>;

  console.log(isMinimized);

  let shapeInputComponent;
  switch (shape) {
    case 'circle':
      shapeInputComponent = <Circle profile={fields as CircleFields} cursorPosition={{ x: 0, y: 0 }} renderMiniature />;
      break;
    case 'rectangle':
      shapeInputComponent = (
        <Rectangle profile={fields as RectangleFields} cursorPosition={{ x: 0, y: 0 }} renderMiniature />
      );
      break;
  }
  return (
    <>
      <div className={`fixed bottom-0 right-4 w-36` + `${isMinimized ? ' h-4' : ' h-36'}`}>
        <div
          className={`relative flex w-36 rounded-lg justify-center items-center` + `${isMinimized ? ' h-4' : ' h-36'}`}
        >
          <ChevronUpDownIcon
            className={`absolute w-4 h-4 top-0 right-0 z-10 cursor-pointer`}
            onClick={() => setIsMinimized(!isMinimized)}
          />
          {!isMinimized && shapeInputComponent}
          <svg
            fill="#000000"
            width="10px"
            height="10px"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            className={`z-10` + `${isMinimized ? ' hidden' : ''}`}
          >
            <path d="M20.978 13.21a1 1 0 0 0-.396-1.024l-14-10a.999.999 0 0 0-1.575.931l2 17a1 1 0 0 0 1.767.516l3.612-4.416 3.377 5.46 1.701-1.052-3.357-5.428 6.089-1.218a.995.995 0 0 0 .782-.769z" />
          </svg>
        </div>
      </div>
    </>
  );
};

export default ShapePreview;

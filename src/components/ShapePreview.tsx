import React from 'react';
import { useFormContext } from 'react-hook-form';
import Circle from '../Overlay/Circle';
import { CircleFields, RectangleFields } from '../../shared/types';
import Rectangle from '../Overlay/Rectangle';

const ShapePreview = () => {
  const { watch } = useFormContext();
  const fields = watch('shapeInputs');
  const shape = watch('shape') as string;
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
      <div className="absolute bottom-0 right-4 w-36 h-36 bg-gray-200 rounded-lg">{shapeInputComponent}</div>
      <div className="absolute bottom-0 right-4 w-36 h-36 rounded-lg">
        <div
          className="absolute bg-transparent"
          style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}
        >
          <svg fill="#000000" width="10px" height="10px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M20.978 13.21a1 1 0 0 0-.396-1.024l-14-10a.999.999 0 0 0-1.575.931l2 17a1 1 0 0 0 1.767.516l3.612-4.416 3.377 5.46 1.701-1.052-3.357-5.428 6.089-1.218a.995.995 0 0 0 .782-.769z" />
          </svg>
        </div>
      </div>
    </>
  );
};

export default ShapePreview;

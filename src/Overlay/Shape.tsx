import { useEffect, useState } from 'react';
import { CircleFields, EllipseFields, SquareFields } from '../../shared/types';
import Circle from './Circle';
import React from 'react';

type ShapeProps = {
  shape: string;
  shapeInputs: CircleFields | SquareFields | EllipseFields;
};

const Shape = ({ shape, shapeInputs }: ShapeProps) => {
    const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  
    //depending on the shape of the profile track and render different input fields
    let shapeInputComponent;
    switch (shape) {
      case 'circle':
        shapeInputComponent = <Circle profile={shapeInputs as CircleFields} cursorPosition={cursorPosition} />;
        break;
      case 'square':
        // Set shapeInputComponent to the SquareInput component
        break;
      case 'ellipse':
        // Set shapeInputComponent to the EllipseInput component
        break;
      default:
        // Handle any additional shapes or provide a default component
        break;
    }
    //use effect to add listener for tracking mouse position
    useEffect(() => {
      const updateCursorPosition = (e: MouseEvent) => {
        setCursorPosition({ x: e.clientX, y: e.clientY });
      };
  
      window.addEventListener('mousemove', updateCursorPosition);
  
      return () => {
        window.removeEventListener('mousemove', updateCursorPosition);
      };
    }, []);
  
    return <>{shapeInputComponent}</>;
  };
  
export default Shape;

import React, { useState, useEffect, useContext } from 'react';
import DevSettings from '../Settings/DevSettings';
import { PreferenceContext } from '../util/PreferenceContext';
import { CircleFields, Preferences } from '../../shared/types';
import Circle from './Circle';

const Overlay = () => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const isDev = true;
  const preferences: Preferences = useContext(PreferenceContext);

  //get active profile
  console.log("indexing into preferences: ", preferences);
  console.log("using ", preferences.activeProfile, " as active profile");
  window.Main.OpenDevTools("display");
  const currentProfile = preferences.profiles[preferences.activeProfile];
  console.log("current profile: ", currentProfile);
  
  //depending on the shape of the profile track and render different input fields
  let shapeInputComponent;
  switch (currentProfile.shape) {
    case 'circle':
      shapeInputComponent = (
        <Circle profile={currentProfile.shapeInputs as CircleFields} cursorPosition={cursorPosition} />
      );
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

  return (
    <>
      {shapeInputComponent}
      {isDev && ( // if in dev mode, display a small settings window at the bottom right corner of the screen
        <div className={'fixed bottom-0 right-0 bg-white p-2 text-xs'}>
          <DevSettings settingInputs={[]} />
        </div>
      )}
    </>
  );
};

export default Overlay;

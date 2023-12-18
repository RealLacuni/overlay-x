import React, { useContext } from 'react';
import { PreferenceContext } from '../util/PreferenceContext';
import Shape from './Shape';
import { Profile } from '../../shared/types';

const Overlay = () => {
  const { preferences } = useContext(PreferenceContext); //can also grab updatePreferences from provider here
  //get active profile
  const currentProfile = preferences.profiles[preferences.activeProfile] as Profile;
  const currentShape = currentProfile.currentShape
  return (
    <>
      <Shape shape={currentShape} shapeInputs={currentProfile.shapes[currentShape]} />
    </>
  );
};

export default Overlay;

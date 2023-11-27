import React, { useContext } from 'react';
import { PreferenceContext } from '../util/PreferenceContext';
import Shape from './Shape';

const Overlay = () => {
  const { preferences } = useContext(PreferenceContext); //can also grab updatePreferences from provider here
  //get active profile
  const currentProfile = preferences.profiles[preferences.activeProfile];

  return (
    <>
      <Shape shape={'rectangle'} shapeInputs={currentProfile.shapeInputs} />
    </>
  );
};

export default Overlay;

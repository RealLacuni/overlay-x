import React, { useContext } from 'react';
import DevSettings from '../Settings/DevSettings';
import { PreferenceContext } from '../util/PreferenceContext';
import { Preferences } from '../../shared/types';
import Shape from './Shape';

const isDev = window.Main.IsDevWindow();

const Overlay = () => {
  const preferences: Preferences = useContext(PreferenceContext);

  //get active profile
  window.Main.PrintInBackend(`indexing into preferences: , ${preferences}`);
  console.log(`using , ${preferences.activeProfile},  as active profile`);
  const currentProfile = preferences.profiles[preferences.activeProfile];
  console.log('current profile: ', currentProfile);

  return (
    <>
      <Shape shape={currentProfile.shape} shapeInputs={currentProfile.shapeInputs} />
      {isDev && (
        <div className={'fixed bottom-0 right-0 bg-white p-2 text-xs'}>
          <DevSettings settingInputs={[]} />
        </div>
      )}
    </>
  );
};

export default Overlay;

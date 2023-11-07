import React, { useContext } from 'react';
import DevSettings from '../Settings/DevSettings';
import { PreferenceContext } from '../util/PreferenceContext';
import Shape from './Shape';

const isDev = window.Main.IsDevWindow();

const Overlay = () => {
  const {preferences} = useContext(PreferenceContext); //can also grab updatePreferences from provider here
  
  //get active profile
  window.Main.PrintInBackend(`preferences from context: , ${JSON.stringify(preferences)}`);

  window.Main.PrintInBackend(`indexing into preferences: , ${preferences.activeProfile}`);
  const currentProfile = preferences.profiles[preferences.activeProfile];

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

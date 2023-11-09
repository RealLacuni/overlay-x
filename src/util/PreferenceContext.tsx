import { createContext } from 'react';
import React from 'react';
import { Preferences } from '../../shared/types';

const getPreferences = () => {
  const preferences = window.Main.GetPreferences();
  return preferences;
};

const preferences = getPreferences();
const PreferenceContext = createContext(preferences);


function PreferenceProvider({ children }: { children: React.ReactNode }) {
  const [preferences, setPreferences] = React.useState(getPreferences);
  
  /* This block of code is for the Overlay window, so that it can update context through receiving an IPC message
  alternatively could get rid of context altogether for the overlay and just move this code directly into the component*/
  const updateCB = (newPreferences: Preferences) => {
    window.Main.PrintInBackend('\noverlay received changed preferences\n');
    setPreferences(newPreferences);
  };
  window.Overlay.onUpdatedPreferences(updateCB);

  const updatePreferences = (newPreferences: Preferences) => {
    //write to disk
    if (!window.Main.UpdatePreferences(newPreferences)) {
      window.Main.PrintInBackend('failed to write preferences to disk');
      //try again
      if (!window.Main.UpdatePreferences(newPreferences)) {
        window.Main.PrintInBackend('failed to write preferences to disk again');
        return false;
      }
    }
    setPreferences(newPreferences);
    return true;
  };

  return <PreferenceContext.Provider value={{ preferences, updatePreferences }}>{children}</PreferenceContext.Provider>;
}

export { PreferenceProvider, PreferenceContext };

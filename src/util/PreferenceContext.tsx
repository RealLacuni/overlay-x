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

  const updatePreferences = (newPreferences: Preferences) => {
    //write to disk
    if (!window.Main.UpdatePreferences(newPreferences)) {
      console.log('failed to write preferences to disk');
      //try again
      if (!window.Main.UpdatePreferences(newPreferences)) {
        console.log('failed to write preferences to disk again');
        return false;
      }
    }
    setPreferences(newPreferences);
    return true;
  };

  return <PreferenceContext.Provider value={{ preferences, updatePreferences }}>{children}</PreferenceContext.Provider>;
}

export { PreferenceProvider, PreferenceContext };

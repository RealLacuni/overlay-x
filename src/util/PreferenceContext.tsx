import { createContext } from 'react';
import React from 'react';

const getPreferences = () => {
  const preferences = window.Main.GetPreferences();
  return preferences;
};

const preferences = getPreferences();
const PreferenceContext = createContext(preferences);
function PreferenceProvider({children} : {children: React.ReactNode}) {
  const preferences = getPreferences();

  const updatePreferences = (newPreferences: Preferences) => {
    //write to disk
    if (!window.Main.UpdatePreferences(newPreferences)) {
      //try again
      if (!window.Main.UpdatePreferences(newPreferences)) {
        console.log('failed to write preferences to disk twice.');
        return false;
      }
    }
    setPreferences(newPreferences);
    return true;
  };

  return <PreferenceContext.Provider value={{ preferences, updatePreferences }}>{children}</PreferenceContext.Provider>;

}

export { PreferenceProvider, PreferenceContext };
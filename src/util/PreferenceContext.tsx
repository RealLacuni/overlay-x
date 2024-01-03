import { createContext, useCallback, useEffect } from 'react';
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

  /* This function sets up a callback allowing the front end to update the preferences upon receiving an IPC message */
  const updateCB = (newPreferences: Preferences) => {
    window.Main.PrintInBackend(`\noverlay received changed preferences, ${JSON.stringify(newPreferences)}\n`);
    setPreferences(newPreferences);
  };

  useEffect(() => {
  window.Overlay.onUpdatedPreferences(updateCB);
  }, []);

  const updatePreferences = (newPreferences: Preferences) => {
    console.log('in updatePreferences function, setting current profile to ' + newPreferences.activeProfile);
    setPreferences(newPreferences);
  };

  const saveToDisk = useCallback((newPreferences : Preferences) => {
    //write to disk
    console.log('saveToDisk: ' + JSON.stringify(newPreferences));
    
    if (!window.Main.UpdatePreferences(newPreferences)) {
      window.Main.PrintInBackend('failed to write preferences to disk');
      //try again
      if (!window.Main.UpdatePreferences(newPreferences)) {
        window.Main.PrintInBackend('failed to write preferences to disk again');
        return false;
      }
    }
    return true;
  }, []);

  return (
    <PreferenceContext.Provider value={{ preferences, updatePreferences, saveToDisk }}>
      {children}
    </PreferenceContext.Provider>
  );
}

export { PreferenceProvider, PreferenceContext };

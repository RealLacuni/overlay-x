import { createContext, useCallback, useEffect } from 'react';
import React from 'react';
import { Preferences } from '../../shared/types';
import log from 'electron-log/renderer';

const getPreferences = () => {
  // this test call allows the timing between main and renderer to work otherwise GetPreferences returns no reply sent..
  log.log('test by calling isdevmode')
  window.Main.IsDevMode();
  log.log('made it past isdevmode')
  const preferences = window.Main.GetPreferences();
  log.log('preferences received in overlay', JSON.stringify(preferences));
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

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

  return (
    <PreferenceContext.Provider value={preferences}>
      {children}
    </PreferenceContext.Provider>
  );
}

export { PreferenceProvider, PreferenceContext };
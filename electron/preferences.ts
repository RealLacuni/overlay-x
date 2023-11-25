import fs from 'fs';
import path from 'path';
import { app } from 'electron';
import { Preferences } from '../shared/types';
import { validatePreferences } from '../shared/validatePreferences';

const appPath = app.getPath('userData');
const preferencesPath = path.join(appPath, 'profiles', 'preferences.json');
const dirPath = path.dirname(preferencesPath);

function getPreferences() : Preferences {
  if (!fs.existsSync(dirPath)) {
    console.log("preference directory not found, creating in dir", dirPath);
    fs.mkdirSync(dirPath, { recursive: true });
  }

  if (!fs.existsSync(preferencesPath)) {
    console.log("preference file not found, creating defaults");
    createPreferences(defaultPreferences);
    return defaultPreferences;
  }
  
  const file = fs.readFileSync(preferencesPath, 'utf8');
  const pref = JSON.parse(file);
  if (validatePreferences(pref)) {
    return pref;
  }
  else {
    console.log("preferences file is invalid, creating defaults");
    createPreferences(defaultPreferences);
    return defaultPreferences;
  }
}

function createPreferences(preferences: Preferences) {
  fs.writeFileSync(preferencesPath, JSON.stringify(preferences));
}

function updatePreferences(preferences: Preferences) : boolean {
  const isValid = validatePreferences(preferences);
  if (!isValid) {
    console.log("preferences file is invalid, not updating");
    return false;
  }
  try {
    fs.writeFileSync(preferencesPath, JSON.stringify(preferences));
    return true;
  }
  catch {
    console.log("error updating preferences file");
    return false;
  }
}

const defaultPreferences: Preferences = {
  version: process.env.npm_package_version ?? '0.0.0',
  activeProfile: 'default',
  profiles: {
    'default': {
      shape: 'circle',
      shapeInputs: {
        color: '#ffffff',
        size: 20,
        offset: 12,
        opacity: 70,
        inverse: false
      }
    }
  },
  shortcuts: {
    toggleOverlay: 'Control+Alt+A',
    openMenu: 'Control+Shift+X'
  }
}

export { getPreferences, createPreferences, updatePreferences };

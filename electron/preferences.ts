import fs from 'fs';
import path from 'path';
import { app } from 'electron';
import { Preferences } from '../shared/types';

const appPath = app.getPath('userData');
const preferencesPath = path.join(appPath, 'profiles', 'preferences.json');
const dirPath = path.dirname(preferencesPath);

function getPreferences() {
  if (!fs.existsSync(dirPath)) {
    console.log("preference directory not found, creating in dir", dirPath);
    fs.mkdirSync(dirPath, { recursive: true });
  }

  if (!fs.existsSync(preferencesPath)) {
    console.log("preference file not found, creating defaults");
    createPreferences(defaultPreferences);
    return defaultPreferences;
  }
  try {
    const file = fs.readFileSync(preferencesPath, 'utf8');
    return JSON.parse(file);
  }
  catch (e) {
    console.log("error reading preferences file, creating defaults");
    createPreferences(defaultPreferences);
    return defaultPreferences;
  }
}

function createPreferences(preferences: Preferences) {
  fs.writeFileSync(preferencesPath, JSON.stringify(preferences));
}

function updatePreferences(preferences: Preferences) {
  try {
    fs.writeFileSync(preferencesPath, JSON.stringify(preferences));
    return true;
  }
  catch {
    console.log("error updating preferences file");
    return false;
  }
}

// TODO: Create update preferences function and then pass it into context bridge
const defaultPreferences: Preferences = {
  version: process.env.npm_package_version ?? '0.0.0',
  activeProfile: 'default',
  profiles: {
    'default': {
      shape: 'circle',
      shapeInputs: {
        color: '#ffffff',
        thickness: 20,
        offset: 12,
        opacity: 0.7,
        inverse: false
      }
    }
  }
}

export { getPreferences, createPreferences };

import fs from 'fs';
import path from 'path';
import { app } from 'electron';
import { Preferences } from '../shared/types';
import { validatePreferences } from '../shared/validatePreferences';
import log from 'electron-log/main';

const appPath = app.getPath('userData');
const preferencesPath = path.join(appPath, 'profiles', 'preferences.json');
const dirPath = path.dirname(preferencesPath);
console.log = log.log

function getPreferences(): Preferences {
  if (!fs.existsSync(dirPath)) {
    console.log("preference directory not found, creating in dir", dirPath);
    fs.mkdirSync(dirPath, { recursive: true });
  }

  if (!fs.existsSync(preferencesPath)) {
    console.log("preference file not found, creating defaults");
    createPreferences(defaultPreferences);
    return defaultPreferences;
  }

  log.info('reading preferences from', preferencesPath);
  const file = fs.readFileSync(preferencesPath, 'utf8');
  // check that file was able to be opened
  if (file === undefined) {
    log.info('preferences file is invalid, creating defaults');
    createPreferences(defaultPreferences);
    return defaultPreferences;
  }
  const pref = JSON.parse(file);
  if (validatePreferences(pref)) {
    log.info('preferences file is valid, \n', JSON.stringify(pref));
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

function updatePreferences(preferences: Preferences): boolean {
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
      currentShape: 'circle',
      shapes: {
        'circle': {
          color: '#000000',
          size: 63,
          offset: 20,
          opacity: 80,
          inverse: false
        },
        'rectangle': {
          color: '#000000',
          width: 65,
          height: 70,
          opacity: 80,
          offset: 20,
          inverse: false
        },
        'ellipse': {
          color: '#ffffff',
          width: 50,
          height: 20,
          opacity: 85,
          offset: 20,
          inverse: false
        }
      }
    },
    'profile 1': {
      currentShape: 'circle',
      shapes: {
        'circle': {
          color: '#433737',
          size: 60,
          offset: 77,
          opacity: 70,
          inverse: false
        },
        'rectangle': {
          color: '#433737',
          width: 80,
          height: 10,
          opacity: 70,
          offset: 20,
          inverse: false
        },
        'ellipse': {
          color: '#ffffff',
          width: 50,
          height: 20,
          opacity: 85,
          offset: 20,
          inverse: false
        }
      }
    },
    'profile 2': {
      currentShape: 'circle',
      shapes: {
        'circle': {
          color: '#978111',
          size: 40,
          offset: 70,
          opacity: 50,
          inverse: true
        },
        'rectangle': {
          color: '#978111',
          width: 70,
          height: 30,
          opacity: 50,
          offset: 70,
          inverse: true
        },
        'ellipse': {
          color: '#ffffff',
          width: 50,
          height: 20,
          opacity: 85,
          offset: 20,
          inverse: false
        }
      }
    },
    'profile 3': {
      currentShape: 'circle',
      shapes: {
        'circle': {
          color: '#ffffff',
          size: 30,
          offset: 20,
          opacity: 85,
          inverse: false
        },
        'rectangle': {
          color: '#ffffff',
          width: 50,
          height: 20,
          opacity: 85,
          offset: 20,
          inverse: false
        },
        'ellipse': {
          color: '#ffffff',
          width: 50,
          height: 20,
          opacity: 85,
          offset: 20,
          inverse: false
        }
      }
    },
  },
  shortcuts: {
    toggleOverlay: 'Control+Alt+A',
    openMenu: 'Control+Shift+X'
  }
}

export { getPreferences, createPreferences, updatePreferences };

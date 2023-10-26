import fs from 'fs';
import path from 'path';
import { app } from 'electron';
import { Preferences } from '../shared/types';

const appDataPath = app.getPath('appData');
const preferencesPath = path.join(appDataPath, 'profiles', 'preferences.json');

function getPreferences() {
  if (!fs.existsSync(preferencesPath)) {
    createPreferences(defaultPreferences);
    return { profiles: { default : defaultPreferences } };
  }

  const file = fs.readFileSync(preferencesPath, 'utf8');
  return JSON.parse(file);
}

function createPreferences(preferences: Preferences) {
  fs.writeFileSync(preferencesPath, JSON.stringify({ profiles: { default : preferences } }));
}

// TODO: Create update preferences function and then pass it into context bridge
const defaultPreferences: Preferences = {
  version: process.env.npm_package_version ?? '0.0.0',
}

export { getPreferences, createPreferences };

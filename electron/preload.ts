import { ipcRenderer, contextBridge } from 'electron';
import { Preferences } from '../shared/types';

declare global {
  interface Window {
    Main: typeof mainAPI;
    Overlay: typeof overlayAPI;
    ipcRenderer: typeof ipcRenderer;
  }
}

const mainAPI = {
  /**
   * Expose functions to use in the renderer process
   * that can be sent back to the main process
    */

  //returns true or false if the preferences were updated on disk
  HotkeyChangeToggle: (newKey: string) => {
    return ipcRenderer.sendSync('hotkey::changeToggle', newKey);
  },
  HotkeyChangeMenu: (newKey: string) => {
    return ipcRenderer.sendSync('hotkey::changeMenu', newKey);
  },
  PrintInBackend: (message: string) => {
    return ipcRenderer.send('printInBackend', message);
  },
  UpdatePreferences: (preferences: Preferences) => {
    return ipcRenderer.sendSync('updatePreferences', preferences);
  },
  GetPreferences: () => {
    return ipcRenderer.sendSync('getPreferences');
  },
  IsDevMode: () => {
    return ipcRenderer.sendSync('isDevMode');
  },
  IsDevWindow: () => {
    return ipcRenderer.sendSync('isDevWindow');
  },
  LoadOverlay: (useDev: boolean) => {
    ipcRenderer.send('loadOverlay', useDev);
  },
  OpenDevTools: (targetWindow = 'main') => {
    ipcRenderer.send('openDevTools', targetWindow);
  },
  Minimize: () => {
    ipcRenderer.send('minimize');
  },
  Maximize: () => {
    ipcRenderer.send('maximize');
  },
  Close: () => {
    ipcRenderer.send('close');
  },
  GetVersion: () => {
    return ipcRenderer.sendSync('appVersion');
  },
  /**
   * Provide an easier way to listen to events
   */
  // on: (channel: string, callback: (data: any) => void) => {
  //   ipcRenderer.on(channel, (_, data) => callback(data));
  // }
  OpenSettings: (callback: () => void) => {
    ipcRenderer.on('open-settings', callback);
    },
};

const overlayAPI = {
  onUpdatedPreferences: (callback: (preferences: Preferences) => void) => {
    ipcRenderer.on('updatedPreferences', (_, preferences) => callback(preferences));
  },
}
contextBridge.exposeInMainWorld('Main', mainAPI);
contextBridge.exposeInMainWorld('Overlay', overlayAPI);

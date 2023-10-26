import { ipcRenderer, contextBridge } from 'electron';

declare global {
  interface Window {
    Main: typeof api;
    ipcRenderer: typeof ipcRenderer;
  }
}

const api = {
  /**
   * Expose functions to use in the renderer process
   * that can be sent back to the main process
    */
  
    // TODO: Create functions related to preferences: loading/updating

  LoadOverlay: () => {
    ipcRenderer.send('loadOverlay');
  },
  OpenDevTools: () => {
    ipcRenderer.send('openDevTools');
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
  isDev: () => {
    return process.env.NODE_ENV === 'development';
  }
  /**
   * Provide an easier way to listen to events
   */
  // on: (channel: string, callback: (data: any) => void) => {
  //   ipcRenderer.on(channel, (_, data) => callback(data));
  // }
};
contextBridge.exposeInMainWorld('Main', api);

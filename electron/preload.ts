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
  IsDevMode: () => {
    console.log('IsDevMode successfully called from renderer, now sending to main with ipc');   
    return ipcRenderer.sendSync('isDevMode');
  },
  LoadOverlay: (useDev : boolean) => {
    console.log('LoadOverlay successfully called from renderer, now sending to main with ipc');

    ipcRenderer.send('loadOverlay', useDev);
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
  /**
   * Provide an easier way to listen to events
   */
  // on: (channel: string, callback: (data: any) => void) => {
  //   ipcRenderer.on(channel, (_, data) => callback(data));
  // }
};
contextBridge.exposeInMainWorld('Main', api);

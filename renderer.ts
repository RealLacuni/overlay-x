//renderer refers to the front-end portion of the app

export interface IElectronAPI {
  loadPreferences: () => Promise<void>,
}

//typing for context bridge APi
declare global {
  interface Window {
    electronAPI: IElectronAPI
  }
}
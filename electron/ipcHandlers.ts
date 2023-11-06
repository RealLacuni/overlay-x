import { BrowserWindow, ipcMain } from 'electron';
import { IpcMainEvent } from 'electron/main';

// Export the function that sets up IPC handlers
export function setupIPCListeners(mainWindow: BrowserWindow, displayWindow: BrowserWindow, devWindow: BrowserWindow | null) {

  // For AppBar
  ipcMain.on('minimize', () => {
    mainWindow.isMinimized() ? mainWindow.restore() : mainWindow.minimize();
    // or alternatively: win.isVisible() ? win.hide() : win.show()
  });
  ipcMain.on('maximize', () => {
    // eslint-disable-next-line no-unused-expressions
    mainWindow.isMaximized() ? mainWindow.restore() : mainWindow.maximize();
  });

  ipcMain.on('close', () => {
    mainWindow.close();
  });

  ipcMain.on('isDevWindow', (event: IpcMainEvent) => {
    if (devWindow) {
      event.returnValue = devWindow.isVisible();
    }
    else {
      event.returnValue = false;
    }
  });

  //loads the overlay and hides the main app mainWindow
  ipcMain.on('loadOverlay', (_event, useDev) => {
    if (useDev && devWindow != null) {
      console.log('loading dev overlay');
      devWindow.show();
    }
    else {
      console.log('loading prod overlay');
      displayWindow.show();
    }
    mainWindow.hide();
  });

  // For DevTools
  ipcMain.on('openDevTools', (_event, targetWindow) => {
    if (targetWindow == 'display' && devWindow != null) {
      devWindow.webContents.openDevTools();
      return;
    } else {
      mainWindow.webContents.openDevTools();
    }
  });
}

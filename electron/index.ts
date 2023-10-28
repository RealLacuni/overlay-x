/* eslint-disable no-console */
// Native
import path from 'path';
import url from 'url';

// Packages
import { BrowserWindow, app, ipcMain, IpcMainEvent, screen } from 'electron';
import isDev from 'electron-is-dev';
import { getPreferences } from './preferences';

// print current environment
if (isDev) {
  console.log('Running in development');
} else {
  console.log('Running in production');
}

const height = 600;
const width = 800;

function createWindow() {
  // Create the browser window.
  const window = new BrowserWindow({
    width,
    height,
    //  change to false to use AppBar
    frame: false,
    show: false,
    resizable: true,
    fullscreenable: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  });
  window.once('ready-to-show', () => {
    window.show();
  });

  const { width: screenWidth, height: screenHeight } = screen.getPrimaryDisplay().workAreaSize;
  const displayWindow = new BrowserWindow({
    width: screenWidth,
    height: screenHeight,
    frame: false,
    show: false,
    transparent: true,
    fullscreenable: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  });

  displayWindow.setAlwaysOnTop(true);
  displayWindow.setIgnoreMouseEvents(true, { forward: true });

  let devWindow: BrowserWindow | null = null;
  if (isDev) {
    devWindow = new BrowserWindow({
      width: screenWidth,
      height: screenHeight,
      frame: false,
      show: false,
      transparent: true,
      fullscreenable: true,
      webPreferences: {
        preload: path.join(__dirname, 'preload.js')
      }
    });
    devWindow.setAlwaysOnTop(true);
    // devWindow.setIgnoreMouseEvents(true, { forward: true });
  }
  const port = process.env.PORT || 3000;

  const mainUrl = isDev ? `http://localhost:${port}` : url.format({ pathname: path.join(__dirname, '../src/out/index.html'), hash: '/', protocol: 'file:', slashes: true });
  const displayUrl = isDev ? mainUrl + '/overlay' : url.format({ pathname: path.join(__dirname, '../src/out/index.html'), hash: '/overlay', protocol: 'file:', slashes: true });

  console.log('loading main at ', mainUrl);
  // and load the index.html of the app.
  if (isDev) {
    window?.loadURL(mainUrl);
    displayWindow?.loadURL(displayUrl);
    devWindow?.loadURL(displayUrl);

  } else {
    window?.loadFile(mainUrl);
    displayWindow?.loadFile(displayUrl);
  }
  // Open the DevTools.
  // window.webContents.openDevTools();

  //loads the overlay and hides the main app window
  ipcMain.on('loadOverlay', (_event, useDev) => {
    if (useDev && devWindow != null) {
      console.log('loading dev overlay');
      devWindow.show();
    }
    else {
      console.log('loading prod overlay');
      displayWindow.show();
    }
    window.hide();
  });
  // For DevTools
  ipcMain.on('openDevTools', (_event, targetWindow) => {
    if (targetWindow == 'display' && devWindow != null) {
      devWindow.webContents.openDevTools();
      return;
    } else {
      window.webContents.openDevTools();
    }
  });
  // For AppBar
  ipcMain.on('minimize', () => {
    window.isMinimized() ? window.restore() : window.minimize();
    // or alternatively: win.isVisible() ? win.hide() : win.show()
  });
  ipcMain.on('maximize', () => {
    // eslint-disable-next-line no-unused-expressions
    window.isMaximized() ? window.restore() : window.maximize();
  });

  ipcMain.on('close', () => {
    window.close();
  });

  ipcMain.on('isDevWindow', (event: IpcMainEvent) => {
    if (devWindow) {
      event.returnValue = devWindow.isVisible();  
    }
    else {
      event.returnValue = false;
    }
  });
}


// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});
// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

app.getPath('home');
console.log('home', app.getPath('home'));
app.getPath('appData');
console.log('appData', app.getPath('appData'));
app.getPath('userData');
console.log('userData', app.getPath('userData'));
// listen the channel `message` and resend the received message to the renderer process
ipcMain.on('message', (event: IpcMainEvent, message: string) => {
  console.log(message);
  setTimeout(() => event.sender.send('message', 'hi from electron'), 500);
});

ipcMain.on('isDevMode', (event: IpcMainEvent) => {
  console.log('isDevMode in main process is ', isDev);
  event.returnValue = isDev;
});

ipcMain.on('getPreferences', (event: IpcMainEvent) => {
  event.returnValue = getPreferences();
});


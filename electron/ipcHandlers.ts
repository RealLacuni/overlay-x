import { BrowserWindow, globalShortcut, ipcMain } from 'electron';
import { IpcMainEvent } from 'electron/main';
import { getPreferences, updatePreferences } from './preferences';
import { Preferences } from '../shared/types';
import isDev from 'electron-is-dev';

// Export the function that sets up IPC handlers
export function setupIPCListeners(mainWindow: BrowserWindow, displayWindow: BrowserWindow, devWindow: BrowserWindow | null) {
    const preferences = getPreferences();
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


    //registers keybind for toggling the overlay
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    let usingDevWindow = false;

    const toggleReg = globalShortcut.register(preferences.shortcuts.toggleOverlay, () => {
        /* toggles the overlay, used for keyboard shortcut 
        *  if isDev is true, assume we will only use the devOverlay to test the shortcut
        *  else it will toggle the prod overlay
            */
        // use a flag to signal the dev overlay is being used, just so that dev overlay can be toggled
        // will break if swapping from dev to prod overlay, as the flag will be set to true
        if (devWindow != null && (usingDevWindow || isDev)) {
            usingDevWindow = true;
            console.log('toggling dev overlay');
            devWindow.isVisible() ? devWindow.hide() : devWindow.show();
        }
        else {
            console.log('toggling prod overlay');
            displayWindow.isVisible() ? displayWindow.hide() : displayWindow.show();
        }
    });

    if (!toggleReg) {
        console.log('toggle shortcut registration failed');
    }

    const menuReg = globalShortcut.register(preferences.shortcuts.openMenu, () => {
        /* opens the menu AND toggles the overlay off.
        *  if isDev is true, assume we will only use the devOverlay to test the shortcut
        *  else it will toggle the prod overlay
            */
        if (devWindow != null && (usingDevWindow || isDev)) {
            usingDevWindow = true;
            console.log('opening dev menu');
            devWindow.webContents.send('openMenu');
            devWindow.show();
        }
        else {
            console.log('opening prod menu');
            displayWindow.webContents.send('openMenu');
            displayWindow.show();
        }
        mainWindow.show();

    });

    if (!menuReg) {
        console.log('menu shortcut registration failed');
    }

    if (isDev) {
        console.log(globalShortcut.isRegistered(preferences.shortcuts.toggleOverlay))
        console.log(globalShortcut.isRegistered(preferences.shortcuts.openMenu))
    }


    // For DevTools
    ipcMain.on('openDevTools', (_event, targetWindow) => {
        if (targetWindow == 'display' && devWindow != null) {
            devWindow.webContents.openDevTools();
            return;
        } else {
            mainWindow.webContents.openDevTools();
        }
    });

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

    ipcMain.on('updatePreferences', (event: IpcMainEvent, preferences: Preferences) => {
        console.log('updatePreferences', preferences);
        event.returnValue = updatePreferences(preferences);
    });

    ipcMain.on('printInBackend', (_event: IpcMainEvent, message: string) => {
        console.log(message);
    });
}

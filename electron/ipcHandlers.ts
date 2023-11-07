import { BrowserWindow, globalShortcut, ipcMain } from 'electron';
import { IpcMainEvent } from 'electron/main';
import { getPreferences, updatePreferences } from './preferences';
import { Preferences } from '../shared/types';
import isDev from 'electron-is-dev';

// Export the function that sets up IPC handlers
export function setupIPCListeners(mainWindow: BrowserWindow, overlayWindow: BrowserWindow, devWindow: BrowserWindow | null) {
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
            overlayWindow.show();
        }
        mainWindow.hide();
    });


    //registers keybind for toggling the overlay
    // eslint-disable-next-line @typescript-eslint/no-unused-vars


    const toggleReg = globalShortcut.register(preferences.shortcuts.toggleOverlay, () => {
        toggleCallback(overlayWindow);
    });

    if (!toggleReg) {
        console.log('toggle shortcut registration failed');
    }

    const menuReg = globalShortcut.register(preferences.shortcuts.openMenu, () => {
        menuCallback(mainWindow, overlayWindow);
    });

    if (!menuReg) {
        console.log('menu shortcut registration failed');
    }

    if (isDev) {
        console.log(globalShortcut.isRegistered(preferences.shortcuts.toggleOverlay))
        console.log(globalShortcut.isRegistered(preferences.shortcuts.openMenu))
    }

    ipcMain.on('hotkey::changeToggle', (event, newKey) => {
        console.log('changing toggle hotkey to ', newKey);
        globalShortcut.unregister(preferences.shortcuts.toggleOverlay);
        preferences.shortcuts.toggleOverlay = newKey;
        updatePreferences(preferences);
        const reg = globalShortcut.register(preferences.shortcuts.toggleOverlay, () => {
            toggleCallback(overlayWindow);
        });
        event.returnValue = reg;
    });

    ipcMain.on('hotkey::changeMenu', (event, newKey) => {
        console.log('changing menu hotkey to ', newKey);
        globalShortcut.unregister(preferences.shortcuts.openMenu);
        preferences.shortcuts.openMenu = newKey;
        updatePreferences(preferences);
        const reg = globalShortcut.register(preferences.shortcuts.openMenu, () => {
            menuCallback(mainWindow, overlayWindow);
        });
        event.returnValue = reg;
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

function toggleCallback(overlayWindow: BrowserWindow) {
    // toggles the overlay, used for keyboard shortcut 

    overlayWindow.isVisible() ? overlayWindow.hide() : overlayWindow.show();
}

function menuCallback(mainWindow: BrowserWindow, overlayWindow: BrowserWindow) {
    // opens the menu AND toggles the overlay off.
    console.log('opening prod menu');
    overlayWindow.hide();
    mainWindow.show();
}
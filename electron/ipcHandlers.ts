import { BrowserWindow, app, globalShortcut, ipcMain, shell } from 'electron';
import { IpcMainEvent } from 'electron/main';
import { getPreferences, updatePreferences } from './preferences';
import { Preferences } from '../shared/types';
import isDev from 'electron-is-dev';
import log from 'electron-log/main';

// Export the function that sets up IPC handlers
export function setupIPCListeners(mainWindow: BrowserWindow, overlayWindow: BrowserWindow, devWindow: BrowserWindow | null) {
    const preferences = getPreferences();
    //hide window when minimized, show through clicking on tray or through hotkey
    mainWindow.on('minimize', (event : Event) => {
        event.preventDefault();
        mainWindow.hide();
    });
    
    ipcMain.on('isDevWindow', (event: IpcMainEvent) => {
        if (devWindow) {
            event.returnValue = devWindow.isVisible();
        }
        else {
            event.returnValue = false;
        }
    });

    ipcMain.on('appVersion', (event: IpcMainEvent) => {
        event.returnValue = app.getVersion();
    });

    ipcMain.on('openLink', (_event: IpcMainEvent, url: string) => {
        shell.openExternal(url);
    });

    ipcMain.on('close', () => {
        app.quit();
    });

    //loads the overlay and hides the main app mainWindow
    ipcMain.on('loadOverlay', () => {
        overlayWindow.show();
        mainWindow.hide();
    });

    //registers keybind for toggling the overlay
    if (preferences.shortcuts.toggleOverlay) {
        const toggleReg = globalShortcut.register(preferences.shortcuts.toggleOverlay, () => {
            toggleCallback(overlayWindow);
            if (!toggleReg) {
                console.log('toggle shortcut registration failed');
            }
        });
    }

    if (preferences.shortcuts.openMenu) {
        const menuReg = globalShortcut.register(preferences.shortcuts.openMenu, () => {
            menuCallback(mainWindow, overlayWindow);
        });

        if (!menuReg) {
            console.log('menu shortcut registration failed');
        }
    }

    if (isDev) {
        console.log("toggle registered: ", globalShortcut.isRegistered(preferences.shortcuts.toggleOverlay))
        console.log("open menu registered: ", globalShortcut.isRegistered(preferences.shortcuts.openMenu))
    }

    ipcMain.on('hotkey::changeToggle', (event, newKey) => {
        console.log('changing toggle hotkey to ', newKey);
        if (!newKey || newKey.length == 0) {
            event.returnValue = false;
            return;
        }
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
        if (!newKey || newKey.length == 0) {
            event.returnValue = false;
            return;
        }
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
        log.info('getting preferences');
        event.returnValue = getPreferences();
    });

    ipcMain.on('updatePreferences', (event: IpcMainEvent, preferences: Preferences) => {
        if (updatePreferences(preferences)) {
            overlayWindow.webContents.send('updatedPreferences', preferences)
            event.returnValue = true;
        }
        else {
            event.returnValue = false;
        }

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
    overlayWindow.hide();
    mainWindow.show();
}
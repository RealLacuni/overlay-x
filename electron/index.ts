/* eslint-disable no-console */
// Native
import path from 'path';
import url from 'url';
// Packages
import { BrowserWindow, app, screen, Menu, Tray } from 'electron';
import isDev from 'electron-is-dev';
import { setupIPCListeners } from './ipcHandlers';
import log from 'electron-log/main';

// print current environment
log.initialize();

console.log = log.log
if (isDev) {
    console.log('Running in development');
} else {
    console.log('Running in production');
}
console.log('dir name', __dirname);

const height = 600;
const width = 960;

function createWindow(): Array<BrowserWindow | null> {
    // Create the browser window.
    const window = new BrowserWindow({
        width,
        height,
        frame: true,
        show: false,
        resizable: true,
        fullscreenable: true,
        titleBarOverlay: true,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    });
    isDev && window.setMenuBarVisibility(false);

    window.once('ready-to-show', () => {
        window.show();
    });

    const { width: screenWidth, height: screenHeight } = screen.getPrimaryDisplay().workAreaSize;
    const overlayWindow = new BrowserWindow({
        width: screenWidth,
        height: screenHeight,
        hasShadow: false,
        frame: false,
        show: false,
        transparent: true,
        fullscreenable: true,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    });

    overlayWindow.setAlwaysOnTop(true);
    overlayWindow.setIgnoreMouseEvents(true, { forward: true });

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
                preload: path.join(__dirname, 'preload.js'),
                devTools: isDev
            }
        });
        devWindow.setAlwaysOnTop(true);
    }

    // devWindow.setIgnoreMouseEvents(true, { forward: true });
    const port = process.env.PORT || 3000;

    const mainUrl = isDev ? `http://localhost:${port}` : url.format({ pathname: path.join(__dirname, '../../src/out/index.html'), hash: '/', protocol: 'file:', slashes: true });
    const displayUrl = isDev ? mainUrl + '#/overlay' : url.format({ pathname: path.join(__dirname, '../../src/out/index.html'), hash: '/overlay', protocol: 'file:', slashes: true });

    console.log(displayUrl);

    // and load the index.html of the app.
    isDev && devWindow?.loadURL(displayUrl);
    window?.loadURL(mainUrl);
    overlayWindow?.loadURL(displayUrl);

    window.on('close', (e: Electron.Event) => {
        e.preventDefault();
        overlayWindow?.close();
        devWindow?.close();
        window?.destroy();
        app.quit();
    });

    return [window, overlayWindow, devWindow];
}


// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
let tray = null as Tray | null;
app.on('will-quit', () => {
    if (tray !== null) {
        tray.destroy();
    }
});
app.whenReady().then(() => {
    const [mainWindow, overlayWindow, devWindow] = createWindow();
    if (mainWindow == null || overlayWindow == null) {
        console.log('window is null');
        return;
    }
    setupIPCListeners(mainWindow, overlayWindow, devWindow);
    tray = new Tray(path.join(__dirname, '../../icon-512.png'));


    if (process.platform === 'darwin') {
        tray.setPressedImage(path.join(__dirname, '../../icon-512.png'))
    }

    const contextMenu = Menu.buildFromTemplate([
        { label: 'Open Main Menu', type: 'normal', click: () => { mainWindow?.show(); } },
        {
            label: 'Open Settings', type: 'normal', click: () => {
                mainWindow?.webContents.send('open-settings');
                mainWindow?.show();
                tray?.closeContextMenu();
            }
        },
        { type: 'separator' },
        {
            label: 'Toggle Overlay', type: 'normal', click: () => {
                overlayWindow?.isVisible() ? overlayWindow.hide() : overlayWindow?.show();
            }
        },
        { type: 'separator' },
        { label: 'Shut down', type: 'normal', click: () => { app.quit(); } },
    ])
    tray.setToolTip('This is my application.')
    tray.setContextMenu(contextMenu)

    tray.on('click', () => {
        mainWindow?.show();
    })

    tray.on('right-click', () => {
        tray?.popUpContextMenu();
    });





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

app.getPath('userData');
console.log('userData', app.getPath('userData'));
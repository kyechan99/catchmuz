const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require('path');
const isDev = require('electron-is-dev');

let mainWindow;

function createWindow () {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    resizable: false,
    webPreferences: {
      nodeIntegration: true,
      // 개발자용 도구 막기
      devTools: false,
      // window.require 허용
      contextIsolation: false
    },
    icon: path.join(__dirname, './icons/icon.ico')
  });
  
  mainWindow.loadURL(
    isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`
  );

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.setMenuBarVisibility(false);
  mainWindow.on('closed', () => ( mainWindow = null ));
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
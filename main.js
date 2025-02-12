const { app, BrowserWindow, ipcMain, Menu, dialog, shell, nativeTheme } = require('electron');
const os = require('os');
const path = require('path');
const si = require('systeminformation');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 850,
    height: 650,
    icon: path.join(__dirname, 'assets/icon.png'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      enableRemoteModule: false,
      nodeIntegration: false,
      devTools: false,
    }
  });

  mainWindow.maximize();
  mainWindow.loadFile('public/index.html');

  const menuTemplate = [
    {
      label: 'SysOS',
      submenu: [
        {
          label: 'Home',
          click: () => mainWindow.loadFile('public/index.html')

        },
        { type: 'separator' },
        { role: 'quit' }
      ]
    },
    {
      label: 'View',
      submenu: [
        { role: 'reload', label: 'Refresh' },
        { role: 'forceReload' },
        { type: 'separator' },
        { role: 'resetZoom' },
        { role: 'zoomIn' },
        { role: 'zoomOut' },
        { type: 'separator' },
        { role: 'togglefullscreen' },
        { type: 'separator' },
        {
          label: 'Print Page',
          accelerator: 'CmdOrCtrl+P',
          click: () => mainWindow.webContents.executeJavaScript("window.print()")
        }
      ]
    },
    {
      label: 'Help',
      submenu: [
        {
          label: 'About',
          click: () => {
            dialog.showMessageBox(mainWindow, {
              type: 'info',
              title: 'About SysOS',
              message: `SysOS is a lightweight and intuitive system information tool designed to provide users with detailed insights into their computer's hardware and software. From CPU usage and memory statistics to GPU details and storage information, SysOS offers a comprehensive overview of your system's performance and configuration.\nVersion: 1.0.0`,
              buttons: ['OK'],
            });
          }
        },
        { type: 'separator' },
        {
          label: 'Contact Developer',
          enabled: false
        },
        {
          label: 'Telegram',
          click: () => shell.openExternal('https://t.me/h3dev')
        },
        {
          label: 'Instagram',
          click: () => shell.openExternal('https://instagram.com/h3dev.pira')
        },
        {
          label: 'Email',
          click: () => shell.openExternal('mailto:h3dev.pira@gmail.com')
        }
      ]
    }
  ];

  const menu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(menu);

  const contextMenu = Menu.buildFromTemplate([
    { role: 'copy', label: 'Copy' },
    { role: 'selectAll', label: 'Select All' },
    { role: 'reload', label: 'Refresh' },
    { type: 'separator' },
    { role: 'togglefullscreen' },
    { type: 'separator' },
    {
      label: 'Print Page',
      accelerator: 'Ctrl+P',
      click: () => mainWindow.webContents.executeJavaScript("window.print()")
    }
  ]);

  mainWindow.webContents.on('context-menu', (event, params) => {
    contextMenu.popup(mainWindow, params.x, params.y);
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

nativeTheme.themeSource = 'dark';

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


ipcMain.handle('get-system-info', async () => {
  const cpuUsage = await si.currentLoad();
  const graphics = await si.graphics();
  const storage = await si.fsSize();

  return {
    arch: os.arch(),
    platform: os.platform(),
    totalMem: os.totalmem(),
    freeMem: os.freemem(),
    cpuUsage: cpuUsage.currentLoad,
    cpuCores: os.cpus().length,
    uptime: os.uptime(),
    osVersion: os.version(),
    homeDir: os.homedir(),
    userInfo: os.userInfo().username,
    gpuInfo: graphics.controllers[0].model,
    cpuInfo: os.cpus()[0].model,
    storageInfo: storage.map(disk => ({
      name: disk.mount,
      total: (disk.size / 1024 / 1024 / 1024).toFixed(2) + ' GB',
      used: ((disk.used / 1024 / 1024 / 1024)).toFixed(2) + ' GB',
      free: ((disk.available / 1024 / 1024 / 1024)).toFixed(2) + ' GB',
    })),
  };
});

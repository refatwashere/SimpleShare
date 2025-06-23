const {
  app,
  BrowserWindow,
  Tray,
  Menu,
  clipboard,
  nativeImage,
  ipcMain,
  nativeTheme
} = require('electron');
const path = require('path');
const { spawn } = require('child_process');
const ngrok = require('ngrok');
const QRCode = require('qrcode');
const notifier = require('node-notifier');
const AutoLaunch = require('auto-launch');
const store = require('./store');

let mainWindow, tray, serverProcess;

// 🔄 Handle auto-launch
const autoLauncher = new AutoLaunch({
  name: 'Just Share',
  path: app.getPath('exe')
});

if (store.get('launchAtStartup')) autoLauncher.enable().catch(() => {});
else autoLauncher.disable().catch(() => {});

function createTray(publicUrl) {
  const iconPath = path.join(__dirname, 'assets', 'icon.png');
  const icon = nativeImage.createFromPath(iconPath);
  tray = new Tray(icon);
  const menu = Menu.buildFromTemplate([
    { label: 'Open FileShare', click: () => mainWindow?.show() },
    { label: 'Settings', click: () => openSettingsWindow() },
    { label: 'Copy URL to Clipboard', click: () => clipboard.writeText(publicUrl) },
    { type: 'separator' },
    { label: 'Exit', click: () => app.quit() }
  ]);
  tray.setToolTip('Just Share');
  tray.setContextMenu(menu);
}

function openSettingsWindow() {
  const settingsWin = new BrowserWindow({
    width: 450,
    height: 400,
    resizable: false,
    title: 'Settings',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true
    }
  });
  settingsWin.loadFile(path.join(__dirname, 'windows', 'settings.html'));
}

// 💾 Settings IPC
ipcMain.handle('get-settings', () => store.store);
ipcMain.on('save-settings', (_, s) => {
  store.set(s);
  s.launchAtStartup ? autoLauncher.enable() : autoLauncher.disable();
});
ipcMain.on('restart-app', () => {
  app.relaunch();
  app.exit(0);
});

async function startApp() {
  const settings = store.store;
  const theme =
    settings.theme === 'system'
      ? nativeTheme.shouldUseDarkColors ? 'dark' : 'light'
      : settings.theme;

  // 🛰️ Start server
  serverProcess = spawn('node', ['server.js'], {
    cwd: __dirname,
    shell: true,
    stdio: 'inherit'
  });

  // 🌐 Start ngrok tunnel
  const publicUrl = await ngrok.connect({ addr: 3000 });
  clipboard.writeText(publicUrl);

  // 🖼️ Generate QR
  await QRCode.toFile(path.join(__dirname, 'public', 'qr.png'), publicUrl, {
    color: { dark: '#000000', light: '#ffffff' },
    width: 300
  });

  // 🔔 Notification
  if (settings.showNotifications) {
    notifier.notify({
      title: 'Just Share Ready',
      message: `Link copied to clipboard:\n${publicUrl}`,
      icon: path.join(__dirname, 'assets', 'icon.png')
    });
  }

  // 🪟 Create window
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    show: false,
    webPreferences: { nodeIntegration: false }
  });

  mainWindow.loadURL(publicUrl);
  mainWindow.once('ready-to-show', () => mainWindow.show());
  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.webContents.executeJavaScript(
      `document.documentElement.setAttribute('data-theme', '${theme}');`
    );
  });

  mainWindow.on('close', (e) => {
    if (store.get('minimizeToTray')) {
      e.preventDefault();
      mainWindow.hide();
    }
  });

  mainWindow.on('closed', () => {
    ngrok.kill();
    serverProcess?.kill();
  });

  createTray(publicUrl);
}

app.whenReady().then(() => setTimeout(startApp, 2000));

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) startApp();
});
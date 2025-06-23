const Store = require('electron-store');

module.exports = new Store({
  defaults: {
    launchAtStartup: true,
    showNotifications: true,
    minimizeToTray: true,
    theme: 'system' // system | light | dark
  }
});
// This module exports an instance of electron-store with default settings
// for an Electron application. The settings include options for launching
// at startup, showing notifications, and minimizing to the system tray.
// The `electron-store` package is used to manage application settings in a
// persistent way, allowing the application to remember user preferences
// across sessions.
// The `defaults` object defines the initial values for these settings, which
// can be modified by the user through the application's settings interface.
// The `theme` setting allows the user to choose between 'dark' and 'light'
// themes, enhancing the user experience based on personal preferences.
// The `launchAtStartup` setting controls whether the application starts
// automatically when the system boots up, providing convenience for users
// who want quick access to the application without manual intervention.
window.onload = () => {
  window.api.getSettings().then(settings => {
    document.getElementById('launchAtStartup').checked = settings.launchAtStartup;
    document.getElementById('showNotifications').checked = settings.showNotifications;
    document.getElementById('minimizeToTray').checked = settings.minimizeToTray;
    document.getElementById('theme').value = settings.theme;

    // 🌗 Apply theme immediately to match selection
    const theme = settings.theme === 'system'
      ? window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
      : settings.theme;

    document.documentElement.setAttribute('data-theme', theme);
  });
};

function save() {
  const settings = {
    launchAtStartup: document.getElementById('launchAtStartup').checked,
    showNotifications: document.getElementById('showNotifications').checked,
    minimizeToTray: document.getElementById('minimizeToTray').checked,
    theme: document.getElementById('theme').value
  };
  window.api.saveSettings(settings);
  window.close();
}

function restartApp() {
  window.api.restartApp();
}
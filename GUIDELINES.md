# 📦 Just Share ~ by Refat

![Electron](https://img.shields.io/badge/Electron-28.x-blue.svg)
![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)
![Platform](https://img.shields.io/badge/Platform-Windows%20only-blueviolet.svg)
![Built With Love](https://img.shields.io/badge/Made%20with-%E2%9D%A4-red.svg)
---

## 📦 Just Share ~ by Refat

A secure, local-first file sharing app for Windows built with **Electron** + **Express**, featuring:

- 📡 LAN & ngrok tunneling  
- 📂 Drag-and-drop uploads  
- 📷 Instant QR code sharing  
- 🖥️ Native desktop experience with theme support  
- ⚙️ Modular Settings UI with restart button  

---

### 🚀 Getting Started

#### 1. **Clone the Repository**

```bash
git clone https://github.com/your-username/SimpleShare.git
cd SimpleShare
```

#### 2. **Install Dependencies**

```bash
npm install
```

Make sure you have Node.js ≥ v18 installed.

---

### 🧪 Development Mode

To run the server + Electron locally:

```bash
npm start
```

- Server runs on `localhost:3000`
- Electron window will open your tunnel/public preview
- Tray icon appears with access to Settings

---

### ⚙️ App Features

- **Express backend**: Handles uploads/downloads under `uploads/`  
- **Electron tray**: Access main preview, settings, and exit  
- **ngrok**: Tunnels server to the internet  
- **QR Code**: Exports to `public/qr.png`  
- **Settings Panel**:
  - Launch at Startup
  - Show Notifications
  - Minimize to Tray
  - Theme: system / dark / light
  - Restart App  

---

### 🛠️ Project Structure

```
lan-fileshare/
├── public/               # Frontend UI
├── windows/              # Electron-only settings window
├── assets/               # Tray icon, splash, QR images
├── uploads/              # User-uploaded files
├── build/                # Installer assets (see below)
├── main.js               # Electron entry
├── preload.js            # IPC-safe bridge
├── server.js             # Express backend
├── store.js              # electron-store config
```

---

### 📁 Installer Setup (Windows Only)

#### 1. Add these to `/build`:

- `installerHeader.bmp` (150×57)  
- `installerSidebar.bmp` (164×314)  
- `license.txt`  
- `readme.txt`  
- `installer.nsh` (optional NSIS script)

#### 2. Build Installer

```bash
npm run dist
```

> Creates `dist/Just Share Setup.exe` — fully branded, with splash and shortcuts!

---

### 📜 Customization

- 💡 Modify `settings.html` to add more toggles  
- 🎨 Edit `theme-light.css` and `theme-dark.css` for branding  
- 📦 Tweak `package.json → build` for build targets  

---

## 📸 Screenshots

### 🖥️ Main Web Portal Interface
![Web preview](docs/assets/screenshot-dashboard.png)

### ⚙️ Settings Panel
![Settings](docs/assets/screenshot-settings.png)

### 🎨 Installer Wizard
![Installer wizard](docs/assets/screenshot-installer.png)

### 📱 Mobile QR Access
![QR Code](docs/assets/screenshot-qr.png)

### 📦 Tray
![Tray Icon](docs/assets/screenshot-tray.png)

---
### 🙌 Credits

Crafted with care by **Refat**. Inspired by the need for simple, shareable, and secure LAN file transfers with a touch of design.

Happy sharing!

---

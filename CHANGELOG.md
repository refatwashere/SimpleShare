# 📦 Just Share - Changelog

All notable changes to this project will be documented in this file.

---

## [1.0.0] - 2025-06-23

### ✨ Added
- Core Express.js backend for file upload, download, and listing
- Multer 2.x integration with enhanced security
- Frontend preview interface with dark/light theming
- Electron app wrapping with custom tray icon and native UI
- Ngrok tunnel integration with auto QR code export
- Clipboard support and desktop notifications
- Persistent user settings with `electron-store`

### ⚙️ Settings Panel
- Modern sidebar layout (`settings.html`)
- Toggle: Launch at startup
- Toggle: Show notifications
- Toggle: Minimize to tray
- Theme selection: system / dark / light
- Restart button from UI
- IPC-safe `preload.js` bridge for security

### 🧠 Architecture
- Modular structure (`windows/`, `public/`, `assets/`, `uploads/`)
- Auto-launch via `auto-launch`
- Fully isolated context using Electron best practices

---

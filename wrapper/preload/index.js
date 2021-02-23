/* eslint-disable */
// Preload (Isolated World)
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('benchmark', {
  startRemote: (url) => ipcRenderer.send('open_benchmark', url),
  startLocal: () => ipcRenderer.send('open_benchmark', 'init_local()'),
  resetLauncher: () => ipcRenderer.send('reset_launcher'),
});

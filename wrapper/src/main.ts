import axios from 'axios';
import * as proc from 'child_process';
import { app, BrowserWindow, ipcMain, shell } from 'electron';
import path from 'path';
import { argv } from 'process';
import { URL } from 'url';
import waitForLocalhost from 'wait-for-localhost';

import { identifyResponse } from './api/server/identifyResponse';
import {
  cliArgs,
  cliOptions,
  STORAGE_DIRECTORY_CLI_FLAG,
} from './api/tools/cli';
import { headlessMessage } from './headlessMessage';

let mainWindow: BrowserWindow;
let backend: proc.ChildProcess | undefined;
let initOccured = false;

function baseURL(url: string): string {
  try {
    if (
      url.includes('://') &&
      !(url.startsWith('http://') || url.startsWith('https://'))
    ) {
      return '';
    }
    if (!url.includes('://')) {
      url = 'http://' + url;
    }
    const parsedURL = new URL(url);
    return `${parsedURL.protocol}//${parsedURL.host}`;
  } catch (e) {
    return '';
  }
}

function show404Page() {
  mainWindow.loadFile(path.join(app.getAppPath(), './public/404.html'));
}

function showLauncherPage() {
  mainWindow.loadFile(path.join(app.getAppPath(), './public/index.html'));
}

function spawnLocalServer() {
  if (backend !== undefined) {
    console.error('Failed to start backend as it is already running.');
  }
  // we do not have access to app in the subprocess and therefore need to overwrite the default storage directory from here.
  if (!argv.includes('--' + STORAGE_DIRECTORY_CLI_FLAG)) {
    cliArgs.storageDirectory = app.getPath('userData');
  }
  backend = proc.fork(
    path.join(app.getAppPath(), './dist/api/main.js'),
    // bool flags do not take a value and are true if present. Therefore we need to handle them differently.
    cliOptions.flatMap((option) =>
      option.type === 'bool'
        ? cliArgs[option.name]
          ? ['--' + option.name]
          : []
        : ['--' + option.name, cliArgs[option.name].toString()]
    ),
    {}
  );
}

function killLocalServer() {
  if (backend !== undefined) {
    backend.kill('SIGINT');
    backend = undefined;
  }
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 700,
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(app.getAppPath(), './preload/index.js'),
      contextIsolation: true,
    },
    title: 'Snowman',
  });

  showLauncherPage();
}

function loadURL(url: string) {
  mainWindow.loadURL(url);
  mainWindow.webContents.on('new-window', (e, loadedUrl) => {
    if (new URL(loadedUrl).host !== new URL(url).host) {
      e.preventDefault();
      shell.openExternal(loadedUrl);
    }
  });
}

ipcMain.on('open_benchmark', (_: unknown, url: string) => {
  if (!initOccured) {
    if (url === 'init_local()') {
      spawnLocalServer();
      waitForLocalhost({
        port: 8123,
        path: '/api',
      }).then(() => {
        loadURL('http://localhost:8123');
      });
    } else {
      url = baseURL(url);
      // Validate if we received a valid snowman URL
      if (url) {
        axios
          .get(url + '/api/identify')
          .then((response) => {
            if (response.status === 200 && response.data === identifyResponse) {
              loadURL(url);
            } else {
              show404Page();
            }
          })
          .catch((e) => {
            show404Page();
          });
      } else {
        show404Page();
      }
    }
    initOccured = true;
  }
});

ipcMain.on('reset_launcher', () => {
  initOccured = false;
  showLauncherPage();
});

app.on('activate', () => {
  if (!mainWindow) {
    createWindow();
  }
});

app.on('ready', () => {
  if (cliArgs.headless) {
    console.log(headlessMessage);
    spawnLocalServer();
  } else {
    createWindow();
  }
});

app.on('window-all-closed', async () => {
  killLocalServer();
  if (process.platform !== 'darwin') {
    setTimeout(() => {
      app.quit();
    }, 250);
  }
});

app.on('quit', () => {
  killLocalServer();
});

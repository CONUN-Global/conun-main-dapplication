import path from "path";
import { app, BrowserWindow, ipcMain, shell } from "electron";
import isDev from "electron-is-dev";

import {
  getAuthenticationURL,
  getLogOutUrl,
  loadTokens,
  logout,
  refreshTokens,
} from "./services/auth-service";

import { prepareDb } from "./store/db";

import "./ipcMain/account";
import "./ipcMain/wallet";
import "./ipcMain/db";

let mainWindow: BrowserWindow | null = null;
let authWindow: BrowserWindow | null = null;
let transferWindow: BrowserWindow | null = null;
let showWindow: () => Promise<void> | null = null;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  // eslint-disable-line global-require
  app.quit();
}

function destroyAuthWin() {
  if (!authWindow) return;
  authWindow.close();
  authWindow = null;
}

const createWindow = async (): Promise<void> => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    title: "Conun Manager",
    width: 414,
    height: 736,
    webPreferences: {
      nodeIntegration: false,
      preload: path.resolve(__dirname, "preload.js"),
    },
    resizable: false,
  });

  mainWindow.removeMenu();
  mainWindow.setResizable(false);

  await prepareDb();

  if (isDev) {
    await mainWindow.loadURL("http://localhost:1234");
    mainWindow.webContents.openDevTools();
  } else {
    await mainWindow.loadURL(
      `file://${path.join(__dirname, "../parcel-build/index.html")}`
    );
  }

  mainWindow.webContents.on("new-window", (event, url) => {
    event.preventDefault();
    shell.openExternal(url);
  });

  mainWindow.on("close", () => {
    if (transferWindow) {
      transferWindow.close();
      transferWindow = null;
    }
  });

  if (authWindow) {
    destroyAuthWin();
  }
};

function createAuthWindow() {
  if (mainWindow) {
    mainWindow.close();
  }

  authWindow = new BrowserWindow({
    width: 414,
    height: 736,
    webPreferences: {
      nodeIntegration: false,
      enableRemoteModule: false,
    },
  });

  authWindow.loadURL(getAuthenticationURL(), { userAgent: "Chrome" });

  const {
    session: { webRequest },
  } = authWindow.webContents;

  const filter = {
    urls: ["http://localhost/callback*"],
  };

  webRequest.onBeforeRequest(filter, async ({ url }) => {
    await loadTokens(url);
    return showWindow();
  });
}

showWindow = async () => {
  try {
    await refreshTokens();
    return createWindow();
  } catch (err) {
    return createAuthWindow();
  }
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", showWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
ipcMain.handle("logout", async () => {
  const logoutWindow = new BrowserWindow({
    show: false,
  });

  logoutWindow.loadURL(getLogOutUrl());

  logoutWindow.on("ready-to-show", async () => {
    logoutWindow.close();
    await logout();
  });

  if (mainWindow) {
    mainWindow.close();
  }
});

ipcMain.handle("open-transfer-window", async (_, args) => {
  if (!transferWindow) {
    transferWindow = new BrowserWindow({
      width: 380,
      height: 371,
      frame: false,
      webPreferences: {
        nodeIntegration: false,
        preload: path.resolve(__dirname, "preload.js"),
      },
    });

    transferWindow.removeMenu();
    transferWindow.setResizable(false);
    transferWindow.setAlwaysOnTop(true, "normal");

    if (isDev) {
      await transferWindow.loadURL("http://localhost:1234/#transfer");
      transferWindow.webContents.openDevTools();
    } else {
      await transferWindow.loadURL(
        `file://${path.join(__dirname, "../parcel-build/index.html#transfer")}`
      );
    }

    if (transferWindow) {
      transferWindow.webContents.send("send-transfer-data", args);
    }

    transferWindow.webContents.on("new-window", (event, url) => {
      event.preventDefault();
      shell.openExternal(url);
    });
  }
});

ipcMain.handle("close-transfer-window", () => {
  if (transferWindow) {
    transferWindow.close();
    transferWindow = null;
  }
});

ipcMain.handle("check-transfer-window", () => !!transferWindow);

ipcMain.handle("request-balance-refetch", async () => {
  mainWindow.webContents.send("refetch-balances");
});

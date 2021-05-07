import path from "path";
import { app, BrowserWindow, ipcMain, shell } from "electron";
import isDev from "electron-is-dev";
import { autoUpdater } from "electron-updater";

import {
  getAuthenticationURL,
  getLogOutUrl,
  loadTokens,
  logout,
  refreshTokens,
} from "./services/auth-service";

import logger from "./logger";

import { prepareDb } from "./store/db";

import "./ipcMain/account";
import "./ipcMain/wallet";
import "./ipcMain/db";
import "./ipcMain/drive";

autoUpdater.checkForUpdatesAndNotify();

export let mainWindow: BrowserWindow | null = null;
let authWindow: BrowserWindow | null = null;
let transferWindow: BrowserWindow | null = null;
let showWindow: () => Promise<void> | null = null;

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

  authWindow.removeMenu();
  authWindow.setResizable(false);

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
    logger("show-window", err);
    return createAuthWindow();
  }
};

app.on("ready", showWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

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
    mainWindow = null;
    showWindow();
  }
});

ipcMain.handle("open-transfer-window", async (_, args) => {
  try {
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

      if (isDev) {
        await transferWindow.loadURL("http://localhost:1234/#transfer");
        transferWindow.webContents.openDevTools();
      } else {
        await transferWindow.loadURL(
          `file://${path.join(
            __dirname,
            "../parcel-build/index.html#transfer"
          )}`
        );
      }

      if (transferWindow) {
        transferWindow.webContents.send("send-transfer-data", args);
      }

      transferWindow.webContents.on("new-window", (event, url) => {
        event.preventDefault();
        shell.openExternal(url);
      });
      transferWindow.on("close", () => {
        if (transferWindow) {
          transferWindow = null;
        }
      });
    }
  } catch (error) {
    logger("transfer-window", error);
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

process.on("uncaughtException", (uncaughtException) => {
  logger("uncaught-exception", uncaughtException);
});

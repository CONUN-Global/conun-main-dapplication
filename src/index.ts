import { app, BrowserWindow, ipcMain } from "electron";
import { generateApiPrivateKey } from "./services/api-services";
import {
  getAuthenticationURL,
  getLogOutUrl,
  getProfile,
  loadTokens,
  logout,
  refreshTokens,
} from "./services/auth-service";
import signGenerator from "./services/sign-generator";
import {
  createWallet,
  saveKeyStoreJson,
  createQrCode,
  saveQrCode,
  validateKeystoreFile,
  validateQrCode,
  validatePrivateKey,
  getEthBalance,
  getConunBalance,
  estimateGas,
  transferEth,
  transferCon,
} from "./services/wallet-services";
declare const MAIN_WINDOW_WEBPACK_ENTRY: any;

let mainWindow: BrowserWindow | null = null;
let authWindow: BrowserWindow | null = null;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  // eslint-disable-line global-require
  app.quit();
}

const createWindow = (): void => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    show: false,
    width: 1200,
    height: 850,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
  console.log(process.env.AUTH_0_DOMAIN, "kdjklsadfjkl;fdsajkl;adsf;");
  if (process.env.NODE_ENV === "development") {
    // Open the DevTools.
    mainWindow.webContents.openDevTools();
  }

  mainWindow.webContents.on("did-finish-load", () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }

    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
      mainWindow.focus();

      if (authWindow) {
        destroyAuthWin();
      }
    }
  });
};

function destroyAuthWin() {
  if (!authWindow) return;
  authWindow.close();
  authWindow = null;
}

function createAuthWindow() {
  if (mainWindow) {
    mainWindow.close();
  }

  authWindow = new BrowserWindow({
    width: 1024,
    height: 728,
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
    return createWindow();
  });
}

async function showWindow() {
  try {
    await refreshTokens();
    return createWindow();
  } catch (err) {
    return createAuthWindow();
  }
}

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
    showWindow();
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

ipcMain.handle("get-profile", () => {
  return getProfile();
});

ipcMain.handle("create-wallet", async (_, args) => {
  const data = await createWallet(args.password);
  return data;
});

ipcMain.handle("export-key-store", async (_, args) => {
  const res = await saveKeyStoreJson(args.keyStore);
  return res;
});

ipcMain.handle("create-qr-code", async (_, args) => {
  const res = await createQrCode(args);
  return res;
});

ipcMain.handle("download-qr-code", async (_, args) => {
  const res = await saveQrCode(args.qrCode);
  return res;
});

ipcMain.handle("validate-keystore-file", async (_, args) => {
  try {
    const res = await validateKeystoreFile(args);
    return res;
  } catch (error) {
    return {
      success: false,
    };
  }
});

ipcMain.handle("validate-qr-code", async (_, args) => {
  try {
    const res = await validateQrCode(args);
    return res;
  } catch (error) {
    return {
      success: false,
    };
  }
});

ipcMain.handle("validate-private-key", async (_, args) => {
  try {
    const res = await validatePrivateKey(args);
    return res;
  } catch (error) {
    return {
      success: false,
    };
  }
});

ipcMain.handle("generate-api-private-key", async () => {
  try {
    const res = await generateApiPrivateKey();
    return res;
  } catch (error) {
    return {
      success: false,
    };
  }
});

ipcMain.handle("get-eth-balance", async (_, args) => {
  try {
    const res = await getEthBalance(args.address);
    return res;
  } catch (error) {
    return {
      success: false,
    };
  }
});

ipcMain.handle("get-con-balance", async (_, args) => {
  try {
    const res = await getConunBalance(args.address);
    return res;
  } catch (error) {
    return {
      success: false,
    };
  }
});

ipcMain.handle("get-gas-estimate", async (_, args) => {
  try {
    const res = await estimateGas(args);
    return { ...res, success: true };
  } catch (error) {
    return {
      success: false,
      error,
    };
  }
});

ipcMain.handle("transfer", async (_, args) => {
  try {
    if (args.type === "ETH") {
      const res = await transferEth(args);
      return { ...res, success: true };
    }

    const res = await transferCon(args);
    return { ...res, success: true };
  } catch (error) {
    return {
      success: false,
      error,
    };
  }
});

ipcMain.handle("generate-sign", async (_, args) => {
  try {
    const res = await signGenerator(args);

    return res;
  } catch (error) {
    return {
      success: false,
      error,
    };
  }
});

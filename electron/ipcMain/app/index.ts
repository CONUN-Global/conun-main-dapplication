import { app, ipcMain } from "electron";

import logger from "../../logger";

ipcMain.handle("get-app-version", async () => {
  try {
    const version = app.getVersion();

    return version;
  } catch (error) {
    logger("get-app-version", error, "error");
    return {
      success: false,
      error,
    };
  }
});

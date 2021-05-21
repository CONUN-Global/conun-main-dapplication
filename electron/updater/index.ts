import { dialog } from "electron";
import { autoUpdater } from "electron-updater";

import logger from "../logger";

const release = {
  repo: "conun-main-dapplication",
  owner: "CONUN-Global",
};

autoUpdater.setFeedURL({
  provider: "github",
  repo: release.repo,
  owner: release.owner,
  token: process.env.GITHUB_TOKEN,
});

function showUpdateNotification(info: any = {}) {
  const versionLabel = info.label
    ? `Version ${info.version}`
    : "The latest version";

  const options = {
    type: "question",
    buttons: ["Restart Now", "Later!"],
    defaultId: 2,
    title: "The latest version was install",
    message: "Conun Manager will be automatically updated after restart.",
    detail: `${versionLabel} was installed`,
  };

  dialog.showMessageBox(null, options).then(function (res) {
    if (res.response === 0) {
      autoUpdater.quitAndInstall();
    }
  });
}

function showUpdateAvailableNotification() {
  const options = {
    type: "info",
    buttons: ["Update", "No"],
    defaultId: 2,
    title: "New Update Available",
    message: "Will you update new version?",
  };

  dialog.showMessageBox(null, options).then(function (res) {
    if (res.response === 0) {
      autoUpdater.downloadUpdate();
    }
  });
}

function initAutoUpdate() {
  autoUpdater.on("checking-for-update", () =>
    logger("updater", "checking for update", "info")
  );

  autoUpdater.on("update-available", () => showUpdateAvailableNotification());

  autoUpdater.on("download-progress", (progressObj) => {
    try {
      let msg = `Download speed: ${progressObj.bytesPerSecond}`;
      msg += ` - Downloaded ${progressObj.percent}%`;
      msg += ` (${progressObj.transferred}/${progressObj.total})`;
      logger("update-progress", msg, "info");
    } catch (err) {
      logger("on-download-update", err, "info");
    }
  });

  autoUpdater.on("update-downloaded", (info) => showUpdateNotification(info));

  autoUpdater.on("update-not-available", () =>
    logger("update-not-available", "Update not available.", "error")
  );

  autoUpdater.on("error", (err) => logger("auto-updater", err, "error"));

  autoUpdater.checkForUpdates().catch((err) => {
    logger("no-updates-found", err.message, "error");
  });
}

export default initAutoUpdate;

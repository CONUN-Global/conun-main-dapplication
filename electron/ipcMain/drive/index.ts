import path from "path";
import { ipcMain } from "electron";
import { spawn, ChildProcess } from "child_process";

import db from "../../store/db";
import { countDownload, likeContent, createFile } from "../../drive";

import { mainWindow } from "../../";

export let drive: ChildProcess | null;

// @ts-expect-error
ipcMain.handle("open-drive", async () => {
  try {
    drive = spawn(
      `${path.resolve(
        __dirname,
        "../../"
      )}/exe-files/Conun Drive-1.0.0.AppImage`,
      {
        stdio: ["pipe", "pipe", "pipe", "ipc"],
      }
    );

    mainWindow.webContents.send("is-drive-open", true);

    const userDetails: any = await db.get("userDetails");

    drive.send({
      type: "send-user-details",
      walletAddress: userDetails?.walletAddress,
    });

    drive.stdout.on("data", (data) => {
      console.log(`stdout:\n${data}`);
    });

    drive.stderr.on("data", (data) => {
      console.log(`stdout:\n${data}`);
    });

    drive.on("error", (error) => {
      console.error(`error: ${error.message}`);
    });

    drive.on("message", async (message: any) => {
      if (message?.type === "upload-file") {
        try {
          const res = await createFile(message?.fileHash?.path);

          const data = await res.json();

          drive.send({
            type: "upload-success",
            transactionHash: data?.payload?.TxID,
            publicHash: data?.payload?.Value,
            fileHash: message?.fileHash?.path,
            size: message?.fileHash?.size,
            data: message?.data,
          });
        } catch (error) {
          console.log(`error`, error);
        }
      }

      if (message?.type === "like-content") {
        try {
          const res = await likeContent({
            contentId: message?.content_id,
            userId: message?.user_id,
            publicHash: message?.ccid,
          });

          const data = await res.json();

          console.log(`data`, data);

          drive.send({
            type: "like-success",
            contentId: message?.content_id,
          });
        } catch (error) {
          console.log(`error`, error);
        }
      }

      if (message?.type === "download-content") {
        try {
          const res = await countDownload({
            contentId: message?.content_id,
            userId: message?.user_id,
            publicHash: message?.ccid,
          });

          await res.json();

          drive.send({
            type: "download-success",
            contentId: message?.content_id,
          });
        } catch (error) {
          console.log(`error`, error);
        }
      }
    });

    drive.on("exit", (code) => {
      console.log(`Child exited with code ${code}`);
      mainWindow.webContents.send("is-drive-open", false);
    });
  } catch (error) {
    return {
      success: false,
      error: String(error),
    };
  }
});

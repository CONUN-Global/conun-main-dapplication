import { ipcMain, shell } from "electron";
import { server as webSocketServer } from "websocket";
import http from "http";

import db from "../../store/db";
import { countDownload, likeContent, createFile } from "../../drive";
import { mainWindow } from "../../";

import logger from "../../logger";

export const clients: any = {};

const PORT = 17401;

const server = http.createServer();

server.listen(PORT);

export const wsServer = new webSocketServer({
  httpServer: server,
});

wsServer.on("request", async (request) => {
  const userID = "conun-drive";

  const connection = request.accept(null, request.origin);
  clients[userID] = connection;

  mainWindow.webContents.send("is-drive-open", true);

  const userDetails: any = await db.get("userDetails");

  connection.on("close", () =>
    mainWindow.webContents.send("is-drive-open", false)
  );

  connection.send(
    JSON.stringify({
      type: "send-user-details",
      walletAddress: userDetails?.walletAddress,
    })
  );

  connection.on("message", async (message) => {
    const messageData = JSON.parse(message?.utf8Data);

    if (messageData?.type === "get-drive-path") {
      try {
        const appData = await db.get("appData");

        await db.put({ ...appData, drivePath: messageData.path });
      } catch (error) {
        logger("get-drive-path", error);
      }
    }
    if (messageData?.type === "upload-file") {
      try {
        const data = await createFile(messageData?.fileHash?.path);

        if (data?.success) {
          connection.send(
            JSON.stringify({
              type: "upload-success",
              transactionHash: data?.payload?.TxID,
              publicHash: data?.payload?.Value,
              fileHash: messageData?.fileHash?.path,
              size: messageData?.fileHash?.size,
              data: messageData?.data,
            })
          );
        } else {
          logger("like-error", data);
        }
      } catch (error) {
        logger("create-file", error);
      }
    }

    if (messageData?.type === "like-content") {
      try {
        const data = await likeContent({
          contentId: messageData?.content_id,
          userId: messageData?.user_id,
          publicHash: messageData?.ccid,
        });

        if (data?.success) {
          connection.send(
            JSON.stringify({
              type: "like-success",
              contentId: messageData?.content_id,
            })
          );
        } else {
          logger("like-error", data);
        }
      } catch (error) {
        logger("like-error", error);
      }
    }

    if (messageData?.type === "download-content") {
      try {
        const data = await countDownload({
          contentId: messageData?.content_id,
          userId: messageData?.user_id,
          publicHash: messageData?.ccid,
        });

        if (data?.success) {
          connection.send(
            JSON.stringify({
              type: "download-success",
              contentId: messageData?.content_id,
            })
          );
        } else {
          logger("download-success", data);
        }
      } catch (error) {
        logger("download-success", error);
      }
    }
  });
});

ipcMain.handle("open-drive", async () => {
  const appData: any = await db.get("appData");
  if (appData.drivePath) {
    shell.openPath(appData.drivePath);
  }
});

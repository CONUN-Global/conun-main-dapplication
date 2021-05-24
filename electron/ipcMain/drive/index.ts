import { ipcMain, shell } from "electron";
import { server as webSocketServer } from "websocket";
import http from "http";

import db from "../../store/db";
import { countDownload, likeContent, createFile } from "../../drive";
import { mainWindow } from "../../";

import logger from "../../logger";

export const clients: any = {};

let wsServer: webSocketServer | null;

const PORT = 17401;

export function startWebSocket() {
  const server = http.createServer();

  server.listen(PORT);

  wsServer = new webSocketServer({
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
          logger("get-drive-path", error, "error");
        }
      }
      if (messageData?.type === "upload-file") {
        try {
          const data = await createFile(messageData?.fileHash?.path);

          logger(
            "create-file",
            `creating file with hash ${messageData?.fileHash?.path}`,
            "info"
          );

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

            logger(
              "create-file",
              `success: transaction id is ${data?.payload?.TxID}`,
              "info"
            );
          } else {
            connection.send(
              JSON.stringify({
                type: "upload-failure",
                data: data?.payload,
              })
            );
            logger("like-error", data, "error");
          }
        } catch (error) {
          connection.send(
            JSON.stringify({
              type: "upload-failure",
              data: String(error),
            })
          );
          logger("create-file", error, "error");
        }
      }

      if (messageData?.type === "like-content") {
        try {
          const data = await likeContent({
            contentId: messageData?.content_id,
            userId: messageData?.user_id,
            publicHash: messageData?.ccid,
          });

          logger(
            "like-file",
            `liking file with public hash ${messageData?.ccid}`,
            "info"
          );

          if (data?.success) {
            connection.send(
              JSON.stringify({
                type: "like-success",
                contentId: messageData?.content_id,
              })
            );

            logger(
              "like-file",
              `success: liked file with public hash ${messageData?.ccid}`,
              "info"
            );
          } else {
            connection.send(
              JSON.stringify({
                type: "like-failure",
                contentId: messageData?.content_id,
                data: data?.payload,
              })
            );
            logger("like-error", data, "error");
          }
        } catch (error) {
          connection.send(
            JSON.stringify({
              type: "like-failure",
              data: String(error),
            })
          );
          logger("like-error", error, "error");
        }
      }

      if (messageData?.type === "download-content") {
        try {
          const data = await countDownload({
            contentId: messageData?.content_id,
            userId: messageData?.user_id,
            publicHash: messageData?.ccid,
          });

          logger(
            "register-download",
            `registering download of file with public hash ${messageData?.ccid}`,
            "info"
          );

          if (data?.success) {
            connection.send(
              JSON.stringify({
                type: "download-success",
                contentHash: messageData?.hash,
                name: messageData?.name,
                data: messageData,
              })
            );

            logger(
              "register-download",
              `success: registered download of file with public hash ${messageData?.ccid}`,
              "info"
            );
          } else {
            connection.send(
              JSON.stringify({
                type: "download-failure",
                data: data?.payload,
              })
            );
            logger("download-success", data, "error");
          }
        } catch (error) {
          connection.send(
            JSON.stringify({
              type: "upload-failure",
              data: String(error),
            })
          );
          logger("download-success", error, "error");
        }
      }
    });
  });
}

ipcMain.handle("start-websocket", () => {
  if (!wsServer) {
    startWebSocket();
  }
});

ipcMain.handle("open-drive", async () => {
  const appData: any = await db.get("appData");
  if (appData?.drivePath) {
    shell.openPath(appData.drivePath);
  }
});

import { server as webSocketServer } from "websocket";
import http from "http";

import db from "../../store/db";
import { countDownload, likeContent, createFile } from "../../drive";
import { mainWindow } from "../../";
import { ipcMain, shell } from "electron";

export const clients: any = {};

const PORT = 17401;

const server = http.createServer();

server.listen(PORT);

export const wsServer = new webSocketServer({
  httpServer: server,
});

wsServer.on("request", async (request) => {
  const userID = "conun-drive";
  console.log(
    new Date() +
      " Recieved a new connection from origin " +
      request.origin +
      "."
  );

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
        console.log(`error`, error);
      }
    }
    if (messageData?.type === "upload-file") {
      try {
        const res = await createFile(messageData?.fileHash?.path);
        const data = await res.json();
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
      } catch (error) {
        console.log(`error`, error);
      }
    }

    if (messageData?.type === "like-content") {
      try {
        const res = await likeContent({
          contentId: messageData?.content_id,
          userId: messageData?.user_id,
          publicHash: messageData?.ccid,
        });
        await res.json();

        connection.send(
          JSON.stringify({
            type: "like-success",
            contentId: messageData?.content_id,
          })
        );
      } catch (error) {
        console.log(`error`, error);
      }
    }

    if (messageData?.type === "download-content") {
      try {
        const res = await countDownload({
          contentId: messageData?.content_id,
          userId: messageData?.user_id,
          publicHash: messageData?.ccid,
        });
        const data = await res.json();
        console.log(`data`, data);
        connection.send(
          JSON.stringify({
            type: "download-success",
            contentId: messageData?.content_id,
          })
        );
      } catch (error) {
        console.log(`error`, error);
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

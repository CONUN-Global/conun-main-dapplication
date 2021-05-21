import Web3 from "web3";
import fs from "fs";
import path from "path";
import qrcode from "qrcode";
import { dialog } from "electron";
import fetch from "electron-fetch";

import { ORG_NAME } from "../const";
import { getProfile } from "./auth-service";

const web3 = new Web3(process.env.WEB3URL);

export async function createWallet(args: {
  password: string;
  walletType: string;
}) {
  try {
    const currentUser = getProfile();

    const body = {
      name: currentUser.name,
      email: currentUser.email,
      orgName: ORG_NAME,
      password: args?.password,
      walletType: args?.walletType,
    };

    const res = await fetch(`${process.env.SERVER}/users/create`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();

    return data;
  } catch (error) {
    return {
      success: false,
      error: String(error),
    };
  }
}

export async function saveKeyStoreJson(keyStore: string) {
  const savePath = await dialog.showSaveDialog({
    title: "Select the File Path to save",
    defaultPath: path.join(__dirname, "./conun-key-store.json"),
    buttonLabel: "Save",
    filters: [
      {
        name: "JSON Files",
        extensions: ["json"],
      },
    ],
    properties: [],
  });

  try {
    if (savePath.filePath && !savePath.canceled) {
      fs.writeFile(savePath.filePath, keyStore, (err) => {
        if (err) {
          throw err;
        }
      });
      return { success: true };
    }
    return { success: false, canceled: savePath.canceled };
  } catch (error) {
    return { success: false, canceled: savePath.canceled };
  }
}

export async function createQrCode(args: object) {
  const conunAccountQrCode = await qrcode.toDataURL(JSON.stringify(args));

  return conunAccountQrCode;
}

export async function saveQrCode(qrCodeURI: string) {
  const savePath = await dialog.showSaveDialog({
    title: "Save QR Code",
    defaultPath: path.join(__dirname, "./conun-qr-code.png"),
    buttonLabel: "Save",
    filters: [
      {
        name: "Images",
        extensions: ["png"],
      },
    ],
    properties: [],
  });

  try {
    if (savePath.filePath && !savePath.canceled) {
      const base64Data = qrCodeURI.replace(/^data:image\/png;base64,/, "");
      fs.writeFileSync(savePath.filePath, Buffer.from(base64Data, "base64"));
      return { success: true };
    }
    return { success: false, canceled: savePath.canceled };
  } catch (error) {
    return { success: false, canceled: savePath.canceled };
  }
}

export async function checkTransaction(txHash: string) {
  const transaction = await web3.eth.getTransaction(txHash);

  if (
    (transaction?.transactionIndex || transaction?.transactionIndex === 0) &&
    transaction?.blockHash
  ) {
    const receipt = await web3.eth.getTransactionReceipt(txHash);

    return {
      success: true,
      data: receipt,
    };
  } else {
    return {
      success: false,
    };
  }
}

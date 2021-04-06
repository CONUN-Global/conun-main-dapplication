import Web3 from "web3";
import fs from "fs";
import path from "path";
import crypto from "crypto";
import qrcode from "qrcode";
import { dialog } from "electron";
import fetch from "electron-fetch";
import jimp from "jimp";
//@ts-expect-error
import QRReader from "qrcode-reader";

import envVariables from "../../env-variables.json";
import { API_URI, ORG_NAME } from "../const";
import { getProfile } from "./auth-service";

const web3 = new Web3(envVariables.web3Url);

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

    const res = await fetch(`${API_URI}/users/create`, {
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

export async function validateKeystoreFile({
  file,
  password,
}: {
  file: any;
  password: string;
}) {
  const { address, privateKey } = web3.eth.accounts.decrypt(file, password);
  return { success: true, address, privateKey };
}

export async function validateQrCode({
  qrCode,
  password,
}: {
  qrCode: any;
  password: string;
}) {
  const base64Data = qrCode.replace(/^data:image\/png;base64,/, "");
  const img = await jimp.read(Buffer.from(base64Data, "base64"));

  const qr = new QRReader();

  const value: any = await new Promise((resolve, reject) => {
    qr.callback = (err: any, v: any) =>
      err != null ? reject(err) : resolve(v);
    qr.decode(img.bitmap);
  });

  if (value?.result) {
    const decipher = crypto.createDecipher("aes-128-cbc", password);

    let plainText = decipher.update(value.result, "base64", "utf8");
    plainText += decipher.final("utf8");

    const { privateKey } = JSON.parse(plainText);
    const { address } = web3.eth.accounts.privateKeyToAccount(privateKey);

    return { success: true, address, privateKey };
  }
  return { success: false };
}

export async function checkTransaction(txHash: string) {
  const transaction = await web3.eth.getTransaction(txHash);

  if (transaction?.transactionIndex && transaction?.blockHash) {
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

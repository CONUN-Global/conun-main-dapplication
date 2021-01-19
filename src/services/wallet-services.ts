import Web3 from 'web3';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import qrcode from 'qrcode';
import { dialog } from 'electron';
import jimp from 'jimp';
import QRReader from 'qrcode-reader';

const web3 = new Web3('----');

export function createWallet(password: string) {
  const { privateKey, address } = web3.eth.accounts.create(password);
  const keyStore = web3.eth.accounts.encrypt(privateKey, password);
  const stringKeystore = JSON.stringify(keyStore);
  return { address, privateKey, keyStore: stringKeystore };
}

export async function saveKeyStoreJson(keyStore: string) {
  const savePath = await dialog.showSaveDialog({
    title: 'Select the File Path to save',
    defaultPath: path.join(__dirname, './conun-key-store.json'),
    buttonLabel: 'Save',
    filters: [
      {
        name: 'JSON Files',
        extensions: ['json'],
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

export async function createQrCode({
  password,
  privateKey,
}: {
  password: string;
  privateKey: string;
}) {
  const key = crypto.createCipher('aes-128-cbc', password);
  let encrypt = key.update(
    JSON.stringify({
      privateKey,
    }),
    'utf8',
    'base64'
  );
  encrypt += key.final('base64');
  const conunAccountQrCode = await qrcode.toDataURL(JSON.stringify(encrypt));

  return conunAccountQrCode;
}

export async function saveQrCode(qrCodeURI: string) {
  const savePath = await dialog.showSaveDialog({
    title: 'Save QR Code',
    defaultPath: path.join(__dirname, './conun-qr-code.png'),
    buttonLabel: 'Save',
    filters: [
      {
        name: 'Images',
        extensions: ['png'],
      },
    ],
    properties: [],
  });

  try {
    if (savePath.filePath && !savePath.canceled) {
      const base64Data = qrCodeURI.replace(/^data:image\/png;base64,/, '');
      fs.writeFileSync(savePath.filePath, Buffer.from(base64Data, 'base64'));
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
  const base64Data = qrCode.replace(/^data:image\/png;base64,/, '');
  const img = await jimp.read(Buffer.from(base64Data, 'base64'));

  const qr = new QRReader();

  const value: any = await new Promise((resolve, reject) => {
    qr.callback = (err: any, v: any) =>
      err != null ? reject(err) : resolve(v);
    qr.decode(img.bitmap);
  });

  if (value?.result) {
    const decipher = crypto.createDecipher('aes-128-cbc', password);

    let plainText = decipher.update(value.result, 'base64', 'utf8');
    plainText += decipher.final('utf8');

    const { privateKey } = JSON.parse(plainText);
    const { address } = web3.eth.accounts.privateKeyToAccount(privateKey);

    return { success: true, address, privateKey };
  }
  return { success: false };
}

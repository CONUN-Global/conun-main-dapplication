import Web3 from 'web3';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import qrcode from 'qrcode';
import { dialog } from 'electron';
import jimp from 'jimp';
import QRReader from 'qrcode-reader';
import { Transaction as Tx } from 'ethereumjs-tx';

import envVariables from '../../env-variables.json';

const web3 = new Web3(envVariables.web3Url);

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

export async function validatePrivateKey({
  privateKey,
}: {
  privateKey: string;
}) {
  return privateKey;
}

export async function getEthBalance(address: string) {
  const wei = await web3.eth.getBalance(address);
  return web3.utils.fromWei(wei, 'ether');
}

export async function getConunBalance(address: string) {
  const contract = new web3.eth.Contract(
    envVariables.abi,
    envVariables.contractAddress
  );

  const data = await contract.methods.balanceOf(address).call();

  const balance = await web3.utils.fromWei(data);

  return balance;
}

export async function estimateGas({
  from,
  to,
  token,
  amount,
}: {
  from: string;
  to: string;
  token: string;
  amount: string;
}) {
  const { contractAddress, abi } = envVariables;

  let gasLimit;

  const gasPrice = await web3.eth.getGasPrice();

  if (token === 'ETH') {
    gasLimit = await web3.eth.estimateGas({
      from,
      to: to || from,
    });
  } else if (to && amount) {
    const contract = new web3.eth.Contract(abi, contractAddress, {
      from,
    });

    const data = contract.methods
      .transfer(to, web3.utils.toWei(amount))
      .encodeABI();

    gasLimit = await web3.eth.estimateGas({
      from,
      to: contractAddress,
      data,
    });
  } else {
    gasLimit = await web3.eth.estimateGas({
      from,
    });
  }

  const gweiGasPrice = await web3.utils.fromWei(gasPrice, 'gwei');

  return {
    slow: {
      gasPrice: String(gweiGasPrice),
      gasLimit,
      total: (+gweiGasPrice * gasLimit) / 1000000000,
    },
    average: {
      gasPrice: String(2 * +gweiGasPrice),
      gasLimit,
      total: (+gweiGasPrice * 2 * gasLimit) / 1000000000,
    },
    fast: {
      gasPrice: String(3 * +gweiGasPrice),
      gasLimit,
      total: (+gweiGasPrice * 3 * gasLimit) / 1000000000,
    },
  };
}

export async function transferEth(args: {
  privateKey: any;
  from: string;
  to: string;
  amount: string;
  gasLimit: string;
  gasPrice: string;
}) {
  web3.eth.defaultAccount = args.from;
  let formattedPrivateKey = args.privateKey;

  if (formattedPrivateKey.includes('0x')) {
    formattedPrivateKey = formattedPrivateKey.slice(
      2,
      formattedPrivateKey.length
    );
  }

  formattedPrivateKey = await Buffer.from(formattedPrivateKey, 'hex');

  const txCount = await web3.eth.getTransactionCount(args.from);

  const txObject = {
    nonce: web3.utils.toHex(txCount),
    to: args.to,
    value: web3.utils.toHex(web3.utils.toWei(args.amount)),
    gasLimit: web3.utils.toHex(args.gasLimit),
    gasPrice: web3.utils.toHex(web3.utils.toWei(String(args.gasPrice), 'gwei')),
  };

  const tx = new Tx(txObject, { chain: 'ropsten' });

  tx.sign(formattedPrivateKey);

  const serializedTx = tx.serialize();
  const raw = `0x${serializedTx.toString('hex')}`;

  const sentTx = await web3.eth.sendSignedTransaction(raw);

  return sentTx;
}

export async function transferCon(args: {
  privateKey: any;
  from: string;
  to: string;
  amount: string;
  gasLimit: string;
  gasPrice: string;
}) {
  const { contractAddress, abi } = envVariables;
  web3.eth.defaultAccount = args.from;
  let formattedPrivateKey = args.privateKey;

  if (formattedPrivateKey.includes('0x')) {
    formattedPrivateKey = formattedPrivateKey.slice(
      2,
      formattedPrivateKey.length
    );
  }

  formattedPrivateKey = await Buffer.from(formattedPrivateKey, 'hex');

  const contract = new web3.eth.Contract(abi, contractAddress, {
    from: args.from,
  });

  const data = contract.methods
    .transfer(args.to, web3.utils.toWei(args.amount))
    .encodeABI();

  const txCount = await web3.eth.getTransactionCount(args.from);

  const txObject = {
    from: args.from,
    to: contractAddress,
    nonce: web3.utils.toHex(txCount),
    value: '0x0',
    gasLimit: web3.utils.toHex(args.gasLimit),
    gasPrice: web3.utils.toHex(web3.utils.toWei(String(args.gasPrice), 'gwei')),
    data,
  };

  const tx = new Tx(txObject, { chain: 'ropsten' });
  tx.sign(formattedPrivateKey);

  const serializedTx = tx.serialize();
  const raw = `0x${serializedTx.toString('hex')}`;

  const sentTx = await web3.eth.sendSignedTransaction(raw);

  return sentTx;
}

import { ipcMain } from "electron";
import signGenerator from "../../services/sign-generator";
import {
  getEthBalance,
  getConunBalance,
  estimateGas,
  transferEth,
  transferCon,
} from "../../services/wallet-services";

ipcMain.handle("get-eth-balance", async (_, args) => {
  try {
    const res = await getEthBalance(args.address);
    return res;
  } catch (error) {
    return {
      success: false,
    };
  }
});

ipcMain.handle("get-con-balance", async (_, args) => {
  try {
    const res = await getConunBalance(args.address);
    return res;
  } catch (error) {
    return {
      success: false,
    };
  }
});

ipcMain.handle("get-gas-estimate", async (_, args) => {
  try {
    const res = await estimateGas(args);
    return { ...res, success: true };
  } catch (error) {
    return {
      success: false,
      error,
    };
  }
});

ipcMain.handle("transfer", async (_, args) => {
  try {
    if (args.type === "ETH") {
      const res = await transferEth(args);
      return { ...res, success: true };
    }

    const res = await transferCon(args);
    return { ...res, success: true };
  } catch (error) {
    return {
      success: false,
      error,
    };
  }
});

ipcMain.handle("generate-signature", async (_, args) => {
  try {
    const res = await signGenerator(args);

    return res;
  } catch (error) {
    return {
      success: false,
      error,
    };
  }
});

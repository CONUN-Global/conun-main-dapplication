import { ipcMain } from "electron";

import signGenerator from "../../services/sign-generator";
import { checkTransaction } from "../../services/wallet-services";

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

ipcMain.handle("check-transaction", async (_, args) => {
  try {
    const data = await checkTransaction(args);

    return data;
  } catch (error) {
    return {
      success: false,
      error,
    };
  }
});

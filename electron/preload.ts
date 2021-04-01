import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("api", {
  createWallet: (args: { password: string; walletType: string }) =>
    ipcRenderer.invoke("create-wallet", args),
  logout: () => ipcRenderer.invoke("logout"),
  getProfile: () => ipcRenderer.invoke("get-profile"),
  getConBalance: (address: string) =>
    ipcRenderer.invoke("get-con-balance", { address }),
  getEthBalance: (address: string) =>
    ipcRenderer.invoke("get-eth-balance", { address }),
  getGasEstimate: ({ from, to, token, amount }: any) =>
    ipcRenderer.invoke("get-gas-estimate", {
      from,
      to,
      token,
      amount,
    }),
  generateApiPrivateKey: () => ipcRenderer.invoke("generate-api-private-key"),
  signGenerator: (values: any) =>
    ipcRenderer.invoke("generate-signature", values),
  openTransferWindow: (values: any) =>
    ipcRenderer.invoke("open-transfer-window", values),
  listenToTransferData: (fn: any) => {
    ipcRenderer.on("send-transfer-data", (e, ...args) => fn(...args));
  },
  closeTransferWindow: () => ipcRenderer.invoke("close-transfer-window"),
  requestBalanceRefetch: () => ipcRenderer.invoke("request-balance-refetch"),
  listenToRefetchRequest: (fn: any) => {
    ipcRenderer.on("refetch-balances", () => fn());
  },
});

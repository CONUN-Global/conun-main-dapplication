import { ipcMain } from "electron";
import db from "../../store/db";

const TRANSACTION_LIMIT = 5;

ipcMain.handle("get-recent-transactions", async () => {
  const transactions = await db.get("transactions");

  if (transactions) {
    return transactions;
  }

  await db.put({
    _id: "transactions",
    list: [],
  });

  return db.get("transactions");
});

ipcMain.handle("set-recent-transaction", async (_, args) => {
  const currentTransactions: { list: any[] } = await db.get("transactions");

  currentTransactions.list = [args, ...currentTransactions.list];

  if (currentTransactions.list.length > TRANSACTION_LIMIT) {
    currentTransactions.list.splice(TRANSACTION_LIMIT);
  }

  return db.put(currentTransactions);
});

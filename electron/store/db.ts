import { app } from "electron";
import PouchDB from "pouchdb";

const db = new PouchDB(`${app.getPath("appData")}/conun-db`);

async function initDb() {
  const newTransactions: any = {
    _id: "transactions",
    list: [],
  };
  const userDetails: any = {
    _id: "userDetails",
    pass: "",
  };
  await db.put(userDetails);
  await db.put(newTransactions);

  return true;
}

export async function prepareDb() {
  try {
    await db.get("transactions");
    await db.get("userDetails");

    return true;
  } catch {
    return initDb();
  }
}

export default db;

import { app } from "electron";
import PouchDB from "pouchdb";

const db = new PouchDB(`${app.getPath("appData")}/conun-db`);

export async function prepareDb() {
  try {
    await db.get("transactions");
  } catch {
    const newTransactions: any = {
      _id: "transactions",
      list: [],
    };

    await db.put(newTransactions);
  }

  try {
    await db.get("userDetails");
  } catch {
    const userDetails: any = {
      _id: "userDetails",
      pass: "",
      askForPassword: true,
    };
    await db.put(userDetails);
  }

  try {
    await db.get("appData");
  } catch {
    const appData: any = {
      _id: "appData",
      drivePath: "",
    };

    await db.put(appData);
  }
}

export default db;

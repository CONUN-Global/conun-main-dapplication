import PouchDB from "pouchdb";

const db = new PouchDB("conun-db");

export async function prepareDb() {
  try {
    const transactions = await db.get("transactions");
    return transactions;
  } catch {
    const newTransactions: any = {
      _id: "transactions",
      list: [],
    };

    return db.put(newTransactions);
  }
}

export default db;

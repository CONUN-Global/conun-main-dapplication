import { app } from "electron";
import isDev from "electron-is-dev";
import fetch from "electron-fetch";

import db from "../store/db";

import { LOG_SERVER_DEV, LOG_SERVER_PROD } from "../const";

const LOG_URL = isDev ? LOG_SERVER_DEV : LOG_SERVER_PROD;

async function logger(name: string, error: any) {
  let formattedError;
  if (typeof error === "object") {
    formattedError = JSON.stringify(error);
  } else {
    formattedError = String(error);
  }

  const userDetails: { walletAddress: string } = await db.get("userDetails");

  const body = {
    product_name: "Conun Manager",
    company_name: "CONUN Global",
    version: app.getVersion(),
    platform: process.platform,
    process_type: process.type,
    wallet_address: userDetails?.walletAddress,
    app_location: app.getPath("exe"),
    error_name: name,
    error_message: formattedError,
  };

  await fetch(LOG_URL, {
    method: "POST",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  });
}

export default logger;

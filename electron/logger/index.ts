import { app } from "electron";
import { createLogger, format, transports } from "winston";

import isDev from "electron-is-dev";
import fetch from "electron-fetch";

import db from "../store/db";

const { combine, splat, timestamp, printf } = format;

const localLogger = createLogger({
  format: combine(
    timestamp(),
    splat(),
    printf((info) => `${info.timestamp} ${info.level}: ${info.message}`)
  ),
  transports: [
    new transports.Console({
      level: "debug",
      silent: !isDev,
    }),
  ],
});

async function logger(name: string, message: any, type: "info" | "error") {
  let formattedMessage;
  if (typeof message === "object") {
    formattedMessage = JSON.stringify(message);
  } else {
    formattedMessage = String(message);
  }

  if (type === "info") {
    localLogger.info(formattedMessage);
  } else {
    localLogger.error(formattedMessage);
  }

  try {
    const userDetails: { walletAddress: string } = await db.get(
      "userDetailsDrive"
    );

    const body = {
      product_name: "Conun Drive",
      company_name: "CONUN Global",
      version: app.getVersion(),
      platform: process.platform,
      process_type: process.type,
      wallet_address: userDetails?.walletAddress,
      app_location: app.getPath("exe"),
      error_name: name,
      error_message: formattedMessage,
    };

    await fetch(process.env.LOG_SERVER, {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    // no one can save us now
  }
}

export default logger;

import fetch from "electron-fetch";
import isDev from "electron-is-dev";

import db from "../store/db";

import {
  DEV_SERVER,
  FcnTypes,
  ORG_NAME,
  PROD_SERVER,
  DRIVE_SMART_CONTRACT_DEV,
  DRIVE_SMART_CONTRACT_PROD,
} from "../const";

const DEFAULT_PRICE = "0";

const DEFAULT_STATUS = "public";

const SMART_CONTRACT = isDev
  ? DRIVE_SMART_CONTRACT_DEV
  : DRIVE_SMART_CONTRACT_PROD;

const SERVER_URL = isDev ? DEV_SERVER : PROD_SERVER;

export async function createFile(ipfshash: string) {
  const userDetails: any = await db.get("userDetails");
  const body = {
    fcn: FcnTypes.CreateFile,
    orgName: ORG_NAME,
    content: {
      author: userDetails?.walletAddress,
      ipfshash,
      price: DEFAULT_PRICE,
      status: DEFAULT_STATUS,
    },
  };

  const res = await fetch(`${SERVER_URL}/drive/mychannel/${SMART_CONTRACT}`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  });

  const data = await res.json();

  return data;
}

export async function likeContent({
  publicHash,
  userId,
  contentId,
}: {
  publicHash: string;
  userId: number;
  contentId: number;
}) {
  const userDetails: any = await db.get("userDetails");

  const body = {
    fcn: FcnTypes.LikeContent,
    orgName: ORG_NAME,
    action: {
      ccid: publicHash,
      wallet: userDetails?.walletAddress,
      user_id: String(userId),
      content_id: String(contentId),
    },
  };

  const res = await fetch(`${DEV_SERVER}/drive/mychannel/${SMART_CONTRACT}`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  });

  const data = await res.json();

  return data;
}

export async function countDownload({
  publicHash,
  userId,
  contentId,
}: {
  publicHash: string;
  userId: number;
  contentId: number;
}) {
  const userDetails: any = await db.get("userDetails");

  const body = {
    fcn: FcnTypes.CountDownloads,
    orgName: ORG_NAME,
    action: {
      ccid: publicHash,
      wallet: userDetails?.walletAddress,
      user_id: String(userId),
      content_id: String(contentId),
    },
  };

  const res = await fetch(`${SERVER_URL}/drive/mychannel/${SMART_CONTRACT}`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  });

  const data = await res.json();

  return data;
}

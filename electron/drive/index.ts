import fetch from "electron-fetch";

import db from "../store/db";

import { API_URI, FcnTypes, ORG_NAME } from "../const";

const DEFAULT_PRICE = "0";

const DEFAULT_STATUS = "public";

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

  const data = await fetch(`${API_URI}/drive/mychannel/ConunDrive`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  });

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

  const data = await fetch(`${API_URI}/drive/mychannel/ConunDrive`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  });

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
  const body = {
    fcn: FcnTypes.CountDownloads,
    orgName: ORG_NAME,
    action: {
      ccid: publicHash,
      wallet: "0xe4FD245bf3A78D414cFceec73d01b53959635935",
      user_id: String(userId),
      content_id: String(contentId),
    },
  };

  const data = await fetch(`${API_URI}/drive/mychannel/ConunDrive`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  });

  return data;
}

import jwtDecode from "jwt-decode";
import axios, { AxiosRequestConfig } from "axios";
import url from "url";
import keytar from "keytar";
import os from "os";

import { resetDb } from "../store/db";

const redirectUri = "http://localhost/callback";

const keytarService = "electron-openid-oauth";
const keytarAccount = os.userInfo().username;

let accessToken: string | null = null;
let profile: {
  given_name: string;
  family_name: string;
  nickname: string;
  name: string;
  email: string;
} | null = null;
let refreshToken: string | null = null;

function getAccessToken() {
  return accessToken;
}

function getProfile() {
  return profile;
}

function getAuthenticationURL() {
  return `https://${process.env.AUTH0_DOMAIN}/authorize?scope=openid profile email email_verified offline_access&response_type=code&client_id=${process.env.CLIENT_ID}&redirect_uri=${redirectUri}`;
}

async function logout() {
  await keytar.deletePassword(keytarService, keytarAccount);
  await resetDb();

  accessToken = null;
  profile = null;
  refreshToken = null;
}

function getLogOutUrl() {
  return `https://${process.env.AUTH0_DOMAIN}/v2/logout?federated`;
}

async function refreshTokens() {
  const newRefreshToken = await keytar.getPassword(
    keytarService,
    keytarAccount
  );

  if (newRefreshToken) {
    const refreshOptions: AxiosRequestConfig = {
      method: "POST",
      url: `https://${process.env.AUTH0_DOMAIN}/oauth/token`,
      headers: { "content-type": "application/json" },
      data: {
        grant_type: "refresh_token",
        client_id: process.env.CLIENT_ID,
        refresh_token: newRefreshToken,
      },
    };

    try {
      const response = await axios(refreshOptions);

      accessToken = response.data.access_token;
      profile = jwtDecode(response.data.id_token);
    } catch (error) {
      await logout();

      throw error;
    }
  } else {
    throw new Error("No available refresh token.");
  }
}

async function loadTokens(callbackURL: string) {
  const urlParts = url.parse(callbackURL, true);
  const { query } = urlParts;

  const exchangeOptions = {
    grant_type: "authorization_code",
    client_id: process.env.CLIENT_ID,
    code: query.code,
    redirect_uri: redirectUri,
  };

  const options: AxiosRequestConfig = {
    method: "POST",
    url: `https://${process.env.AUTH0_DOMAIN}/oauth/token`,
    headers: {
      "content-type": "application/json",
    },
    data: JSON.stringify(exchangeOptions),
  };

  try {
    const response = await axios(options);
    accessToken = response.data.access_token;
    profile = jwtDecode(response.data.id_token);
    refreshToken = response.data.refresh_token;

    if (refreshToken) {
      await keytar.setPassword(keytarService, keytarAccount, refreshToken);
    }
  } catch (error) {
    await logout();

    throw error;
  }
}

export {
  getAccessToken,
  getAuthenticationURL,
  getLogOutUrl,
  getProfile,
  loadTokens,
  logout,
  refreshTokens,
};

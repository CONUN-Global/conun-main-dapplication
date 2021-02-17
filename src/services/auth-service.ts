import jwtDecode from "jwt-decode";
import axios from "axios";
import url from "url";
import keytar from "keytar";
import os from "os";

import envVariables from "../../env-variables.json";

const { auth0Domain, clientId } = envVariables;

const redirectUri = "http://localhost/callback";

const keytarService = "electron-openid-oauth";
const keytarAccount = os.userInfo().username;

let accessToken: string | null = null;
let profile: string | null = null;
let refreshToken: string | null = null;

function getAccessToken() {
  return accessToken;
}

function getProfile() {
  return profile;
}

function getAuthenticationURL() {
  return `https://${auth0Domain}/authorize?scope=openid profile email email_verified offline_access&response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}`;
}

async function logout() {
  await keytar.deletePassword(keytarService, keytarAccount);
  accessToken = null;
  profile = null;
  refreshToken = null;
}

function getLogOutUrl() {
  return `https://${auth0Domain}/v2/logout?federated`;
}

async function refreshTokens() {
  const newRefreshToken = await keytar.getPassword(
    keytarService,
    keytarAccount
  );

  if (newRefreshToken) {
    const refreshOptions = {
      method: "POST",
      url: `https://${auth0Domain}/oauth/token`,
      headers: { "content-type": "application/json" },
      data: {
        grant_type: "refresh_token",
        client_id: clientId,
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
    client_id: clientId,
    code: query.code,
    redirect_uri: redirectUri,
  };

  const options = {
    method: "POST",
    url: `https://${auth0Domain}/oauth/token`,
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

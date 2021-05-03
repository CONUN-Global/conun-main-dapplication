import axios from "axios";

import getAuthHeader from "../helpers/getAuthHeader";

import { DEV_SERVER, PROD_SERVER } from "../const";

const SERVER_URL =
  process.env.NODE_ENV === "development" ? DEV_SERVER : PROD_SERVER;

const instance = axios.create({
  baseURL: SERVER_URL,
  timeout: 60000,
});

instance.interceptors.request.use(
  (config) => {
    const token = getAuthHeader();

    if (token) {
      config.headers["x-auth-token"] = token;
    } else {
      delete instance.defaults.headers["x-auth-token"];
    }
    return config;
  },

  (error) => Promise.reject(error)
);

export default instance;

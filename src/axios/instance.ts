import axios from "axios";

import getAuthHeader from "../helpers/getAuthHeader";

const instance = axios.create({
  baseURL: process.env.SERVER,
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

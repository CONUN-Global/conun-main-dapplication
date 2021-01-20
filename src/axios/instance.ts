import axios from 'axios';

import getAuthHeader from '../helpers/getAuthHeader';

import { serverUrl } from '../const';

const instance = axios.create({
  baseURL: serverUrl,
  timeout: 10000,
});

instance.interceptors.request.use(
  (config) => {
    const token = getAuthHeader();

    if (token) {
      config.headers['x-auth-token'] = token;
    } else {
      delete instance.defaults.headers['x-auth-token'];
    }
    return config;
  },

  (error) => Promise.reject(error)
);

export default instance;

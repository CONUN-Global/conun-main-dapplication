import { KEY_STORE_TOKEN } from '../const';

function getKeyStore() {
  return localStorage.getItem(KEY_STORE_TOKEN) ?? '';
}

export function setKeyStore(value: string) {
  return localStorage.setItem(KEY_STORE_TOKEN, value);
}

export default getKeyStore;

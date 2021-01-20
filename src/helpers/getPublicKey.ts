import { PUBLIC_KEY_TOKEN } from '../const';

function getPublicKey() {
  return localStorage.getItem(PUBLIC_KEY_TOKEN) ?? '';
}

export function setPubliKey(value: string) {
  return localStorage.setItem(PUBLIC_KEY_TOKEN, value);
}

export default getPublicKey;

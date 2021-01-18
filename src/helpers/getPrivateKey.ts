import { PRIVATE_KEY_TOKEN } from '../const';

function getPrivateKey() {
  return localStorage.getItem(PRIVATE_KEY_TOKEN) ?? '';
}

export default getPrivateKey;

import { WALLET_PRIVATE_KEY_TOKEN } from '../const';

function getWalletPrivateKey() {
  return localStorage.getItem(WALLET_PRIVATE_KEY_TOKEN) ?? '';
}

export function setWalletPrivateKey(value: string) {
  return localStorage.setItem(WALLET_PRIVATE_KEY_TOKEN, value);
}

export default getWalletPrivateKey;

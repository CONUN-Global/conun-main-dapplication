import { WALLET_ADDRESS_TOKEN } from '../const';

function getWalletAddress() {
  return localStorage.getItem(WALLET_ADDRESS_TOKEN) ?? '';
}

export function setWalletAddress(value: string) {
  return localStorage.setItem(WALLET_ADDRESS_TOKEN, value);
}

export default getWalletAddress;

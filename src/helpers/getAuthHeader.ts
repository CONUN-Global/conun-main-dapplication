import { AUTH_TOKEN } from '../const';

function getAuthHeader() {
  return localStorage.getItem(AUTH_TOKEN) ?? '';
}

export function setAuthHeader(token: string) {
  return localStorage.set(AUTH_TOKEN, token);
}

export default getAuthHeader;

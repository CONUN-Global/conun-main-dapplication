import { IDENTITY } from "../const";

function getIdentity() {
  if (localStorage.getItem(IDENTITY)) {
    return JSON.parse(localStorage.getItem(IDENTITY) || "");
  }

  return null;
}

export function setIndentity(token: any) {
  return localStorage.setItem(IDENTITY, JSON.stringify(token));
}

export default getIdentity;

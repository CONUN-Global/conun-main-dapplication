import { CONUN_PASS_TOKEN } from '../const';

function getConunPass() {
  return localStorage.getItem(CONUN_PASS_TOKEN) ?? '';
}

export function setConunPass(value: string) {
  return localStorage.setItem(CONUN_PASS_TOKEN, value);
}

export default getConunPass;

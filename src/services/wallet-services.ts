import Web3 from 'web3';

const web3 = new Web3('----');

export function createWallet(password: string) {
  const { privateKey, address } = web3.eth.accounts.create(password);
  const keyStore = web3.eth.accounts.encrypt(privateKey, password);
  const stringKeystore = JSON.stringify(keyStore);
  return { address, privateKey, keyStore: stringKeystore };
}

export function someFunction() {}

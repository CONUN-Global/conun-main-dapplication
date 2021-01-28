export const serverUrl = 'http://192.168.100.105:4000/api/v1';

export const AUTH_TOKEN = 'conun-auth-token';

export const PUBLIC_KEY_TOKEN = 'conun-public-key';

export const PRIVATE_KEY_TOKEN = 'conun-private-key';

export const WALLET_PRIVATE_KEY_TOKEN = 'conun-wallet-private-key';

export const WALLET_ADDRESS_TOKEN = 'conun-wallet-address';

export const API_URL_TOKEN = 'conun-api-url';

export const KEY_STORE_TOKEN = 'conun-key-store';

export const CONUN_PASS_TOKEN = 'conun-pass';

export const ORG_NAME = 'Org1';

export const FcnTypes = {
  Transfer: 'Transfer',
  Init: 'Init',
  Mint: 'Mint',
  Burn: 'Burn',
  GetDetails: 'GetDetails',
};

export const introVariants = {
  hidden: {
    opacity: 0,
    x: 400,
  },
  visible: {
    opacity: 1,
    x: 0,
  },
  exit: {
    x: -400,

    transition: { ease: 'easeInOut' },
  },
};

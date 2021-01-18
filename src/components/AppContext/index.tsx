import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

import removeAllTokens from '../../helpers/removeAllTokens';
import getWalletAddress, {
  setWalletAddress,
} from '../../helpers/getWalletAddress';
import getWalletPrivateKey, {
  setWalletPrivateKey,
} from '../../helpers/getWalletPrivateKey';
import getKeyStore, { setKeyStore } from '../../helpers/getKeyStore';

import { AUTH_TOKEN } from '../../const';

type WalletData = {
  address: string;
  keyStore: string;
  privateKey: string;
};

type State = {
  onLogin: (token: string, wallet: string) => void;
  onLogout: () => void;
  handleWalletCreation: (data: WalletData) => void;
  isAuthenticated: boolean;
  walletAddress: string;
  walletPrivateKey: string;
  keyStore: string;
};
type AppProviderProps = { children: ReactNode };

const AppContext = createContext<State | undefined>(undefined);

const getToken = () => {
  return localStorage.getItem(AUTH_TOKEN);
};

const saveToken = (token: string) => {
  return localStorage.setItem(AUTH_TOKEN, token);
};

const restoreToken = () => {
  return getToken();
};

const setAuthHeaderToken = (token: string) => {
  return localStorage.setItem(AUTH_TOKEN, token);
};

function AppProvider({ children }: AppProviderProps) {
  const [authToken, setAuthToken] = useState<string | null>(restoreToken());

  const handleLogout = useCallback(() => {
    removeAllTokens();
    setAuthToken(null);
    // cache.clear();
  }, []);

  const handleLogin: State['onLogin'] = useCallback((token, wallet) => {
    saveToken(token);
    setAuthToken(token);
    setAuthHeaderToken(token);
    setWalletAddress(wallet);
  }, []);

  const handleWalletCreation: State['handleWalletCreation'] = useCallback(
    ({ address, keyStore, privateKey }) => {
      setWalletAddress(address);
      setKeyStore(keyStore);
      setWalletPrivateKey(privateKey);
    },
    []
  );

  const value = useMemo(
    () => ({
      authToken,
      isAuthenticated: !!authToken,
      onLogin: handleLogin,
      onLogout: handleLogout,
      walletAddress: getWalletAddress(),
      walletPrivateKey: getWalletPrivateKey(),
      handleWalletCreation,
      keyStore: getKeyStore(),
    }),
    [authToken, handleLogin, handleLogout, handleWalletCreation]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

function useAppContext() {
  const context = useContext(AppContext);

  if (context === undefined) {
    throw new Error('useAppContext must be used within a AppProvider');
  }

  return context;
}

export { AppProvider, useAppContext };

import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
} from 'react';
import { useQuery } from 'react-query';

import useAppCurrentUser from '../../hooks/useAppCurrentUser';
import useCurrentUser from '../../hooks/useCurrentUser';

import removeAllTokens from '../../helpers/removeAllTokens';
import getWalletAddress, {
  setWalletAddress,
} from '../../helpers/getWalletAddress';
import getWalletPrivateKey, {
  setWalletPrivateKey,
} from '../../helpers/getWalletPrivateKey';
import getKeyStore, { setKeyStore } from '../../helpers/getKeyStore';

import { cache } from '../../react-query/config';
import { AUTH_TOKEN } from '../../const';
import instance from '../../axios/instance';

type WalletData = {
  address: string;
  keyStore?: string;
  privateKey: string;
};

type State = {
  onLogin: (token: string, wallet: string) => void;
  onLogout: () => void;
  handleWalletCreation: (data: WalletData) => void;
  isAuthenticated: boolean;
  isAlreadyUser: boolean;
  walletAddress: string;
  walletPrivateKey: string;
  keyStore: string;
};
type AppProviderProps = { children: ReactNode };

const AppContext = createContext<State | undefined>(undefined);

const saveToken = (token: string) => {
  return localStorage.setItem(AUTH_TOKEN, token);
};

const setAuthHeaderToken = (token: string) => {
  return localStorage.setItem(AUTH_TOKEN, token);
};

const checkUser = (currentUser: { email: string }) =>
  instance.get(`/users/check/?email=${currentUser?.email}`);

function AppProvider({ children }: AppProviderProps) {
  const { currentUser, refetch } = useAppCurrentUser();
  const { currentUser: googleUser, loading } = useCurrentUser();

  const { data } = useQuery('check-user', () => checkUser(googleUser), {
    enabled: !loading && !!googleUser.email,
  });

  const handleLogout = useCallback(() => {
    removeAllTokens();
    cache.clear();
  }, []);

  const handleLogin: State['onLogin'] = useCallback((token, wallet) => {
    saveToken(token);
    setAuthHeaderToken(token);
    setWalletAddress(wallet);
    refetch();
  }, []);

  const handleWalletCreation: State['handleWalletCreation'] = useCallback(
    ({ address, keyStore, privateKey }) => {
      setWalletAddress(address);
      setWalletPrivateKey(privateKey);
      if (keyStore) {
        setKeyStore(keyStore);
      }
    },
    []
  );

  const value = useMemo(
    () => ({
      isAuthenticated: !!currentUser,
      isAlreadyUser: !!data?.data?.message?.email,
      onLogin: handleLogin,
      onLogout: handleLogout,
      walletAddress: getWalletAddress(),
      walletPrivateKey: getWalletPrivateKey(),
      handleWalletCreation,
      keyStore: getKeyStore(),
    }),
    [
      handleLogin,
      handleLogout,
      handleWalletCreation,
      currentUser,
      data?.data?.message?.email,
    ]
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

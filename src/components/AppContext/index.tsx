import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
} from "react";

import useAppCurrentUser from "../../hooks/useAppCurrentUser";
import useUserCheck from "../../hooks/useUserCheck";

import removeAllTokens from "../../helpers/removeAllTokens";
import getWalletAddress, {
  setWalletAddress,
} from "../../helpers/getWalletAddress";
import getWalletPrivateKey, {
  setWalletPrivateKey,
} from "../../helpers/getWalletPrivateKey";
import getKeyStore, { setKeyStore } from "../../helpers/getKeyStore";

import { cache } from "../../react-query/config";
import { AUTH_TOKEN } from "../../const";

const { api } = window;

type WalletData = {
  address: string;
  keyStore?: string;
  privateKey: string;
};

type State = {
  onLogin: (token: string) => void;
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

function AppProvider({ children }: AppProviderProps) {
  const { currentUser, refetch } = useAppCurrentUser();

  const { isAlreadyUser } = useUserCheck();

  const handleLogout = useCallback(async () => {
    removeAllTokens();
    cache.clear();
    await api.logout();
  }, []);

  const handleLogin: State["onLogin"] = useCallback((token) => {
    saveToken(token);
    setAuthHeaderToken(token);
    refetch();
  }, []);

  const handleWalletCreation: State["handleWalletCreation"] = useCallback(
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
      isAlreadyUser,
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
      isAlreadyUser,
    ]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

function useAppContext() {
  const context = useContext(AppContext);

  if (context === undefined) {
    throw new Error("useAppContext must be used within a AppProvider");
  }

  return context;
}

export { AppProvider, useAppContext };

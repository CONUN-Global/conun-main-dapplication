import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
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
  isSettingsOpen: boolean;
  handleSettingsSidebar: (state: boolean) => void;
  isQrCodeOpen: boolean;
  handleQRSidebar: (state: boolean) => void;
  isTransactionsOpen: boolean;
  handleTransactionsBar: (state: boolean) => void;
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
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isQrCodeOpen, setIsQrCodeOpen] = useState(false);
  const [isTransactionsOpen, setIsTransactionsOpen] = useState(false);

  const { isAlreadyUser } = useUserCheck();

  const handleLogout = useCallback(async () => {
    removeAllTokens();
    cache.clear();
    await api.logout();
  }, []);

  const handleLogin: State["onLogin"] = useCallback(async (token) => {
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

  const handleSettingsSidebar = (state: boolean) => setIsSettingsOpen(state);

  const handleQRSidebar = (state: boolean) => setIsQrCodeOpen(state);

  const handleTransactionsBar = (state: boolean) =>
    setIsTransactionsOpen(state);

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
      isSettingsOpen,
      handleSettingsSidebar,
      isQrCodeOpen,
      handleQRSidebar,
      isTransactionsOpen,
      handleTransactionsBar,
    }),
    [
      handleLogin,
      handleLogout,
      handleWalletCreation,
      currentUser,
      isAlreadyUser,
      isSettingsOpen,
      handleSettingsSidebar,
      isQrCodeOpen,
      handleQRSidebar,
      isTransactionsOpen,
      handleTransactionsBar,
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

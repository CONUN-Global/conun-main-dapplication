import { AnimatePresence } from "framer-motion";
import React from "react";
import { Switch, useLocation } from "react-router-dom";
import { hot } from "react-hot-loader";

import { AppProvider } from "./components/AppContext";
import Layout from "./components/Layout";

import IntroRoute from "./components/Routes/IntroRoute";
import PrivateRoute from "./components/Routes/PrivateRoute";
import FileSharing from "./pages/FileSharing";
import Home from "./pages/Home";
import Introduction from "./pages/IntroSteps/Introduction";
import Terms from "./pages/IntroSteps/Terms";
import CreateSuccess from "./pages/IntroSteps/Wallet/CreateSuccess";
import CreateWallet from "./pages/IntroSteps/Wallet/CreateWallet";
import ImportWallet from "./pages/IntroSteps/Wallet/ImportWallet";
import KeyStoreImport from "./pages/IntroSteps/Wallet/KeyStoreImport";
import PrivateKeyImport from "./pages/IntroSteps/Wallet/PrivateKeyImport";
import QrCodeImport from "./pages/IntroSteps/Wallet/QrCodeImport";
import WalletOptions from "./pages/IntroSteps/Wallet/WalletOptions";
import Wallet from "./pages/Wallet";

function App() {
  const location = useLocation();
  return (
    <AppProvider>
      <Layout>
        <AnimatePresence exitBeforeEnter>
          <Switch location={location} key={location.key}>
            <IntroRoute path="/" exact>
              <Introduction />
            </IntroRoute>
            <IntroRoute path="/terms">
              <Terms />
            </IntroRoute>
            <IntroRoute path="/wallet-options">
              <WalletOptions />
            </IntroRoute>
            <IntroRoute path="/create-wallet">
              <CreateWallet />
            </IntroRoute>
            <IntroRoute path="/import-wallet">
              <ImportWallet />
            </IntroRoute>
            <IntroRoute path="/import-keystore">
              <KeyStoreImport />
            </IntroRoute>
            <IntroRoute path="/import-qr-code">
              <QrCodeImport />
            </IntroRoute>
            <IntroRoute path="/import-private-key">
              <PrivateKeyImport />
            </IntroRoute>
            <IntroRoute path="/create-wallet-success">
              <CreateSuccess />
            </IntroRoute>
            <PrivateRoute path="/home">
              <Home />
            </PrivateRoute>
            <PrivateRoute path="/wallet">
              <Wallet />
            </PrivateRoute>
            <PrivateRoute path="/file-sharing">
              <FileSharing />
            </PrivateRoute>
          </Switch>
        </AnimatePresence>
      </Layout>
    </AppProvider>
  );
}

export default hot(module)(App);

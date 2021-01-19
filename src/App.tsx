import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';

import { AppProvider } from './components/AppContext';

import Home from './pages/Home';
import Introduction from './pages/IntroSteps/Introduction';
import Terms from './pages/IntroSteps/Terms';
import CreateSuccess from './pages/IntroSteps/Wallet/CreateSuccess';
import CreateWallet from './pages/IntroSteps/Wallet/CreateWallet';
import ImportWallet from './pages/IntroSteps/Wallet/ImportWallet';
import KeyStoreImport from './pages/IntroSteps/Wallet/KeyStoreImport';
import PrivateKeyImport from './pages/IntroSteps/Wallet/PrivateKeyImport';
import QrCodeImport from './pages/IntroSteps/Wallet/QrCodeImport';
import WalletOptions from './pages/IntroSteps/Wallet/WalletOptions';

export default function App() {
  return (
    <AppProvider>
      <Router basename="/">
        <Switch>
          <Route path="/" exact component={Introduction} />
          <Route path="/terms" component={Terms} />
          <Route path="/wallet-options" component={WalletOptions} />
          <Route path="/create-wallet" component={CreateWallet} />
          <Route path="/import-wallet" component={ImportWallet} />
          <Route path="/import-keystore" component={KeyStoreImport} />
          <Route path="/import-qr-code" component={QrCodeImport} />
          <Route path="/import-private-key" component={PrivateKeyImport} />
          <Route path="/create-wallet-success" component={CreateSuccess} />
          <Route path="/home" component={Home} />
        </Switch>
      </Router>
    </AppProvider>
  );
}

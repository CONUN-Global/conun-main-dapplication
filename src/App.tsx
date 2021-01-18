import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';

import { AppProvider } from './components/AppContext';

import Home from './pages/Home';
import Introduction from './pages/IntroSteps/Introduction';
import Terms from './pages/IntroSteps/Terms';
import ConfirmBackup from './pages/IntroSteps/Wallet/ConfirmBackup';
import CreateSuccess from './pages/IntroSteps/Wallet/CreateSuccess';
import CreateWallet from './pages/IntroSteps/Wallet/CreateWallet';
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
          <Route path="/create-wallet-success" component={CreateSuccess} />
          <Route path="/wallet-confirm-backup" component={ConfirmBackup} />
          <Route path="/home" component={Home} />
        </Switch>
      </Router>
    </AppProvider>
  );
}

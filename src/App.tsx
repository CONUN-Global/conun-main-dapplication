import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './pages/Home';
import Signup from './pages/Signup';

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Signup} />
      </Switch>
    </Router>
  );
}

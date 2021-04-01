import React from "react";
import { Switch, useLocation } from "react-router-dom";

import IntroRoute from "./Routes/IntroRoute";
import PrivateRoute from "./Routes/PrivateRoute";
import HomeWrapper from "./pages/Home/HomeWrapper";
import Transfer from "./pages/Transfer";
import IntroSteps from "./pages/IntroSteps";

import { AppProvider } from "./components/AppContext";

function App() {
  return (
    <AppProvider>
      <Switch>
        <IntroRoute exact path="/">
          <IntroSteps />
        </IntroRoute>
        <PrivateRoute path="/home">
          <HomeWrapper />
        </PrivateRoute>
        <PrivateRoute path="/transfer">
          <Transfer />
        </PrivateRoute>
      </Switch>
    </AppProvider>
  );
}

export default App;

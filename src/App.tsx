import React from "react";
import { Route, Switch } from "react-router-dom";

import IntroRoute from "./Routes/IntroRoute";
import PrivateRoute from "./Routes/PrivateRoute";
import HomeWrapper from "./pages/Home/HomeWrapper";
import Transfer from "./pages/Transfer";
import IntroSteps from "./pages/IntroSteps";
import Success from "./pages/Success";

import { AppProvider } from "./components/AppContext";

function App() {
  return (
    <AppProvider>
      <Switch>
        <IntroRoute exact path="/">
          <IntroSteps />
        </IntroRoute>
        <Route path="/success">
          <Success />
        </Route>
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

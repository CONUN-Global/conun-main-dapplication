import React, { lazy, Suspense } from "react";
import { Route, Switch } from "react-router-dom";

import { AppProvider } from "./components/AppContext";
import Spinner from "./components/Spinner";

const IntroRoute = lazy(() => import("./Routes/IntroRoute"));
const PrivateRoute = lazy(() => import("./Routes/PrivateRoute"));
const HomeWrapper = lazy(() => import("./pages/Home/HomeWrapper"));
const Transfer = lazy(() => import("./pages/Transfer"));
const IntroSteps = lazy(() => import("./pages/IntroSteps"));
const Success = lazy(() => import("./pages/Success"));

function App() {
  return (
    <AppProvider>
      <Suspense fallback={<Spinner />}>
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
      </Suspense>
    </AppProvider>
  );
}

export default App;

import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./pages/home/home";
import Login from "./pages/login/login";
import Callback from "./pages/callback/callback";

const Main = () => (
  <main>
    <Switch>
      <Route exact path="/" component={Login} />
      <Route exact path="/callback" component={Callback} />
      <Route exact path="/home" component={Home} />
    </Switch>
  </main>
);

export default Main;

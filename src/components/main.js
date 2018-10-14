import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./pages/home/home";
import Login from "./pages/login/login";
import Callback from "./pages/callback/callback";
import Playlist from "./pages/playlist/playlist";

const Main = () => (
  <main>
    <Switch>
      <Route exact path="/" component={Login} />
      <Route exact path="/callback" component={Callback} />
      <Route exact path="/home" component={Home} />
      <Route exact path="/playlist/:id" component={Playlist} />
    </Switch>
  </main>
);

export default Main;

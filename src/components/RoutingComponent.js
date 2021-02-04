import React from "react";
import { Switch, Route } from "react-router-dom";

import GamePage from "pages/GamePage";
import TileMapEditorPage from "pages/TileMapEditorPage";

export default () => {
  return (
    <Switch>
      <Route component={GamePage} path="/" exact />
      <Route component={TileMapEditorPage} path="/editor" exact />
    </Switch>
  );
};

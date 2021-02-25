import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { PersistGate } from "redux-persist/integration/react";
import Phaser from "phaser";
import styled from "styled-components";

import { SetConsoleVisibility } from 'state/actions';
import { getUiConsoleVisibility } from "state/selectors";
import { persistor } from "state/store";
import Scene1 from "./scenes/Scene1";
import ConsoleDialog from "components/ConsoleDialog";

const App = styled.div`
  width: 800px;
  height: 600px;
  background-color: blue;
`;

const config = {
  type: Phaser.CANVAS,
  width: 800,
  height: 600,
  backgroundColor: "#53dbf7",
  pixelArt: true,
  parent: "main",
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      debug: true
    }
},
  scene: [ Scene1 ]
};

const GameContext = React.createContext("game");
const game = new Phaser.Game(config);

export default() => {
  const dispatch = useDispatch();
  const isConsoleDialogVisible = useSelector(getUiConsoleVisibility);

  return (
    <App id="main">
      <GameContext.Provider value={game}>
        <PersistGate loading={null} persistor={persistor}>
          <ConsoleDialog show={isConsoleDialogVisible} onClose={() => dispatch(SetConsoleVisibility(false))}/>
        </PersistGate>
      </GameContext.Provider>
    </App>
  );
}
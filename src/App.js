import React from "react";
import styled from "styled-components";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import Map from "components/MapComponent";  
import Player from "components/PlayerComponent";  
import Console from "components/ConsoleComponent";
import TileMapEditorPage from "pages/TileMapEditorPage";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#00bcb7"
    },
    secondary: {
      main: "#333333",
    },
    text: {
      primary: "#333333"
    }
  },
  overrides: {
    MuiButton: {
      containedPrimary: {
        color: '#e0ffc8',
      },
    },
  }
});

const GameArea = styled.div`
  width: calc(var(--pixel-size) * 350px);
  height: calc(var(--pixel-size) * 300px);
  overflow: hidden;
  background: #61ddf7;
  position: relative;
`;

export default() => {
  return (
    <ThemeProvider theme={theme}>
        <GameArea>
          <Map>
            <Console x={96} y={96}/>
            <Player />
          </Map>
        </GameArea>
        {/* <TileMapEditorPage/> */}
    </ThemeProvider>
  );
}
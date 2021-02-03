import React from "react";
import styled from "styled-components";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import Map from "components/MapComponent";  
import Player from "components/PlayerComponent";  

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

const Camera = styled.div`
  width: calc(var(--pixel-size) * 256px);
  height: calc(var(--pixel-size) * 200px);
  overflow: hidden;
  background: #61ddf7;
  position: relative;
`;

export default() => {
  return (
    <ThemeProvider theme={theme}>
        <Camera>
          <Map>
            <Player />
          </Map>
        </Camera>
    </ThemeProvider>
  );
}
import React from "react";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter } from "react-router-dom";

import Routing from "./components/RoutingComponent";

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


export default() => {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routing />
      </BrowserRouter>
    </ThemeProvider>
  );
}
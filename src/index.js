import ReactDOM from "react-dom";

import "./index.css";
import App from "./App";

// Start the mocking conditionally.
if (process.env.REACT_APP_USE_API_MOCK === "true") {
  const { worker } = require('./mocks/browser');
  worker.start();
}

ReactDOM.render(
  <App />,
  document.getElementById("root")
);
import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { WalletProvider } from "./providers/WalletContext";
import * as serviceWorker from "./serviceWorker";
import "./styles/index.css";

ReactDOM.render(
  <WalletProvider>
    <App />
  </WalletProvider>,
  document.getElementById("root")
);

serviceWorker.unregister();

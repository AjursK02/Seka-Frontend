import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import LenisProvider from "./components/common/LenisProvider";

import "./index.css";
import "./styles/theme.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <LenisProvider>
      <App />
    </LenisProvider>
  </React.StrictMode>
);

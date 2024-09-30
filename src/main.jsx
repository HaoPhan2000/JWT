import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { InfoProvider } from "./context/infoContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <InfoProvider>
  <App />
  </InfoProvider>
);

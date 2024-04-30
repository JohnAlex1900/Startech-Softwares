import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

const root = document.getElementById("root");

const rootElement = (
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

if (root) {
  createRoot(root).render(rootElement);
} else {
  console.error("Failed to find root element with id 'root'");
}

serviceWorker.unregister();

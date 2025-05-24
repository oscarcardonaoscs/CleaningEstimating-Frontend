import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "leaflet/dist/leaflet.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { HelmetProvider } from "react-helmet-async"; // Importar HelmetProvider

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <HelmetProvider>
      {" "}
      {/* Añadir HelmetProvider aquí */}
      <App />
    </HelmetProvider>
  </React.StrictMode>
);

reportWebVitals();

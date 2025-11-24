import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

/* Boxicons CDN (used in original) - you can also add this to public/index.html */
const boxicons = document.createElement("link");
boxicons.rel = "stylesheet";
boxicons.href =
  "https://cdn.jsdelivr.net/npm/boxicons@2.0.5/css/boxicons.min.css";
document.head.appendChild(boxicons);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);

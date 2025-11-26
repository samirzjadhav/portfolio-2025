import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import GitHub from "./pages/Github.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";

/* Boxicons CDN (used in original) - you can also add this to public/index.html */
const boxicons = document.createElement("link");
boxicons.rel = "stylesheet";
boxicons.href =
  "https://cdn.jsdelivr.net/npm/boxicons@2.0.5/css/boxicons.min.css";
document.head.appendChild(boxicons);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/github" element={<GitHub />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);

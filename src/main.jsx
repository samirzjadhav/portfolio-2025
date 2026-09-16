import { StrictMode, lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { MotionConfig } from "framer-motion";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import Loader from "./components/Loader.jsx";

const GitHub = lazy(() => import("./pages/Github.jsx"));
const ResumePage = lazy(() => import("./pages/Resume.jsx"));

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <MotionConfig reducedMotion="user">
      <BrowserRouter>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/github" element={<GitHub />} />
            <Route path="/resume" element={<ResumePage />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </MotionConfig>
  </StrictMode>
);

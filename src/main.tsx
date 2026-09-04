import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { MotionConfig } from "framer-motion";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { AnimatedBackground } from "./components/background";
import CustomCursor from "./components/CustomCursor";
import { RoutedApp } from "./routes/AnimatedRoutes";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found");
}

createRoot(rootElement).render(
  <StrictMode>
    <MotionConfig reducedMotion="user">
      <BrowserRouter>
        <AnimatedBackground intensity="subtle" />
        <CustomCursor />
        <div className="relative z-[1]">
          <RoutedApp />
        </div>
      </BrowserRouter>
    </MotionConfig>
  </StrictMode>
);

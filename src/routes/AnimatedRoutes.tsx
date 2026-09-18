import { lazy, Suspense, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { Routes, Route, useLocation } from "react-router-dom";
import App from "../App";
import Loader from "../components/Loader";
import VisitorCounter from "../components/VisitorCounter";
import { PageTransition, useNavigationDirection } from "../motion";

const GitHub = lazy(() => import("../pages/Github"));
const ResumePage = lazy(() => import("../pages/Resume"));
const Projects = lazy(() => import("../pages/Projects"));
const ProjectDetailPage = lazy(() => import("../pages/ProjectDetail"));

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}

export default function AnimatedRoutes() {
  const location = useLocation();
  const direction = useNavigationDirection();

  return (
    <>
      <VisitorCounter />
      <ScrollToTop />
      <AnimatePresence initial={false} mode="sync" custom={direction}>
      <PageTransition
        key={location.pathname}
        direction={direction}
        className="min-h-screen"
      >
        <Suspense fallback={<Loader />}>
          <Routes location={location}>
            <Route path="/" element={<App />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:slug" element={<ProjectDetailPage />} />
            <Route path="/github" element={<GitHub />} />
            <Route path="/resume" element={<ResumePage />} />
          </Routes>
        </Suspense>
      </PageTransition>
    </AnimatePresence>
    </>
  );
}

export function RoutedApp() {
  return <AnimatedRoutes />;
}

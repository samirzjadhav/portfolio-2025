import { useCallback, useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import FeaturedProject from "./components/FeaturedProject";
import ProjectsGrid from "./components/ProjectsGrid";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import SkipToContent from "./components/SkipToContent";
import { projects } from "./data";
import VisitorCounter from "./components/VisitorCounter";
import { PAGE_META } from "./config/site";
import { usePageMeta } from "./hooks/usePageMeta";
import { useScrollSpy } from "./hooks/useScrollSpy";
import type { Project } from "./types";

export default function App() {
  usePageMeta(PAGE_META.home);
  const activeSection = useScrollSpy();
  const [activeProject, setActiveProject] = useState<Project>(projects[0]);
  const handleProjectSelect = useCallback((project: Project) => {
    setActiveProject(project);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#07030b] via-[#0f0916] to-[#05020a] text-white">
      <SkipToContent />
      <Navbar activeSection={activeSection} />
      <VisitorCounter />
      <main id="main-content" tabIndex={-1} className="pt-[70px]">
        <Hero />
        <div className="max-w-6xl mx-auto px-6">
          <About />
          <Skills />
          <FeaturedProject project={activeProject} />
          <ProjectsGrid onSelect={handleProjectSelect} />
          <Contact />
        </div>
      </main>
      <Footer />
    </div>
  );
}

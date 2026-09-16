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
import GitHubStateCard from "./components/GitHubStateCard";
import VisitorCounter from "./components/VisitorCounter";
import { PAGE_META } from "./config/site";
import { usePageMeta } from "./hooks/usePageMeta";
import { useProjects } from "./hooks/useProjects";
import { useScrollSpy } from "./hooks/useScrollSpy";
import type { Project } from "./types";

export default function App() {
  usePageMeta(PAGE_META.home);
  const activeSection = useScrollSpy();
  const { projects, isLoading, isError, isEmpty, error, retry } = useProjects();
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(
    null
  );

  const activeProject =
    projects.find((project) => project.id === selectedProjectId) ??
    projects[0] ??
    null;

  const handleProjectSelect = useCallback((project: Project) => {
    setSelectedProjectId(project.id);
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

          {isLoading && (
            <GitHubStateCard
              title="Loading projects"
              message="Fetching portfolio projects from the API..."
            />
          )}

          {isError && (
            <GitHubStateCard
              title="Unable to load projects"
              message={error ?? "Something went wrong while loading projects."}
              actionLabel="Try again"
              onAction={retry}
              role="alert"
              ariaLive="assertive"
            />
          )}

          {!isLoading && !isError && isEmpty && (
            <GitHubStateCard
              title="No projects found"
              message="The projects API did not return any portfolio items."
              actionLabel="Refresh"
              onAction={retry}
            />
          )}

          {!isLoading && !isError && activeProject && projects.length > 0 && (
            <>
              <FeaturedProject project={activeProject} />
              <ProjectsGrid
                projects={projects}
                onSelect={handleProjectSelect}
              />
            </>
          )}

          <Contact />
        </div>
      </main>
      <Footer />
    </div>
  );
}

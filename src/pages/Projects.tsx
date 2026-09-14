import FeaturedProject from "../components/FeaturedProject";
import Footer from "../components/Footer";
import GitHubStateCard from "../components/GitHubStateCard";
import Navbar from "../components/Navbar";
import ProjectsGrid from "../components/ProjectsGrid";
import SkipToContent from "../components/SkipToContent";
import VisitorCounter from "../components/VisitorCounter";
import { PAGE_META } from "../config/site";
import { usePageMeta } from "../hooks/usePageMeta";
import { useProjects } from "../hooks/useProjects";

export default function Projects() {
  usePageMeta(PAGE_META.projects);
  const { projects, isLoading, isError, isEmpty, error, retry } = useProjects();
  const featuredProject = projects[0] ?? null;

  return (
    <div className="min-h-screen text-white">
      <SkipToContent />
      <Navbar />
      <VisitorCounter />

      <main id="main-content" tabIndex={-1} className="pt-[84px] sm:pt-[90px]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-12">
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

          {!isLoading && !isError && featuredProject && projects.length > 0 && (
            <>
              <FeaturedProject project={featuredProject} />
              <ProjectsGrid projects={projects} />
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

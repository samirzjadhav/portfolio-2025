import FeaturedProject from "../components/FeaturedProject";
import Footer from "../components/Footer";
import GitHubStateCard from "../components/GitHubStateCard";
import Navbar from "../components/Navbar";
import ProjectsGrid from "../components/ProjectsGrid";
import SkipToContent from "../components/SkipToContent";
import { PAGE_META } from "../config/site";
import { usePageMeta } from "../hooks/usePageMeta";
import { useProjects } from "../hooks/useProjects";

export default function Projects() {
  usePageMeta(PAGE_META.projects);
  const { projects, isEmpty, retry } = useProjects();
  const featuredProject = projects[0] ?? null;

  return (
    <div className="min-h-screen text-white">
      <SkipToContent />
      <Navbar />

      <main id="main-content" tabIndex={-1} className="pt-[84px] sm:pt-[90px]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-12">
          {isEmpty || !featuredProject ? (
            <GitHubStateCard
              title="No projects found"
              message="Portfolio projects are not configured yet."
              actionLabel="Refresh"
              onAction={retry}
            />
          ) : (
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

import { Link, useParams } from "react-router-dom";
import Footer from "../components/Footer";
import GitHubStateCard from "../components/GitHubStateCard";
import Navbar from "../components/Navbar";
import { ProjectDetailContent } from "../components/project-detail";
import SkipToContent from "../components/SkipToContent";
import VisitorCounter from "../components/VisitorCounter";
import { usePageMeta } from "../hooks/usePageMeta";
import { useProject } from "../hooks/useProject";
import { getProjectPageMeta } from "../utils/projectMeta";

export default function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { project, isLoading, isError, isNotFound, error, retry } =
    useProject(slug);

  usePageMeta(
    project
      ? getProjectPageMeta(project)
      : {
          title: isNotFound
            ? "Project not found — Samir Jadhav"
            : "Project — Samir Jadhav",
          description: "Project case study on Samir Jadhav's portfolio.",
          path: slug ? `/projects/${slug}` : "/projects",
        }
  );

  return (
    <div className="min-h-screen text-white">
      <SkipToContent />
      <Navbar />
      <VisitorCounter />

      <main id="main-content" tabIndex={-1} className="pt-[84px] sm:pt-[90px]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-16">
          {isLoading && (
            <GitHubStateCard
              title="Loading project"
              message="Fetching project details..."
            />
          )}

          {isError && !isLoading && (
            <div className="text-center">
              <GitHubStateCard
                title={isNotFound ? "Project not found" : "Unable to load project"}
                message={
                  error ?? "Something went wrong while loading this project."
                }
                actionLabel={isNotFound ? undefined : "Try again"}
                onAction={isNotFound ? undefined : retry}
                role="alert"
                ariaLive="assertive"
              />
              {isNotFound ? (
                <Link
                  to="/projects"
                  className="btn-accent mt-6 px-6 py-3 rounded-lg inline-block"
                >
                  Back to projects
                </Link>
              ) : null}
            </div>
          )}

          {project && !isLoading && !isError && (
            <ProjectDetailContent project={project} />
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

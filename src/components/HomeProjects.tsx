import FeaturedProject from "./FeaturedProject";
import GitHubStateCard from "./GitHubStateCard";
import ProjectsGrid from "./ProjectsGrid";
import { useProjects } from "../hooks/useProjects";

export default function HomeProjects() {
  const { projects, isLoading, isError, isEmpty, error, retry } = useProjects();
  const featuredProject = projects[0] ?? null;

  if (isLoading) {
    return (
      <GitHubStateCard
        title="Loading projects"
        message="Fetching portfolio projects from the API..."
      />
    );
  }

  if (isError) {
    return (
      <GitHubStateCard
        title="Unable to load projects"
        message={error ?? "Something went wrong while loading projects."}
        actionLabel="Try again"
        onAction={retry}
        role="alert"
        ariaLive="assertive"
      />
    );
  }

  if (isEmpty || !featuredProject) {
    return (
      <GitHubStateCard
        title="No projects found"
        message="The projects API did not return any portfolio items."
        actionLabel="Refresh"
        onAction={retry}
      />
    );
  }

  return (
    <>
      <FeaturedProject project={featuredProject} />
      <ProjectsGrid projects={projects} />
    </>
  );
}

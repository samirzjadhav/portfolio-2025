import FeaturedProject from "./FeaturedProject";
import GitHubStateCard from "./GitHubStateCard";
import ProjectsGrid from "./ProjectsGrid";
import { useProjects } from "../hooks/useProjects";

export default function HomeProjects() {
  const { projects, isEmpty, retry } = useProjects();
  const featuredProject = projects[0] ?? null;

  if (isEmpty || !featuredProject) {
    return (
      <GitHubStateCard
        title="No projects found"
        message="Portfolio projects are not configured yet."
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

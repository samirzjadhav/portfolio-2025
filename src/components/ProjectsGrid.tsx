import { memo } from "react";
import type { Project } from "../types";
import { SectionIntro, StaggerContainer, useMotionVariants } from "../motion";
import ProjectCard from "./ProjectCard";

interface ProjectsGridProps {
  projects: Project[];
}

function ProjectsGrid({ projects }: ProjectsGridProps) {
  const motionVariants = useMotionVariants();

  return (
    <section id="portfolio" className="section-block section-block--lg">
      <SectionIntro
        title="All Projects"
        subtitle="Open a project case study for the full breakdown, or jump straight to the live demo."
      />

      <StaggerContainer
        className="section-content grid md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-7 items-stretch"
        viewport={motionVariants.gridViewport}
        staggerAmount={0.1}
        delayChildren={0.08}
        variants={motionVariants.scrollStagger(0.1, 0.08)}
      >
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </StaggerContainer>
    </section>
  );
}

export default memo(ProjectsGrid);

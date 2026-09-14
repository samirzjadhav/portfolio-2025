import { motion } from "framer-motion";
import { useState } from "react";
import type { Project } from "../../types";
import { useProjectDetailMotion } from "../../hooks/useProjectDetailMotion";
import { StaggerContainer } from "../../motion";
import { getProjectCaseStudy } from "../../utils/projectCaseStudy";
import { getProjectGalleryImages } from "../../utils/projectGallery";
import { textMatchesTag } from "../../utils/projectTechUsage";
import MagneticButton from "../MagneticButton";
import ProjectDetailHero from "./ProjectDetailHero";
import ProjectDetailSection from "./ProjectDetailSection";
import ProjectImageGallery from "./ProjectImageGallery";
import ProjectTechStack from "./ProjectTechStack";

interface ProjectDetailContentProps {
  project: Project;
}

function CaseStudyList({
  items,
  activeTag,
}: {
  items: string[];
  activeTag?: string | null;
}) {
  const detailMotion = useProjectDetailMotion();

  return (
    <StaggerContainer
      className="project-detail-list-wrap"
      viewport={detailMotion.listViewport}
      variants={detailMotion.listStagger}
    >
      <ul className="project-detail-list">
        {items.map((entry) => {
          const isMatch = activeTag ? textMatchesTag(entry, activeTag) : false;
          const isDimmed = Boolean(activeTag && !isMatch);

          return (
            <motion.li
              key={entry}
              variants={detailMotion.listItem}
              className={`project-detail-list-item ${
                isMatch ? "is-tech-highlight" : ""
              } ${isDimmed ? "is-tech-dimmed" : ""}`.trim()}
              aria-current={isMatch ? "true" : undefined}
            >
              <span className="project-detail-bullet" aria-hidden="true" />
              {entry}
            </motion.li>
          );
        })}
      </ul>
    </StaggerContainer>
  );
}

export default function ProjectDetailContent({
  project,
}: ProjectDetailContentProps) {
  const detailMotion = useProjectDetailMotion();
  const [activeTechTag, setActiveTechTag] = useState<string | null>(null);
  const caseStudy = getProjectCaseStudy(project);
  const galleryImages = getProjectGalleryImages(project);

  return (
    <article className="project-detail-page">
      <ProjectDetailHero project={project} />

      <div className="project-detail-sections">
        <ProjectDetailSection id="what-built" title="What I built">
          <p className="project-detail-lead">{caseStudy.whatBuilt.lead}</p>
          <p className="project-detail-prose">{caseStudy.whatBuilt.body}</p>
        </ProjectDetailSection>

        <ProjectDetailSection id="why-built" title="Why I built it">
          <p className="project-detail-prose">{caseStudy.whyBuilt}</p>
        </ProjectDetailSection>

        <ProjectDetailSection id="how-built" title="How I built it">
          <CaseStudyList
            items={caseStudy.howBuilt}
            activeTag={activeTechTag}
          />
        </ProjectDetailSection>

        <ProjectDetailSection id="tech-stack" title="Technologies">
          <ProjectTechStack
            project={project}
            approachNote={caseStudy.technicalDecisions.approachNote}
            activeTag={activeTechTag}
            onActiveTagChange={setActiveTechTag}
          />
        </ProjectDetailSection>

        <ProjectDetailSection id="screenshots" title="Screenshots">
          <ProjectImageGallery
            images={galleryImages}
            projectTitle={project.title}
          />
        </ProjectDetailSection>

        <ProjectDetailSection id="challenges" title="Challenges">
          <CaseStudyList
            items={caseStudy.challenges}
            activeTag={activeTechTag}
          />
        </ProjectDetailSection>

        <ProjectDetailSection id="outcome" title="Result or outcome">
          <p className="project-detail-prose">{caseStudy.outcome}</p>
        </ProjectDetailSection>

        <ProjectDetailSection
          id="links"
          title="Links"
          className="project-detail-links-section"
        >
          <StaggerContainer
            className="project-detail-links"
            viewport={detailMotion.listViewport}
            variants={detailMotion.ctaStagger}
          >
            <motion.div variants={detailMotion.ctaCard}>
              <MagneticButton
                as="a"
                href={project.code}
                target="_blank"
                rel="noopener noreferrer"
                className="glass project-detail-link-card"
              >
                <i className="bx bxl-github text-2xl text-accent" aria-hidden="true" />
                <span>
                  <span className="project-detail-link-label">GitHub</span>
                  <span className="project-detail-link-hint">View source code</span>
                </span>
              </MagneticButton>
            </motion.div>
            <motion.div variants={detailMotion.ctaCard}>
              <MagneticButton
                as="a"
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="glass project-detail-link-card"
              >
                <i
                  className="bx bx-link-external text-2xl text-accent"
                  aria-hidden="true"
                />
                <span>
                  <span className="project-detail-link-label">Live demo</span>
                  <span className="project-detail-link-hint">Open deployed app</span>
                </span>
              </MagneticButton>
            </motion.div>
          </StaggerContainer>
        </ProjectDetailSection>
      </div>
    </article>
  );
}

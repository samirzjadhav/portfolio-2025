import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { useProjectDetailMotion } from "../../hooks/useProjectDetailMotion";
import { Reveal, StaggerContainer } from "../../motion";

interface ProjectDetailSectionProps {
  id: string;
  title: string;
  children: ReactNode;
  className?: string;
}

export default function ProjectDetailSection({
  id,
  title,
  children,
  className = "",
}: ProjectDetailSectionProps) {
  const detailMotion = useProjectDetailMotion();

  return (
    <Reveal
      variants={detailMotion.sectionShell}
      viewport={detailMotion.sectionViewport}
      className={`project-detail-section ${className}`.trim()}
    >
      <section id={id} aria-labelledby={`${id}-heading`}>
        <StaggerContainer
          viewport={detailMotion.sectionViewport}
          variants={detailMotion.sectionContentStagger}
        >
          <motion.h2
            id={`${id}-heading`}
            variants={detailMotion.sectionTitle}
            className="project-detail-section-title"
          >
            {title}
          </motion.h2>
          <motion.div
            variants={detailMotion.sectionBody}
            className="project-detail-section-body"
          >
            {children}
          </motion.div>
        </StaggerContainer>
      </section>
    </Reveal>
  );
}

import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import type { Project } from "../../types";
import { useProjectDetailMotion } from "../../hooks/useProjectDetailMotion";
import { StaggerContainer } from "../../motion";
import MagneticButton from "../MagneticButton";
import ProjectTag from "../ProjectTag";

interface ProjectDetailHeroProps {
  project: Project;
}

export default function ProjectDetailHero({ project }: ProjectDetailHeroProps) {
  const detailMotion = useProjectDetailMotion();

  return (
    <header className="project-detail-hero">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={detailMotion.heroBack}
      >
        <Link to="/projects" className="project-detail-back">
          <i className="bx bx-arrow-back" aria-hidden="true" />
          All projects
        </Link>
      </motion.div>

      <div className="project-detail-hero-grid">
        <StaggerContainer
          animateOnMount
          className="project-detail-hero-copy"
          variants={detailMotion.heroStagger}
        >
          <motion.p variants={detailMotion.heroEyebrow} className="project-detail-eyebrow">
            {project.shortDesc}
          </motion.p>

          <motion.h1 variants={detailMotion.heroTitle} className="project-detail-title">
            {project.title}
          </motion.h1>

          <StaggerContainer
            animateOnMount
            className="project-detail-tags"
            variants={detailMotion.heroTagStagger}
          >
            {project.tags.map((tag) => (
              <ProjectTag key={tag} label={tag} variants={detailMotion.heroTag} />
            ))}
          </StaggerContainer>

          <StaggerContainer
            animateOnMount
            className="project-detail-hero-actions"
            variants={detailMotion.heroCtaStagger}
          >
            <motion.div variants={detailMotion.heroCta}>
              <MagneticButton
                as="a"
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-accent inline-flex items-center gap-2 px-5 py-2.5 rounded-lg"
              >
                <i className="bx bx-link-external text-lg" aria-hidden="true" />
                Live demo
              </MagneticButton>
            </motion.div>
            <motion.div variants={detailMotion.heroCta}>
              <MagneticButton
                as="a"
                href={project.code}
                target="_blank"
                rel="noopener noreferrer"
                className="glass inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-white/10"
              >
                <i className="bx bxl-github text-lg" aria-hidden="true" />
                GitHub
              </MagneticButton>
            </motion.div>
          </StaggerContainer>
        </StaggerContainer>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={detailMotion.heroMedia}
          className="project-detail-hero-media glass-strong rounded-2xl overflow-hidden border border-white/10"
        >
          <motion.img
            src={project.img}
            alt={`${project.title} project screenshot`}
            loading="eager"
            decoding="async"
            draggable={false}
            initial={detailMotion.heroMediaImage.initial}
            animate={detailMotion.heroMediaImage.animate}
            transition={detailMotion.heroMediaImage.transition}
            whileHover={detailMotion.reduceMotion ? undefined : { scale: 1.02 }}
            className="w-full h-full object-cover aspect-video"
          />
        </motion.div>
      </div>
    </header>
  );
}

import type { KeyboardEvent, MouseEvent } from "react";
import { motion, type Variants } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import type { Project } from "../types";
import { useMotionVariants } from "../motion";
import { useProjectCardMotion } from "../hooks/useProjectCardMotion";
import ProjectInteractiveFrame from "./ProjectInteractiveFrame";
import ProjectTag from "./ProjectTag";

interface ProjectCardProps {
  project: Project;
  index: number;
  scrollVariants?: Variants;
}

const CONTENT_VARIANTS = {
  rest: { transition: { staggerChildren: 0, delayChildren: 0 } },
  hover: { transition: { staggerChildren: 0.05, delayChildren: 0.03 } },
} as const;

const TAG_HOVER_VARIANTS = {
  rest: { y: 0, scale: 1 },
  hover: {
    y: -3,
    scale: 1.04,
    transition: { type: "spring", stiffness: 420, damping: 20, mass: 0.5 },
  },
} as const;

function ProjectCardBody({
  project,
  visibleTags,
  extraTags,
}: {
  project: Project;
  visibleTags: string[];
  extraTags: number;
}) {
  const motionVariants = useMotionVariants();
  const { isHovered, isActive } = useProjectCardMotion();
  const isEngaged = isHovered || isActive;

  return (
    <motion.div
      className="project-card-body"
      animate={motionVariants.reduceMotion || !isEngaged ? "rest" : "hover"}
      variants={CONTENT_VARIANTS}
    >
      <div className="project-card-body-main">
        <motion.p
          variants={{
            rest: { opacity: 0.9, x: 0 },
            hover: { opacity: 1, x: 2 },
          }}
          className="project-card-eyebrow"
        >
          {project.shortDesc}
        </motion.p>
        <motion.h4
          variants={{
            rest: { x: 0 },
            hover: { x: 3 },
          }}
          transition={{ type: "spring", stiffness: 400, damping: 28 }}
          className="project-card-title"
        >
          {project.title}
        </motion.h4>
        <motion.p
          variants={{
            rest: { opacity: 0.62 },
            hover: { opacity: 0.82 },
          }}
          className="project-card-desc"
        >
          {project.description}
        </motion.p>
      </div>

      <div className="project-card-footer">
        <motion.div className="project-card-tags">
          {visibleTags.map((tag) => (
            <ProjectTag
              key={tag}
              label={tag}
              className="project-tag-compact"
              variants={TAG_HOVER_VARIANTS}
            />
          ))}
          {extraTags > 0 ? (
            <motion.span variants={TAG_HOVER_VARIANTS} className="project-tag-more">
              +{extraTags}
            </motion.span>
          ) : null}
        </motion.div>

        <motion.div
          className="project-card-actions"
          variants={{
            rest: { opacity: 0.92, y: 0 },
            hover: { opacity: 1, y: -2 },
          }}
        >
          <Link
            to={`/projects/${project.slug}`}
            onClick={(event: MouseEvent<HTMLAnchorElement>) =>
              event.stopPropagation()
            }
            className="project-card-btn project-card-btn-ghost text-center"
          >
            Case study
          </Link>

          <motion.a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(event: MouseEvent<HTMLAnchorElement>) =>
              event.stopPropagation()
            }
            whileHover={motionVariants.hover.lift(-2, 1.04)}
            whileTap={motionVariants.hover.tap()}
            className="btn-accent project-card-btn"
          >
            Demo
          </motion.a>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function ProjectCard({
  project,
  index,
  scrollVariants,
}: ProjectCardProps) {
  const navigate = useNavigate();
  const motionVariants = useMotionVariants();
  const visibleTags = project.tags.slice(0, 3);
  const extraTags = project.tags.length - visibleTags.length;
  const detailPath = `/projects/${project.slug}`;

  const openProject = () => {
    navigate(detailPath);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openProject();
    }
  };

  return (
    <motion.div
      role="link"
      tabIndex={0}
      aria-label={`View ${project.title} case study: ${project.shortDesc}`}
      onClick={openProject}
      onKeyDown={handleKeyDown}
      variants={scrollVariants ?? motionVariants.scrollItem(index)}
      whileTap={motionVariants.hover.tap(0.98)}
      className="project-card-shell outline-none h-full cursor-pointer"
    >
      <ProjectInteractiveFrame
        maxTilt={0}
        showGlow={false}
        hoverLift={false}
        innerClassName="project-card-layout"
      >
        <div className="project-card-media project-card-media-grid">
          <motion.img
            key={project.id}
            src={project.img}
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
            draggable={false}
            initial={false}
            whileHover={motionVariants.reduceMotion ? undefined : { scale: 1.08 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="project-card-image"
          />
          <div className="project-card-shine" aria-hidden="true" />
        </div>

        <ProjectCardBody
          project={project}
          visibleTags={visibleTags}
          extraTags={extraTags}
        />
      </ProjectInteractiveFrame>
    </motion.div>
  );
}

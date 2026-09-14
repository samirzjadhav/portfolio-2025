import { memo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import type { Project } from "../types";
import { getProjectCaseStudy } from "../utils/projectCaseStudy";
import {
  Reveal,
  SectionIntro,
  StaggerContainer,
  useMotionVariants,
} from "../motion";
import ProjectInteractiveFrame from "./ProjectInteractiveFrame";
import ProjectTag from "./ProjectTag";

interface FeaturedProjectProps {
  project: Project;
}

function FeaturedProject({ project }: FeaturedProjectProps) {
  const motionVariants = useMotionVariants();
  const caseStudy = getProjectCaseStudy(project);

  return (
    <section id="featured-project" className="section-block section-block--lg">
      <SectionIntro
        title="Featured Project"
        subtitle="Selected work with live demos and case studies."
      />

      <AnimatePresence mode="wait">
        <motion.div
          key={project.id}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={motionVariants.projectDetailTransition()}
          className="section-content grid md:grid-cols-2 gap-10 items-center"
        >
          <ProjectInteractiveFrame
            isActive
            maxTilt={5}
            innerClassName="project-featured-panel"
          >
            <div className="project-card-media project-featured-media">
              <motion.img
                key={project.id}
                src={project.img}
                alt={`${project.title} project screenshot`}
                loading="lazy"
                decoding="async"
                draggable={false}
                initial={{ scale: 1.04, opacity: 0.85 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                whileHover={
                  motionVariants.reduceMotion ? undefined : { scale: 1.04 }
                }
                className="project-card-image project-featured-image"
              />
              <div className="project-card-overlay project-featured-overlay" />
            </div>

            <StaggerContainer
              className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 z-10"
              animateOnMount
              staggerAmount={0.08}
              delayChildren={0.06}
              variants={motionVariants.scrollStagger(0.08, 0.06)}
            >
              <motion.p
                variants={motionVariants.scrollReveal({ distance: 16, blur: 4 })}
                className="text-accent text-sm font-semibold tracking-wide"
              >
                {project.shortDesc}
              </motion.p>

              <motion.h4
                variants={motionVariants.scrollReveal({ distance: 20, blur: 4 })}
                className="text-xl sm:text-2xl md:text-3xl font-bold tracking-wide mt-1"
              >
                {project.title}
              </motion.h4>

              <motion.p
                variants={motionVariants.scrollSubheading()}
                className="text-white/75 text-sm mt-2 max-w-lg leading-relaxed"
              >
                {project.description}
              </motion.p>

              <StaggerContainer
                className="mt-4 flex flex-wrap gap-2"
                animateOnMount
                staggerAmount={0.05}
                delayChildren={0.04}
                variants={motionVariants.scrollStagger(0.05, 0.04)}
              >
                {project.tags.map((tag) => (
                  <ProjectTag
                    key={tag}
                    label={tag}
                    variants={motionVariants.projectTagReveal()}
                  />
                ))}
              </StaggerContainer>

              <motion.div
                variants={motionVariants.scrollReveal({ distance: 18 })}
                className="mt-4 sm:mt-5 flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-3"
              >
                <motion.div whileHover={motionVariants.hover.lift(-2, 1.05)} whileTap={motionVariants.hover.tap()}>
                  <Link
                    to={`/projects/${project.slug}`}
                    className="btn-accent text-sm px-4 py-2 min-h-[40px] inline-flex items-center"
                  >
                    View case study
                  </Link>
                </motion.div>

                <motion.a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={motionVariants.hover.lift(-2, 1.05)}
                  whileTap={motionVariants.hover.tap()}
                  className="btn-secondary glass min-h-[40px]"
                >
                  Live demo
                </motion.a>

                <motion.a
                  href={project.code}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={motionVariants.hover.lift(-2, 1.03)}
                  whileTap={motionVariants.hover.tap()}
                  className="btn-secondary glass min-h-[40px]"
                >
                  GitHub
                </motion.a>
              </motion.div>
            </StaggerContainer>
          </ProjectInteractiveFrame>

          <Reveal
            variants={motionVariants.scrollRevealRight(36)}
            viewport={motionVariants.sectionViewport}
            className="project-detail-panel glass p-5 md:p-7 rounded-2xl backdrop-blur-2xl"
          >
            <motion.h4
              key={`${project.id}-what`}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.38, delay: 0.05 }}
              className="text-accent font-bold text-xl"
            >
              What I built
            </motion.h4>

            <motion.p
              key={`${project.id}-lead`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.08 }}
              className="section-sub mt-3 font-medium text-white/90"
            >
              {caseStudy.whatBuilt.lead}
            </motion.p>

            <motion.p
              key={`${project.id}-body`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.12 }}
              className="section-sub mt-2 leading-relaxed text-white/70"
            >
              {caseStudy.whatBuilt.body}
            </motion.p>

            <motion.h5
              key={`${project.id}-why`}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.38, delay: 0.16 }}
              className="font-semibold mt-6 text-lg"
            >
              Why I built it
            </motion.h5>

            <motion.p
              key={`${project.id}-why-text`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="section-sub mt-2 leading-relaxed"
            >
              {caseStudy.whyBuilt}
            </motion.p>

            <motion.h5
              key={`${project.id}-stack`}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.38, delay: 0.24 }}
              className="font-semibold mt-6 text-lg"
            >
              Technical decisions
            </motion.h5>

            <StaggerContainer
              key={`${project.id}-tags`}
              className="mt-3 flex flex-wrap gap-2"
              animateOnMount
              staggerAmount={0.05}
              delayChildren={0.08}
              variants={motionVariants.scrollStagger(0.05, 0.08)}
            >
              {project.tags.map((tag) => (
                <ProjectTag
                  key={tag}
                  label={tag}
                  variants={motionVariants.projectTagReveal()}
                />
              ))}
            </StaggerContainer>
          </Reveal>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}

export default memo(FeaturedProject);

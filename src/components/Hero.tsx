import { motion, useMotionTemplate } from "framer-motion";
import { memo, useMemo, type MouseEvent } from "react";
import { Link } from "react-router-dom";
import heroImg from "../assets/home-main.svg";
import heroBg from "../assets/home-bg.jpg";
import {
  HERO_EYEBROW,
  HERO_ROLE,
  HERO_TAGLINE,
  HERO_TECH,
} from "../data/heroContent";
import { RESUME_PDF_FILENAME, RESUME_PDF_URL } from "../data/resumeContent";
import { useHeroParallax } from "../hooks/useHeroParallax";
import { useMotionVariants } from "../motion";
import { smoothScrollTo } from "../utils/smoothScroll";
import HeroFloatingElements from "./HeroFloatingElements";
import HeroHighlights from "./HeroHighlights";
import MagneticButton from "./MagneticButton";

function Hero() {
  const motionVariants = useMotionVariants();
  const heroMotion = useMemo(
    () => ({
      fadeUp: motionVariants.fadeUp(20),
      chipStagger: motionVariants.scrollStagger(0.04, 0.2),
      chipReveal: motionVariants.scrollReveal({ distance: 10, duration: 0.38 }),
      ctaContainer: motionVariants.heroCtaContainer(),
      ctaItem: motionVariants.heroCtaItem(),
      scrollCue: motionVariants.heroScrollCue(),
      imageIn: motionVariants.scaleIn(0.88),
    }),
    [motionVariants]
  );
  const {
    sectionRef,
    reduceMotion,
    contentY,
    imageY,
    bgY,
    imageOffsetX,
    imageOffsetY,
    imageRotateX,
    imageRotateY,
    orbOffsetX,
    orbOffsetY,
    gradientX,
    gradientY,
  } = useHeroParallax();

  const spotlight = useMotionTemplate`radial-gradient(620px circle at ${gradientX} ${gradientY}, rgba(199, 112, 199, 0.22), transparent 68%)`;

  const handleContactScroll = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    smoothScrollTo("contact");
  };

  const handleProjectsScroll = () => {
    smoothScrollTo("portfolio");
  };

  return (
    <section
      ref={sectionRef}
      id="home"
      className="hero-section relative isolate min-h-[100dvh] min-h-[100svh] md:min-h-[90vh] flex items-start md:items-center overflow-x-hidden py-10 sm:py-12 md:py-16"
    >
      <motion.div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
        style={{
          backgroundImage: `url(${heroBg})`,
          y: bgY,
        }}
        aria-hidden="true"
      />

      <div
        className="absolute inset-0 bg-gradient-to-b from-[#07030b]/55 via-[#0f0916]/35 to-[#05020a]/90"
        aria-hidden="true"
      />

      {!reduceMotion && (
        <motion.div
          className="absolute inset-0 pointer-events-none mix-blend-screen"
          style={{ background: spotlight }}
          aria-hidden="true"
        />
      )}

      <HeroFloatingElements
        offsetX={orbOffsetX}
        offsetY={orbOffsetY}
        reduced={reduceMotion}
      />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 grid lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] gap-8 lg:gap-12 items-center">
        <motion.div style={{ y: contentY }} className="space-y-5">
          <motion.p
            className="hero-eyebrow"
            initial="hidden"
            animate="visible"
            variants={heroMotion.fadeUp}
          >
            <span className="hero-chip-dot" aria-hidden="true" />
            {HERO_EYEBROW}
            <span className="hero-eyebrow-badge">Open to work</span>
          </motion.p>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={heroMotion.fadeUp}
            transition={{ delay: reduceMotion ? 0 : 0.06 }}
          >
            <p className="hero-greeting">Hi, I&apos;m</p>
            <h1 className="hero-headline">
              <span className="text-white">Samir</span>{" "}
              <span className="text-accent">Jadhav</span>
            </h1>
            <p className="hero-role">{HERO_ROLE}</p>
          </motion.div>

          <motion.p
            className="hero-tagline"
            initial="hidden"
            animate="visible"
            variants={heroMotion.fadeUp}
            transition={{ delay: reduceMotion ? 0 : 0.12 }}
          >
            {HERO_TAGLINE}
          </motion.p>

          <motion.ul
            className="hero-tech-row"
            initial="hidden"
            animate="visible"
            variants={heroMotion.chipStagger}
            aria-label="Main technologies"
          >
            {HERO_TECH.map((tech) => (
              <motion.li key={tech} variants={heroMotion.chipReveal}>
                <span className="hero-tech-chip">{tech}</span>
              </motion.li>
            ))}
          </motion.ul>

          <HeroHighlights reduceMotion={reduceMotion ?? false} />

          <motion.div
            className="flex flex-col sm:flex-row flex-wrap gap-3 pt-1 items-stretch sm:items-center"
            initial="hidden"
            animate="visible"
            variants={heroMotion.ctaContainer}
          >
            <motion.div variants={heroMotion.ctaItem}>
              <MagneticButton
                as={Link}
                to="/projects"
                className="btn-accent btn-accent-animated inline-flex w-full sm:w-auto justify-center"
              >
                View Projects
              </MagneticButton>
            </motion.div>

            <motion.div variants={heroMotion.ctaItem}>
              <MagneticButton
                as="a"
                href="#contact"
                onClick={handleContactScroll}
                className="btn-secondary glass inline-flex w-full sm:w-auto justify-center"
              >
                Contact Me
              </MagneticButton>
            </motion.div>

            <motion.div variants={heroMotion.ctaItem}>
              <MagneticButton
                as="a"
                href={RESUME_PDF_URL}
                download={RESUME_PDF_FILENAME}
                className="btn-secondary glass inline-flex w-full sm:w-auto justify-center"
              >
                Download Resume
              </MagneticButton>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          className="hidden lg:flex justify-center [perspective:1200px]"
          style={{ y: imageY }}
          initial="hidden"
          animate="visible"
          variants={heroMotion.imageIn}
          transition={{ delay: reduceMotion ? 0 : 0.35 }}
        >
          <motion.div
            style={{
              x: imageOffsetX,
              y: imageOffsetY,
              rotateX: imageRotateX,
              rotateY: imageRotateY,
            }}
            className="feature-layer glass-strong p-6 rounded-2xl hero-image-card"
          >
            <img
              src={heroImg}
              alt="Illustration of a developer working at a desk with a laptop"
              fetchPriority="high"
              decoding="async"
              className="w-[280px] sm:w-[320px] md:w-[380px] select-none pointer-events-none"
              draggable={false}
            />
          </motion.div>
        </motion.div>
      </div>

      <motion.button
        type="button"
        className="hero-scroll-cue absolute bottom-6 left-1/2 -translate-x-1/2 z-10"
        initial="hidden"
        animate="visible"
        variants={heroMotion.scrollCue}
        onClick={handleProjectsScroll}
        aria-label="Scroll to projects section"
      >
        <span className="hero-scroll-cue-label">View work</span>
        <i className="bx bx-chevron-down text-2xl" aria-hidden="true" />
      </motion.button>
    </section>
  );
}

export default memo(Hero);

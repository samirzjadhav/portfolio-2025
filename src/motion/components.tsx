import type { ReactNode } from "react";
import {
  motion,
  useReducedMotion,
  type Variants,
  type ViewportOptions,
} from "framer-motion";
import {
  DEFAULT_VIEWPORT,
  HEADING_VIEWPORT,
} from "./tokens";
import {
  fadeUp,
  premiumPageTransition,
  scrollHeading,
  scrollSubheading,
  stagger,
} from "./variants";

interface MotionSectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  ariaLabel?: string;
  variants?: Variants;
  viewport?: ViewportOptions;
  delay?: number;
}

export function MotionSection({
  children,
  className = "",
  id,
  ariaLabel,
  variants,
  viewport = DEFAULT_VIEWPORT,
  delay = 0,
}: MotionSectionProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.section
      id={id}
      aria-label={ariaLabel}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={variants ?? fadeUp(reduceMotion)}
      transition={{ delay: reduceMotion ? 0 : delay }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  staggerAmount?: number;
  delayChildren?: number;
  viewport?: ViewportOptions;
  variants?: Variants;
  animateOnMount?: boolean;
}

export function StaggerContainer({
  children,
  className = "",
  staggerAmount = 0.06,
  delayChildren = 0.04,
  viewport = DEFAULT_VIEWPORT,
  variants,
  animateOnMount = false,
}: StaggerContainerProps) {
  const reduceMotion = useReducedMotion();
  const resolvedVariants =
    variants ?? stagger(reduceMotion, staggerAmount, delayChildren);

  return (
    <motion.div
      className={className}
      initial="hidden"
      {...(animateOnMount
        ? { animate: "visible" }
        : { whileInView: "visible", viewport })}
      variants={resolvedVariants}
    >
      {children}
    </motion.div>
  );
}

interface MotionPageProps {
  children: ReactNode;
  className?: string;
}

/** @deprecated Use PageTransition at the route level instead. */
export function MotionPage({ children, className = "" }: MotionPageProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={premiumPageTransition(reduceMotion)}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface PageTransitionProps {
  children: ReactNode;
  className?: string;
  direction: number;
}

export function PageTransition({
  children,
  className = "",
  direction,
}: PageTransitionProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      custom={direction}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={premiumPageTransition(reduceMotion)}
      className={`page-transition-shell ${className}`.trim()}
    >
      {children}
    </motion.div>
  );
}

interface RevealProps {
  children: ReactNode;
  className?: string;
  variants?: Variants;
  viewport?: ViewportOptions;
  delay?: number;
  /** Animate when mounted instead of waiting for scroll into view. */
  animateOnMount?: boolean;
  as?:
    | "div"
    | "section"
    | "article"
    | "header"
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "p"
    | "form";
}

interface SectionIntroProps {
  title: string;
  subtitle?: string;
  className?: string;
  align?: "left" | "center";
}

export function SectionIntro({
  title,
  subtitle,
  className = "",
  align = "left",
}: SectionIntroProps) {
  const reduceMotion = useReducedMotion();
  const alignClass = align === "center" ? "text-center" : "";

  return (
    <StaggerContainer
      className={`${alignClass} ${className}`.trim()}
      viewport={HEADING_VIEWPORT}
      staggerAmount={0.14}
      delayChildren={0}
      variants={stagger(reduceMotion, 0.14, 0)}
    >
      <motion.h3
        variants={scrollHeading(reduceMotion)}
        className="section-title relative inline-block"
      >
        {title}
      </motion.h3>
      {subtitle ? (
        <motion.p
          variants={scrollSubheading(reduceMotion)}
          className="section-sub mt-2"
        >
          {subtitle}
        </motion.p>
      ) : null}
    </StaggerContainer>
  );
}

export function Reveal({
  children,
  className = "",
  variants,
  viewport = DEFAULT_VIEWPORT,
  delay = 0,
  animateOnMount = false,
  as = "div",
}: RevealProps) {
  const reduceMotion = useReducedMotion();
  const Component = motion[as];

  return (
    <Component
      initial="hidden"
      {...(animateOnMount
        ? { animate: "visible" }
        : { whileInView: "visible", viewport })}
      variants={variants ?? fadeUp(reduceMotion)}
      transition={{ delay: reduceMotion ? 0 : delay }}
      className={className}
    >
      {children}
    </Component>
  );
}

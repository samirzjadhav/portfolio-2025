import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import AnimatedStatValue from "./AnimatedStatValue";
import { useDeveloperStats } from "../hooks/useDeveloperStats";
import { GRID_VIEWPORT, SectionIntro, StaggerContainer, useMotionVariants } from "../motion";

function StatCard({
  stat,
  isInView,
}: {
  stat: ReturnType<typeof useDeveloperStats>[number];
  isInView: boolean;
}) {
  const { scrollItem, hover } = useMotionVariants();
  const reduceMotion = useReducedMotion();

  return (
    <motion.article
      variants={scrollItem()}
      whileHover={reduceMotion ? undefined : hover.lift(-4, 1.02)}
      className="dev-stat-card glass surface-card surface-card--compact"
      title={stat.source}
    >
      <span className="dev-stat-icon" aria-hidden="true">
        <i className={`bx ${stat.icon}`} />
      </span>
      <AnimatedStatValue stat={stat} isInView={isInView} />
      <p className="dev-stat-label">{stat.label}</p>
      <p className="dev-stat-source">{stat.source}</p>
    </motion.article>
  );
}

export default function DeveloperStats() {
  const stats = useDeveloperStats();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
  const { scrollStagger } = useMotionVariants();

  return (
    <section
      ref={sectionRef}
      id="stats"
      className="section-block"
      aria-label="Developer statistics"
    >
      <SectionIntro
        title="Developer Stats"
        subtitle="Live counts from GitHub, this portfolio, and my resume — no filler numbers."
      />

      <StaggerContainer
        className="section-content dev-stats-grid"
        viewport={GRID_VIEWPORT}
        staggerAmount={0.08}
        delayChildren={0.04}
        variants={scrollStagger(0.08, 0.04)}
      >
        {stats.map((stat) => (
          <StatCard key={stat.id} stat={stat} isInView={isInView} />
        ))}
      </StaggerContainer>
    </section>
  );
}

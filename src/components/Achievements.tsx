import { motion } from "framer-motion";
import { achievements } from "../data/achievements";
import type { Achievement } from "../types/achievement";
import { MOTION_EASE, SectionIntro, StaggerContainer, useMotionVariants } from "../motion";

interface AchievementCardProps {
  achievement: Achievement;
  index: number;
}

function AchievementCard({ achievement, index }: AchievementCardProps) {
  const { scrollItem, hover } = useMotionVariants();

  return (
    <motion.article
      variants={scrollItem(index)}
      whileHover={hover.card()}
      transition={{ duration: 0.35, ease: MOTION_EASE }}
      className="relative overflow-hidden glass surface-card p-6 md:p-7"
    >
      <span
        aria-hidden="true"
        className="
          pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full
          bg-gradient-to-br from-[#c770c7]/20 to-[#6f5cff]/10 blur-2xl
        "
      />

      <motion.div
        aria-hidden="true"
        whileHover={hover.icon(1.08, 4)}
        className="
          mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl
          bg-gradient-to-br from-[#c770c7]/25 to-[#6f5cff]/20
          border border-white/10 text-accent
        "
      >
        <i className={`bx ${achievement.icon} text-2xl`} />
      </motion.div>

      <h4 className="text-lg font-bold text-white leading-snug">
        {achievement.title}
      </h4>

      <p className="mt-3 text-sm text-white/70 leading-relaxed">
        {achievement.description}
      </p>
    </motion.article>
  );
}

export default function Achievements() {
  const motionVariants = useMotionVariants();

  return (
    <section id="achievements" className="section-block">
      <SectionIntro
        title="Achievements"
        subtitle="Milestones from learning, building, and open-source participation."
      />

      <StaggerContainer
        staggerAmount={0.12}
        delayChildren={0.1}
        viewport={motionVariants.gridViewport}
        variants={motionVariants.scrollStagger(0.12, 0.1)}
        className="section-content grid gap-6 sm:grid-cols-2"
      >
        {achievements.map((achievement, index) => (
          <AchievementCard
            key={achievement.id}
            achievement={achievement}
            index={index}
          />
        ))}
      </StaggerContainer>
    </section>
  );
}

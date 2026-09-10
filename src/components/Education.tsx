import { motion } from "framer-motion";
import { education } from "../data/education";
import type { EducationEntry } from "../types/education";
import { SectionIntro, useMotionVariants } from "../motion";

interface EducationCardProps {
  entry: EducationEntry;
  index: number;
  isLast: boolean;
}

function EducationCard({ entry, index, isLast }: EducationCardProps) {
  const { scrollItem, springChild, dotReveal, hover, itemViewport } =
    useMotionVariants();

  return (
    <motion.article
      variants={scrollItem(index)}
      initial="hidden"
      whileInView="visible"
      viewport={itemViewport}
      className="flex gap-4 md:gap-5"
    >
      <div className="hidden md:flex w-3 shrink-0 flex-col items-center">
        <motion.span
          aria-hidden="true"
          variants={dotReveal()}
          whileHover={hover.dot(1.3)}
          className="mt-2 accent-dot"
        />
        {!isLast && (
          <span
            aria-hidden="true"
            className="mt-2 w-px flex-1 min-h-8 bg-white/15"
          />
        )}
      </div>

      <motion.div
        variants={{
          hidden: { opacity: 0, scale: 0.98, y: 12 },
          visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: {
              type: "spring",
              stiffness: 120,
              damping: 18,
              when: "beforeChildren",
              staggerChildren: 0.08,
            },
          },
        }}
        whileHover={hover.experienceCard()}
        className="glass surface-card surface-card--compact flex-1 p-5 md:p-6"
      >
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <motion.h4 variants={springChild(-14)} className="text-lg font-semibold text-white">
            {entry.degree}
          </motion.h4>
          <motion.time
            variants={springChild(-14)}
            dateTime={entry.period}
            className="text-sm text-white/50"
          >
            {entry.period}
          </motion.time>
        </div>

        <motion.p
          variants={springChild(-14)}
          className="mt-2 text-sm text-accent font-medium"
        >
          {entry.institution}
        </motion.p>
      </motion.div>
    </motion.article>
  );
}

export default function Education() {
  const motionVariants = useMotionVariants();

  return (
    <section id="education" className="section-block">
      <SectionIntro
        title="Education"
        subtitle="Academic background in computer science."
      />

      <div className="relative section-content md:pl-1">
        <motion.span
          aria-hidden="true"
          initial="hidden"
          whileInView="visible"
          viewport={motionVariants.sectionViewport}
          variants={motionVariants.timelineReveal()}
          style={{ originY: 0 }}
          className="absolute left-[5px] top-3 bottom-3 hidden md:block w-px bg-white/10"
        />

        <div className="space-y-8">
          {education.map((entry, index) => (
            <EducationCard
              key={entry.id}
              entry={entry}
              index={index}
              isLast={index === education.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

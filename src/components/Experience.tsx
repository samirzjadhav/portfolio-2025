import { motion } from "framer-motion";
import { workExperience } from "../data/experience";
import type { WorkExperience } from "../types/experience";
import { SectionIntro, useMotionVariants } from "../motion";

interface ExperienceCardProps {
  entry: WorkExperience;
  index: number;
  isLast: boolean;
}

function ExperienceCard({ entry, index, isLast }: ExperienceCardProps) {
  const {
    scrollItem,
    springChild,
    dotReveal,
    lineReveal,
    chipReveal,
    stagger,
    hover,
    itemViewport,
  } = useMotionVariants();
  const fromLeft = index % 2 === 0 ? -32 : 32;

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
          <motion.span
            aria-hidden="true"
            variants={lineReveal(0.15)}
            style={{ originY: 0 }}
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
          <motion.h4 variants={springChild(fromLeft)} className="text-lg font-semibold text-white">
            {entry.role}{" "}
            <span className="text-white/40">@</span>{" "}
            <span className="text-accent">{entry.company}</span>
          </motion.h4>
          <motion.time
            variants={springChild(fromLeft)}
            dateTime={entry.period}
            className="text-sm text-white/50"
          >
            {entry.period}
          </motion.time>
        </div>

        <motion.p variants={springChild(fromLeft)} className="mt-1 text-sm text-white/45">
          {entry.type}
        </motion.p>

        <motion.ul variants={stagger(0.08, 0.12)} className="mt-4 space-y-2">
          {entry.responsibilities.map((item) => (
            <motion.li
              key={item}
              variants={springChild(fromLeft > 0 ? 12 : -12)}
              whileHover={hover.nudge(6)}
              transition={{ type: "spring", stiffness: 400, damping: 22 }}
              className="flex gap-2 text-sm text-white/75 leading-relaxed"
            >
              <span aria-hidden="true" className="text-accent select-none">
                →
              </span>
              {item}
            </motion.li>
          ))}
        </motion.ul>

        {entry.technologies && entry.technologies.length > 0 && (
          <motion.div variants={stagger(0.06, 0.1)} className="mt-4 flex flex-wrap gap-2">
            {entry.technologies.map((tech) => (
              <motion.span
                key={tech}
                variants={chipReveal()}
                whileHover={hover.chipLift()}
                className="chip text-xs text-white/80"
              >
                {tech}
              </motion.span>
            ))}
          </motion.div>
        )}
      </motion.div>
    </motion.article>
  );
}

export default function Experience() {
  const motionVariants = useMotionVariants();

  return (
    <section id="experience" className="section-block">
      <SectionIntro
        title="Experience"
        subtitle="Professional internships where I built real-world frontend products."
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
          {workExperience.map((entry, index) => (
            <ExperienceCard
              key={entry.id}
              entry={entry}
              index={index}
              isLast={index === workExperience.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

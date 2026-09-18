import { motion } from "framer-motion";
import {
  skillsData,
  stackCategories,
  workflowCategories,
} from "../data/skills";
import type { SkillCategory } from "../types";
import { Reveal, SectionIntro, StaggerContainer, useMotionVariants } from "../motion";

interface SkillChipProps {
  label: string;
}

function SkillChip({ label }: SkillChipProps) {
  const { hover, scrollReveal } = useMotionVariants();

  return (
    <motion.span
      variants={scrollReveal({ distance: 14, scale: 0.92, blur: 4, duration: 0.45 })}
      whileHover={hover.chip(1.08)}
      className="surface-chip"
    >
      {label}
    </motion.span>
  );
}

interface SkillCategoryGroupProps {
  categories: SkillCategory[];
}

function SkillCategoryGroup({ categories }: SkillCategoryGroupProps) {
  const { scrollStagger, scrollReveal, itemViewport } = useMotionVariants();

  return (
    <div className="space-y-8">
      {categories.map(({ title, items }) => (
        <div key={title}>
          <Reveal
            as="h5"
            variants={scrollReveal({ distance: 18, blur: 4 })}
            viewport={itemViewport}
            className="text-accent font-bold text-lg"
          >
            {title}
          </Reveal>

          <StaggerContainer
            className="mt-3 flex flex-wrap gap-3"
            viewport={itemViewport}
            staggerAmount={0.04}
            delayChildren={0.06}
            variants={scrollStagger(0.04, 0.06)}
          >
            {items.map((item) => (
              <SkillChip key={item} label={item} />
            ))}
          </StaggerContainer>
        </div>
      ))}
    </div>
  );
}

export default function Skills() {
  const motionVariants = useMotionVariants();

  return (
    <section id="skills" className="section-block">
      <SectionIntro
        title="Skills"
        subtitle="Technologies & tools I use to build high-quality web experiences."
      />

      <div className="section-content grid md:grid-cols-2 gap-10">
        <Reveal
          variants={motionVariants.scrollRevealLeft(40)}
          viewport={motionVariants.sectionViewport}
          className="cursor-hover-target p-5 md:p-8 glass surface-card"
        >
          <Reveal
            as="h4"
            variants={motionVariants.scrollHeading()}
            viewport={motionVariants.headingViewport}
            className="text-accent font-bold text-xl"
          >
            Tech Stack
          </Reveal>
          <SkillCategoryGroup categories={stackCategories} />
        </Reveal>

        <Reveal
          variants={motionVariants.scrollRevealRight(40)}
          viewport={motionVariants.sectionViewport}
          className="cursor-hover-target p-5 md:p-8 glass surface-card"
        >
          <Reveal
            as="h4"
            variants={motionVariants.scrollHeading()}
            viewport={motionVariants.headingViewport}
            className="text-accent font-bold text-xl"
          >
            Workflow
          </Reveal>
          <SkillCategoryGroup categories={workflowCategories} />

          <div className="mt-8">
            <Reveal
              as="h4"
              variants={motionVariants.scrollReveal({ distance: 20, blur: 4 })}
              viewport={motionVariants.itemViewport}
              className="text-accent font-bold text-lg"
            >
              Other Skills
            </Reveal>
            <Reveal
              as="p"
              variants={motionVariants.scrollSubheading()}
              viewport={motionVariants.paragraphViewport}
              className="section-sub mt-2 leading-relaxed text-white/70"
            >
              {skillsData.otherSkillsDescription}
            </Reveal>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

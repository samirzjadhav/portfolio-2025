import { motion } from "framer-motion";
import {
  skillsData,
  stackCategories,
  workflowCategories,
} from "../data/skills";
import type { SkillCategory } from "../types";

interface SkillChipProps {
  label: string;
}

function SkillChip({ label }: SkillChipProps) {
  return (
    <motion.span
      whileHover={{ scale: 1.08 }}
      className="
        px-4 py-2 rounded-full text-sm
        bg-white/5 border border-white/10 backdrop-blur-md
        text-white/80 shadow-[0_4px_10px_rgba(0,0,0,0.2)]
      "
    >
      {label}
    </motion.span>
  );
}

interface SkillCategoryGroupProps {
  categories: SkillCategory[];
}

function SkillCategoryGroup({ categories }: SkillCategoryGroupProps) {
  return (
    <div className="space-y-8">
      {categories.map(({ title, items }) => (
        <div key={title}>
          <h5 className="text-accent font-bold text-lg">{title}</h5>
          <div className="mt-3 flex flex-wrap gap-3">
            {items.map((item) => (
              <SkillChip key={item} label={item} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Skills() {
  return (
    <motion.section
      id="skills"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="py-16 mt-12"
    >
      <div className="relative inline-block">
        <h3 className="section-title">Skills</h3>
      </div>
      <p className="section-sub mt-2 text-white/70">
        Technologies & tools I use to build high-quality web experiences.
      </p>

      <div className="mt-12 grid md:grid-cols-2 gap-10">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="
            p-8 rounded-2xl glass backdrop-blur-2xl 
            border border-white/10 shadow-[0_12px_40px_rgba(0,0,0,0.45)]
          "
        >
          <h4 className="text-accent font-bold text-xl">Tech Stack</h4>
          <SkillCategoryGroup categories={stackCategories} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="
            p-8 rounded-2xl glass backdrop-blur-2xl
            border border-white/10 shadow-[0_12px_40px_rgba(0,0,0,0.45)]
          "
        >
          <h4 className="text-accent font-bold text-xl">Workflow</h4>
          <SkillCategoryGroup categories={workflowCategories} />

          <div className="mt-8">
            <h4 className="text-accent font-bold text-lg">Other Skills</h4>
            <p className="section-sub mt-2 leading-relaxed text-white/70">
              {skillsData.otherSkillsDescription}
            </p>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}

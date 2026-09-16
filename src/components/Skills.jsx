import React from "react";
import { motion } from "framer-motion";

const skillCategories = [
  {
    title: "Frontend",
    items: [
      "HTML",
      "CSS",
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "Tailwind CSS",
      "Framer Motion",
    ],
  },
  {
    title: "Backend",
    items: ["Node.js", "Express.js", "REST APIs"],
  },
  {
    title: "Database",
    items: ["MongoDB", "Firebase"],
  },
  {
    title: "Testing",
    items: ["Jest", "Vitest", "React Testing Library"],
  },
  {
    title: "Tools",
    items: [
      "VS Code",
      "Git",
      "GitHub",
      "Vercel",
      "NPM",
      "Figma",
      "Linux",
    ],
  },
];

const stackCategories = skillCategories.filter(({ title }) =>
  ["Frontend", "Backend", "Database"].includes(title)
);

const workflowCategories = skillCategories.filter(({ title }) =>
  ["Testing", "Tools"].includes(title)
);

function SkillChip({ label }) {
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

function SkillCategoryGroup({ categories }) {
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
      {/* TITLE */}
      <div className="relative inline-block">
        <h3 className="section-title">Skills</h3>
      </div>
      <p className="section-sub mt-2 text-white/70">
        Technologies & tools I use to build high-quality web experiences.
      </p>

      <div className="mt-12 grid md:grid-cols-2 gap-10">
        {/* LEFT — STACK */}
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

        {/* RIGHT — WORKFLOW & TOOLS */}
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
              UI/UX basics, component-driven development, animation integration,
              responsive-first design, deployment workflows, and performance
              optimization.
            </p>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}

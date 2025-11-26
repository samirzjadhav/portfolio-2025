import React from "react";
import { motion } from "framer-motion";

const skills = [
  { name: "HTML", pct: 95 },
  { name: "CSS", pct: 90 },
  { name: "JavaScript", pct: 85 },
  { name: "React", pct: 90 },
  { name: "Next.js", pct: 60 },
  { name: "Tailwind", pct: 90 },
];

const tools = [
  "VS Code",
  "Git",
  "GitHub",
  "Vercel",
  "NPM",
  "Node.js",
  "Figma",
  "Linux",
];

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
        {/* LEFT — SKILLS CARD */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="
            p-8 rounded-2xl glass backdrop-blur-2xl 
            border border-white/10 shadow-[0_12px_40px_rgba(0,0,0,0.45)]
          "
        >
          <h4 className="text-accent font-bold text-xl">Core Skills</h4>

          <div className="mt-6 space-y-6">
            {skills.map((s) => (
              <div key={s.name}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">{s.name}</span>
                  <span className="text-sm text-white/60">{s.pct}%</span>
                </div>

                {/* PROGRESS BAR */}
                <div className="w-full h-3 rounded-full bg-white/10 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${s.pct}%` }}
                    transition={{ duration: 1 }}
                    className="
                      h-full rounded-full
                      bg-gradient-to-r from-[#c770c7] to-[#6f5cff]
                      shadow-[0_0_10px_rgba(199,112,199,0.5)]
                    "
                  ></motion.div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* RIGHT — TOOLS CARD */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="
            p-8 rounded-2xl glass backdrop-blur-2xl
            border border-white/10 shadow-[0_12px_40px_rgba(0,0,0,0.45)]
          "
        >
          <h4 className="text-accent font-bold text-xl">
            Tools & Technologies
          </h4>

          <div className="mt-6 flex flex-wrap gap-3">
            {tools.map((t) => (
              <motion.span
                key={t}
                whileHover={{ scale: 1.08 }}
                className="
                  px-4 py-2 rounded-full text-sm
                  bg-white/5 border border-white/10 backdrop-blur-md
                  text-white/80 shadow-[0_4px_10px_rgba(0,0,0,0.2)]
                "
              >
                {t}
              </motion.span>
            ))}
          </div>

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

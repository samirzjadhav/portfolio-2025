import React from "react";
import { motion } from "framer-motion";

const skills = [
  { name: "HTML", pct: 95 },
  { name: "CSS", pct: 90 },
  { name: "JavaScript", pct: 85 },
  { name: "React", pct: 90 },
  { name: "Next.js", pct: 80 },
  { name: "Tailwind", pct: 90 },
];

export default function Skills() {
  return (
    <motion.section
      id="skills"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="py-12 mt-8"
    >
      <h3 className="section-title">Skills</h3>
      <p className="section-sub mt-2">Tools, frameworks and strengths.</p>

      <div className="mt-6 grid md:grid-cols-2 gap-8">
        <div className="glass p-6">
          <h4 className="text-accent font-semibold">Core Skills</h4>
          <div className="mt-4 space-y-4">
            {skills.map((s) => (
              <div key={s.name}>
                <div className="flex justify-between mb-1">
                  <div className="text-sm">{s.name}</div>
                  <div className="text-sm subtle">{s.pct}%</div>
                </div>
                <div className="progress">
                  <span style={{ width: `${s.pct}%` }}></span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass p-6">
          <h4 className="text-accent font-semibold">Tools</h4>
          <div className="mt-4 flex flex-wrap gap-3">
            <div className="chip">VS Code</div>
            <div className="chip">Git</div>
            <div className="chip">GitHub</div>
            <div className="chip">Vercel</div>
            <div className="chip">NPM</div>
            <div className="chip">Node.js</div>
          </div>
          <div className="mt-6">
            <h4 className="text-accent font-semibold">Other</h4>
            <p className="section-sub mt-2">
              Design, UI/UX basics, responsive-first development, component
              design patterns.
            </p>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

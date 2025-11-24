import React from "react";
import projects from "../data/project";
import { motion } from "framer-motion";

export default function ProjectsGrid() {
  return (
    <section id="portfolio" className="mt-12">
      <h3 className="section-title">All Projects</h3>
      <p className="section-sub mt-2">
        A selection of recent works — click demo or code for details.
      </p>

      <div className="mt-6 grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {projects.map((p) => (
          <motion.article
            key={p.id}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="group relative rounded-xl overflow-hidden glass"
          >
            <img
              src={p.img}
              alt={p.title}
              className="w-full h-48 object-cover"
            />
            <div className="absolute inset-0 flex items-end">
              <div className="w-full p-4 port-overlay opacity-0 group-hover:opacity-100 transition">
                <h4 className="text-lg font-semibold">{p.title}</h4>
                <div className="mt-3 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span key={t} className="chip">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="mt-4 flex gap-3">
                  <a
                    href={p.demo}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-accent text-sm"
                  >
                    Demo
                  </a>
                  <a
                    href={p.code}
                    target="_blank"
                    rel="noreferrer"
                    className="glass p-2 rounded-md subtle"
                  >
                    Code
                  </a>
                </div>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

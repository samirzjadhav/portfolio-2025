import React from "react";
import projects from "../data/project";
import { motion } from "framer-motion";

export default function ProjectsGrid({ onSelect }) {
  return (
    <section id="portfolio" className="mt-20">
      {/* Section Title */}
      <div className="relative inline-block">
        <h3 className="section-title">All Projects</h3>
      </div>

      <p className="section-sub mt-2 text-white/70">
        Click any project below to preview it above.
      </p>

      {/* PROJECT GRID */}
      <div className="mt-10 grid sm:grid-cols-2 md:grid-cols-3 gap-8">
        {projects.map((p) => (
          <motion.div
            key={p.id}
            onClick={() => onSelect(p)}
            whileHover={{ scale: 1.05, y: -6 }}
            transition={{ type: "spring", stiffness: 180, damping: 12 }}
            className="
              group cursor-pointer rounded-2xl overflow-hidden relative
              bg-white/5 backdrop-blur-xl border border-white/10
              shadow-[0_12px_40px_rgba(0,0,0,0.45)]
            "
          >
            {/* IMAGE */}
            <img
              src={p.img}
              alt={p.title}
              className="
                w-full h-48 object-cover rounded-2xl
                group-hover:scale-105 transition-all duration-500
              "
            />

            {/* GRADIENT OVERLAY */}
            <div
              className="
                absolute inset-0 bg-gradient-to-t from-black/70 to-transparent
                opacity-70 group-hover:opacity-90 transition-all duration-500
              "
            ></div>

            {/* CONTENT */}
            <div className="absolute bottom-5 left-5 right-5">
              {/* TITLE */}
              <h4 className="text-xl font-bold tracking-wide">{p.title}</h4>

              {/* SHORT DESCRIPTION */}
              <p className="text-white/60 text-xs mt-1">
                {p.shortDesc || "Modern UI / Responsive / Clean Design"}
              </p>

              {/* TAGS */}
              <div className="mt-3 flex flex-wrap gap-2">
                {p.tags.map((tag) => (
                  <span
                    key={tag}
                    className="
                      px-3 py-1 text-xs rounded-full
                      bg-white/10 border border-white/10
                      backdrop-blur-md text-white/70
                    "
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* BUTTONS */}
              <div className="mt-4 flex gap-3">
                <motion.a
                  href={p.demo}
                  target="_blank"
                  whileHover={{ scale: 1.08 }}
                  className="btn-accent text-xs px-3 py-2"
                >
                  Demo
                </motion.a>

                <motion.a
                  href={p.code}
                  target="_blank"
                  whileHover={{ scale: 1.08 }}
                  className="glass px-3 py-2 rounded-md text-xs"
                >
                  Code
                </motion.a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

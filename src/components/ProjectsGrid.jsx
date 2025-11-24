import React from "react";
import projects from "../data/project";
import { motion } from "framer-motion";

export default function ProjectsGrid({ onSelect }) {
  return (
    <section id="portfolio" className="mt-20">
      <div className="relative inline-block">
        <h3 className="section-title">All Projects</h3>
      </div>

      <p className="section-sub mt-2 text-white/70">
        Click any project below to preview it above.
      </p>

      <div className="mt-10 grid sm:grid-cols-2 md:grid-cols-3 gap-7">
        {projects.map((p) => (
          <motion.div
            key={p.id}
            onClick={() => onSelect(p)}
            whileHover={{ scale: 1.05, y: -4 }}
            className="group cursor-pointer rounded-xl overflow-hidden relative 
                       bg-[rgba(255,255,255,0.04)] backdrop-blur-lg 
                       shadow-[0_4px_20px_rgba(0,0,0,0.4)] transition"
          >
            <img
              src={p.img}
              alt={p.title}
              className="w-full h-48 object-cover group-hover:opacity-90 transition"
            />

            {/* Overlay */}
            <div
              className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 
                            group-hover:opacity-100 transition"
            ></div>

            <div className="absolute bottom-5 left-5">
              <h4 className="text-lg font-bold">{p.title}</h4>

              <div className="mt-2 flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <span key={t} className="chip">
                    {t}
                  </span>
                ))}
              </div>

              <div className="mt-3 flex gap-3">
                <a href={p.demo} className="btn-accent text-xs" target="_blank">
                  Demo
                </a>
                <a
                  href={p.code}
                  className="glass px-3 py-1 rounded-md text-xs"
                  target="_blank"
                >
                  Code
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

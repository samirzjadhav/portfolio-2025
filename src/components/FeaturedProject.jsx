import React from "react";
import { motion } from "framer-motion";

export default function FeaturedProject({ project }) {
  if (!project) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false }}
      transition={{ duration: 0.7 }}
      className="mt-16"
    >
      <div className="relative inline-block">
        <h3 className="section-title">Featured Project</h3>
      </div>

      <div className="mt-10 grid md:grid-cols-2 gap-10 items-center">
        {/* LEFT — IMAGE */}
        <motion.div
          className="relative rounded-2xl overflow-hidden feature-layer"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <motion.img
            key={project.id}
            initial={{ scale: 1.05, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            src={project.img}
            alt={project.title}
            className="w-full h-80 object-cover"
          />

          {/* Modern Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

          {/* Text on Image */}
          <div className="absolute bottom-5 left-5">
            <h4 className="text-2xl font-bold">{project.title}</h4>
            <p className="text-white/70 text-sm mt-1 max-w-md">
              {project.description ||
                "Clean, modern and responsive — built with React & Tailwind."}
            </p>

            <div className="mt-4 flex gap-3">
              <motion.a
                href={project.demo}
                target="_blank"
                whileHover={{ scale: 1.05 }}
                className="btn-accent text-sm"
              >
                Live Demo
              </motion.a>

              <motion.a
                href={project.code}
                target="_blank"
                whileHover={{ scale: 1.05 }}
                className="glass px-3 py-2 rounded-md text-sm"
              >
                View Code
              </motion.a>
            </div>
          </div>
        </motion.div>

        {/* RIGHT — DETAILS */}
        <div className="glass p-6 rounded-2xl shadow-lg backdrop-blur-xl">
          <h4 className="text-accent font-bold text-xl">Overview</h4>

          <p className="section-sub mt-4 leading-relaxed">
            {project.overview ||
              "This project highlights component structure, responsive UI, animations and reusable modern design patterns."}
          </p>

          <div className="mt-6">
            <h5 className="font-semibold">Tech Highlights</h5>
            <ul className="mt-3 space-y-2 text-white/70">
              {project.tags.map((t) => (
                <li key={t}>• {t}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

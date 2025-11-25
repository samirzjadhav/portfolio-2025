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
      className="mt-20"
    >
      {/* Section Title */}
      <div className="relative inline-block">
        <h3 className="section-title">Featured Project</h3>
      </div>

      <div className="mt-10 grid md:grid-cols-2 gap-10 items-center">
        {/* LEFT — FEATURED IMAGE CARD */}
        <motion.div
          className="
            relative rounded-2xl overflow-hidden 
            bg-white/5 backdrop-blur-xl border border-white/10
            shadow-[0_12px_50px_rgba(0,0,0,0.5)]
          "
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          {/* Image */}
          <motion.img
            key={project.id}
            initial={{ scale: 1.05, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            src={project.img}
            alt={project.title}
            className="w-full h-80 object-cover rounded-2xl group-hover:scale-105 transition-all duration-500"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>

          {/* TEXT OVERLAY */}
          <div className="absolute bottom-6 left-6 right-6">
            <h4 className="text-3xl font-bold tracking-wide">
              {project.title}
            </h4>

            <p className="text-white/70 text-sm mt-2 max-w-lg">
              {project.description ||
                "A polished, responsive and modern project built with React & Tailwind."}
            </p>

            <div className="mt-5 flex gap-4">
              <motion.a
                href={project.demo}
                target="_blank"
                whileHover={{ scale: 1.08 }}
                className="btn-accent text-sm px-4 py-2"
              >
                Live Demo
              </motion.a>

              <motion.a
                href={project.code}
                target="_blank"
                whileHover={{ scale: 1.08 }}
                className="glass px-4 py-2 rounded-md text-sm"
              >
                View Code
              </motion.a>
            </div>
          </div>
        </motion.div>

        {/* RIGHT — DETAILS CARD */}
        <motion.div
          initial={{ opacity: 0, x: 25 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="
            glass p-7 rounded-2xl backdrop-blur-2xl
            border border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.35)]
          "
        >
          <h4 className="text-accent font-bold text-xl">Overview</h4>

          <p className="section-sub mt-4 leading-relaxed">
            {project.overview ||
              "This featured project showcases advanced React architecture, responsive UI, animations, and clean reusable components with modern styling."}
          </p>

          <h5 className="font-semibold mt-6 text-lg">Tech Highlights</h5>

          <ul className="mt-3 space-y-2 text-white/70">
            {project.tags.map((tag, index) => (
              <li key={index}>• {tag}</li>
            ))}
          </ul>
        </motion.div>
      </div>
    </motion.section>
  );
}

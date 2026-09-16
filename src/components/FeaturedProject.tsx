import { memo } from "react";
import { motion } from "framer-motion";
import type { Project } from "../types";

interface FeaturedProjectProps {
  project: Project;
}

function FeaturedProject({ project }: FeaturedProjectProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="mt-20"
    >
      <div className="relative inline-block">
        <h3 className="section-title">Featured Project</h3>
      </div>

      <div className="mt-10 grid md:grid-cols-2 gap-10 items-center">
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
          <motion.img
            key={project.id}
            initial={{ scale: 1.05, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            src={project.img}
            alt={`${project.title} project screenshot`}
            loading="lazy"
            decoding="async"
            className="w-full h-80 object-cover rounded-2xl group-hover:scale-105 transition-all duration-500"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>

          <div className="absolute bottom-6 left-6 right-6">
            <p className="text-accent text-sm font-semibold tracking-wide">
              {project.shortDesc}
            </p>

            <h4 className="text-3xl font-bold tracking-wide mt-1">
              {project.title}
            </h4>

            <p className="text-white/75 text-sm mt-2 max-w-lg leading-relaxed">
              {project.description}
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span key={tag} className="chip text-xs">
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-5 flex gap-4">
              <motion.a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.08 }}
                className="btn-accent text-sm px-4 py-2"
              >
                Live Demo
              </motion.a>

              <motion.a
                href={project.code}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.08 }}
                className="glass px-4 py-2 rounded-md text-sm"
              >
                View Code
              </motion.a>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 25 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="
            glass p-7 rounded-2xl backdrop-blur-2xl
            border border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.35)]
          "
        >
          <p className="text-accent text-sm font-semibold">{project.shortDesc}</p>

          <h4 className="text-accent font-bold text-xl mt-1">Overview</h4>

          <p className="section-sub mt-4 leading-relaxed">{project.overview}</p>

          <p className="section-sub mt-4 leading-relaxed text-white/70">
            {project.description}
          </p>

          <h5 className="font-semibold mt-6 text-lg">Tech Stack</h5>

          <div className="mt-3 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span key={tag} className="chip text-sm">
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}

export default memo(FeaturedProject);

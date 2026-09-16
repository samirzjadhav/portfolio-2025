import { memo } from "react";
import type { KeyboardEvent, MouseEvent } from "react";
import { motion } from "framer-motion";
import type { Project } from "../types";

interface ProjectsGridProps {
  projects: Project[];
  onSelect: (project: Project) => void;
}

function handleProjectKeyDown(
  event: KeyboardEvent<HTMLDivElement>,
  project: Project,
  onSelect: (project: Project) => void
): void {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    onSelect(project);
  }
}

function ProjectsGrid({ projects, onSelect }: ProjectsGridProps) {
  return (
    <section id="portfolio" className="mt-20">
      <div className="relative inline-block">
        <h3 className="section-title">All Projects</h3>
      </div>

      <p className="section-sub mt-2 text-white/70">
        Select a project to preview the full case study above, or open the live
        demo directly.
      </p>

      <div className="mt-10 grid sm:grid-cols-2 md:grid-cols-3 gap-8">
        {projects.map((p) => (
          <motion.div
            key={p.id}
            role="button"
            tabIndex={0}
            aria-label={`Preview ${p.title}: ${p.shortDesc}`}
            onClick={() => onSelect(p)}
            onKeyDown={(event) => handleProjectKeyDown(event, p, onSelect)}
            whileHover={{ scale: 1.05, y: -6 }}
            transition={{ type: "spring", stiffness: 180, damping: 12 }}
            className="
              group cursor-pointer rounded-2xl overflow-hidden relative
              bg-white/5 backdrop-blur-xl border border-white/10
              shadow-[0_12px_40px_rgba(0,0,0,0.45)]
            "
          >
            <img
              src={p.img}
              alt={`${p.title} project preview`}
              loading="lazy"
              decoding="async"
              className="
                w-full h-48 object-cover rounded-2xl
                group-hover:scale-105 transition-all duration-500
              "
            />

            <div
              className="
                absolute inset-0 bg-gradient-to-t from-black/95 via-black/55 to-transparent
                opacity-80 group-hover:opacity-95 transition-all duration-500
              "
            ></div>

            <div className="absolute bottom-0 left-0 right-0 p-5">
              <h4 className="text-lg font-bold tracking-wide leading-snug">
                {p.title}
              </h4>

              <p className="text-accent text-xs font-semibold mt-1.5">
                {p.shortDesc}
              </p>

              <p className="text-white/75 text-xs mt-1.5 leading-relaxed line-clamp-2">
                {p.description}
              </p>

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

              <div className="mt-4 flex gap-3">
                <motion.a
                  href={p.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e: MouseEvent<HTMLAnchorElement>) =>
                    e.stopPropagation()
                  }
                  whileHover={{ scale: 1.08 }}
                  className="btn-accent text-xs px-3 py-2"
                >
                  Demo
                </motion.a>

                <motion.a
                  href={p.code}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e: MouseEvent<HTMLAnchorElement>) =>
                    e.stopPropagation()
                  }
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

export default memo(ProjectsGrid);

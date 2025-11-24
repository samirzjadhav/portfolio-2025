import React from "react";
import projects from "../data/project";
import { motion } from "framer-motion";

export default function FeaturedProject() {
  const feat = projects[0]; // use first project as featured
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="mt-12"
    >
      <h3 className="section-title">Featured Project</h3>
      <div className="mt-6 grid md:grid-cols-2 gap-8 items-center">
        <div className="feature-layer rounded-2xl overflow-hidden relative">
          <motion.img
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            src={feat.img}
            alt={feat.title}
            className="w-full h-80 object-cover"
          />
          <div className="absolute inset-0 flex items-end">
            <div className="w-full p-6 port-overlay">
              <h4 className="text-2xl font-semibold">{feat.title}</h4>
              <p className="text-sm subtle mt-2">
                A polished demo & codebase — full project details on the repo &
                live demo.
              </p>
              <div className="mt-4 flex gap-3">
                <a
                  href={feat.demo}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-accent text-sm"
                >
                  Live Demo
                </a>
                <a
                  href={feat.code}
                  target="_blank"
                  rel="noreferrer"
                  className="glass p-2 rounded-md subtle"
                >
                  View Code
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="glass p-6">
          <h4 className="text-accent font-semibold">Overview</h4>
          <p className="section-sub mt-3">
            This project demonstrates React component architecture, responsive
            layout and UI patterns with modern CSS & Tailwind. Use as a
            reference or extend the repo for your own portfolio.
          </p>

          <div className="mt-6">
            <h5 className="font-semibold">Tech & highlights</h5>
            <ul className="mt-3 space-y-2">
              <li className="subtle">
                • Component-based structure & routing-ready
              </li>
              <li className="subtle">
                • Clean project file structure & data-driven UI
              </li>
              <li className="subtle">• Responsive and accessible components</li>
            </ul>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

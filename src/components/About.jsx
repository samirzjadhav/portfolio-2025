import React from "react";
import profile from "../assets/Projects/profile.jpg";
import { motion } from "framer-motion";

export default function About() {
  return (
    <motion.section
      id="about"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="mt-12 py-10"
    >
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div className="glass-strong p-6 feature-layer">
          <img
            src={profile}
            alt="profile"
            className="rounded-xl w-full object-cover"
          />
        </div>

        <div>
          <h3 className="section-title">About</h3>

          <p className="section-sub mt-4">
            Hi there, I'm{" "}
            <span className="text-accent font-semibold">Samir Jadhav</span> — a
            passionate Frontend Engineer who loves building modern, clean, and
            user-friendly web experiences. My journey into web development began
            with curiosity, and over time it evolved into something I truly
            enjoy and take pride in.
          </p>

          <p className="section-sub mt-4">
            I’ve worked on everything from UI components to fully responsive
            websites and complete React applications. What motivates me is the
            process of turning a blank screen into something meaningful,
            interactive, and visually appealing. I love creating smooth
            interfaces, reusable components, and performance-optimized designs.
          </p>

          <p className="section-sub mt-4">
            Outside of coding, I spend time learning new technologies, reading
            dev blogs, exploring animations, and studying scalable front-end
            patterns. I’m excited to continue growing as a developer and
            contribute to impactful, real-world projects while helping brands
            and creators build great digital experiences.
          </p>

          <div className="mt-6 flex gap-3">
            <a href="https://github.com/samirzjadhav" className="glass p-3">
              <i className="bx bxl-github"></i>
            </a>
            <a
              href="https://www.linkedin.com/in/samirzjadhav"
              className="glass p-3"
            >
              <i className="bx bxl-linkedin"></i>
            </a>
            <a href="https://twitter.com/samirzjadhav" className="glass p-3">
              <i className="bx bxl-twitter"></i>
            </a>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

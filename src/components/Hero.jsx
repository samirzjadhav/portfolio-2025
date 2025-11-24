import React from "react";
import { motion } from "framer-motion";
import heroImg from "../assets/home-main.svg";
import heroBg from "../assets/home-bg.jpg"; // <-- IMPORT BG HERE

export default function Hero() {
  return (
    <section
      id="home"
      className="min-h-[90vh] flex items-center bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${heroBg})`, // <-- APPLY BG HERE
      }}
    >
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-8 items-center">
        {/* LEFT TEXT */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="space-y-6"
        >
          <motion.h1
            className="hero-title text-white"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7 }}
          >
            He
            <br />
            LLO.
          </motion.h1>

          <motion.h2
            className="text-2xl subtle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
          >
            I'M <span className="text-accent font-semibold">SAMIR JADHAV</span>
          </motion.h2>

          <motion.p
            className="max-w-lg subtle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
          >
            Frontend engineer focused on building delightful web experiences
            with React, Next.js and Tailwind. I build responsive apps, beautiful
            UI and reusable components.
          </motion.p>

          <motion.div
            className="flex gap-3 mt-6 items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45 }}
          >
            <motion.a
              whileTap={{ scale: 0.93 }}
              whileHover={{ scale: 1.05 }}
              href="#portfolio"
              className="btn-accent"
            >
              View Projects
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.03 }}
              href="#contact"
              className="glass px-4 py-2 rounded-lg subtle"
            >
              Hire Me
            </motion.a>

            <motion.span className="chip" whileHover={{ scale: 1.08 }}>
              Open to work
            </motion.span>
          </motion.div>
        </motion.div>

        {/* RIGHT IMAGE */}
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.3 }}
        >
          <div className="feature-layer glass-strong p-6 rounded-2xl">
            <img src={heroImg} alt="hero" className="w-[320px] md:w-[420px]" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

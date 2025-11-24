import React, { useState } from "react";
import { motion } from "framer-motion";
import "../index.css";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="
    fixed top-0 left-0 w-full z-50
    bg-[rgba(33,32,56,0.85)]
    shadow-[0_10px_10px_0_rgba(9,5,29,0.17)]
    backdrop-blur-[15px]
  "
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <a href="#home" className="text-2xl md:text-4xl font-dancing">
            <span className="text-white ">Samir</span>{" "}
            <span className="text-accent ">Jadhav</span>
          </a>

          <nav className="hidden md:flex gap-8 items-center">
            <a href="#home" className="subtle hover:text-accent transition">
              Home
            </a>
            <a href="#about" className="subtle hover:text-accent transition">
              About
            </a>
            <a href="#skills" className="subtle hover:text-accent transition">
              Skills
            </a>
            <a
              href="#portfolio"
              className="subtle hover:text-accent transition"
            >
              Projects
            </a>
            <a href="#contact" className="subtle hover:text-accent transition">
              Contact
            </a>
          </nav>

          <div className="md:hidden flex items-center gap-3">
            <button onClick={() => setOpen(!open)} className="glass p-2">
              <i className="bx bx-menu text-xl"></i>
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="px-6 pb-4">
          <div className="glass p-4 mt-3 space-y-3">
            <a href="#home" className="block subtle hover:text-accent">
              Home
            </a>
            <a href="#about" className="block subtle hover:text-accent">
              About
            </a>
            <a href="#skills" className="block subtle hover:text-accent">
              Skills
            </a>
            <a href="#portfolio" className="block subtle hover:text-accent">
              Projects
            </a>
            <a href="#contact" className="block subtle hover:text-accent">
              Contact
            </a>
          </div>
        </div>
      )}
    </motion.header>
  );
}

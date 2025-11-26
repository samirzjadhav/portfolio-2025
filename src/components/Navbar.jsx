import React, { useState } from "react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import "../index.css";

export default function Navbar({ activeSection }) {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const hideSections =
    location.pathname === "/resume" || location.pathname === "/github";

  const isRouteActive = (path) =>
    location.pathname === path
      ? "text-accent font-semibold"
      : "subtle hover:text-accent";

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="
        fixed top-0 left-0 w-full z-50
        bg-[rgba(20,15,35,0.85)]
        backdrop-blur-xl
        shadow-[0_10px_25px_rgba(0,0,0,0.45)]
        border-b border-white/10
      "
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* LOGO */}
          <a href="#home" className="text-2xl md:text-4xl font-dancing">
            <span className="text-white">Samir</span>{" "}
            <span className="text-accent">Jadhav</span>
          </a>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex gap-8 items-center">
            <a href="/#home" className={isRouteActive("/")}>
              Home
            </a>

            <a href="/github" className={isRouteActive("/github")}>
              GitHub
            </a>

            <a href="/resume" className={isRouteActive("/resume")}>
              Resume
            </a>

            {!hideSections && (
              <>
                <a
                  href="#about"
                  className={
                    activeSection === "about"
                      ? "text-accent font-semibold"
                      : "subtle hover:text-accent"
                  }
                >
                  About
                </a>

                <a
                  href="#skills"
                  className={
                    activeSection === "skills"
                      ? "text-accent font-semibold"
                      : "subtle hover:text-accent"
                  }
                >
                  Skills
                </a>

                <a
                  href="#portfolio"
                  className={
                    activeSection === "portfolio"
                      ? "text-accent font-semibold"
                      : "subtle hover:text-accent"
                  }
                >
                  Projects
                </a>

                <a
                  href="#contact"
                  className={
                    activeSection === "contact"
                      ? "text-accent font-semibold"
                      : "subtle hover:text-accent"
                  }
                >
                  Contact
                </a>
              </>
            )}
          </nav>

          {/* MOBILE BUTTON */}
          <div className="md:hidden flex items-center gap-3">
            <button onClick={() => setOpen(!open)} className="glass p-2">
              <i className="bx bx-menu text-xl"></i>
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="px-6 pb-4 md:hidden">
          <div className="glass p-4 mt-3 space-y-3">
            <a href="/#home" className={isRouteActive("/")}>
              Home
            </a>

            <a href="/github" className={isRouteActive("/github")}>
              GitHub
            </a>

            <a href="/resume" className={isRouteActive("/resume")}>
              Resume
            </a>

            {!hideSections && (
              <>
                <a
                  href="/#about"
                  className={
                    activeSection === "about"
                      ? "text-accent font-semibold"
                      : "subtle hover:text-accent"
                  }
                >
                  About
                </a>

                <a
                  href="/#skills"
                  className={
                    activeSection === "skills"
                      ? "text-accent font-semibold"
                      : "subtle hover:text-accent"
                  }
                >
                  Skills
                </a>

                <a
                  href="/#portfolio"
                  className={
                    activeSection === "portfolio"
                      ? "text-accent font-semibold"
                      : "subtle hover:text-accent"
                  }
                >
                  Projects
                </a>

                <a
                  href="/#contact"
                  className={
                    activeSection === "contact"
                      ? "text-accent font-semibold"
                      : "subtle hover:text-accent"
                  }
                >
                  Contact
                </a>
              </>
            )}
          </div>
        </div>
      )}
    </motion.header>
  );
}

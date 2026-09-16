import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { sectionNavLinks } from "../data/navigation";
import type { SectionId } from "../types";

interface NavbarProps {
  activeSection?: SectionId;
}

export default function Navbar({ activeSection }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const hideSections =
    location.pathname === "/resume" || location.pathname === "/github";

  useEffect(() => {
    if (!open) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [open]);

  const isRouteActive = (path: string): string =>
    location.pathname === path
      ? "text-accent font-semibold"
      : "subtle hover:text-accent";

  const sectionLinkClass = (section: SectionId): string =>
    activeSection === section
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
          <Link
            to="/"
            aria-label="Samir Jadhav — Home"
            className="text-2xl md:text-4xl font-dancing"
          >
            <span className="text-white">Samir</span>{" "}
            <span className="text-accent">Jadhav</span>
          </Link>

          <nav
            className="hidden md:flex gap-8 items-center"
            aria-label="Primary navigation"
          >
            <Link to="/" className={isRouteActive("/")}>
              Home
            </Link>

            <Link to="/github" className={isRouteActive("/github")}>
              GitHub
            </Link>

            <Link to="/resume" className={isRouteActive("/resume")}>
              Resume
            </Link>

            {!hideSections && (
              <>
                <a href="#about" className={sectionLinkClass("about")}>
                  About
                </a>

                <a href="#skills" className={sectionLinkClass("skills")}>
                  Skills
                </a>

                <a href="#portfolio" className={sectionLinkClass("portfolio")}>
                  Projects
                </a>

                <a href="#contact" className={sectionLinkClass("contact")}>
                  Contact
                </a>
              </>
            )}
          </nav>

          <div className="md:hidden flex items-center gap-3">
            <button
              type="button"
              onClick={() => setOpen(!open)}
              className="glass p-2 text-white"
              aria-label={open ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={open}
              aria-controls="mobile-navigation"
            >
              <i className="bx bx-menu text-xl" aria-hidden="true"></i>
            </button>
          </div>
        </div>
      </div>

      {open && (
        <motion.div
          id="mobile-navigation"
          role="navigation"
          aria-label="Mobile navigation"
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="px-6 pb-4 md:hidden"
        >
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0, y: -10 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { staggerChildren: 0.08 },
              },
            }}
            className="glass p-4 mt-3 rounded-xl space-y-3 "
          >
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 8 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <Link
                to="/"
                onClick={() => setOpen(false)}
                className={isRouteActive("/")}
              >
                Home
              </Link>
            </motion.div>

            <motion.div
              variants={{
                hidden: { opacity: 0, y: 8 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <Link
                to="/github"
                onClick={() => setOpen(false)}
                className={isRouteActive("/github")}
              >
                GitHub
              </Link>
            </motion.div>

            <motion.div
              variants={{
                hidden: { opacity: 0, y: 8 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <Link
                to="/resume"
                onClick={() => setOpen(false)}
                className={isRouteActive("/resume")}
              >
                Resume
              </Link>
            </motion.div>

            {!hideSections && (
              <>
                {sectionNavLinks.map((sec) => (
                  <motion.div
                    key={sec.section}
                    variants={{
                      hidden: { opacity: 0, y: 8 },
                      visible: { opacity: 1, y: 0 },
                    }}
                  >
                    <a
                      href={sec.href}
                      onClick={() => setOpen(false)}
                      className={sectionLinkClass(sec.section)}
                    >
                      {sec.name}
                    </a>
                  </motion.div>
                ))}
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </motion.header>
  );
}

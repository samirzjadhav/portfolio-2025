import React from "react";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="mt-20 py-12 border-t border-white/10">
      <div className="max-w-6xl mx-auto px-6">
        {/* TOP — NAV LINKS */}
        <div className="flex flex-wrap justify-center gap-6 mb-10 text-white/70">
          {[
            { name: "Home", link: "#home" },
            { name: "About", link: "#about" },
            { name: "Skills", link: "#skills" },
            { name: "Projects", link: "#portfolio" },
            { name: "Contact", link: "#contact" },
          ].map((item) => (
            <motion.a
              whileHover={{ scale: 1.1, color: "#c770c7" }}
              key={item.name}
              href={item.link}
              className="transition font-medium tracking-wide"
            >
              {item.name}
            </motion.a>
          ))}
        </div>

        {/* MIDDLE — SOCIAL ICONS */}
        <div className="flex justify-center gap-5 mb-10">
          {[
            {
              icon: "bxl-github",
              link: "https://github.com/samirzjadhav",
            },
            {
              icon: "bxl-linkedin",
              link: "https://linkedin.com/in/samirjadhav",
            },
            {
              icon: "bxl-twitter",
              link: "https://twitter.com/samirzjadhav",
            },
          ].map((item) => (
            <motion.a
              whileHover={{ scale: 1.15 }}
              key={item.icon}
              href={item.link}
              target="_blank"
              className="
                glass p-3 rounded-xl border border-white/10 
                hover:bg-white/10 transition shadow-lg
              "
            >
              <i className={`bx ${item.icon} text-2xl`}></i>
            </motion.a>
          ))}
        </div>

        {/* BOTTOM — COPYRIGHT */}
        <div className="text-center text-white/60 leading-relaxed">
          <p>
            © {new Date().getFullYear()}{" "}
            <span className="text-accent font-semibold">Samir Jadhav</span>.
          </p>
          <p className="text-white/40 text-sm mt-1 pb-5">
            Designed with ❤️ using React, Tailwind & Framer Motion.
          </p>
        </div>
      </div>
    </footer>
  );
}

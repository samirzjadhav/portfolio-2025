import { motion } from "framer-motion";
import { socialLinks } from "../data/contact";
import { footerNavLinks } from "../data/navigation";

export default function Footer() {
  return (
    <footer className="mt-20 py-12 border-t border-white/10">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-wrap justify-center gap-6 mb-10 text-white/70">
          {footerNavLinks.map((item) => (
            <motion.a
              whileHover={{ scale: 1.1, color: "#c770c7" }}
              key={item.name}
              href={item.href}
              className="transition font-medium tracking-wide"
            >
              {item.name}
            </motion.a>
          ))}
        </div>

        <div className="flex justify-center gap-5 mb-10">
          {socialLinks.map((item) => (
            <motion.a
              whileHover={{ scale: 1.15 }}
              key={item.platform}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={item.label}
              className="
                glass p-3 rounded-xl border border-white/10 
                hover:bg-white/10 transition shadow-lg
              "
            >
              <i className={`bx ${item.icon} text-2xl`} aria-hidden="true"></i>
            </motion.a>
          ))}
        </div>

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

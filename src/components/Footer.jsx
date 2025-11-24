import React from "react";

export default function Footer() {
  return (
    <footer className="mt-12 border-t border-white/8 py-8">
      <div className="max-w-6xl mx-auto px-6 text-center subtle">
        <div className="mb-4">
          <a href="#home" className="mx-3 hover:text-accent">
            Home
          </a>
          <a href="#about" className="mx-3 hover:text-accent">
            About
          </a>
          <a href="#skills" className="mx-3 hover:text-accent">
            Skills
          </a>
          <a href="#portfolio" className="mx-3 hover:text-accent">
            Projects
          </a>
          <a href="#contact" className="mx-3 hover:text-accent">
            Contact
          </a>
        </div>
        <div>
          © {new Date().getFullYear()}{" "}
          <span className="text-accent">Samir Jadhav</span> — All rights
          reserved.
        </div>
      </div>
    </footer>
  );
}

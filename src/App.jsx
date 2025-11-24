import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import FeaturedProject from "./components/FeaturedProject";
import ProjectsGrid from "./components/ProjectsGrid";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Loader from "./components/Loader";
import projects from "./data/project";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [activeProject, setActiveProject] = useState(projects[0]);
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 850);
    return () => clearTimeout(t);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <div className="min-h-screen bg-gradient-to-br from-[#07030b] via-[#0f0916] to-[#05020a] text-white">
      <Navbar />
      <main className="pt-[70px]">
        <Hero />
        <div className="max-w-6xl mx-auto px-6">
          <About />
          <Skills />
          <FeaturedProject project={activeProject} />
          <ProjectsGrid onSelect={setActiveProject} />
          <Contact />
        </div>
      </main>
      <Footer />
    </div>
  );
}

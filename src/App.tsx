import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Achievements from "./components/Achievements";
import Education from "./components/Education";
import Contact from "./components/Contact";
import CurrentlyBuilding from "./components/CurrentlyBuilding";
import DeveloperStats from "./components/DeveloperStats";
import HomeProjects from "./components/HomeProjects";
import Footer from "./components/Footer";
import { SectionTransition } from "./components/sections";
import SkipToContent from "./components/SkipToContent";
import VisitorCounter from "./components/VisitorCounter";
import { PAGE_META } from "./config/site";
import { usePageMeta } from "./hooks/usePageMeta";
import { useScrollSpy } from "./hooks/useScrollSpy";

export default function App() {
  usePageMeta(PAGE_META.home);
  const activeSection = useScrollSpy();

  return (
    <div className="min-h-screen text-white">
      <SkipToContent />
      <Navbar activeSection={activeSection} />
      <VisitorCounter />
      <main id="main-content" tabIndex={-1} className="pt-[70px]">
        <Hero />
        <SectionTransition variant="hero-entry" spacing="loose" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <HomeProjects />
          <SectionTransition variant="glow-bridge" />
          <Experience />
          <SectionTransition variant="scan-lines" />
          <DeveloperStats />
          <SectionTransition variant="orb-glow" spacing="tight" />
          <Skills />
          <SectionTransition variant="gradient-veil" />
          <CurrentlyBuilding />
          <SectionTransition variant="node-path" spacing="tight" />
          <About />
          <SectionTransition variant="gradient-veil" spacing="tight" />
          <Achievements />
          <SectionTransition variant="node-path" />
          <Education />
          <SectionTransition variant="horizon" spacing="tight" />
          <Contact />
        </div>
      </main>
      <Footer />
    </div>
  );
}

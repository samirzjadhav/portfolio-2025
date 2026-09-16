import { useEffect, useRef, useState } from "react";
import type { SectionId } from "../types";

const SECTIONS: SectionId[] = [
  "home",
  "about",
  "skills",
  "portfolio",
  "contact",
];
const ACTIVATION_RATIO = 0.3;

function resolveActiveSection(): SectionId {
  let current: SectionId = SECTIONS[0];
  const threshold = window.innerHeight * ACTIVATION_RATIO;

  for (const sectionId of SECTIONS) {
    const element = document.getElementById(sectionId);
    if (!element) continue;

    if (element.getBoundingClientRect().top <= threshold) {
      current = sectionId;
    }
  }

  return current;
}

export function useScrollSpy(): SectionId {
  const [activeSection, setActiveSection] = useState<SectionId>(SECTIONS[0]);
  const activeSectionRef = useRef<SectionId>(SECTIONS[0]);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    const updateActiveSection = () => {
      frameRef.current = 0;

      const nextSection = resolveActiveSection();
      if (nextSection === activeSectionRef.current) return;

      activeSectionRef.current = nextSection;
      setActiveSection(nextSection);
    };

    const handleScroll = () => {
      if (frameRef.current) return;
      frameRef.current = requestAnimationFrame(updateActiveSection);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  return activeSection;
}

import { useEffect, useRef, useState } from "react";
import type { SectionId } from "../types";

const SECTIONS: SectionId[] = [
  "home",
  "about",
  "skills",
  "building",
  "experience",
  "stats",
  "achievements",
  "education",
  "portfolio",
  "contact",
];

function pickActiveSection(ratios: Map<SectionId, number>): SectionId {
  let best: SectionId = SECTIONS[0];
  let bestRatio = -1;

  for (const sectionId of SECTIONS) {
    const ratio = ratios.get(sectionId) ?? 0;
    if (ratio > bestRatio) {
      bestRatio = ratio;
      best = sectionId;
    }
  }

  return best;
}

export function useScrollSpy(): SectionId {
  const [activeSection, setActiveSection] = useState<SectionId>(SECTIONS[0]);
  const activeSectionRef = useRef<SectionId>(SECTIONS[0]);
  const ratiosRef = useRef<Map<SectionId, number>>(new Map());

  useEffect(() => {
    const elements = SECTIONS.map((sectionId) => ({
      sectionId,
      element: document.getElementById(sectionId),
    })).filter(
      (entry): entry is { sectionId: SectionId; element: HTMLElement } =>
        entry.element !== null
    );

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const sectionId = entry.target.id as SectionId;
          ratiosRef.current.set(sectionId, entry.intersectionRatio);
        }

        const nextSection = pickActiveSection(ratiosRef.current);
        if (nextSection === activeSectionRef.current) return;

        activeSectionRef.current = nextSection;
        setActiveSection(nextSection);
      },
      {
        root: null,
        rootMargin: "-20% 0px -55% 0px",
        threshold: [0, 0.15, 0.3, 0.45, 0.6],
      }
    );

    for (const { element } of elements) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  return activeSection;
}

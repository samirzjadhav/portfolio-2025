import { useReducedMotion, type Variants } from "framer-motion";
import { useMemo } from "react";
import { projectDetailReveal, projectDetailStagger } from "../motion/variants";

export function useFooterMotion() {
  const reduceMotion = useReducedMotion();

  return useMemo(() => {
    const blockReveal: Variants = projectDetailReveal(reduceMotion, {
      distance: 18,
      scale: 0.985,
      duration: 0.4,
    });

    const linkReveal: Variants = projectDetailReveal(reduceMotion, {
      distance: 10,
      scale: 0.99,
      duration: 0.32,
    });

    return {
      reduceMotion: reduceMotion ?? false,
      shellReveal: projectDetailReveal(reduceMotion, {
        distance: 24,
        scale: 0.98,
        duration: 0.48,
      }),
      blockReveal,
      blockStagger: projectDetailStagger(reduceMotion, 0.08, 0.06),
      linkReveal,
      linkStagger: projectDetailStagger(reduceMotion, 0.04, 0.02),
      socialStagger: projectDetailStagger(reduceMotion, 0.06, 0.04),
      bottomReveal: projectDetailReveal(reduceMotion, {
        distance: 12,
        scale: 1,
        duration: 0.36,
      }),
    };
  }, [reduceMotion]);
}

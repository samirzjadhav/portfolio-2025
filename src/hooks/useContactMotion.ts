import { useReducedMotion, type Variants } from "framer-motion";
import { useMemo } from "react";
import { MOTION_EASE } from "../motion/tokens";
import { projectDetailReveal, projectDetailStagger } from "../motion/variants";

export function useContactMotion() {
  const reduceMotion = useReducedMotion();

  return useMemo(() => {
    const fieldReveal: Variants = projectDetailReveal(reduceMotion, {
      distance: 14,
      scale: 0.99,
      duration: 0.36,
    });

    const channelReveal: Variants = projectDetailReveal(reduceMotion, {
      distance: 12,
      scale: 0.98,
      duration: 0.34,
    });

    const successIcon: Variants = reduceMotion
      ? {
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { duration: 0.15 } },
        }
      : {
          hidden: { opacity: 0, scale: 0.5, rotate: -90 },
          visible: {
            opacity: 1,
            scale: 1,
            rotate: 0,
            transition: { type: "spring", stiffness: 420, damping: 18 },
          },
        };

    return {
      reduceMotion: reduceMotion ?? false,
      shellReveal: projectDetailReveal(reduceMotion, {
        distance: 22,
        scale: 0.985,
        duration: 0.42,
      }),
      fieldReveal,
      fieldStagger: projectDetailStagger(reduceMotion, 0.06, 0.03),
      channelReveal,
      channelStagger: projectDetailStagger(reduceMotion, 0.07, 0.04),
      infoStagger: projectDetailStagger(reduceMotion, 0.08, 0.05),
      submitReveal: projectDetailReveal(reduceMotion, {
        distance: 12,
        scale: 0.98,
        duration: 0.34,
      }),
      successBanner: reduceMotion
        ? {
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { duration: 0.15 } },
            exit: { opacity: 0, transition: { duration: 0.12 } },
          }
        : {
            hidden: { opacity: 0, y: 10, scale: 0.97 },
            visible: {
              opacity: 1,
              y: 0,
              scale: 1,
              transition: { duration: 0.32, ease: MOTION_EASE },
            },
            exit: {
              opacity: 0,
              y: -8,
              scale: 0.98,
              transition: { duration: 0.18, ease: MOTION_EASE },
            },
          },
      successIcon,
      successGlow: reduceMotion
        ? undefined
        : {
            initial: { opacity: 0, scale: 0.8 },
            animate: {
              opacity: [0, 0.45, 0],
              scale: [0.85, 1.15, 1.25],
            },
            transition: { duration: 0.75, ease: MOTION_EASE },
          },
      channelHover: reduceMotion
        ? undefined
        : {
            y: -2,
            scale: 1.01,
            transition: { duration: 0.22, ease: MOTION_EASE },
          },
      channelTap: reduceMotion ? undefined : { scale: 0.985 },
      iconHover: reduceMotion
        ? undefined
        : { scale: 1.08, rotate: -4, transition: { duration: 0.22 } },
      arrowHover: reduceMotion
        ? undefined
        : { x: 4, opacity: 1, transition: { duration: 0.22 } },
      submitTap: reduceMotion ? undefined : { scale: 0.97 },
      submitHover: reduceMotion
        ? undefined
        : { y: -1, scale: 1.02, transition: { duration: 0.2 } },
    };
  }, [reduceMotion]);
}

import type { Transition, Variants } from "framer-motion";
import { MOTION_DURATION, MOTION_EASE } from "./tokens";

export type ReduceMotion = boolean | null;

function isReduced(reduceMotion: ReduceMotion): boolean {
  return reduceMotion === true;
}

function fadeTransition(
  reduceMotion: ReduceMotion,
  duration: number = MOTION_DURATION.normal
): Transition {
  return { duration: isReduced(reduceMotion) ? MOTION_DURATION.fast : duration };
}

export function fadeUp(
  reduceMotion: ReduceMotion,
  distance = 24
): Variants {
  return {
    hidden: isReduced(reduceMotion)
      ? { opacity: 0 }
      : { opacity: 0, y: distance },
    visible: {
      opacity: 1,
      y: 0,
      transition: { ...fadeTransition(reduceMotion, 0.55), ease: MOTION_EASE },
    },
    exit: isReduced(reduceMotion)
      ? { opacity: 0 }
      : { opacity: 0, y: distance * 0.5 },
  };
}

export function fadeIn(reduceMotion: ReduceMotion): Variants {
  return {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: fadeTransition(reduceMotion, 0.5),
    },
    exit: { opacity: 0 },
  };
}

export function slide(
  reduceMotion: ReduceMotion,
  options: {
    axis?: "x" | "y";
    distance?: number;
    direction?: 1 | -1;
  } = {}
): Variants {
  const { axis = "x", distance = 30, direction = -1 } = options;
  const offset = distance * direction;
  const hidden =
    axis === "x" ? { opacity: 0, x: offset } : { opacity: 0, y: offset };

  return {
    hidden: isReduced(reduceMotion) ? { opacity: 0 } : hidden,
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { ...fadeTransition(reduceMotion, 0.7), ease: MOTION_EASE },
    },
    exit: isReduced(reduceMotion)
      ? { opacity: 0 }
      : axis === "x"
        ? { opacity: 0, x: -offset * 0.5 }
        : { opacity: 0, y: -offset * 0.5 },
  };
}

export function stagger(
  reduceMotion: ReduceMotion,
  staggerChildren = 0.08,
  delayChildren = 0.06
): Variants {
  return {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: isReduced(reduceMotion) ? 0 : staggerChildren,
        delayChildren: isReduced(reduceMotion) ? 0 : delayChildren,
      },
    },
  };
}

export function scaleIn(
  reduceMotion: ReduceMotion,
  from = 0.92
): Variants {
  return {
    hidden: isReduced(reduceMotion)
      ? { opacity: 0 }
      : { opacity: 0, scale: from },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { ...fadeTransition(reduceMotion, 0.6), ease: MOTION_EASE },
    },
    exit: isReduced(reduceMotion)
      ? { opacity: 0 }
      : { opacity: 0, scale: from },
  };
}

export function pageTransition(reduceMotion: ReduceMotion): Variants {
  return premiumPageTransition(reduceMotion);
}

export function premiumPageTransition(reduceMotion: ReduceMotion): Variants {
  if (isReduced(reduceMotion)) {
    return {
      initial: { opacity: 0 },
      animate: {
        opacity: 1,
        transition: { duration: MOTION_DURATION.fast },
      },
      exit: {
        opacity: 0,
        transition: { duration: 0.12 },
      },
    };
  }

  // Opacity-only: transform on this shell breaks position:fixed (e.g. Navbar).
  return {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.28,
        ease: MOTION_EASE,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.18,
        ease: MOTION_EASE,
      },
    },
  };
}

export function textReveal(
  reduceMotion: ReduceMotion,
  distance = 40
): Variants {
  return {
    hidden: isReduced(reduceMotion)
      ? { opacity: 0 }
      : { opacity: 0, y: distance },
    visible: {
      opacity: 1,
      y: 0,
      transition: { ...fadeTransition(reduceMotion, 0.7), ease: "easeOut" },
    },
  };
}

export function textRevealContainer(reduceMotion: ReduceMotion): Variants {
  return stagger(reduceMotion, 0.12, 0.1);
}

export function springReveal(
  reduceMotion: ReduceMotion,
  options: { x?: number; y?: number } = {}
): Variants {
  const { x = 0, y = 16 } = options;

  return {
    hidden: isReduced(reduceMotion)
      ? { opacity: 0 }
      : { opacity: 0, x, y },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: isReduced(reduceMotion)
        ? { duration: MOTION_DURATION.fast }
        : {
            type: "spring",
            stiffness: 90,
            damping: 18,
            mass: 0.8,
            when: "beforeChildren",
            staggerChildren: 0.1,
          },
    },
  };
}

export function springChild(
  reduceMotion: ReduceMotion,
  x = -16
): Variants {
  return {
    hidden: isReduced(reduceMotion) ? { opacity: 0 } : { opacity: 0, x },
    visible: {
      opacity: 1,
      x: 0,
      transition: isReduced(reduceMotion)
        ? { duration: MOTION_DURATION.fast }
        : { type: "spring", stiffness: 120, damping: 16 },
    },
  };
}

export function dotReveal(reduceMotion: ReduceMotion): Variants {
  return {
    hidden: isReduced(reduceMotion) ? { opacity: 0 } : { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: isReduced(reduceMotion)
        ? { duration: MOTION_DURATION.fast }
        : { type: "spring", stiffness: 260, damping: 14, delay: 0.05 },
    },
  };
}

export function lineReveal(
  reduceMotion: ReduceMotion,
  delay = 0.15
): Variants {
  return {
    hidden: { scaleY: 0, opacity: 0 },
    visible: {
      scaleY: 1,
      opacity: 1,
      transition: {
        duration: isReduced(reduceMotion) ? MOTION_DURATION.fast : 0.8,
        ease: MOTION_EASE,
        delay: isReduced(reduceMotion) ? 0 : delay,
      },
    },
  };
}

export function timelineReveal(reduceMotion: ReduceMotion): Variants {
  return {
    hidden: isReduced(reduceMotion) ? { opacity: 0 } : { scaleY: 0 },
    visible: {
      scaleY: 1,
      transition: {
        duration: isReduced(reduceMotion) ? MOTION_DURATION.fast : 1.2,
        ease: MOTION_EASE,
      },
    },
  };
}

export function chipReveal(reduceMotion: ReduceMotion): Variants {
  return {
    hidden: isReduced(reduceMotion)
      ? { opacity: 0 }
      : { opacity: 0, scale: 0.8, y: 8 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: isReduced(reduceMotion)
        ? { duration: MOTION_DURATION.fast }
        : { type: "spring", stiffness: 200, damping: 14 },
    },
  };
}

export function cardLift(reduceMotion: ReduceMotion): Variants {
  return {
    hidden: isReduced(reduceMotion)
      ? { opacity: 0 }
      : { opacity: 0, y: 24, scale: 0.97 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: isReduced(reduceMotion) ? MOTION_DURATION.fast : 0.6,
        ease: MOTION_EASE,
      },
    },
  };
}

export function cellReveal(reduceMotion: ReduceMotion): Variants {
  return {
    hidden: isReduced(reduceMotion) ? { opacity: 0 } : { opacity: 0, scale: 0.4 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: isReduced(reduceMotion)
        ? { duration: MOTION_DURATION.fast }
        : { type: "spring", stiffness: 460, damping: 26, mass: 0.4 },
    },
  };
}

export function navReveal(
  reduceMotion: ReduceMotion,
  options: { slide?: boolean } = {}
): Variants {
  const useSlide = options.slide !== false && !isReduced(reduceMotion);

  return {
    hidden: useSlide ? { opacity: 0, y: -60 } : { opacity: 0 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: isReduced(reduceMotion) ? MOTION_DURATION.fast : 0.6 },
    },
  };
}

export function heroCharReveal(reduceMotion: ReduceMotion): Variants {
  return {
    hidden: isReduced(reduceMotion) ? { opacity: 0 } : { opacity: 1, y: "110%" },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: MOTION_EASE },
    },
  };
}

export function heroCharContainer(reduceMotion: ReduceMotion): Variants {
  return stagger(reduceMotion, 0.045, 0.15);
}

export function heroSubtitleWord(reduceMotion: ReduceMotion): Variants {
  return {
    hidden: isReduced(reduceMotion)
      ? { opacity: 0 }
      : { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: MOTION_EASE },
    },
  };
}

export function heroSubtitleContainer(reduceMotion: ReduceMotion): Variants {
  return stagger(reduceMotion, 0.08, 0.55);
}

export function heroLineReveal(reduceMotion: ReduceMotion): Variants {
  return {
    hidden: isReduced(reduceMotion)
      ? { opacity: 0 }
      : { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: MOTION_EASE },
    },
  };
}

export function heroLinesContainer(reduceMotion: ReduceMotion): Variants {
  return stagger(reduceMotion, 0.1, 0.85);
}

export function heroCtaItem(reduceMotion: ReduceMotion): Variants {
  return {
    hidden: isReduced(reduceMotion)
      ? { opacity: 0 }
      : { opacity: 0, y: 24, scale: 0.94 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 260, damping: 20, mass: 0.7 },
    },
  };
}

export function heroCtaContainer(reduceMotion: ReduceMotion): Variants {
  return stagger(reduceMotion, 0.1, 1.05);
}

export function heroScrollCue(reduceMotion: ReduceMotion): Variants {
  return {
    hidden: isReduced(reduceMotion) ? { opacity: 0 } : { opacity: 0, y: -8 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { delay: 1.35, duration: 0.5, ease: MOTION_EASE },
    },
  };
}

export interface ScrollRevealOptions {
  axis?: "x" | "y";
  distance?: number;
  direction?: 1 | -1;
  scale?: number;
  /** @deprecated Blur is ignored — opacity/transform only for performance. */
  blur?: number;
  duration?: number;
}

export function scrollReveal(
  reduceMotion: ReduceMotion,
  options: ScrollRevealOptions = {}
): Variants {
  const {
    axis = "y",
    distance = 36,
    direction = 1,
    scale = 0.96,
    duration = 0.62,
  } = options;

  if (isReduced(reduceMotion)) {
    return {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { duration: MOTION_DURATION.fast },
      },
    };
  }

  const offset = distance * direction;
  const hidden =
    axis === "x"
      ? { opacity: 0, x: offset, scale }
      : { opacity: 0, y: offset, scale };

  return {
    hidden,
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      transition: { duration, ease: MOTION_EASE },
    },
  };
}

export function scrollHeading(reduceMotion: ReduceMotion): Variants {
  return scrollReveal(reduceMotion, {
    distance: 28,
    scale: 0.98,
    duration: 0.58,
  });
}

export function scrollSubheading(reduceMotion: ReduceMotion): Variants {
  return scrollReveal(reduceMotion, {
    distance: 20,
    scale: 0.99,
    duration: 0.52,
  });
}

export function scrollRevealLeft(
  reduceMotion: ReduceMotion,
  distance = 44
): Variants {
  return scrollReveal(reduceMotion, {
    axis: "x",
    distance,
    direction: -1,
    scale: 0.95,
  });
}

export function scrollRevealRight(
  reduceMotion: ReduceMotion,
  distance = 44
): Variants {
  return scrollReveal(reduceMotion, {
    axis: "x",
    distance,
    direction: 1,
    scale: 0.95,
  });
}

export function scrollItem(
  reduceMotion: ReduceMotion,
  index = 0
): Variants {
  const fromLeft = index % 2 === 0;
  return scrollReveal(reduceMotion, {
    axis: "x",
    distance: 32,
    direction: fromLeft ? -1 : 1,
    scale: 0.94,
    duration: 0.6,
  });
}

export function scrollStagger(
  reduceMotion: ReduceMotion,
  staggerChildren = 0.1,
  delayChildren = 0.06
): Variants {
  return stagger(reduceMotion, staggerChildren, delayChildren);
}

export function projectDetailTransition(reduceMotion: ReduceMotion): Variants {
  if (isReduced(reduceMotion)) {
    return {
      initial: { opacity: 0 },
      animate: { opacity: 1, transition: { duration: MOTION_DURATION.fast } },
      exit: { opacity: 0, transition: { duration: 0.12 } },
    };
  }

  return {
    initial: {
      opacity: 0,
      y: 28,
      scale: 0.98,
    },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.45, ease: MOTION_EASE },
    },
    exit: {
      opacity: 0,
      y: -18,
      scale: 0.99,
      transition: { duration: 0.28, ease: MOTION_EASE },
    },
  };
}

export function projectTagReveal(reduceMotion: ReduceMotion): Variants {
  return {
    hidden: isReduced(reduceMotion)
      ? { opacity: 0 }
      : { opacity: 0, scale: 0.88, y: 8 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: "spring", stiffness: 380, damping: 22, mass: 0.5 },
    },
  };
}

export interface ProjectDetailRevealOptions {
  axis?: "x" | "y";
  distance?: number;
  direction?: 1 | -1;
  scale?: number;
  duration?: number;
}

export function projectDetailReveal(
  reduceMotion: ReduceMotion,
  options: ProjectDetailRevealOptions = {}
): Variants {
  const {
    axis = "y",
    distance = 18,
    direction = 1,
    scale = 0.98,
    duration = 0.4,
  } = options;

  if (isReduced(reduceMotion)) {
    return {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { duration: MOTION_DURATION.fast },
      },
    };
  }

  const offset = distance * direction;
  const hidden =
    axis === "x"
      ? { opacity: 0, x: offset, scale }
      : { opacity: 0, y: offset, scale };

  return {
    hidden,
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      transition: { duration, ease: MOTION_EASE },
    },
  };
}

export function projectDetailStagger(
  reduceMotion: ReduceMotion,
  staggerChildren = 0.05,
  delayChildren = 0.02
): Variants {
  return stagger(reduceMotion, staggerChildren, delayChildren);
}

export function projectDetailHeroTitle(reduceMotion: ReduceMotion): Variants {
  return projectDetailReveal(reduceMotion, {
    distance: 22,
    scale: 0.97,
    duration: 0.44,
  });
}

export function projectDetailHeroMedia(reduceMotion: ReduceMotion): Variants {
  return projectDetailReveal(reduceMotion, {
    axis: "x",
    distance: 28,
    direction: 1,
    scale: 0.94,
    duration: 0.46,
  });
}

export function projectDetailHeroCta(reduceMotion: ReduceMotion): Variants {
  if (isReduced(reduceMotion)) {
    return {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { duration: MOTION_DURATION.fast },
      },
    };
  }

  return {
    hidden: { opacity: 0, y: 14, scale: 0.96 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 420, damping: 26, mass: 0.55 },
    },
  };
}

export function projectDetailSectionShell(reduceMotion: ReduceMotion): Variants {
  return projectDetailReveal(reduceMotion, {
    distance: 22,
    scale: 0.985,
    duration: 0.42,
  });
}

export function projectDetailSectionTitle(reduceMotion: ReduceMotion): Variants {
  return projectDetailReveal(reduceMotion, {
    distance: 14,
    scale: 0.99,
    duration: 0.38,
  });
}

export function projectDetailSectionBody(reduceMotion: ReduceMotion): Variants {
  return projectDetailReveal(reduceMotion, {
    distance: 16,
    scale: 0.99,
    duration: 0.4,
  });
}

export function projectDetailListItem(reduceMotion: ReduceMotion): Variants {
  return projectDetailReveal(reduceMotion, {
    distance: 12,
    scale: 0.99,
    duration: 0.36,
  });
}

export function projectDetailTechChip(reduceMotion: ReduceMotion): Variants {
  if (isReduced(reduceMotion)) {
    return {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { duration: MOTION_DURATION.fast },
      },
    };
  }

  return {
    hidden: { opacity: 0, y: 12, scale: 0.94 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 400, damping: 24, mass: 0.5 },
    },
  };
}

export function projectDetailTechPanel(reduceMotion: ReduceMotion): Variants {
  return projectDetailReveal(reduceMotion, {
    distance: 14,
    scale: 0.99,
    duration: 0.38,
  });
}

export function projectDetailCtaCard(reduceMotion: ReduceMotion): Variants {
  return projectDetailHeroCta(reduceMotion);
}

export function projectDetailGallery(reduceMotion: ReduceMotion): Variants {
  return projectDetailReveal(reduceMotion, {
    distance: 20,
    scale: 0.96,
    duration: 0.44,
  });
}

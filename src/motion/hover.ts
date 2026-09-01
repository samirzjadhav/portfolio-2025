import type { TargetAndTransition, Transition } from "framer-motion";
import type { ReduceMotion } from "./variants";

function isReduced(reduceMotion: ReduceMotion): boolean {
  return reduceMotion === true;
}

const springTransition: Transition = {
  type: "spring",
  stiffness: 320,
  damping: 22,
};

export function hoverLift(
  reduceMotion: ReduceMotion,
  y = -6,
  scale?: number
): TargetAndTransition | undefined {
  if (isReduced(reduceMotion)) return undefined;
  return scale !== undefined ? { y, scale } : { y };
}

export function hoverScale(
  reduceMotion: ReduceMotion,
  scale = 1.05
): TargetAndTransition | undefined {
  if (isReduced(reduceMotion)) return undefined;
  return { scale };
}

export function hoverScaleColor(
  reduceMotion: ReduceMotion,
  scale = 1.1,
  color = "#c770c7"
): TargetAndTransition | undefined {
  if (isReduced(reduceMotion)) return undefined;
  return { scale, color };
}

export function hoverCard(reduceMotion: ReduceMotion): TargetAndTransition | undefined {
  if (isReduced(reduceMotion)) return undefined;
  return {
    y: -6,
    scale: 1.02,
    borderColor: "rgba(255,255,255,0.16)",
    boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
  };
}

export function hoverChip(
  reduceMotion: ReduceMotion,
  scale = 1.08
): TargetAndTransition | undefined {
  if (isReduced(reduceMotion)) return undefined;
  return { scale };
}

export function hoverChipLift(
  reduceMotion: ReduceMotion
): TargetAndTransition | undefined {
  if (isReduced(reduceMotion)) return undefined;
  return {
    scale: 1.08,
    y: -3,
    transition: { type: "spring", stiffness: 400, damping: 12 },
  };
}

export function hoverNudge(
  reduceMotion: ReduceMotion,
  x = 3
): TargetAndTransition | undefined {
  if (isReduced(reduceMotion)) return undefined;
  return { x };
}

export function hoverIcon(
  reduceMotion: ReduceMotion,
  scale = 1.08,
  rotate = 4
): TargetAndTransition | undefined {
  if (isReduced(reduceMotion)) return undefined;
  return {
    scale,
    rotate,
    transition: { type: "spring", stiffness: 320, damping: 18 },
  };
}

export function hoverProjectCard(
  reduceMotion: ReduceMotion
): TargetAndTransition | undefined {
  if (isReduced(reduceMotion)) return undefined;
  return {
    scale: 1.05,
    y: -6,
    transition: { type: "spring", stiffness: 180, damping: 12 },
  };
}

export function hoverRepoCard(
  reduceMotion: ReduceMotion
): TargetAndTransition | undefined {
  if (isReduced(reduceMotion)) return undefined;
  return {
    y: -8,
    transition: springTransition,
  };
}

export function hoverExperienceCard(
  reduceMotion: ReduceMotion
): TargetAndTransition | undefined {
  if (isReduced(reduceMotion)) return undefined;
  return {
    y: -6,
    scale: 1.01,
    transition: { type: "spring", stiffness: 300, damping: 20 },
  };
}

export function hoverDot(
  reduceMotion: ReduceMotion,
  scale = 1.3
): TargetAndTransition | undefined {
  if (isReduced(reduceMotion)) return undefined;
  return { scale };
}

export function tapScale(
  reduceMotion: ReduceMotion,
  scale = 0.93
): TargetAndTransition | undefined {
  if (isReduced(reduceMotion)) return undefined;
  return { scale };
}

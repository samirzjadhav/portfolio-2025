import {
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import type { PointerEvent as ReactPointerEvent } from "react";
import { useCallback, useMemo, useRef, useState } from "react";

const TILT_SPRING = { stiffness: 260, damping: 24, mass: 0.45 };
const GLOW_SPRING = { stiffness: 220, damping: 26, mass: 0.4 };

export function useProjectCardTilt(maxTilt = 7) {
  const reduceMotion = useReducedMotion();
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const isInteractive = useMemo(
    () =>
      maxTilt > 0 &&
      reduceMotion !== true &&
      typeof window !== "undefined" &&
      window.matchMedia("(pointer: fine)").matches,
    [maxTilt, reduceMotion]
  );

  const pointerX = useMotionValue(0.5);
  const pointerY = useMotionValue(0.5);
  const glowX = useMotionValue(0);
  const glowY = useMotionValue(0);

  const rotateX = useTransform(pointerY, [0, 1], [maxTilt, -maxTilt]);
  const rotateY = useTransform(pointerX, [0, 1], [-maxTilt, maxTilt]);
  const smoothRotateX = useSpring(rotateX, TILT_SPRING);
  const smoothRotateY = useSpring(rotateY, TILT_SPRING);
  const smoothGlowX = useSpring(glowX, GLOW_SPRING);
  const smoothGlowY = useSpring(glowY, GLOW_SPRING);

  const handlePointerMove = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      if (!isInteractive) return;

      const element = cardRef.current;
      if (!element) return;

      const rect = element.getBoundingClientRect();
      pointerX.set((event.clientX - rect.left) / rect.width);
      pointerY.set((event.clientY - rect.top) / rect.height);
      glowX.set(event.clientX - rect.left);
      glowY.set(event.clientY - rect.top);
    },
    [glowX, glowY, isInteractive, pointerX, pointerY]
  );

  const resetPointer = useCallback(() => {
    pointerX.set(0.5);
    pointerY.set(0.5);

    const element = cardRef.current;
    if (element) {
      glowX.set(element.clientWidth / 2);
      glowY.set(element.clientHeight / 2);
    }
  }, [glowX, glowY, pointerX, pointerY]);

  const handlePointerEnter = useCallback(() => {
    setIsHovered(true);
    resetPointer();
  }, [resetPointer]);

  const handlePointerLeave = useCallback(() => {
    setIsHovered(false);
    resetPointer();
  }, [resetPointer]);

  return {
    cardRef,
    isInteractive,
    isHovered,
    smoothRotateX,
    smoothRotateY,
    smoothGlowX,
    smoothGlowY,
    handlePointerMove,
    handlePointerEnter,
    handlePointerLeave,
  };
}

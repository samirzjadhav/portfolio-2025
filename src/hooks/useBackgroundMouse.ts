import {
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect, useMemo } from "react";

const SPRING = { stiffness: 70, damping: 22, mass: 0.5 };

export function useBackgroundMouse(enabled = true) {
  const reduceMotion = useReducedMotion();
  const pointerX = useMotionValue(0.5);
  const pointerY = useMotionValue(0.5);

  const isInteractive = useMemo(
    () =>
      enabled &&
      reduceMotion !== true &&
      typeof window !== "undefined" &&
      window.matchMedia("(pointer: fine)").matches,
    [enabled, reduceMotion]
  );

  const smoothX = useSpring(pointerX, isInteractive ? SPRING : { stiffness: 1000, damping: 100 });
  const smoothY = useSpring(pointerY, isInteractive ? SPRING : { stiffness: 1000, damping: 100 });

  const parallaxX = useTransform(smoothX, [0, 1], [-28, 28]);
  const parallaxY = useTransform(smoothY, [0, 1], [-20, 20]);
  const glowX = useTransform(smoothX, (value) => `${value * 100}%`);
  const glowY = useTransform(smoothY, (value) => `${value * 100}%`);

  useEffect(() => {
    if (!isInteractive) return;

    const handleMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      pointerX.set(event.clientX / window.innerWidth);
      pointerY.set(event.clientY / window.innerHeight);
    };

    window.addEventListener("pointermove", handleMove, { passive: true });
    return () => window.removeEventListener("pointermove", handleMove);
  }, [isInteractive, pointerX, pointerY]);

  return {
    isInteractive,
    parallaxX,
    parallaxY,
    glowX,
    glowY,
  };
}

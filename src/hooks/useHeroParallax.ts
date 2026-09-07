import {
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect, useMemo, useRef } from "react";
import { hasFinePointer } from "../utils/motionPreferences";

const POINTER_SPRING = { stiffness: 90, damping: 22, mass: 0.4 };

export function useHeroParallax() {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const pointerX = useMotionValue(0.5);
  const pointerY = useMotionValue(0.5);

  const motionEnabled = reduceMotion !== true;
  const pointerEnabled = motionEnabled && hasFinePointer();

  const instantSpring = { stiffness: 1000, damping: 100 };
  const smoothX = useSpring(
    pointerX,
    pointerEnabled ? POINTER_SPRING : instantSpring
  );
  const smoothY = useSpring(
    pointerY,
    pointerEnabled ? POINTER_SPRING : instantSpring
  );

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const parallaxRange = useMemo(
    () => (motionEnabled ? [0, 72] : [0, 0]),
    [motionEnabled]
  );
  const imageParallaxRange = useMemo(
    () => (motionEnabled ? [0, 96] : [0, 0]),
    [motionEnabled]
  );
  const bgParallaxRange = useMemo(
    () => (motionEnabled ? [0, 36] : [0, 0]),
    [motionEnabled]
  );

  const contentY = useTransform(scrollYProgress, [0, 1], parallaxRange);
  const imageY = useTransform(scrollYProgress, [0, 1], imageParallaxRange);
  const bgY = useTransform(scrollYProgress, [0, 1], bgParallaxRange);

  const imageOffsetX = useTransform(
    smoothX,
    [0, 1],
    pointerEnabled ? [-14, 14] : [0, 0]
  );
  const imageOffsetY = useTransform(
    smoothY,
    [0, 1],
    pointerEnabled ? [-10, 10] : [0, 0]
  );
  const imageRotateX = useTransform(
    smoothY,
    [0, 1],
    pointerEnabled ? [5, -5] : [0, 0]
  );
  const imageRotateY = useTransform(
    smoothX,
    [0, 1],
    pointerEnabled ? [-5, 5] : [0, 0]
  );

  const orbOffsetX = useTransform(
    smoothX,
    [0, 1],
    pointerEnabled ? [-24, 24] : [0, 0]
  );
  const orbOffsetY = useTransform(
    smoothY,
    [0, 1],
    pointerEnabled ? [-18, 18] : [0, 0]
  );

  const gradientX = useTransform(smoothX, (value) => `${value * 100}%`);
  const gradientY = useTransform(smoothY, (value) => `${value * 100}%`);

  useEffect(() => {
    if (!pointerEnabled) return;

    const section = sectionRef.current;
    if (!section) return;

    const handleMove = (event: PointerEvent) => {
      const rect = section.getBoundingClientRect();
      pointerX.set((event.clientX - rect.left) / rect.width);
      pointerY.set((event.clientY - rect.top) / rect.height);
    };

    const handleLeave = () => {
      pointerX.set(0.5);
      pointerY.set(0.5);
    };

    section.addEventListener("pointermove", handleMove, { passive: true });
    section.addEventListener("pointerleave", handleLeave);

    return () => {
      section.removeEventListener("pointermove", handleMove);
      section.removeEventListener("pointerleave", handleLeave);
    };
  }, [pointerEnabled, pointerX, pointerY]);

  return {
    sectionRef,
    reduceMotion: reduceMotion ?? false,
    contentY,
    imageY,
    bgY,
    imageOffsetX,
    imageOffsetY,
    imageRotateX,
    imageRotateY,
    orbOffsetX,
    orbOffsetY,
    gradientX,
    gradientY,
  };
}

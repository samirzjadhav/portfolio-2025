import {
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import type { PointerEvent as ReactPointerEvent } from "react";
import { useCallback, useMemo, useRef } from "react";

const MAGNETIC_SPRING = { stiffness: 180, damping: 18, mass: 0.35 };
const STATIC_SPRING = { stiffness: 1000, damping: 100 };

interface UseMagneticHoverOptions {
  enabled?: boolean;
  /** Pull strength toward the cursor (0–1). Defaults to 0.22. */
  strength?: number;
  /** Maximum offset in pixels. Defaults to 10. */
  maxOffset?: number;
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

export function useMagneticHover({
  enabled = true,
  strength = 0.22,
  maxOffset = 10,
}: UseMagneticHoverOptions = {}) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const offsetX = useMotionValue(0);
  const offsetY = useMotionValue(0);

  const isInteractive = useMemo(
    () =>
      enabled &&
      reduceMotion !== true &&
      typeof window !== "undefined" &&
      window.matchMedia("(pointer: fine)").matches,
    [enabled, reduceMotion]
  );

  const x = useSpring(offsetX, isInteractive ? MAGNETIC_SPRING : STATIC_SPRING);
  const y = useSpring(offsetY, isInteractive ? MAGNETIC_SPRING : STATIC_SPRING);

  const handlePointerMove = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      if (!isInteractive || event.pointerType !== "mouse") return;

      const element = ref.current;
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      offsetX.set(
        clamp((event.clientX - centerX) * strength, -maxOffset, maxOffset)
      );
      offsetY.set(
        clamp((event.clientY - centerY) * strength, -maxOffset, maxOffset)
      );
    },
    [isInteractive, strength, maxOffset, offsetX, offsetY]
  );

  const handlePointerLeave = useCallback(() => {
    offsetX.set(0);
    offsetY.set(0);
  }, [offsetX, offsetY]);

  return {
    ref,
    isInteractive,
    style: { x, y },
    handlers: {
      onPointerMove: handlePointerMove,
      onPointerLeave: handlePointerLeave,
    },
  };
}

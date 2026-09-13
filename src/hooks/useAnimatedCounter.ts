import { useEffect, useState } from "react";

interface UseAnimatedCounterOptions {
  enabled: boolean;
  duration?: number;
  reduceMotion?: boolean;
}

export function useAnimatedCounter(
  target: number | null,
  { enabled, duration = 1200, reduceMotion = false }: UseAnimatedCounterOptions
): number | null {
  const [animated, setAnimated] = useState(0);

  useEffect(() => {
    if (target === null || !enabled || reduceMotion) {
      return;
    }

    let frame = 0;
    let startTime: number | null = null;

    const animate = (timestamp: number) => {
      if (startTime === null) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setAnimated(Math.round(target * eased));

      if (progress < 1) {
        frame = requestAnimationFrame(animate);
      }
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [target, enabled, duration, reduceMotion]);

  if (target === null) {
    return null;
  }

  if (!enabled || reduceMotion) {
    return target;
  }

  return animated;
}

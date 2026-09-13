import { useReducedMotion } from "framer-motion";
import { useAnimatedCounter } from "../hooks/useAnimatedCounter";
import type { DeveloperStat } from "../hooks/useDeveloperStats";

interface AnimatedStatValueProps {
  stat: DeveloperStat;
  isInView: boolean;
}

export default function AnimatedStatValue({ stat, isInView }: AnimatedStatValueProps) {
  const reduceMotion = useReducedMotion();
  const animatedValue = useAnimatedCounter(stat.value, {
    enabled: isInView && stat.status === "ready",
    reduceMotion: reduceMotion ?? false,
  });

  if (stat.status === "loading") {
    return (
      <span className="dev-stat-value dev-stat-value--loading" aria-hidden="true">
        <span className="dev-stat-skeleton" />
      </span>
    );
  }

  if (stat.status === "unavailable" || animatedValue === null) {
    return (
      <span className="dev-stat-value dev-stat-value--unavailable" aria-label="Unavailable">
        —
      </span>
    );
  }

  return (
    <span className="dev-stat-value" aria-live="polite">
      {animatedValue.toLocaleString()}
    </span>
  );
}

import type { CSSProperties } from "react";
import { motion, type MotionValue } from "framer-motion";

interface HeroFloatingElementsProps {
  offsetX: MotionValue<number>;
  offsetY: MotionValue<number>;
  reduced?: boolean;
}

const ORBS = [
  {
    className: "hero-orb hero-orb-a w-28 h-28 md:w-36 md:h-36 top-[10%] left-[6%]",
    delay: 0,
    duration: 7,
  },
  {
    className: "hero-orb hero-orb-b w-20 h-20 md:w-24 md:h-24 top-[62%] left-[12%]",
    delay: 1.2,
    duration: 8.5,
  },
  {
    className: "hero-orb hero-orb-c w-16 h-16 md:w-20 md:h-20 top-[18%] right-[10%]",
    delay: 0.6,
    duration: 9,
  },
  {
    className: "hero-orb hero-orb-d w-24 h-24 md:w-32 md:h-32 bottom-[14%] right-[8%]",
    delay: 1.8,
    duration: 7.5,
  },
] as const;

export default function HeroFloatingElements({
  offsetX,
  offsetY,
  reduced = false,
}: HeroFloatingElementsProps) {
  if (reduced) return null;

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      <motion.div
        className="absolute inset-0"
        style={{ x: offsetX, y: offsetY }}
      >
        {ORBS.map((orb) => (
          <div
            key={orb.className}
            className={orb.className}
            style={
              {
                "--float-delay": `${orb.delay}s`,
                "--float-duration": `${orb.duration}s`,
              } as CSSProperties
            }
          />
        ))}
      </motion.div>
    </div>
  );
}

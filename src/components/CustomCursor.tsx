import { motion } from "framer-motion";
import { useCustomCursor, type CursorVariant } from "../hooks/useCustomCursor";

const VARIANT_CONFIG: Record<
  CursorVariant,
  { ring: number; dot: number; ringOpacity: number; dotScale: number }
> = {
  default: { ring: 34, dot: 6, ringOpacity: 0.45, dotScale: 1 },
  hover: { ring: 44, dot: 5, ringOpacity: 0.55, dotScale: 0.85 },
  pointer: { ring: 50, dot: 4, ringOpacity: 0.75, dotScale: 0.5 },
  project: { ring: 62, dot: 5, ringOpacity: 0.85, dotScale: 0.65 },
};

export default function CustomCursor() {
  const { active, variant, isPressed, dotX, dotY, ringX, ringY } =
    useCustomCursor();
  const config = VARIANT_CONFIG[variant];

  if (!active) return null;

  return (
    <div
      className="custom-cursor-root"
      aria-hidden="true"
      data-cursor-variant={variant}
    >
      <motion.div
        className="custom-cursor-ring"
        style={{
          x: ringX,
          y: ringY,
          width: config.ring,
          height: config.ring,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isPressed ? 0.88 : 1,
          opacity: config.ringOpacity,
          borderWidth: variant === "project" ? 2 : variant === "pointer" ? 1.5 : 1,
        }}
        transition={{ type: "spring", stiffness: 420, damping: 26, mass: 0.5 }}
        data-variant={variant}
      />
      <motion.div
        className="custom-cursor-dot"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isPressed ? 0.75 : config.dotScale,
          opacity: variant === "pointer" ? 0.9 : 1,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.4 }}
      />
    </div>
  );
}

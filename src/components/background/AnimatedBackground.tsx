import { motion, useMotionTemplate, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { useBackgroundMouse } from "../../hooks/useBackgroundMouse";
import "./animated-background.css";

export type BackgroundIntensity = "subtle" | "medium";

export interface AnimatedBackgroundProps {
  /** Visual strength of effects. Defaults to subtle. */
  intensity?: BackgroundIntensity;
  /** Enable pointer-reactive glow and parallax. Defaults to true. */
  mouseInteraction?: boolean;
  className?: string;
}

const PARTICLES = [
  { top: "10%", left: "12%", size: 2, delay: "0s", duration: "15s" },
  { top: "38%", left: "24%", size: 2, delay: "0.6s", duration: "16s" },
  { top: "52%", left: "64%", size: 2, delay: "2s", duration: "20s" },
  { top: "68%", left: "18%", size: 3, delay: "0.8s", duration: "17s" },
  { top: "16%", left: "44%", size: 2, delay: "2.4s", duration: "14s" },
  { top: "84%", left: "52%", size: 2, delay: "1.8s", duration: "18s" },
] as const;

export default function AnimatedBackground({
  intensity = "subtle",
  mouseInteraction = true,
  className = "",
}: AnimatedBackgroundProps) {
  const reduceMotion = useReducedMotion();
  const reduced = reduceMotion === true;
  const [isPaused, setIsPaused] = useState(false);
  const { isInteractive, parallaxX, parallaxY, glowX, glowY } =
    useBackgroundMouse(mouseInteraction && !reduced);

  const mouseGlow = useMotionTemplate`radial-gradient(520px circle at ${glowX} ${glowY}, rgba(199, 112, 199, 0.14), transparent 68%)`;

  useEffect(() => {
    const handleVisibility = () => {
      setIsPaused(document.hidden);
    };

    handleVisibility();
    document.addEventListener("visibilitychange", handleVisibility);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  return (
    <div
      className={`animated-background ${isPaused ? "ab-paused" : ""} ${className}`.trim()}
      data-intensity={intensity}
      data-reduced={reduced ? "true" : "false"}
      aria-hidden="true"
    >
      <div className="ab-layer ab-gradient" />
      <div className="ab-layer ab-gradient-overlay" />

      {!reduced ? (
        <>
          <div className="ab-layer ab-grid" />

          <div className="ab-layer ab-particles">
            {PARTICLES.map((particle, index) => (
              <span
                key={index}
                className="ab-particle"
                style={{
                  top: particle.top,
                  left: particle.left,
                  width: particle.size,
                  height: particle.size,
                  ["--ab-delay" as string]: particle.delay,
                  ["--ab-duration" as string]: particle.duration,
                }}
              />
            ))}
          </div>

          <motion.div
            className="ab-layer ab-orbs-layer"
            style={isInteractive ? { x: parallaxX, y: parallaxY } : undefined}
          >
            <div
              className="ab-orb ab-orb-a"
              style={{
                ["--ab-orb-duration" as string]: "22s",
                ["--ab-orb-delay" as string]: "0s",
              }}
            />
            <div
              className="ab-orb ab-orb-b"
              style={{
                ["--ab-orb-duration" as string]: "26s",
                ["--ab-orb-delay" as string]: "1.5s",
              }}
            />
          </motion.div>

          {isInteractive ? (
            <motion.div
              className="ab-layer ab-mouse-glow"
              style={{ background: mouseGlow }}
            />
          ) : null}
        </>
      ) : null}

      <div className="ab-layer ab-vignette" />
    </div>
  );
}

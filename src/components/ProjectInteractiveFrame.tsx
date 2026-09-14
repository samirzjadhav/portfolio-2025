import type { ReactNode } from "react";
import { motion, useMotionTemplate, useReducedMotion } from "framer-motion";
import { useProjectCardTilt } from "../hooks/useProjectCardTilt";
import ProjectCardMotionContext from "./ProjectCardMotionContext";

interface ProjectInteractiveFrameProps {
  children: ReactNode;
  className?: string;
  innerClassName?: string;
  isActive?: boolean;
  maxTilt?: number;
  showGlow?: boolean;
  hoverLift?: boolean;
}

export default function ProjectInteractiveFrame({
  children,
  className = "",
  innerClassName = "",
  isActive = false,
  maxTilt = 7,
  showGlow = true,
  hoverLift = false,
}: ProjectInteractiveFrameProps) {
  const reduceMotion = useReducedMotion();
  const {
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
  } = useProjectCardTilt(maxTilt);

  const glow = useMotionTemplate`radial-gradient(220px circle at ${smoothGlowX}px ${smoothGlowY}px, rgba(199, 112, 199, 0.22), transparent 70%)`;
  const glowVisible = showGlow && isInteractive && (isHovered || isActive);
  const shouldLift = hoverLift && !reduceMotion && isHovered;

  return (
    <ProjectCardMotionContext.Provider value={{ isHovered, isActive }}>
      <div
        ref={cardRef}
        onPointerMove={handlePointerMove}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        className={`project-card-perspective ${className}`.trim()}
      >
        <div
          className={`project-card-frame ${isActive ? "is-active" : ""} ${
            isHovered ? "is-hovered" : ""
          }`.trim()}
        >
          <motion.div
            className={`project-card-inner ${innerClassName}`.trim()}
            style={
              isInteractive
                ? {
                    rotateX: smoothRotateX,
                    rotateY: smoothRotateY,
                    transformStyle: "preserve-3d",
                  }
                : undefined
            }
            animate={
              shouldLift ? { y: -9, scale: 1.02 } : { y: 0, scale: 1 }
            }
            transition={{
              type: "spring",
              stiffness: 340,
              damping: 26,
              mass: 0.7,
            }}
          >
            {glowVisible ? (
              <motion.div
                aria-hidden="true"
                className="project-card-glow project-card-glow-grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{ background: glow }}
              />
            ) : null}
            {children}
          </motion.div>
        </div>
      </div>
    </ProjectCardMotionContext.Provider>
  );
}

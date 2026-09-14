import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { useMotionVariants } from "../motion";

interface ProjectTagProps {
  label: string;
  className?: string;
  variants?: Variants;
}

export default function ProjectTag({
  label,
  className = "",
  variants,
}: ProjectTagProps) {
  const { hover, projectTagReveal } = useMotionVariants();

  return (
    <motion.span
      variants={variants ?? projectTagReveal()}
      whileHover={hover.chipLift()}
      whileTap={{ scale: 0.94 }}
      className={`project-tag ${className}`.trim()}
    >
      {label}
    </motion.span>
  );
}

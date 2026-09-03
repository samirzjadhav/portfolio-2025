import { motion } from "framer-motion";
import {
  createElement,
  type ComponentPropsWithoutRef,
  type ElementType,
  type ReactNode,
} from "react";
import { useMagneticHover } from "../hooks/useMagneticHover";

interface MagneticButtonOwnProps {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  strength?: number;
  maxOffset?: number;
  magnetic?: boolean;
}

export type MagneticButtonProps = MagneticButtonOwnProps &
  Omit<ComponentPropsWithoutRef<ElementType>, keyof MagneticButtonOwnProps>;

export default function MagneticButton({
  as: Component = "button",
  children,
  className = "",
  strength,
  maxOffset,
  magnetic = true,
  ...rest
}: MagneticButtonProps) {
  const { ref, isInteractive, style, handlers } = useMagneticHover({
    enabled: magnetic,
    strength,
    maxOffset,
  });

  if (!isInteractive) {
    return createElement(Component, { className, ...rest }, children);
  }

  return (
    <motion.div
      ref={ref}
      className="magnetic-btn inline-block"
      style={style}
      {...handlers}
    >
      {createElement(Component, { className, ...rest }, children)}
    </motion.div>
  );
}

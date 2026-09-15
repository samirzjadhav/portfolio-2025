import { motion } from "framer-motion";
import { useMotionVariants } from "../motion";

type AriaLiveValue = "polite" | "assertive" | "off";

interface GitHubStateCardProps {
  title: string;
  message: string;
  actionLabel?: string;
  onAction?: () => void;
  role?: "status" | "alert";
  ariaLive?: AriaLiveValue;
}

export default function GitHubStateCard({
  title,
  message,
  actionLabel,
  onAction,
  role = "status",
  ariaLive = "polite",
}: GitHubStateCardProps) {
  const { fadeUp } = useMotionVariants();

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeUp(20)}
      className="glass surface-card p-8 sm:p-10 text-center"
      role={role}
      aria-live={ariaLive}
    >
      <h2 className="text-accent font-bold text-xl sm:text-2xl">{title}</h2>
      <p className="section-sub mt-3 max-w-xl mx-auto leading-relaxed">
        {message}
      </p>

      {actionLabel && onAction && (
        <button
          type="button"
          onClick={onAction}
          className="btn-accent mt-6 px-6 py-3 rounded-lg"
        >
          {actionLabel}
        </button>
      )}
    </motion.div>
  );
}

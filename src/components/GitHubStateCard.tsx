import { motion } from "framer-motion";

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
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="
        glass p-8 sm:p-10 rounded-2xl border border-white/10
        shadow-[0_12px_40px_rgba(0,0,0,0.45)] text-center
      "
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

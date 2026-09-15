import { motion, type Variants } from "framer-motion";

interface GitHubStatCardProps {
  label: string;
  value: number | string;
  icon: string;
  variants?: Variants;
}

export default function GitHubStatCard({
  label,
  value,
  icon,
  variants,
}: GitHubStatCardProps) {
  return (
    <motion.div
      variants={variants}
      className="glass surface-card surface-card--compact p-3.5 sm:p-4 md:p-5 min-w-0"
    >
      <div className="flex items-center justify-between gap-2">
        <p className="text-[10px] sm:text-xs uppercase tracking-wider text-white/45 truncate">
          {label}
        </p>
        <i
          className={`bx ${icon} text-accent text-base sm:text-lg shrink-0`}
          aria-hidden="true"
        />
      </div>
      <p className="mt-1.5 sm:mt-2 text-xl sm:text-2xl md:text-3xl font-bold text-white truncate">
        {value}
      </p>
    </motion.div>
  );
}

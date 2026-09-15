type GitHubInlineStateVariant = "error" | "empty" | "info";

interface GitHubInlineStateProps {
  icon?: string;
  title: string;
  message: string;
  actionLabel?: string;
  onAction?: () => void;
  variant?: GitHubInlineStateVariant;
  role?: "status" | "alert";
}

const VARIANT_STYLES: Record<
  GitHubInlineStateVariant,
  { border: string; defaultIcon: string }
> = {
  error: {
    border: "border-red-400/20 bg-red-500/[0.06]",
    defaultIcon: "bx-error-circle text-red-300",
  },
  empty: {
    border: "border-white/10 bg-white/[0.03]",
    defaultIcon: "bx-folder-open text-white/50",
  },
  info: {
    border: "border-white/10 bg-white/[0.03]",
    defaultIcon: "bx-info-circle text-accent",
  },
};

export default function GitHubInlineState({
  icon,
  title,
  message,
  actionLabel,
  onAction,
  variant = "info",
  role = "status",
}: GitHubInlineStateProps) {
  const styles = VARIANT_STYLES[variant];
  const iconClass = icon ?? styles.defaultIcon;
  const iconClasses = iconClass.startsWith("bx ")
    ? iconClass
    : iconClass.startsWith("bx-")
      ? iconClass
      : `bx ${iconClass}`;

  return (
    <div
      className={`rounded-xl border px-4 py-8 sm:px-6 text-center ${styles.border}`}
      role={role}
      aria-live={role === "alert" ? "assertive" : "polite"}
    >
      <i className={`${iconClasses} text-3xl`} aria-hidden="true" />
      <p className="mt-3 text-sm font-medium text-white/85">{title}</p>
      <p className="mt-2 text-xs sm:text-sm text-white/50 max-w-md mx-auto leading-relaxed">
        {message}
      </p>
      {actionLabel && onAction && (
        <button
          type="button"
          onClick={onAction}
          className="btn-accent mt-5 px-4 py-2 text-sm rounded-lg"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}

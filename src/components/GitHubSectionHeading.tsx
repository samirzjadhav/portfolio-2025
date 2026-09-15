interface GitHubSectionHeadingProps {
  icon: string;
  title: string;
  subtitle?: string;
}

export default function GitHubSectionHeading({
  icon,
  title,
  subtitle,
}: GitHubSectionHeadingProps) {
  return (
    <header className="mb-4 md:mb-5">
      <h2 className="panel-heading">
        <i className={`bx ${icon} text-accent shrink-0`} aria-hidden="true" />
        {title}
      </h2>
      {subtitle && <p className="panel-heading__subtitle">{subtitle}</p>}
    </header>
  );
}

export default function GitHubHeroSkeleton() {
  return (
    <section
      aria-label="Loading GitHub profile"
      aria-busy="true"
      className="glass surface-card p-5 sm:p-6 md:p-8 animate-pulse"
    >
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8">
        <div className="w-36 h-36 md:w-44 md:h-44 lg:w-48 lg:h-48 rounded-full bg-white/10 shrink-0" />
        <div className="flex-1 w-full space-y-3">
          <div className="h-8 w-48 bg-white/10 rounded mx-auto md:mx-0" />
          <div className="h-14 w-full max-w-xl bg-white/10 rounded mx-auto md:mx-0" />
          <div className="h-4 w-64 bg-white/10 rounded mx-auto md:mx-0" />
          <div className="h-10 w-56 bg-white/10 rounded mx-auto md:mx-0" />
        </div>
      </div>
    </section>
  );
}

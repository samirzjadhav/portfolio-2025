import { contactInfo } from "../data/contact";
import type { GitHubProfile } from "../types";

interface GitHubHeroProps {
  profile: GitHubProfile;
}

export default function GitHubHero({ profile }: GitHubHeroProps) {
  return (
    <section
      aria-label="GitHub profile hero"
      className="glass surface-card p-5 sm:p-6 md:p-8"
    >
      <div className="flex flex-col md:flex-row items-center md:items-start gap-5 sm:gap-6 md:gap-8">
        <img
          src={profile.avatar_url}
          alt={`${profile.name || profile.login} GitHub avatar`}
          loading="eager"
          decoding="async"
          width={192}
          height={192}
          className="w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 lg:w-48 lg:h-48 rounded-full border-4 border-accent/70 shadow-lg shrink-0"
        />

        <div className="flex-1 min-w-0 text-center md:text-left">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white break-words">
            @{profile.login}
          </h1>

          {profile.name && profile.name !== profile.login && (
            <p className="mt-1 text-accent font-semibold">{profile.name}</p>
          )}

          {profile.bio && (
            <p className="mt-3 text-sm md:text-base text-white/70 leading-relaxed max-w-2xl mx-auto md:mx-0">
              {profile.bio}
            </p>
          )}

          <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-x-4 sm:gap-x-5 gap-y-2 text-xs sm:text-sm text-white/60">
            <span>
              <i className="bx bx-folder text-accent mr-1" aria-hidden="true" />
              {profile.public_repos} repositories
            </span>
            <span>
              <i className="bx bx-group text-accent mr-1" aria-hidden="true" />
              {profile.followers} followers
            </span>
            <span>
              <i className="bx bx-user-plus text-accent mr-1" aria-hidden="true" />
              {profile.following} following
            </span>
          </div>

          <div className="mt-5 sm:mt-6 flex flex-wrap justify-center md:justify-start gap-3">
            <a
              href={profile.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-accent text-sm px-4 py-2 rounded-lg inline-flex items-center gap-2"
            >
              <i className="bx bxl-github text-lg" aria-hidden="true" />
              GitHub Profile
            </a>
            <a
              href={contactInfo.portfolioUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary glass text-sm gap-2"
            >
              <i className="bx bx-globe text-lg" aria-hidden="true" />
              Portfolio
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

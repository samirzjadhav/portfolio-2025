import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import SkipToContent from "../components/SkipToContent";
import VisitorCounter from "../components/VisitorCounter";
import GitHubStateCard from "../components/GitHubStateCard";
import { GITHUB_USERNAME, getContributionChartUrl } from "../services";
import { PAGE_META } from "../config/site";
import { contactInfo, socialLinks } from "../data/contact";
import { useGitHubData } from "../hooks/useGitHubData";
import { usePageMeta } from "../hooks/usePageMeta";
import type { GitHubProfile, GitHubRepo } from "../types";

interface GitHubProfileCardProps {
  profile: GitHubProfile;
}

function GitHubProfileCard({ profile }: GitHubProfileCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="
        mt-10 p-6 sm:p-8 rounded-2xl glass backdrop-blur-2xl
        border border-white/10 shadow-[0_12px_40px_rgba(0,0,0,0.45)]
        flex flex-col md:flex-row items-center gap-6 sm:gap-8
      "
    >
      <img
        src={profile.avatar_url}
        alt={`${profile.name || profile.login} GitHub avatar`}
        loading="lazy"
        decoding="async"
        className="w-32 h-32 sm:w-48 sm:h-48 md:w-56 md:h-56 
                   rounded-full border-4 border-accent shadow-xl"
      />

      <div className="flex-1 text-center md:text-left">
        <h2 className="text-2xl sm:text-3xl font-bold">
          {profile.name || profile.login}
        </h2>
        <p className="text-white/60">@{profile.login}</p>

        <p className="mt-3 sm:mt-4 section-sub leading-relaxed">
          {profile.bio ||
            "Frontend Developer passionate about building clean & modern UIs."}
        </p>

        <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-4 text-white/70">
          <div>📁 {profile.public_repos} Repositories</div>
          <div>👥 {profile.followers} Followers</div>
          <div>➡️ {profile.following} Following</div>
          {profile.location && <div>📍 {profile.location}</div>}
        </div>

        <div className="mt-6 flex flex-wrap justify-center md:justify-start gap-3">
          <a
            href={profile.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="glass px-4 py-2 rounded-lg"
          >
            GitHub Profile
          </a>

          <a
            href={contactInfo.portfolioUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="glass px-4 py-2 rounded-lg"
          >
            Portfolio
          </a>

          {socialLinks
            .filter((link) => link.platform !== "github")
            .map((link) => (
              <a
                key={link.platform}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="glass px-4 py-2 rounded-lg"
              >
                {link.platform === "twitter" ? "Twitter" : "LinkedIn"}
              </a>
            ))}
        </div>
      </div>
    </motion.div>
  );
}

interface GitHubRepoCardProps {
  repo: GitHubRepo;
}

function GitHubRepoCard({ repo }: GitHubRepoCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.4 }}
      className="
        glass p-6 sm:p-7 rounded-2xl border border-white/10 
        shadow-[0_8px_30px_rgba(0,0,0,0.35)]
      "
    >
      <h3 className="text-lg sm:text-xl font-bold">{repo.name}</h3>

      <p className="text-white/60 text-sm mt-2 leading-relaxed">
        {repo.description || "A modern open-source project by Samir."}
      </p>

      <div className="mt-4 flex flex-wrap gap-4 text-white/60 text-sm">
        <span>⭐ {repo.stargazers_count}</span>
        <span>🍴 {repo.forks_count}</span>
        <span>🟦 {repo.language || "N/A"}</span>
        <span>⏱ {new Date(repo.updated_at).toLocaleDateString()}</span>
      </div>

      <div className="mt-6 flex flex-col sm:flex-row gap-4">
        <motion.a
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.06 }}
          className="btn-accent text-sm py-2 rounded-lg text-center flex-1"
        >
          View Repo
        </motion.a>

        {repo.homepage && (
          <motion.a
            href={repo.homepage}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.06 }}
            className="glass py-2 rounded-lg text-sm text-center flex-1"
          >
            Live Demo
          </motion.a>
        )}
      </div>
    </motion.div>
  );
}

export default function GitHub() {
  usePageMeta(PAGE_META.github);

  const {
    profile,
    repos,
    error,
    isLoading,
    isError,
    isEmpty,
    retry,
  } = useGitHubData();

  return (
    <>
      <div className="resume-nav-fix">
        <SkipToContent />
        <Navbar />
      </div>

      <VisitorCounter />

      <main
        id="main-content"
        tabIndex={-1}
        className="min-h-screen bg-gradient-to-br from-[#07030b] via-[#0f0916] to-[#05020a] 
                      text-white px-4 sm:px-6 py-20 pt-[90px]"
      >
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl font-bold section-title mb-4 text-center"
        >
          GitHub Dashboard
        </motion.h1>

        <p className="section-sub text-center text-white/70 mb-6 sm:mb-10">
          My open-source activity, repositories, and contribution stats.
        </p>

        {isLoading && (
          <GitHubStateCard
            title="Loading GitHub data"
            message="Fetching profile details and the latest public repositories..."
          />
        )}

        {isError && (
          <GitHubStateCard
            title="Unable to load GitHub data"
            message={error ?? "Unable to load GitHub dashboard data."}
            actionLabel="Try again"
            onAction={retry}
            role="alert"
            ariaLive="assertive"
          />
        )}

        {!isLoading && !isError && profile && (
          <GitHubProfileCard profile={profile} />
        )}

        <div className="mt-16 glass p-6 rounded-xl border border-white/10 shadow-xl">
          <h2 className="text-accent font-semibold text-xl mb-4">
            Contribution Activity
          </h2>

          <div className="contribution-graph-wrapper">
            <img
              src={getContributionChartUrl()}
              alt={`GitHub contribution activity chart for ${GITHUB_USERNAME}`}
              loading="lazy"
              decoding="async"
              className="contribution-graph"
            />
          </div>
        </div>

        {!isLoading && !isError && (
          <h2 className="text-accent font-semibold text-2xl mt-14 mb-4">
            Latest 10 Repositories
          </h2>
        )}

        {!isLoading && !isError && isEmpty && (
          <GitHubStateCard
            title="No public repositories found"
            message={`@${GITHUB_USERNAME} does not currently have public repositories to display.`}
            actionLabel="Refresh"
            onAction={retry}
          />
        )}

        {!isLoading && !isError && repos.length > 0 && (
          <div className="grid sm:grid-cols-2 gap-6 sm:gap-8 mt-6">
            {repos.map((repo) => (
              <GitHubRepoCard key={repo.id} repo={repo} />
            ))}
          </div>
        )}
      </main>
    </>
  );
}

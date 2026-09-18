import { useMemo, useState } from "react";
import { useMotionVariants } from "../motion";
import GitHubAnimatedSection from "../components/GitHubAnimatedSection";
import GitHubStaggerGrid from "../components/GitHubStaggerGrid";
import GitHubContributionHeatmap, {
  GitHubContributionHeatmapSkeleton,
} from "../components/GitHubContributionHeatmap";
import GitHubDashboardSkeleton from "../components/GitHubDashboardSkeleton";
import GitHubHero from "../components/GitHubHero";
import GitHubInlineState from "../components/GitHubInlineState";
import GitHubLanguagesPanel from "../components/GitHubLanguagesPanel";
import GitHubRepoCard from "../components/GitHubRepoCard";
import GitHubRepoToolbar from "../components/GitHubRepoToolbar";
import GitHubSectionHeading from "../components/GitHubSectionHeading";
import GitHubStatCard from "../components/GitHubStatCard";
import GitHubStateCard from "../components/GitHubStateCard";
import GitHubStatsPanel from "../components/GitHubStatsPanel";
import Navbar from "../components/Navbar";
import SkipToContent from "../components/SkipToContent";
import { GITHUB_USERNAME } from "../services";
import { PAGE_META } from "../config/site";
import { useGitHubData } from "../hooks/useGitHubData";
import { usePageMeta } from "../hooks/usePageMeta";
import {
  filterRepos,
  getDashboardStats,
  getLanguageStats,
  getRepoLanguages,
  getTopRepos,
} from "../utils/githubDashboard";

function SectionDivider() {
  return (
    <div
      className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent"
      aria-hidden="true"
    />
  );
}

export default function GitHub() {
  usePageMeta(PAGE_META.github);
  const motionVariants = useMotionVariants();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);

  const {
    profile,
    repos,
    contributions,
    contributionsError,
    error,
    isLoading,
    isContributionsLoading,
    isError,
    isEmpty,
    retry,
  } = useGitHubData();

  const stats = useMemo(
    () => (profile ? getDashboardStats(profile, repos) : null),
    [profile, repos]
  );
  const languages = useMemo(() => getLanguageStats(repos), [repos]);
  const topRepos = useMemo(() => getTopRepos(repos), [repos]);
  const repoLanguages = useMemo(() => getRepoLanguages(repos), [repos]);
  const filteredRepos = useMemo(
    () => filterRepos(repos, searchQuery, selectedLanguage),
    [repos, searchQuery, selectedLanguage]
  );

  const cardVariants = motionVariants.fadeUp(14);
  const panelVariants = motionVariants.fadeUp(16);
  const statVariants = motionVariants.fadeUp(12);

  const hasActiveFilters =
    searchQuery.trim().length > 0 || selectedLanguage !== null;

  return (
    <>
      <div className="resume-nav-fix">
        <SkipToContent />
        <Navbar />
      </div>

      <main
        id="main-content"
        tabIndex={-1}
        className="min-h-screen text-white px-4 sm:px-6 py-16 sm:py-20 pt-[84px] sm:pt-[90px]"
      >
        <div className="max-w-6xl mx-auto w-full">
          {isLoading && <GitHubDashboardSkeleton />}

          {isError && (
            <GitHubAnimatedSection>
              <GitHubStateCard
                title="Unable to load GitHub data"
                message={error ?? "Unable to load GitHub dashboard data."}
                actionLabel="Try again"
                onAction={retry}
                role="alert"
                ariaLive="assertive"
              />
            </GitHubAnimatedSection>
          )}

          {!isLoading && !isError && profile && stats && (
            <div className="flex flex-col gap-8 md:gap-10 lg:gap-12 w-full">
              <GitHubAnimatedSection ariaLabel="Profile overview">
                <GitHubHero profile={profile} />
              </GitHubAnimatedSection>

              <SectionDivider />

              <GitHubAnimatedSection ariaLabel="Repository metrics">
                <GitHubStaggerGrid className="grid grid-cols-1 min-[420px]:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 w-full">
                  <GitHubStatCard
                    label="Total stars"
                    value={stats.totalStars}
                    icon="bx-star"
                    variants={statVariants}
                  />
                  <GitHubStatCard
                    label="Total forks"
                    value={stats.totalForks}
                    icon="bx-git-branch"
                    variants={statVariants}
                  />
                  <GitHubStatCard
                    label="Languages"
                    value={stats.languageCount}
                    icon="bx-code-alt"
                    variants={statVariants}
                  />
                  <GitHubStatCard
                    label="Top language"
                    value={stats.topLanguage ?? "—"}
                    icon="bx-layer"
                    variants={statVariants}
                  />
                </GitHubStaggerGrid>
              </GitHubAnimatedSection>

              <SectionDivider />

              <GitHubAnimatedSection ariaLabel="Contribution activity">
                <GitHubSectionHeading
                  icon="bx-calendar-check"
                  title="Contribution Activity"
                  subtitle="Public GitHub activity over the past year"
                />
                <div className="glass surface-card p-4 sm:p-5 md:p-6 w-full min-w-0">
                  <div className="contribution-graph-wrapper contribution-panel rounded-xl p-4 sm:p-5 md:p-6">
                    {isContributionsLoading && (
                      <GitHubContributionHeatmapSkeleton />
                    )}

                    {!isContributionsLoading && contributions && (
                      <GitHubContributionHeatmap calendar={contributions} />
                    )}

                    {!isContributionsLoading && !contributions && (
                      <GitHubInlineState
                        variant="error"
                        title="Contribution activity unavailable"
                        message={
                          contributionsError ??
                          `Unable to load contribution data for @${GITHUB_USERNAME}.`
                        }
                        actionLabel="Try again"
                        onAction={retry}
                        role="alert"
                      />
                    )}
                  </div>
                </div>
              </GitHubAnimatedSection>

              <SectionDivider />

              <GitHubAnimatedSection ariaLabel="Language and stats overview">
                <GitHubStaggerGrid
                  className="grid md:grid-cols-2 gap-4 sm:gap-6 w-full"
                  staggerAmount={0.08}
                >
                  <GitHubLanguagesPanel
                    languages={languages}
                    variants={panelVariants}
                  />
                  <GitHubStatsPanel stats={stats} variants={panelVariants} />
                </GitHubStaggerGrid>
              </GitHubAnimatedSection>

              {topRepos.length > 0 && (
                <>
                  <SectionDivider />

                  <GitHubAnimatedSection ariaLabel="Top repositories">
                    <GitHubSectionHeading
                      icon="bx-medal"
                      title="Top Repositories"
                      subtitle="Ranked by stars"
                    />
                    <GitHubStaggerGrid className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                      {topRepos.map((repo, index) => (
                        <GitHubRepoCard
                          key={repo.id}
                          repo={repo}
                          rank={index + 1}
                          variants={cardVariants}
                        />
                      ))}
                    </GitHubStaggerGrid>
                  </GitHubAnimatedSection>
                </>
              )}

              <SectionDivider />

              <GitHubAnimatedSection ariaLabel="Public repositories">
                <GitHubSectionHeading
                  icon="bx-book-bookmark"
                  title="Public Repositories"
                  subtitle="Latest updated repositories"
                />

                {isEmpty && (
                  <GitHubInlineState
                    variant="empty"
                    title="No public repositories found"
                    message={`@${GITHUB_USERNAME} does not currently have public repositories to display.`}
                    actionLabel="Refresh"
                    onAction={retry}
                  />
                )}

                {!isEmpty && repos.length > 0 && (
                  <>
                    <GitHubRepoToolbar
                      searchQuery={searchQuery}
                      onSearchChange={setSearchQuery}
                      languages={repoLanguages}
                      selectedLanguage={selectedLanguage}
                      onLanguageChange={setSelectedLanguage}
                      totalCount={repos.length}
                      filteredCount={filteredRepos.length}
                    />

                    {filteredRepos.length === 0 ? (
                      <GitHubInlineState
                        variant="empty"
                        icon="bx-search-alt text-white/45"
                        title="No matching repositories"
                        message={
                          hasActiveFilters
                            ? "Try a different search term or clear the language filter."
                            : "No repositories match the current filters."
                        }
                        actionLabel={
                          hasActiveFilters ? "Clear filters" : undefined
                        }
                        onAction={
                          hasActiveFilters
                            ? () => {
                                setSearchQuery("");
                                setSelectedLanguage(null);
                              }
                            : undefined
                        }
                      />
                    ) : (
                      <GitHubStaggerGrid className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 w-full">
                        {filteredRepos.map((repo) => (
                          <GitHubRepoCard
                            key={repo.id}
                            repo={repo}
                            variants={cardVariants}
                          />
                        ))}
                      </GitHubStaggerGrid>
                    )}
                  </>
                )}
              </GitHubAnimatedSection>
            </div>
          )}
        </div>
      </main>
    </>
  );
}

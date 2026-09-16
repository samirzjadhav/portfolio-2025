export const GITHUB_USERNAME = "samirzjadhav";

const PROFILE_URL = `https://api.github.com/users/${GITHUB_USERNAME}`;
const REPOS_URL = `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=10`;
const CACHE_KEY = "github-dashboard-cache";
const CACHE_TTL_MS = 5 * 60 * 1000;

async function fetchGitHubJson(url) {
  const response = await fetch(url);
  const data = await response.json();

  if (!response.ok) {
    const message =
      data?.message || `GitHub API request failed (${response.status})`;
    throw new Error(message);
  }

  return data;
}

function readCachedDashboard() {
  try {
    const cached = sessionStorage.getItem(CACHE_KEY);
    if (!cached) return null;

    const { expiresAt, data } = JSON.parse(cached);
    if (Date.now() >= expiresAt) return null;

    return data;
  } catch {
    return null;
  }
}

function writeCachedDashboard(data) {
  sessionStorage.setItem(
    CACHE_KEY,
    JSON.stringify({
      expiresAt: Date.now() + CACHE_TTL_MS,
      data,
    })
  );
}

/**
 * @param {{ bypassCache?: boolean }} [options]
 * @returns {Promise<{ profile: object, repos: object[] }>}
 */
export async function fetchGitHubDashboard({ bypassCache = false } = {}) {
  if (!bypassCache) {
    const cached = readCachedDashboard();
    if (cached) return cached;
  }

  const [profile, repos] = await Promise.all([
    fetchGitHubJson(PROFILE_URL),
    fetchGitHubJson(REPOS_URL),
  ]);

  if (!profile?.login) {
    throw new Error("GitHub profile data was invalid or incomplete.");
  }

  if (!Array.isArray(repos)) {
    throw new Error("GitHub repository data was invalid or incomplete.");
  }

  const data = { profile, repos };
  writeCachedDashboard(data);
  return data;
}

export function getApiBaseUrl(): string {
  const baseUrl = import.meta.env.VITE_API_URL?.trim() ?? "";
  return baseUrl.replace(/\/$/, "");
}

/**
 * True when /api requests can reach the Express backend.
 * Ignores same-origin VITE_API_URL values — those hit the Vercel SPA, not the API.
 */
export function isBackendConfigured(): boolean {
  if (import.meta.env.DEV) return true;

  const baseUrl = getApiBaseUrl();
  if (!baseUrl) return false;

  try {
    const resolved = new URL(
      baseUrl.startsWith("http") ? baseUrl : `https://${baseUrl}`
    );

    if (typeof window !== "undefined" && resolved.origin === window.location.origin) {
      return false;
    }

    return true;
  } catch {
    return false;
  }
}

export function getApiUrl(path: string): string {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${getApiBaseUrl()}${normalizedPath}`;
}

export function getApiBaseUrl(): string {
  const baseUrl = import.meta.env.VITE_API_URL?.trim() ?? "";
  return baseUrl.replace(/\/$/, "");
}

/** True when /api requests reach the Express backend (dev proxy or VITE_API_URL). */
export function isBackendConfigured(): boolean {
  return import.meta.env.DEV || Boolean(getApiBaseUrl());
}

export function getApiUrl(path: string): string {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${getApiBaseUrl()}${normalizedPath}`;
}

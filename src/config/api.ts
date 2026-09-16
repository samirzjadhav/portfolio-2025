export function getApiBaseUrl(): string {
  const baseUrl = import.meta.env.VITE_API_URL?.trim() ?? "";
  return baseUrl.replace(/\/$/, "");
}

export function getApiUrl(path: string): string {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${getApiBaseUrl()}${normalizedPath}`;
}

const VISIT_SESSION_KEY = "visit-recorded";
const COUNTER_KEY = "samirzjadhav_portfolio_2025_visits";
const COUNT_API_BASE = "https://countapi.mileshilliard.com/api/v1";

interface CountApiResponse {
  value?: number | string;
  error?: string;
}

function parseCountValue(value: number | string | undefined): number {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === "string") {
    const parsed = Number.parseInt(value, 10);
    return Number.isFinite(parsed) ? parsed : 0;
  }

  return 0;
}

async function fetchCountFromApi(increment: boolean): Promise<number> {
  const endpoint = increment ? "hit" : "get";
  const response = await fetch(`${COUNT_API_BASE}/${endpoint}/${COUNTER_KEY}`);

  if (!response.ok) {
    if (!increment && response.status === 404) {
      return 0;
    }

    throw new Error(`Visit count request failed (${response.status})`);
  }

  const body = (await response.json()) as CountApiResponse;

  if (body.error) {
    throw new Error(body.error);
  }

  return parseCountValue(body.value);
}

export async function recordVisitOnce(): Promise<number | null> {
  const shouldIncrement = !sessionStorage.getItem(VISIT_SESSION_KEY);

  if (shouldIncrement) {
    sessionStorage.setItem(VISIT_SESSION_KEY, "1");

    try {
      return await fetchCountFromApi(true);
    } catch {
      sessionStorage.removeItem(VISIT_SESSION_KEY);
    }
  }

  try {
    return await fetchCountFromApi(false);
  } catch {
    return null;
  }
}

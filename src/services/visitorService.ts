const VISIT_SESSION_KEY = "visit-recorded";
const COUNT_API_NAMESPACE = "samirzjadhav";
const COUNT_API_KEY = "portfolio-2025-visits";

interface CountApiResponse {
  value: number;
}

async function fetchCountFromApi(increment: boolean): Promise<number> {
  const action = increment ? "hit" : "get";
  const response = await fetch(
    `https://api.countapi.xyz/${action}/${COUNT_API_NAMESPACE}/${COUNT_API_KEY}`
  );

  if (!response.ok) {
    throw new Error(`Visit count request failed (${response.status})`);
  }

  const body = (await response.json()) as CountApiResponse;
  return Number.isFinite(body.value) ? body.value : 0;
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

import { getApiUrl } from "../config/api";
import type { ApiErrorResponse, ApiSuccessResponse } from "../types/api";

export class ApiError extends Error {
  readonly status: number;
  readonly details?: unknown;

  constructor(message: string, status: number, details?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.details = details;
  }
}

async function parseJsonResponse(response: Response): Promise<unknown> {
  const contentType = response.headers.get("content-type") ?? "";

  if (!contentType.includes("application/json")) {
    throw new ApiError(
      "Backend unavailable — check VITE_API_URL points to your deployed API.",
      response.status
    );
  }

  try {
    return await response.json();
  } catch {
    throw new ApiError(
      "Backend returned invalid JSON — verify the API is running.",
      response.status
    );
  }
}

function formatValidationDetails(details: unknown): string | null {
  if (!details || typeof details !== "object") return null;

  const fieldErrors = (details as { fieldErrors?: Record<string, string[]> })
    .fieldErrors;

  if (!fieldErrors) return null;

  const messages = Object.values(fieldErrors).flat();
  return messages.length > 0 ? messages.join(" ") : null;
}

export async function apiRequest<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const response = await fetch(getApiUrl(path), {
    ...options,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  const body = (await parseJsonResponse(response)) as
    | ApiSuccessResponse<T>
    | ApiErrorResponse;

  if (!response.ok || !body.success) {
    const errorBody = body as ApiErrorResponse;
    const validationMessage = formatValidationDetails(errorBody.error?.details);
    const message =
      validationMessage ??
      errorBody.error?.message ??
      `Request failed (${response.status})`;

    throw new ApiError(message, response.status, errorBody.error?.details);
  }

  return body.data;
}

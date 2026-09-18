import rateLimit from "express-rate-limit";

const rateLimitBody = {
  success: false as const,
  error: {
    message: "Too many requests. Please try again later.",
  },
};

export const writeRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: rateLimitBody,
});

export const githubRateLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 60,
  standardHeaders: true,
  legacyHeaders: false,
  message: rateLimitBody,
});

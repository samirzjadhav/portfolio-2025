import { config as loadEnv } from "dotenv";
import { z } from "zod";

loadEnv();

const optionalNonEmptyString = z.preprocess(
  (value) =>
    typeof value === "string" && value.trim() === "" ? undefined : value,
  z.string().min(1).optional()
);

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  PORT: z.coerce.number().int().positive().default(5000),
  CLIENT_ORIGIN: z.string().url().default("http://localhost:5173"),
  GITHUB_USERNAME: z.string().min(1).default("samirzjadhav"),
  GITHUB_TOKEN: optionalNonEmptyString,
});

export type Env = z.infer<typeof envSchema>;

export const env: Env = envSchema.parse(process.env);

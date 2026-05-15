import "dotenv/config"
import type { StringValue } from "ms"
import z from "zod"

//zod validation for env file

const envSchema = z.object({
  PORT: z.string().default("5000"),
  DATABASE_URL: z.string().url(),
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  JWT_SECRET: z.string().min(1),
  JWT_REFRESH_SECRET: z.string().min(1),
  ACCESS_TOKEN_EXPIRY: z.string().default("1h") as z.ZodType<StringValue>,
  REFRESH_TOKEN_EXPIRY: z.string().default("7d") as z.ZodType<StringValue>,
})

export const env = envSchema.parse(process.env)

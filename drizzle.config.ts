import type { Config } from "drizzle-kit";

import * as dotenv from "dotenv";

dotenv.config({
  path: ".env",
});

export default {
  schema: "./src/infrastructure/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  verbose: true,
  strict: true,
} satisfies Config;

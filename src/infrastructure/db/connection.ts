import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

// Create the connection only if not building
const sql = neon(process.env.DATABASE_URL!);

// Create the Drizzle instance
export const db = drizzle(sql, { schema });

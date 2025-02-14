import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import * as schema from './schema';

// Create the connection
const sql = neon(process.env.DATABASE_URL!);

// Create the Drizzle instance
export const db = drizzle(sql, { schema });

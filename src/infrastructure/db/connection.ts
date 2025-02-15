import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import * as schema from './schema';

// Ne pas initialiser la connexion pendant le build
const isNextBuild = process.env.NEXT_PHASE === 'phase-production-build';

// Create the connection only if not building
const sql = !isNextBuild ? neon(process.env.DATABASE_URL!) : null;

// Create the Drizzle instance
export const db = sql ? drizzle(sql, { schema }) : null;

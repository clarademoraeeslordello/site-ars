import "server-only";
import { drizzle, type NodePgDatabase } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";

let db: NodePgDatabase<typeof schema> | null = null;

/** True when DATABASE_URL is set; pages fall back to an empty state without it. */
export function hasDb() {
  return Boolean(process.env.DATABASE_URL);
}

export function getDb() {
  if (!db) {
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) throw new Error("DATABASE_URL is not set");
    db = drizzle(new Pool({ connectionString, max: 5 }), { schema });
  }
  return db;
}

export { schema };

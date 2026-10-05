import "server-only";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

// One pooled client per server process (reused across hot reloads in dev).
const globalForDb = globalThis as unknown as { pg?: ReturnType<typeof postgres> };

function client() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL is not set");
  globalForDb.pg ??= postgres(url, { max: 5, idle_timeout: 30 });
  return globalForDb.pg;
}

export function getDb() {
  return drizzle(client(), { schema });
}

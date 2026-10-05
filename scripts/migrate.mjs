// Applies pending SQL migrations from ./drizzle before `next start`.
// Plain JS on purpose: it runs in production, where dev tools (drizzle-kit, tsx) may be pruned.
import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import pg from "pg";

if (!process.env.DATABASE_URL) {
  console.warn("[migrate] DATABASE_URL is not set; skipping migrations.");
  process.exit(0);
}

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
try {
  await migrate(drizzle(pool), { migrationsFolder: "./drizzle", migrationsTable: "__site_migrations" });
  console.log("[migrate] done");
} finally {
  await pool.end();
}

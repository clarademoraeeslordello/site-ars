import { defineConfig } from "drizzle-kit";

// Migrations are generated locally (pnpm db:generate, no database needed) and applied on
// Railway before each deploy (scripts/migrate.mjs), inside the private network.
export default defineConfig({
  dialect: "postgresql",
  schema: "./db/schema.ts",
  out: "./db/migrations",
  dbCredentials: { url: process.env.DATABASE_URL ?? "" },
  strict: true,
});

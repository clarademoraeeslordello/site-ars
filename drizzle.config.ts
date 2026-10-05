import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./lib/db/schema.ts",
  out: "./drizzle",
  dbCredentials: { url: process.env.DATABASE_URL ?? "" },
  // Only this site's tables: the database may also hold tables owned by other services.
  tablesFilter: ["radar_*", "newsletter_*", "admin_*"],
  migrations: { table: "__site_migrations" },
});

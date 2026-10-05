import { sql } from "drizzle-orm";
import { getDb } from "@/db/client";

// Liveness + database check for monitoring. Returns no data, only status and the number of
// applied migrations (to confirm the pre-deploy migration ran).
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const db = getDb();
    const rows = await db.execute<{ n: number }>(sql`select count(*)::int as n from drizzle.__drizzle_migrations`);
    return Response.json({ ok: true, db: "ok", migrations: rows[0]?.n ?? 0 }, { headers: { "Cache-Control": "no-store" } });
  } catch (err) {
    // Only the error code (e.g. 42P01 missing table, ECONNREFUSED), never the message.
    const code = (err as { code?: string; cause?: { code?: string } })?.code ?? (err as { cause?: { code?: string } })?.cause?.code;
    return Response.json({ ok: false, db: "unavailable", code: code ?? "unknown" }, { status: 503, headers: { "Cache-Control": "no-store" } });
  }
}

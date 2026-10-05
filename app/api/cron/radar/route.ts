import { revalidatePath } from "next/cache";
import { isCronRequest } from "@/lib/cron-auth";
import { runScan } from "@/lib/radar/scan";

export const dynamic = "force-dynamic";
export const maxDuration = 300;

/** Daily ISO Radar scan (06:00 Brasília). Creates drafts only; nothing is published here. */
export async function POST(request: Request) {
  if (!isCronRequest(request)) return new Response("Unauthorized", { status: 401 });
  try {
    const result = await runScan();
    // "Última verificação" on published articles changes on every scan.
    revalidatePath("/[locale]/iso-radar", "layout");
    return Response.json(result);
  } catch (err) {
    console.error("[radar] scan failed", err);
    return Response.json({ error: err instanceof Error ? err.message : "scan_failed" }, { status: 500 });
  }
}

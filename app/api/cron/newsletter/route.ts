import { isCronRequest } from "@/lib/cron-auth";
import { buildMonthlyEdition } from "@/lib/newsletter";

export const dynamic = "force-dynamic";

/** Monthly (day 1): builds last month's edition as a draft. Sending needs approval in /admin. */
export async function POST(request: Request) {
  if (!isCronRequest(request)) return new Response("Unauthorized", { status: 401 });
  return Response.json(await buildMonthlyEdition());
}

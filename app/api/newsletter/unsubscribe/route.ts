import { NextResponse } from "next/server";
import { unsubscribe } from "@/lib/newsletter";
import { radarPageUrl } from "@/lib/radar/urls";

export const dynamic = "force-dynamic";

function token(request: Request) {
  return new URL(request.url).searchParams.get("token") ?? "";
}

export async function GET(request: Request) {
  const t = token(request);
  const row = t ? await unsubscribe(t) : null;
  return NextResponse.redirect(radarPageUrl(row?.locale, row ? "unsubscribed" : "invalid"), 303);
}

/** One-click unsubscribe from the mail client (RFC 8058). */
export async function POST(request: Request) {
  const t = token(request);
  if (t) await unsubscribe(t);
  return new Response(null, { status: 200 });
}

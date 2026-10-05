import { NextResponse } from "next/server";
import { confirmSubscription } from "@/lib/newsletter";
import { radarPageUrl } from "@/lib/radar/urls";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const token = new URL(request.url).searchParams.get("token") ?? "";
  const row = token ? await confirmSubscription(token) : null;
  return NextResponse.redirect(radarPageUrl(row?.locale, row ? "confirmed" : "invalid"), 303);
}

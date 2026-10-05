import { unsubscribe } from "@/lib/newsletter";

// One-click unsubscribe (RFC 8058) for the List-Unsubscribe-Post header of each edition.
// Mail providers POST here with the token in the query string.
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const token = new URL(request.url).searchParams.get("token") ?? "";
  if (token.length < 20 || token.length > 100) return new Response(null, { status: 400 });
  await unsubscribe(token);
  return new Response(null, { status: 200 });
}

import { NextResponse } from "next/server";
import { trackCmxEvent } from "@/server/cmx";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as {
    eventName?: unknown;
    payload?: unknown;
    page?: unknown;
    referrer?: unknown;
  } | null;

  if (!body || typeof body.eventName !== "string") {
    return NextResponse.json(
      { ok: false, message: "eventName is required" },
      { status: 400 },
    );
  }

  const result = await trackCmxEvent({
    eventName: body.eventName,
    payload:
      body.payload && typeof body.payload === "object"
        ? (body.payload as Record<string, unknown>)
        : {},
    page: typeof body.page === "string" ? body.page : undefined,
    referrer: typeof body.referrer === "string" ? body.referrer : undefined,
    source: "client",
  });

  return NextResponse.json({ ok: true, cmx: result });
}

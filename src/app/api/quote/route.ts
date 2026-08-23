import { NextResponse } from "next/server";

/**
 * QUOTE SUBMISSION ENDPOINT
 * =========================
 * Receives the hero quote form and forwards it to GoHighLevel.
 *
 * The webhook URL is read from `GHL_WEBHOOK_URL` — a SERVER-side env var, not
 * `NEXT_PUBLIC_*`. Posting to GHL straight from the browser would put the
 * webhook URL in the page source, where anyone can flood the client's CRM
 * with junk leads. This route is the only thing that ever sees it.
 *
 * TODO before launch: set GHL_WEBHOOK_URL in the hosting environment. Until
 * then this accepts and logs submissions so the form is testable end-to-end,
 * but NOTHING IS DELIVERED — do not go live in that state.
 */

export const runtime = "nodejs";

type Payload = {
  name?: string;
  email?: string;
  phone?: string;
  suburb?: string;
  /** Multi-select — one enquiry can span slate and tile. */
  services?: string[];
  message?: string;
  company?: string;
  elapsedMs?: number;
};

/** Bots complete instantly; a human cannot fill six fields in three seconds. */
const MIN_ELAPSED_MS = 3000;

export async function POST(request: Request) {
  let body: Payload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Malformed request." }, { status: 400 });
  }

  const name = body.name?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const phone = body.phone?.trim() ?? "";
  const suburb = body.suburb?.trim() ?? "";
  const message = body.message?.trim() ?? "";
  // Coerce defensively — this is a public endpoint, so `services` could be
  // anything regardless of what the form sends.
  const services = Array.isArray(body.services)
    ? body.services.filter((s): s is string => typeof s === "string" && !!s.trim())
    : [];

  /*
   * Spam gates, in order of cheapness. Both return 200 rather than an error:
   * a bot that learns it was blocked adapts, and a bot that thinks it
   * succeeded moves on. Real users can never trip either.
   */
  if (body.company) return NextResponse.json({ ok: true });
  if (typeof body.elapsedMs === "number" && body.elapsedMs < MIN_ELAPSED_MS) {
    return NextResponse.json({ ok: true });
  }

  // Re-validate server-side. Client validation is UX; this is the real gate.
  const emailLooksValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (
    !name ||
    !suburb ||
    services.length === 0 ||
    !emailLooksValid ||
    phone.replace(/\D/g, "").length < 8
  ) {
    return NextResponse.json(
      { error: "Missing or invalid fields." },
      { status: 422 }
    );
  }

  const lead = {
    name,
    email,
    phone,
    suburb,
    services,
    // Flattened copy — most CRM field mappings, GHL included, expect a string
    // rather than an array, and losing the structured version costs nothing.
    servicesText: services.join(", "),
    message,
    source: "website — hero quote form",
    submittedAt: new Date().toISOString(),
  };

  const webhook = process.env.GHL_WEBHOOK_URL;

  if (!webhook) {
    // Loud on the server, silent to the visitor — they still get confirmation,
    // and the developer sees exactly why nothing arrived in the CRM.
    console.warn(
      "[api/quote] GHL_WEBHOOK_URL is not set — lead accepted but NOT delivered:",
      lead
    );
    return NextResponse.json({ ok: true, delivered: false });
  }

  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(lead),
    });

    if (!res.ok) {
      console.error("[api/quote] GHL rejected the lead:", res.status, lead);
      // 502, not 500: the failure is upstream, and the distinction matters
      // when someone is reading logs at 7am wondering whose fault it is.
      return NextResponse.json({ error: "Upstream error." }, { status: 502 });
    }

    return NextResponse.json({ ok: true, delivered: true });
  } catch (error) {
    console.error("[api/quote] Could not reach GHL:", error, lead);
    return NextResponse.json({ error: "Delivery failed." }, { status: 502 });
  }
}

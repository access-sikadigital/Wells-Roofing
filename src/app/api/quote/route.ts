import { NextResponse } from "next/server";
import {
  looksLikeSpam,
  normalizeAuPhone,
  validateEmail,
  validateMessage,
  validateName,
  validateSuburb,
} from "@/lib/lead-validation";

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
  /** Which page the form was on, and the campaign that brought them there. */
  pageUrl?: string;
  pagePath?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  gclid?: string;
  fbclid?: string;
};

/** Trim, cap, and guarantee a string — everything here arrives untrusted. */
const str = (v: unknown, max = 200) =>
  typeof v === "string" ? v.trim().slice(0, max) : "";

/** Bots complete instantly; a human cannot fill six fields in three seconds. */
const MIN_ELAPSED_MS = 3000;

export async function POST(request: Request) {
  let body: Payload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Malformed request." }, { status: 400 });
  }

  const name = str(body.name, 70);
  const email = str(body.email, 254);
  const phone = str(body.phone, 20);
  const suburb = str(body.suburb, 60);
  const message = str(body.message, 2000);
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
  if (looksLikeSpam(message)) return NextResponse.json({ ok: true });

  /*
   * Re-validate with the SAME rules the form uses. Client validation is UX —
   * this is the gate. Anything can POST here, and a form is trivially
   * bypassed with curl, so the CRM is only as clean as this block.
   */
  const nameResult = validateName(name);
  const phoneResult = normalizeAuPhone(phone);
  const invalid =
    !nameResult.ok ||
    !phoneResult.ok ||
    !!validateEmail(email) ||
    !!validateSuburb(suburb) ||
    !!validateMessage(message) ||
    services.length === 0 ||
    // Junk a browser can't produce: the picker only ever sends its own values.
    services.length > 8;

  if (invalid || !nameResult.ok || !phoneResult.ok) {
    return NextResponse.json(
      { error: "Missing or invalid fields." },
      { status: 422 }
    );
  }

  const lead = {
    // GHL maps a contact from first/last, so the split happens here rather
    // than in a workflow formula where it is invisible and unversioned.
    first_name: nameResult.first,
    last_name: nameResult.last,
    name: nameResult.full,
    email,
    // E.164 so GHL can text the number without guessing the country.
    phone: phoneResult.e164,
    phoneLocal: phoneResult.local,
    suburb,
    services,
    // Flattened copy — most CRM field mappings, GHL included, expect a string
    // rather than an array, and losing the structured version costs nothing.
    servicesText: services.join(", "),
    message,
    source: "website - quote form",
    formName: "Quote form",
    pageUrl: str(body.pageUrl, 500),
    pagePath: str(body.pagePath, 200),
    utm_source: str(body.utm_source, 100),
    utm_medium: str(body.utm_medium, 100),
    utm_campaign: str(body.utm_campaign, 200),
    utm_content: str(body.utm_content, 200),
    utm_term: str(body.utm_term, 200),
    gclid: str(body.gclid, 300),
    fbclid: str(body.fbclid, 300),
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

/**
 * LEAD VALIDATION
 * ===============
 * One set of rules, imported by BOTH the browser form and the API route.
 *
 * Client-side validation is a courtesy to the person typing. Server-side
 * validation is the actual gate — `/api/quote` is a public endpoint and
 * anything can POST to it. Keeping both on this module is what stops the two
 * drifting apart, which is the usual way a "validated" form starts letting
 * junk into the CRM.
 *
 * Every function returns a message rather than a boolean, because the form
 * needs to tell the person what to fix, not just that something is wrong.
 */

/* ------------------------------------------------------------------ name */

const NAME_ALLOWED = /^[\p{L}][\p{L}\p{M}'’.\- ]*$/u;

export type NameResult =
  | { ok: true; full: string; first: string; last: string }
  | { ok: false; error: string };

/**
 * Requires a first AND last name, which is what the client asked for.
 *
 * Wells calls these people back and often quotes in writing, so "Dave" is not
 * enough to address a quote to. The check is two words, not a surname
 * database: anything stricter starts rejecting real people.
 */
export function validateName(raw: string): NameResult {
  const full = raw.trim().replace(/\s+/g, " ");

  if (!full) return { ok: false, error: "Please tell us your name." };
  if (full.length > 70) return { ok: false, error: "That name is too long." };
  if (/\d/.test(full))
    return { ok: false, error: "Names shouldn't contain numbers." };
  if (!NAME_ALLOWED.test(full))
    return { ok: false, error: "Please use letters only." };

  const parts = full.split(" ").filter(Boolean);
  if (parts.length < 2)
    return { ok: false, error: "Please enter your first and last name." };
  // A single letter is almost always a typo or a bot. Initials with a dot
  // ("J. Smith") still pass, which is why the dot is counted.
  if (parts.some((p) => p.replace(/[.'’-]/g, "").length < 2))
    return { ok: false, error: "Please enter your full first and last name." };

  return {
    ok: true,
    full,
    first: parts[0],
    last: parts.slice(1).join(" "),
  };
}

/* ----------------------------------------------------------------- phone */

export type PhoneResult =
  | { ok: true; local: string; e164: string }
  | { ok: false; error: string };

/**
 * Australian numbers, normalised to a local 10-digit form (04xx xxx xxx) and
 * an E.164 form (+614xxxxxxxx) for the CRM.
 *
 * Accepted on input: 0412 345 678, (03) 9770 5555, +61 412 345 678,
 * 61412345678, 412345678. All of those are how real people write the same
 * number, and rejecting any of them costs a lead.
 *
 * Rejected: anything that isn't ten digits once normalised, and any area code
 * that doesn't exist. `0000000000` and `1234567890` fail on the area code
 * rule, which kills the two most common junk entries for free.
 */
export function normalizeAuPhone(raw: string): PhoneResult {
  const cleaned = raw.trim();
  if (!cleaned) return { ok: false, error: "We need a number to call you on." };
  if (/[a-z]/i.test(cleaned))
    return { ok: false, error: "Please enter numbers only." };

  let digits = cleaned.replace(/\D/g, "");

  // +61 / 61 country code → local 0 form.
  if (digits.startsWith("61") && digits.length === 11) {
    digits = "0" + digits.slice(2);
  }
  // Mobile typed without the leading zero.
  else if (digits.length === 9 && digits.startsWith("4")) {
    digits = "0" + digits;
  }

  if (digits.length !== 10) {
    return {
      ok: false,
      error: "Please enter a 10-digit number, e.g. 0412 345 678.",
    };
  }
  // 02/03/07/08 landline, 04 mobile. 05, 06, 09 and 01 are not issued.
  if (!/^0[23478]\d{8}$/.test(digits)) {
    return {
      ok: false,
      error: "That doesn't look like an Australian number.",
    };
  }
  // 0400000000 and the like.
  if (/^(\d)\1{9}$/.test(digits)) {
    return { ok: false, error: "Please enter a real contact number." };
  }

  return { ok: true, local: digits, e164: "+61" + digits.slice(1) };
}

/** 0412 345 678 / (03) 9770 5555 — display form, used as the field reformats. */
export function formatAuPhone(local: string): string {
  if (/^04/.test(local))
    return `${local.slice(0, 4)} ${local.slice(4, 7)} ${local.slice(7)}`;
  return `(${local.slice(0, 2)}) ${local.slice(2, 6)} ${local.slice(6)}`;
}

/* ----------------------------------------------------------------- email */

/**
 * Deliberately not RFC 5322. A full-spec regex accepts addresses no mail
 * server will ever deliver to, and rejects nothing a typo produces. These
 * rules catch what people actually get wrong: missing TLD, double dots, a
 * stray trailing dot, spaces.
 */
export function validateEmail(raw: string): string | null {
  const email = raw.trim();

  if (!email) return "We need an email address.";
  if (email.length > 254) return "That address is too long.";
  if (/\s/.test(email)) return "Email addresses can't contain spaces.";
  if (!/^[^@]+@[^@]+$/.test(email)) return "Please include one @ symbol.";

  const [local, domain] = email.split("@");
  if (!local || local.length > 64) return "That doesn't look like an email.";
  if (!/^[\w.!#$%&'*+/=?^`{|}~-]+$/.test(local))
    return "That doesn't look like an email.";
  if (/\.\./.test(email)) return "That address has a double dot in it.";
  if (local.startsWith(".") || local.endsWith("."))
    return "That doesn't look like an email.";
  // Domain must have a dot and a 2+ letter TLD: "you@gmail" is the single
  // most common real-world mistake.
  if (!/^[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*\.[a-z]{2,}$/i.test(domain))
    return "Please check the part after the @.";

  return null;
}

/* ---------------------------------------------------------------- suburb */

export function validateSuburb(raw: string): string | null {
  const suburb = raw.trim().replace(/\s+/g, " ");

  if (!suburb) return "Which suburb is the property in?";
  if (suburb.length < 3) return "Please enter the full suburb name.";
  if (suburb.length > 60) return "That suburb name is too long.";
  // Postcodes get typed here constantly; a suburb name is what routes the
  // job to the right crew, so ask for it rather than silently accepting 3186.
  if (/^\d+$/.test(suburb)) return "Please enter the suburb name, not a postcode.";
  if (!/^[\p{L}][\p{L}\p{M}'’.\- ]*$/u.test(suburb))
    return "Please enter a suburb name.";

  return null;
}

/* --------------------------------------------------------------- message */

export const MESSAGE_MAX = 2000;

export function validateMessage(raw: string): string | null {
  const message = raw.trim();
  if (message.length > MESSAGE_MAX)
    return `Please keep this under ${MESSAGE_MAX} characters.`;
  return null;
}

/**
 * Link-stuffing is the signature of the spam that gets through every other
 * gate: a "message" that is three URLs and a sales pitch. One link is
 * plausible (a Dropbox of roof photos), three is not.
 *
 * Used server-side only, and it returns silently-accepted rather than an
 * error — a bot that learns it was blocked adapts.
 */
export function looksLikeSpam(message: string): boolean {
  const links = message.match(/https?:\/\/|www\./gi);
  return !!links && links.length > 2;
}

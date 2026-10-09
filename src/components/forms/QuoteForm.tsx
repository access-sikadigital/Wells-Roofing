"use client";

import { useId, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { ServicePicker } from "@/components/forms/ServicePicker";
import {
  MESSAGE_MAX,
  formatAuPhone,
  normalizeAuPhone,
  validateEmail,
  validateMessage,
  validateName,
  validateSuburb,
} from "@/lib/lead-validation";

/**
 * QUOTE FORM
 * ==========
 * Six fields, four of them in a 2×2 grid. That is the whole design.
 *
 * Every field costs completions, and Wells does not need a project brief at
 * this stage — they need enough to call the person back and know which crew
 * the job belongs to. Anything else is asked on the phone, where it converts
 * rather than deters.
 *
 * The two that look optional but aren't:
 *
 *  · **Suburb** decides whether it's a Peninsula, Bayside or Melbourne job.
 *    That's the routing question, and the local-reporting dimension the CRM
 *    audit flagged as missing.
 *  · **Service** is the slate-vs-tile split. Without it every enquiry lands in
 *    one undifferentiated pipeline and cost-per-qualified-slate-lead can't be
 *    measured — the audit's central segmentation finding.
 *
 * Service is MULTI-select: "slate roof plus the terracotta on the extension"
 * is a normal roofing job, and forcing one answer loses information the
 * estimator needs. See ServicePicker for why it isn't a native <select>.
 *
 * Spam: the discovery questionnaire records the old site having a spam
 * problem, so there's a honeypot plus a submission-time floor. Both invisible
 * to real users, neither needs a third-party script.
 */

const SERVICES = [
  "Natural slate roofing",
  "Slate roof restoration",
  "Heritage roofing",
  "Slate roof repairs",
  "Terracotta tile roofing",
  "Concrete tile roofing",
  "Slate supply / specification (trade)",
  "Not sure yet",
] as const;

type Status = "idle" | "submitting" | "success" | "error";
type FieldKey = "name" | "email" | "phone" | "suburb" | "services" | "message";
type Errors = Partial<Record<FieldKey, string>>;

/**
 * One rule per field, so blur-time and submit-time validation can never
 * disagree — they call the same function. The rules themselves live in
 * `lib/lead-validation`, which the API route imports too.
 */
function checkField(key: FieldKey, value: string): string | undefined {
  switch (key) {
    case "name": {
      const r = validateName(value);
      return r.ok ? undefined : r.error;
    }
    case "email":
      return validateEmail(value) ?? undefined;
    case "phone": {
      const r = normalizeAuPhone(value);
      return r.ok ? undefined : r.error;
    }
    case "suburb":
      return validateSuburb(value) ?? undefined;
    case "message":
      return validateMessage(value) ?? undefined;
    default:
      return undefined;
  }
}

export function QuoteForm({ className }: { className?: string }) {
  const id = useId();
  const router = useRouter();
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [services, setServices] = useState<string[]>([]);
  const successRef = useRef<HTMLDivElement>(null);
  /** When the form first rendered — used as a bot heuristic. */
  const mountedAt = useRef(Date.now());

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const values = {
      name: String(data.get("name") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      phone: String(data.get("phone") ?? "").trim(),
      suburb: String(data.get("suburb") ?? "").trim(),
      message: String(data.get("message") ?? "").trim(),
      services,
      // Honeypot — invisible to real users, so anything here is a bot.
      company: String(data.get("company") ?? ""),
    };

    const next: Errors = {};
    next.name = checkField("name", values.name);
    next.email = checkField("email", values.email);
    next.phone = checkField("phone", values.phone);
    next.suburb = checkField("suburb", values.suburb);
    next.message = checkField("message", values.message);
    if (values.services.length === 0)
      next.services = "Pick at least one service.";
    // Undefined entries would otherwise count as errors on the length check.
    (Object.keys(next) as FieldKey[]).forEach((k) => {
      if (!next[k]) delete next[k];
    });

    setErrors(next);
    if (Object.keys(next).length > 0) {
      // Move focus to the first problem rather than leaving the user to hunt.
      form.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
      return;
    }

    setStatus("submitting");
    try {
      /*
        Campaign data is read at SUBMIT time from the URL, and falls back to
        whatever was stashed on the first page of the visit. Someone lands on
        an ad URL, reads two service pages, then fills the form — by then the
        UTMs are long gone from the address bar, and without the fallback
        every one of those leads reports as direct traffic.
      */
      const params = new URLSearchParams(window.location.search);
      const stashed = (k: string) => {
        const live = params.get(k);
        if (live) {
          try {
            sessionStorage.setItem(`wr_${k}`, live);
          } catch {
            /* private mode — the live value still works for this submit */
          }
          return live;
        }
        try {
          return sessionStorage.getItem(`wr_${k}`) ?? "";
        } catch {
          return "";
        }
      };

      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          elapsedMs: Date.now() - mountedAt.current,
          pageUrl: window.location.href,
          pagePath: window.location.pathname,
          utm_source: stashed("utm_source"),
          utm_medium: stashed("utm_medium"),
          utm_campaign: stashed("utm_campaign"),
          utm_content: stashed("utm_content"),
          utm_term: stashed("utm_term"),
          gclid: stashed("gclid"),
          fbclid: stashed("fbclid"),
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("success");
      form.reset();
      setServices([]);
      /*
        Send them to /thank-you/ rather than swapping the form for a success
        message. A distinct URL is what Google Ads and Meta count conversions
        on, and it gives the person somewhere to go next.

        The inline success state below is still rendered: it shows for the
        instant before navigation, and it is what they see if the route fails
        to load. A submitted lead must never look unsubmitted.
      */
      requestAnimationFrame(() => successRef.current?.focus());
      router.push("/thank-you");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        className={cn(
          "rounded-card bg-white p-8 shadow-chip outline-none lg:p-10",
          className
        )}
      >
        <p className="font-display text-h3 font-extrabold tracking-tight text-navy-900">
          Thanks — we&apos;ve got it.
        </p>
        <p className="mt-4 text-small text-stone-600">
          One of our specialists will call you back. If it&apos;s urgent, ring
          us directly on{" "}
          <a
            href={siteConfig.phoneHref}
            className="font-semibold text-accent underline underline-offset-4"
          >
            {siteConfig.phone}
          </a>
          .
        </p>
      </div>
    );
  }

  /*
    Validate on BLUR, never on keystroke. Checking as someone types tells them
    "that doesn't look like an email" while they are still on the second
    letter of it, which reads as the form arguing with them. Blur catches the
    mistake the moment they move on, which is early enough to fix and late
    enough to be fair.

    Errors clear on the next keystroke rather than waiting for another blur:
    once someone starts fixing it, the red message has done its job.
  */
  const onBlur = (key: FieldKey) => (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = e.currentTarget.value;
    const error = checkField(key, value);
    setErrors((prev) => ({ ...prev, [key]: error }));

    // Tidy the number into the format Wells reads on a call sheet, but only
    // once it is actually valid — reformatting a half-typed number fights
    // the person typing it.
    if (key === "phone" && !error) {
      const r = normalizeAuPhone(value);
      if (r.ok) e.currentTarget.value = formatAuPhone(r.local);
    }
  };

  const onInput = (key: FieldKey) => () =>
    setErrors((prev) => (prev[key] ? { ...prev, [key]: undefined } : prev));

  const field =
    "mt-1.5 w-full rounded-button border border-stone-300 bg-white px-4 py-3 text-body text-navy-900 " +
    "transition-colors duration-base placeholder:text-stone-400 " +
    "focus:border-accent focus:ring-2 focus:ring-accent/25 focus:outline-none " +
    "aria-[invalid=true]:border-accent aria-[invalid=true]:ring-2 aria-[invalid=true]:ring-accent/20";
  const label =
    "block font-display text-[0.75rem] font-bold tracking-[0.12em] text-navy-900 uppercase";
  const errorText = "mt-1.5 text-small text-accent";

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      className={cn("rounded-card bg-white p-6 shadow-chip sm:p-8", className)}
    >
      <p className="font-display text-h4 font-extrabold tracking-tight text-navy-900">
        Request a quote
      </p>
      <p className="mt-2 text-small text-stone-600">
        A few details. We&apos;ll call you back — usually the same day.
      </p>

      {/* The four identity fields pair naturally: who you are, how to reach
          you, where the roof is. Two columns keeps the form above the fold. */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor={`${id}-name`} className={label}>
            Name
          </label>
          <input
            id={`${id}-name`}
            name="name"
            type="text"
            autoComplete="name"
            placeholder="First and last name"
            maxLength={70}
            onBlur={onBlur("name")}
            onInput={onInput("name")}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? `${id}-name-err` : undefined}
            className={field}
          />
          {errors.name && (
            <p id={`${id}-name-err`} className={errorText}>
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor={`${id}-email`} className={label}>
            Email
          </label>
          <input
            id={`${id}-email`}
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="you@example.com"
            maxLength={254}
            onBlur={onBlur("email")}
            onInput={onInput("email")}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? `${id}-email-err` : undefined}
            className={field}
          />
          {errors.email && (
            <p id={`${id}-email-err`} className={errorText}>
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <label htmlFor={`${id}-phone`} className={label}>
            Contact number
          </label>
          <input
            id={`${id}-phone`}
            name="phone"
            /* `tel`, not `number`: phone numbers aren't quantities — `number`
               strips the leading zero off 04… and renders a spinner. */
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="0412 345 678"
            maxLength={20}
            onBlur={onBlur("phone")}
            onInput={onInput("phone")}
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? `${id}-phone-err` : undefined}
            className={field}
          />
          {errors.phone && (
            <p id={`${id}-phone-err`} className={errorText}>
              {errors.phone}
            </p>
          )}
        </div>

        <div>
          <label htmlFor={`${id}-suburb`} className={label}>
            Suburb
          </label>
          <input
            id={`${id}-suburb`}
            name="suburb"
            type="text"
            autoComplete="address-level2"
            placeholder="e.g. Brighton"
            maxLength={60}
            onBlur={onBlur("suburb")}
            onInput={onInput("suburb")}
            aria-invalid={!!errors.suburb}
            aria-describedby={errors.suburb ? `${id}-suburb-err` : undefined}
            className={field}
          />
          {errors.suburb && (
            <p id={`${id}-suburb-err`} className={errorText}>
              {errors.suburb}
            </p>
          )}
        </div>
      </div>

      <div className="mt-4">
        <span id={`${id}-services-label`} className={label}>
          What do you need?{" "}
          <span className="text-stone-400 normal-case">
            (pick any that apply)
          </span>
        </span>
        <ServicePicker
          options={SERVICES}
          value={services}
          onChange={(next) => {
            setServices(next);
            if (next.length) setErrors((e) => ({ ...e, services: undefined }));
          }}
          invalid={!!errors.services}
          describedBy={errors.services ? `${id}-services-err` : undefined}
          labelId={`${id}-services-label`}
        />
        {errors.services && (
          <p id={`${id}-services-err`} className={errorText}>
            {errors.services}
          </p>
        )}
      </div>

      <div className="mt-4">
        <label htmlFor={`${id}-message`} className={label}>
          Message <span className="text-stone-400 normal-case">(optional)</span>
        </label>
        <textarea
          id={`${id}-message`}
          name="message"
          rows={3}
          /* Hard cap rather than a counter: nobody writing a roofing enquiry
             is near 2000 characters, and anything that is, is a bot. */
          maxLength={MESSAGE_MAX}
          placeholder="Anything useful — age of the roof, what's going wrong, timing."
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? `${id}-message-err` : undefined}
          onBlur={onBlur("message")}
          onInput={onInput("message")}
          className={cn(field, "resize-y")}
        />
        {errors.message && (
          <p id={`${id}-message-err`} className={errorText}>
            {errors.message}
          </p>
        )}
      </div>

      {/* Honeypot. Hidden from sight and from assistive tech; bots fill it. */}
      <div
        aria-hidden
        className="absolute -left-[9999px] h-0 w-0 overflow-hidden"
      >
        <label htmlFor={`${id}-company`}>Company</label>
        <input
          id={`${id}-company`}
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {status === "error" && (
        <p role="alert" className="mt-5 text-small text-accent">
          Something went wrong sending that. Please try again, or call us on{" "}
          <a href={siteConfig.phoneHref} className="font-semibold underline">
            {siteConfig.phone}
          </a>
          .
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className={cn(
          "mt-6 flex w-full items-center justify-center gap-2.5 rounded-button bg-accent px-6 py-4",
          "font-display text-small font-bold tracking-[0.06em] text-white uppercase",
          "transition-all duration-base ease-out-quart",
          "hover:bg-accent-hover active:scale-[0.99]",
          "disabled:cursor-not-allowed disabled:opacity-70"
        )}
      >
        {status === "submitting" ? "Sending…" : "Request my quote"}
      </button>

      <p className="mt-4 text-center text-[0.8125rem] text-stone-500">
        No obligation. We don&apos;t share your details.
      </p>
    </form>
  );
}

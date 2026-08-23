"use client";

import { useEffect, useId, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * MULTI-SELECT SERVICE PICKER
 * ===========================
 * A native `<select multiple>` was the obvious choice and is unusable: on
 * desktop it needs ctrl/cmd-click that nobody discovers, and on iOS it renders
 * as a scrolling wheel that hides every option but one.
 *
 * So: a disclosure button over a plain checkbox group. Deliberately NOT the
 * ARIA `listbox`/`option` pattern — that requires hand-implementing roving
 * focus, type-ahead and selection-follows-focus, and gets subtly wrong in
 * screen readers. Native checkboxes give all of that for free: they announce
 * their own state, they're keyboard-operable by default, and they still work
 * if the JS that toggles the panel never loads.
 *
 * Roofing enquiries genuinely are multi-service — "slate roof plus the
 * terracotta on the extension" is a normal job — so forcing one choice
 * loses information the estimator needs.
 */
export function ServicePicker({
  options,
  value,
  onChange,
  invalid,
  describedBy,
  labelId,
  className,
}: {
  options: readonly string[];
  value: string[];
  onChange: (next: string[]) => void;
  invalid?: boolean;
  describedBy?: string;
  labelId: string;
  className?: string;
}) {
  const panelId = useId();
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);

  /* Close on outside click and on Escape — both expected of any dropdown. */
  useEffect(() => {
    if (!open) return;

    const onPointerDown = (e: PointerEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      // Return focus to the trigger, or the user is stranded mid-form.
      trigger.current?.focus();
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const toggle = (option: string) =>
    onChange(
      value.includes(option)
        ? value.filter((v) => v !== option)
        : [...value, option]
    );

  /*
   * Summary text. Naming the first selection rather than only counting means
   * the closed control still says something useful — "3 selected" forces the
   * user to reopen it to remember what they picked.
   */
  const summary =
    value.length === 0
      ? "Select one or more"
      : value.length === 1
        ? value[0]
        : `${value[0]} +${value.length - 1} more`;

  return (
    <div ref={root} className={cn("relative", className)}>
      <button
        ref={trigger}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={panelId}
        aria-labelledby={labelId}
        aria-invalid={invalid || undefined}
        aria-describedby={describedBy}
        className={cn(
          "mt-1.5 flex w-full items-center justify-between gap-3 rounded-button border bg-white px-4 py-3 text-left",
          "text-body transition-colors duration-base",
          "focus:border-accent focus:ring-2 focus:ring-accent/25 focus:outline-none",
          invalid ? "border-accent ring-2 ring-accent/20" : "border-stone-300",
          value.length ? "text-navy-900" : "text-stone-400"
        )}
      >
        <span className="truncate">{summary}</span>
        <svg
          viewBox="0 0 12 12"
          fill="none"
          aria-hidden
          className={cn(
            "size-3 shrink-0 text-stone-500 transition-transform duration-base ease-out-quart",
            open && "rotate-180"
          )}
        >
          <path
            d="M2.5 4.5 6 8l3.5-3.5"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* Selected shown as removable chips, so the choices stay visible with
          the panel closed and can be undone without reopening it. */}
      {value.length > 0 && (
        <ul className="mt-2 flex flex-wrap gap-1.5">
          {value.map((v) => (
            <li key={v}>
              <button
                type="button"
                onClick={() => toggle(v)}
                className="flex items-center gap-1.5 rounded-pill bg-navy-900/5 py-1 pr-2 pl-3 text-[0.75rem] font-medium text-navy-900 transition-colors hover:bg-navy-900/10"
              >
                {v}
                <span aria-hidden className="text-stone-500">
                  ×
                </span>
                <span className="sr-only">Remove {v}</span>
              </button>
            </li>
          ))}
        </ul>
      )}

      {open && (
        <div
          id={panelId}
          role="group"
          aria-labelledby={labelId}
          /*
           * `data-lenis-prevent` is REQUIRED, not a nicety.
           *
           * Lenis intercepts wheel and touch events on the document and
           * animates the page itself, so a nested scroll container gets a
           * scrollbar it can never move — the list looks scrollable and simply
           * ignores the wheel while the page slides behind it. This attribute
           * tells Lenis to leave events originating inside this element alone
           * and let the browser scroll it natively.
           *
           * `overscroll-contain` then stops the page from taking over again
           * once the list hits its top or bottom.
           */
          data-lenis-prevent
          className="absolute z-20 mt-2 max-h-72 w-full overflow-y-auto overscroll-contain rounded-card border border-stone-200 bg-white p-1.5 shadow-chip"
        >
          {options.map((option) => {
            const checked = value.includes(option);
            return (
              <label
                key={option}
                className={cn(
                  "flex cursor-pointer items-center gap-3 rounded-button px-3 py-2.5 text-small transition-colors",
                  checked
                    ? "bg-accent/8 text-navy-900"
                    : "text-stone-700 hover:bg-stone-100"
                )}
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggle(option)}
                  className="size-4 shrink-0 accent-[#e51a1d]"
                />
                {option}
              </label>
            );
          })}
        </div>
      )}
    </div>
  );
}

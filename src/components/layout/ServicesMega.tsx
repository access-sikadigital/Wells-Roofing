"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "motion/react";
import { serviceGroups } from "@/config/pages";
import { easeOutExpo } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * SERVICES MEGA-MENU (desktop)
 * ============================
 * Two-level flyout: the service groups run down the left rail, and hovering or
 * focusing one swaps the right pane to that group's pages.
 *
 * Why this replaced three top-level dropdowns
 * ------------------------------------------
 * The header used to carry "Slate Roofing", "Tile Roofing" and "For Architects
 * & Builders" as three separate hover menus. That spent half the nav on
 * variations of one idea, gave no room to say what each cluster actually
 * covers, and meant a visitor had to open three menus to see the full range.
 * One "Services" item shows all of it at once and frees the bar for Projects,
 * Reviews, About and Contact.
 *
 * Interaction notes
 * -----------------
 * · The left rail responds to `mouseenter` AND `focus`, so a keyboard user
 *   tabbing through the group headings changes the right pane exactly as a
 *   mouse user does — the pane is never stale relative to focus.
 * · Every group heading is a real link to its own landing page. Pointing at
 *   "Slate Roofing" and clicking should go to the slate page, not do nothing,
 *   which is the usual failure of this pattern.
 * · The panel is positioned relative to the nav item and centred on it, so it
 *   stays on-axis rather than hanging off the left edge like the old 18rem
 *   dropdowns did.
 *
 * The footer row deliberately does NOT say "View all services" — there is no
 * services index page on this site, and linking one that does not exist is
 * worse than not having the row. It carries the consultation CTA instead,
 * which is what that band is really for.
 */
export function ServicesMega({ onNavigate }: { onNavigate?: () => void }) {
  const [active, setActive] = useState(0);
  const group = serviceGroups[active];

  return (
    <motion.div
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.2, ease: [...easeOutExpo] }}
      className="absolute left-1/2 top-full w-[46rem] -translate-x-1/2 overflow-hidden rounded-card border border-line bg-background shadow-lift"
    >
      <div className="grid grid-cols-[17rem_1fr]">
        {/* Left rail — the groups */}
        <ul className="border-r border-line bg-surface p-2">
          {serviceGroups.map((g, i) => (
            <li key={g.href}>
              <Link
                href={g.href}
                onClick={onNavigate}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                className={cn(
                  "flex items-center justify-between gap-3 rounded-button px-4 py-3.5 transition-colors duration-base",
                  i === active
                    ? "bg-background text-accent"
                    : "text-foreground hover:text-accent"
                )}
              >
                <span className="text-small font-semibold">{g.label}</span>
                <svg
                  className={cn(
                    "size-3 shrink-0 -rotate-90 transition-opacity duration-base",
                    i === active ? "opacity-100" : "opacity-30"
                  )}
                  viewBox="0 0 12 12"
                  fill="none"
                  aria-hidden
                >
                  <path
                    d="M2.5 4.5 6 8l3.5-3.5"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </li>
          ))}
        </ul>

        {/* Right pane — the active group's pages */}
        <div className="p-5">
          <p className="px-3 text-eyebrow font-semibold uppercase tracking-wider text-faint">
            {group.label}
          </p>
          <p className="mt-1.5 px-3 text-small text-muted">{group.blurb}</p>

          <ul className="mt-4 grid grid-cols-2 gap-1">
            {group.children.map((child) => (
              <li key={child.href}>
                <Link
                  href={child.href}
                  onClick={onNavigate}
                  className="block rounded-button px-3 py-2.5 text-small font-medium text-muted transition-colors duration-base hover:bg-surface hover:text-accent"
                >
                  {child.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Footer band */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line bg-surface px-6 py-4">
        <p className="text-small text-muted">
          Not sure what your roof needs? We&rsquo;ll tell you straight.
        </p>
        <Link
          href="/contact"
          onClick={onNavigate}
          className="inline-flex items-center gap-2 text-small font-semibold text-accent transition-opacity duration-base hover:opacity-70"
        >
          Book a consultation
          <span aria-hidden>&rarr;</span>
        </Link>
      </div>
    </motion.div>
  );
}

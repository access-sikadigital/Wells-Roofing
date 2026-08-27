"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { siteConfig } from "@/config/site";
import { primaryNav, type NavItem } from "@/config/pages";
import { Button } from "@/components/ui/Button";
import { LogoSwap } from "@/components/brand/Logo";
import { cn } from "@/lib/utils";
import { easeOutExpo } from "@/lib/motion";
import { gsap, useGSAP, EASE } from "@/lib/gsap";

/**
 * One row of the mobile menu.
 *
 * A group with children is an accordion that starts **closed** — listing every
 * child inline pushed "Projects" below the fold on a phone and made the two
 * dropdowns indistinguishable from the flat links. Only one group is open at a
 * time (state lives in `Header`), so the menu can never grow taller than the
 * viewport again.
 *
 * The panel animates height 0 ↔ auto with GSAP rather than a CSS max-height
 * guess, so it is exactly as tall as its contents at any breakpoint.
 */
function MobileNavRow({
  item,
  expanded,
  onToggle,
  onNavigate,
}: {
  item: NavItem;
  expanded: boolean;
  onToggle: () => void;
  onNavigate: () => void;
}) {
  const panel = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const panelId = `m-nav-${item.label.replace(/\W+/g, "-").toLowerCase()}`;

  useGSAP(
    () => {
      const el = panel.current;
      if (!el) return;
      gsap.to(el, {
        height: expanded ? "auto" : 0,
        autoAlpha: expanded ? 1 : 0,
        duration: reduce ? 0 : 0.45,
        ease: EASE.expo,
      });
    },
    { dependencies: [expanded, reduce] }
  );

  if (!item.children) {
    return (
      <div data-menu-row>
        <Link
          href={item.href}
          onClick={onNavigate}
          className="font-display text-h3 font-extrabold uppercase tracking-tight text-foreground transition-colors hover:text-accent"
        >
          {item.label}
        </Link>
      </div>
    );
  }

  return (
    <div data-menu-row>
      <div className="flex items-center justify-between gap-4">
        {/* The label still navigates to the cluster's own page — the chevron
            is a separate target so opening the list never costs a page load. */}
        <Link
          href={item.href}
          onClick={onNavigate}
          className="font-display text-h3 font-extrabold uppercase tracking-tight text-foreground transition-colors hover:text-accent"
        >
          {item.label}
        </Link>

        <button
          type="button"
          onClick={onToggle}
          aria-expanded={expanded}
          aria-controls={panelId}
          aria-label={`${expanded ? "Collapse" : "Expand"} ${item.label}`}
          className="flex size-11 shrink-0 items-center justify-center rounded-full border border-line text-foreground transition-colors duration-base hover:border-accent hover:text-accent"
        >
          <svg
            className={cn(
              "size-4 transition-transform duration-base ease-out-quart",
              expanded && "rotate-180"
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
        </button>
      </div>

      {/* Starts closed in the markup itself, so there is no open-then-collapse
          flash before GSAP takes over on hydration. */}
      <div
        id={panelId}
        ref={panel}
        style={{ height: 0, opacity: 0, overflow: "hidden" }}
      >
        <ul className="mt-4 space-y-3 border-l border-line pl-5">
          {item.children.map((child) => (
            <li key={child.href}>
              <Link
                href={child.href}
                onClick={onNavigate}
                className="block text-body text-muted transition-colors hover:text-accent"
              >
                {child.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/**
 * Fixed header driven by `primaryNav` in src/config/pages.ts:
 * Slate Roofing (dropdown) · Tile Roofing (dropdown) · For Architects &
 * Builders · Projects · About · Contact — plus persistent click-to-call
 * and a "Get a Quote" button, per the strategy doc.
 *
 * Desktop dropdowns are Motion (hover enter/exit). The mobile panel is GSAP:
 * it is one choreographed timeline — scrim, then rows stagger in, then the
 * footer — and it has to reverse cleanly on close, which is what a paused
 * timeline does well.
 */
export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  /** Which mobile accordion is expanded. `null` = all closed, the default. */
  const [mobileGroup, setMobileGroup] = useState<string | null>(null);
  const panel = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 32);
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
  }, [open]);

  /** Collapse every accordion on close, so the menu always reopens clean. */
  const closeMenu = () => {
    setOpen(false);
    setMobileGroup(null);
  };

  /**
   * The mobile panel timeline. Built once and left paused, then played or
   * reversed — cheaper than rebuilding on every toggle, and a reverse gives a
   * true exit animation without keeping the panel mounted conditionally.
   *
   * `autoAlpha` drives `visibility` alongside opacity, which is what keeps the
   * closed panel out of the tab order rather than just invisible.
   */
  useGSAP(
    () => {
      const el = panel.current;
      if (!el) return;

      const tl = gsap.timeline({ paused: true });

      if (reduce) {
        tl.set(el, { autoAlpha: 1 });
      } else {
        tl.fromTo(
          el,
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 0.28, ease: "power2.out" }
        )
          .fromTo(
            el.querySelectorAll("[data-menu-row]"),
            { autoAlpha: 0, y: 26 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.6,
              stagger: 0.055,
              ease: EASE.expo,
            },
            0.1
          )
          .fromTo(
            el.querySelectorAll("[data-menu-foot]"),
            { autoAlpha: 0, y: 20 },
            { autoAlpha: 1, y: 0, duration: 0.6, ease: EASE.expo },
            "-=0.35"
          );
      }

      tlRef.current = tl;
      return () => {
        tlRef.current = null;
      };
    },
    { scope: panel, dependencies: [reduce] }
  );

  useEffect(() => {
    const tl = tlRef.current;
    if (!tl) return;
    if (open) tl.play();
    else tl.reverse();
  }, [open]);

  const onDark = !scrolled || open;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-base ease-out-quart",
        scrolled && !open
          /* Was /90 + blur-md. At 320px the hero paragraph was still legible
             through the bar — the line under the logo read as a rendering
             fault rather than as glass. /95 with a heavier blur keeps the
             translucency without letting text read through it. */
          ? "border-b border-line bg-background/95 backdrop-blur-xl"
          : "border-b border-transparent"
      )}
    >
      {/*
        Three-column grid rather than `justify-between`.

        With flex, the nav is only centred by accident — it sits wherever the
        logo and the button leave room, so it drifts the moment either changes
        width (and it already sat noticeably right of centre). `1fr auto 1fr`
        pins the nav to the true centre of the header and lets the logo and
        CTA grow into the equal side columns independently.

        `min-w-0` on the side columns stops a long logo forcing the centre
        column off-axis at narrow desktop widths.
      */}
      {/*
        ONE FIXED BAR HEIGHT. A previous pass had this opening at 6rem and
        shrinking to 4.5rem on scroll to buy the logo more room; it read as a
        banner rather than a header and the reflow on first scroll was
        distracting. 5rem is the compromise — 8px taller than the original,
        which is enough for the frameless lockup to sit comfortably.
      */}
      <div className="mx-auto grid h-20 w-full max-w-wide grid-cols-[1fr_auto_1fr] items-center gap-4 px-5 sm:px-8 lg:px-12">
        {/* Left — logo */}
        <div className="flex min-w-0 justify-start">
          <Link
            href="/"
            onClick={closeMenu}
            aria-label={`${siteConfig.name} — home`}
            className="block"
          >
            {/*
              Sized to the 5rem bar with ~12px of clear space above and below.
              Looks modest as a number, but this is the FRAMELESS lockup — at
              56px the mark reads about the same as the framed master would at
              70px, because the old keyline was eating a fifth of the height.
            */}
            <LogoSwap reversed={onDark} className="h-11 lg:h-14" />
          </Link>
        </div>

        {/* Centre — desktop nav */}
        <nav className="hidden items-center gap-7 xl:flex">
          {primaryNav.map((item) => (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => setOpenGroup(item.label)}
              onMouseLeave={() => setOpenGroup(null)}
            >
              <Link
                href={item.href}
                className={cn(
                  "flex items-center gap-1.5 py-6 text-small font-semibold transition-colors duration-base hover:text-accent",
                  onDark ? "text-stone-200" : "text-muted"
                )}
              >
                {item.label}
                {item.children && (
                  <svg
                    className={cn(
                      "size-3 transition-transform duration-base",
                      openGroup === item.label && "rotate-180"
                    )}
                    viewBox="0 0 12 12"
                    fill="none"
                    aria-hidden
                  >
                    <path
                      d="M2.5 4.5 6 8l3.5-3.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </Link>

              <AnimatePresence>
                {item.children && openGroup === item.label && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.2, ease: [...easeOutExpo] }}
                    className="absolute left-0 top-full w-72 overflow-hidden rounded-card border border-line bg-background shadow-lift"
                  >
                    <ul className="p-2">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            className="block rounded-button px-4 py-3 text-small font-medium text-muted transition-colors hover:bg-surface hover:text-accent"
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}

        </nav>

        {/* Right — CTA (desktop) and menu toggle (mobile) */}
        <div className="col-start-3 flex min-w-0 items-center justify-end">
          {/*
            The phone number used to sit alongside this. It was removed once
            the sitewide FloatingCall button landed — two persistent
            click-to-call targets at once is one too many, and the header is
            now a single, unambiguous "Get a Quote" action.
          */}
          <Button
            href="/contact"
            variant="accent"
            arrow
            className="hidden xl:inline-flex"
          >
            Get a Quote
          </Button>

          {/* Mobile toggle */}
          <button
            className={cn(
              "-mr-2 flex size-11 flex-col items-center justify-center gap-1.5 xl:hidden",
              onDark ? "text-white" : "text-foreground"
            )}
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            <span
              className={cn(
                "h-0.5 w-6 bg-current transition-transform duration-base ease-out-quart",
                open && "translate-y-[4px] rotate-45"
              )}
            />
            <span
              className={cn(
                "h-0.5 w-6 bg-current transition-transform duration-base ease-out-quart",
                open && "-translate-y-[4px] -rotate-45"
              )}
            />
          </button>
        </div>
      </div>

      {/* Mobile overlay — stays mounted so GSAP can animate it out.
          `invisible` is the closed state in the markup; the timeline's
          autoAlpha owns it from hydration on. `data-lenis-prevent` keeps
          Lenis off this panel so it scrolls natively when the list is long. */}
      <div
        ref={panel}
        data-lenis-prevent
        inert={!open || undefined}
        className="theme-dark invisible fixed inset-0 -z-10 overflow-y-auto bg-background px-8 pb-16 pt-28 opacity-0 xl:hidden"
      >
        <nav className="flex flex-col gap-6">
          {primaryNav.map((item) => (
            <MobileNavRow
              key={item.label}
              item={item}
              expanded={mobileGroup === item.label}
              onToggle={() =>
                setMobileGroup((cur) =>
                  cur === item.label ? null : item.label
                )
              }
              onNavigate={closeMenu}
            />
          ))}
        </nav>

        <div data-menu-foot className="mt-10 flex flex-col items-start gap-5">
          <Button
            href="/contact"
            variant="accent"
            size="lg"
            arrow
            onClick={closeMenu}
          >
            Get a Quote
          </Button>
          {/*
            Kept here, unlike the desktop bar: on a phone the FloatingCall
            button is icon-only, so this is the one place the number is
            actually readable — and it is inside an opened menu rather than
            persistently on screen, so it competes with nothing.
          */}
          <a
            href={siteConfig.phoneHref}
            className="font-display text-h3 font-bold text-foreground"
          >
            {siteConfig.phone}
          </a>
        </div>
      </div>
    </header>
  );
}

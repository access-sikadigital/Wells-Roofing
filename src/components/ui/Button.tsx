import Link from "next/link";
import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonProps = {
  children: ReactNode;
  href?: string;
  variant?: "solid" | "accent" | "outline";
  size?: "md" | "lg";
  className?: string;
  arrow?: boolean;
  onClick?: () => void;
  type?: "button" | "submit";
};

const base =
  "group inline-flex items-center justify-center gap-2.5 rounded-button " +
  "font-display font-bold uppercase tracking-[0.06em] " +
  "transition-all duration-base ease-out-quart will-change-transform " +
  "active:scale-[0.98] select-none";

const variants = {
  solid: "bg-brand text-on-brand hover:bg-brand-hover",
  accent: "bg-accent text-on-accent hover:bg-accent-hover hover:shadow-accent",
  outline:
    "border-2 border-line-strong text-foreground hover:border-accent hover:text-accent",
} as const;

const sizes = {
  md: "px-6 py-3 text-[0.8125rem]",
  lg: "px-8 py-4 text-small",
} as const;

function Arrow() {
  return (
    <svg
      className="size-4 transition-transform duration-base ease-out-quart group-hover:translate-x-1"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
    >
      <path
        d="M1 8h13m0 0L9 3m5 5-5 5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Button({
  children,
  href,
  variant = "solid",
  size = "md",
  className,
  arrow = false,
  onClick,
  type = "button",
}: ButtonProps) {
  const classes = cn(base, variants[variant], sizes[size], className);

  if (href) {
    return (
      <Link href={href} className={classes} onClick={onClick}>
        {children}
        {arrow && <Arrow />}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} onClick={onClick}>
      {children}
      {arrow && <Arrow />}
    </button>
  );
}

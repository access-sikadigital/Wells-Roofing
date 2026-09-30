import { type ElementType, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type ContainerProps = {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  /** "content" = 1280px reading width, "wide" = 1920px layout width */
  size?: "content" | "wide";
};

export function Container({
  children,
  className,
  as: Tag = "div",
  size = "wide",
}: ContainerProps) {
  return (
    <Tag
      className={cn(
        /*
          Gutters step up past `lg` now that the container runs to 1920px: a
          48px gutter that read generously against a 1400px band looks like a
          hairline against a full-width one. Header.tsx repeats this exact
          scale — the logo and nav have to sit on the same vertical lines as
          the section content below them, so the two must be changed together.
        */
        "mx-auto w-full px-5 sm:px-8 lg:px-12 xl:px-16 2xl:px-20",
        size === "wide" ? "max-w-wide" : "max-w-content",
        className
      )}
    >
      {children}
    </Tag>
  );
}

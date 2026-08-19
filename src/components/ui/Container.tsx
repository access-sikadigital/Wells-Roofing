import { type ElementType, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type ContainerProps = {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  /** "content" = 1140px reading width, "wide" = 1400px layout width */
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
        "mx-auto w-full px-5 sm:px-8 lg:px-12",
        size === "wide" ? "max-w-wide" : "max-w-content",
        className
      )}
    >
      {children}
    </Tag>
  );
}

import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { brandAssets } from "@/config/brand";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

type LogoVariant = "header" | "footer" | "icon";

interface LogoProps {
  variant?: LogoVariant;
  className?: string;
  link?: boolean;
}

function CompanyName({ variant }: { variant: "header" | "footer" }) {
  const isFooter = variant === "footer";

  return (
    <span className="flex min-w-0 flex-col leading-tight">
      <span
        className={cn(
          "font-bold tracking-tight",
          isFooter ? "text-lg text-white" : "text-base sm:text-lg text-primary-dark"
        )}
      >
        {siteConfig.shortName}
      </span>
      <span
        className={cn(
          "mt-0.5",
          isFooter
            ? "text-xs text-white/80"
            : "text-[10px] sm:text-xs text-muted"
        )}
      >
        NAKO NAGARAJ CO., LTD
      </span>
    </span>
  );
}

export function Logo({ variant = "header", className, link = true }: LogoProps) {
  const isIconOnly = variant === "icon";

  const mark = (
    <Image
      src={brandAssets.icon}
      alt=""
      aria-hidden
      width={512}
      height={512}
      priority={variant === "header"}
      className={cn(
        "shrink-0 object-contain",
        variant === "header" && "h-11 w-11 sm:h-12 sm:w-12",
        variant === "footer" && "h-14 w-14",
        variant === "icon" && "h-10 w-10",
        className
      )}
    />
  );

  let content: ReactNode;

  if (isIconOnly) {
    content = mark;
  } else if (variant === "footer") {
    content = (
      <span className="inline-flex items-center gap-3.5">
        <span className="inline-flex rounded-xl bg-white p-2 shadow-md">{mark}</span>
        <CompanyName variant="footer" />
      </span>
    );
  } else {
    content = (
      <span className="inline-flex items-center gap-2.5 sm:gap-3">
        {mark}
        <CompanyName variant="header" />
      </span>
    );
  }

  if (!link) {
    return <span className={cn("inline-flex shrink-0 items-center", className)}>{content}</span>;
  }

  return (
    <Link
      href="/"
      className={cn("inline-flex shrink-0 items-center", className)}
      aria-label={`${siteConfig.name} — Home`}
    >
      {content}
    </Link>
  );
}

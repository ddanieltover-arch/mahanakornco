import Image from "next/image";
import Link from "next/link";
import { brandAssets } from "@/config/brand";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

type LogoVariant = "header" | "footer" | "icon";

interface LogoProps {
  variant?: LogoVariant;
  className?: string;
  link?: boolean;
}

export function Logo({ variant = "header", className, link = true }: LogoProps) {
  const isIcon = variant === "icon";
  const src = isIcon ? brandAssets.icon : brandAssets.logo;
  const size = isIcon ? 512 : 500;

  const image = (
    <Image
      src={src}
      alt={siteConfig.name}
      width={size}
      height={size}
      priority={variant === "header"}
      className={cn(
        "object-contain",
        variant === "header" && "h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16",
        variant === "footer" && "h-[88px] w-[88px]",
        variant === "icon" && "h-10 w-10",
        className
      )}
    />
  );

  const content =
    variant === "footer" ? (
      <span className="inline-flex rounded-xl bg-white p-2.5 shadow-md">{image}</span>
    ) : (
      image
    );

  if (!link) {
    return <span className={cn("inline-flex shrink-0", className)}>{content}</span>;
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

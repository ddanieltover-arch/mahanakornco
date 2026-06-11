"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const links = [
  { href: "/ordering-procedures", label: "Ordering Procedures" },
  { href: "/quality-control", label: "Quality Control" },
  { href: "/sustainability", label: "Sustainability" },
  { href: "/privacy-policy", label: "Privacy Policy" },
];

export function RelatedInfoNav() {
  const pathname = usePathname();

  return (
    <nav
      className="border-b border-gray-200 bg-white"
      aria-label="Company information"
    >
      <div className="mx-auto max-w-7xl px-4 py-4">
        <div className="flex flex-wrap gap-2 justify-center">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-full px-5 py-2 text-sm font-medium transition-all duration-200",
                pathname === link.href
                  ? "bg-primary text-white shadow-sm"
                  : "border border-gray-200 text-gray-700 hover:border-primary hover:text-primary"
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}

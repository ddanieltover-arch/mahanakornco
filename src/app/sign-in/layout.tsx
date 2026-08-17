import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Admin Sign In",
  description: "MAHANAKORN admin sign in.",
  path: "/sign-in",
  noindex: true,
});

export default function SignInLayout({ children }: { children: React.ReactNode }) {
  return children;
}

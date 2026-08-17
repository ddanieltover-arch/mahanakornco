import type { Metadata } from "next";
import { requireAdminPageAccess } from "@/lib/admin-auth";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const dynamic = "force-dynamic";

export const metadata: Metadata = buildPageMetadata({
  title: "Admin Dashboard",
  description: "MAHANAKORN admin dashboard.",
  path: "/admin",
  noindex: true,
});

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  await requireAdminPageAccess();
  return children;
}

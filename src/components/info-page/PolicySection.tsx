import type { LucideIcon } from "lucide-react";

interface PolicySectionProps {
  icon: LucideIcon;
  title: string;
  children: React.ReactNode;
}

export function PolicySection({ icon: Icon, title, children }: PolicySectionProps) {
  return (
    <article className="rounded-2xl bg-white p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-cream text-primary">
          <Icon className="h-6 w-6" />
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="text-xl font-bold text-primary-dark">{title}</h2>
          <div className="mt-4 space-y-4 text-muted leading-relaxed text-sm">{children}</div>
        </div>
      </div>
    </article>
  );
}

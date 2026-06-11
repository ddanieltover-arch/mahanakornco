import type { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  return (
    <div className="group h-full rounded-2xl bg-white p-8 shadow-sm border border-gray-100 hover:shadow-lg hover:border-primary/20 hover:-translate-y-1 transition-all duration-300">
      <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
        <Icon className="h-7 w-7" />
      </div>
      <h3 className="mt-6 text-lg font-bold text-primary-dark">{title}</h3>
      <p className="mt-3 text-muted leading-relaxed text-sm">{description}</p>
    </div>
  );
}

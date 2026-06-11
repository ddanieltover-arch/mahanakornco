import { FadeIn } from "@/components/motion/FadeIn";

interface InfoIntroProps {
  tagline?: string;
  title: string;
  description: string;
}

export function InfoIntro({ tagline, title, description }: InfoIntroProps) {
  return (
    <section className="py-16 md:py-20">
      <FadeIn className="mx-auto max-w-3xl px-4 text-center">
        {tagline && (
          <p className="text-primary font-semibold uppercase tracking-wider text-sm">{tagline}</p>
        )}
        <h2 className="mt-2 text-2xl md:text-4xl font-bold text-primary-dark">{title}</h2>
        <p className="mt-6 text-lg text-muted leading-relaxed">{description}</p>
      </FadeIn>
    </section>
  );
}

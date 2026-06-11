import Link from "next/link";
import { FadeIn } from "@/components/motion/FadeIn";

interface InfoCtaProps {
  title: string;
  description: string;
  buttonLabel: string;
  buttonHref?: string;
}

export function InfoCta({
  title,
  description,
  buttonLabel,
  buttonHref = "/contact",
}: InfoCtaProps) {
  return (
    <section className="py-20 bg-primary-dark">
      <FadeIn className="mx-auto max-w-3xl px-4 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-white">{title}</h2>
        <p className="mt-4 text-white/80 leading-relaxed">{description}</p>
        <Link
          href={buttonHref}
          className="btn-animate mt-8 inline-flex rounded-full bg-accent px-8 py-3 font-semibold text-primary-dark hover:brightness-110 transition-all"
        >
          {buttonLabel}
        </Link>
      </FadeIn>
    </section>
  );
}

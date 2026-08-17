interface AnswerCapsuleProps {
  children: React.ReactNode;
}

/** GEO answer block — 40–60 word direct answer near top of page */
export function AnswerCapsule({ children }: AnswerCapsuleProps) {
  return (
    <section
      id="answer"
      aria-label="Quick Answer"
      className="mb-8 rounded-lg border border-primary/20 bg-primary/5 px-6 py-4"
    >
      <p className="text-foreground leading-relaxed">
        <strong className="text-primary">Quick Answer:</strong> {children}
      </p>
    </section>
  );
}

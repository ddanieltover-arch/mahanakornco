interface LastUpdatedProps {
  date?: string;
}

/** Visible freshness signal for evergreen pages */
export function LastUpdated({ date = "2026-08-17" }: LastUpdatedProps) {
  return (
    <p className="text-sm text-muted mb-6">
      Last updated:{" "}
      <time dateTime={date}>
        {new Date(date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </time>
    </p>
  );
}

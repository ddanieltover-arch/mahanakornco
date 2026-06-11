import { sanitizeProductHtml } from "@/lib/sanitize";

interface ProductBodyProps {
  html: string;
}

export function ProductBody({ html }: ProductBodyProps) {
  const safe = sanitizeProductHtml(html);

  return (
    <div
      className="product-content prose-content max-w-none"
      dangerouslySetInnerHTML={{ __html: safe }}
    />
  );
}

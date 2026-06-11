import sanitizeHtml from "sanitize-html";
import { normalizeBrandText } from "@/lib/brand";
import { wpImage } from "@/lib/images";

const allowedTags = [
  ...sanitizeHtml.defaults.allowedTags,
  "img",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "figure",
  "figcaption",
  "span",
  "div",
  "table",
  "thead",
  "tbody",
  "tr",
  "th",
  "td",
];

export function sanitizeProductHtml(html: string): string {
  const branded = normalizeBrandText(html);
  return sanitizeHtml(branded, {
    allowedTags,
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      img: ["src", "alt", "width", "height", "class", "loading"],
      a: ["href", "title", "target", "rel"],
      td: ["colspan", "rowspan"],
      th: ["colspan", "rowspan"],
      "*": ["class", "id"],
    },
    transformTags: {
      a: sanitizeHtml.simpleTransform("a", { rel: "noopener noreferrer" }),
      img: (_tag, attribs) => ({
        tagName: "img",
        attribs: {
          ...attribs,
          src: attribs.src ? wpImage(attribs.src) : attribs.src,
        },
      }),
    },
  });
}

import { siteConfig } from "@/config/site";

export const COMPANY_NAME = siteConfig.name;
export const COMPANY_SHORT = siteConfig.shortName;

/** Legacy / third-party names from WordPress imports → MAHANAKORN */
const BRAND_REPLACEMENTS: [RegExp, string][] = [
  [/FREEM\s+ENTERPRISE\s+CO\.?,?\s*LTD\.?\s*Exporters/gi, COMPANY_NAME],
  [/FREEM\s+ENTERPRISE\s+CO\.?,?\s*LTD\.?/gi, COMPANY_NAME],
  [/Freem\s+Enterprise\s+Co\.?,?\s*Ltd\.?/gi, COMPANY_NAME],
  [/We\s*\(\s*Freem\s+Enterprise\s+Co\s*Ltd\s*\)/gi, COMPANY_NAME],
  [/Parboiled\s+Rice\s+Thailand/gi, COMPANY_NAME],
  [
    new RegExp(
      `${COMPANY_NAME.replace(/\./g, "\\.")}\\s*Exporters`,
      "gi"
    ),
    COMPANY_NAME,
  ],
];

export function normalizeBrandText(text: string): string {
  if (!text) return text;
  let result = text;
  for (const [pattern, replacement] of BRAND_REPLACEMENTS) {
    result = result.replace(pattern, replacement);
  }
  return result;
}

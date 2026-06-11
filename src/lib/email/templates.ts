import { brandAssets } from "@/config/brand";
import { siteConfig } from "@/config/site";
import { escapeHtml } from "@/lib/email/escape";

const logoUrl = `${siteConfig.url}${brandAssets.logo}`;

export interface FormEmailPayload {
  name: string;
  email: string;
  phone: string;
  message: string;
  subject: string;
  product?: string;
  company?: string;
  quantity?: string;
}

function layout(title: string, body: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${escapeHtml(title)}</title>
</head>
<body style="margin:0;padding:0;background:#fbf7f4;font-family:Arial,Helvetica,sans-serif;color:#1a1a1a;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#fbf7f4;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:600px;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 8px 24px rgba(0,0,0,0.08);">
          <tr>
            <td style="background:#1e3d1a;padding:28px 32px;">
              <img src="${logoUrl}" alt="${escapeHtml(siteConfig.shortName)}" width="72" height="72" style="display:block;margin-bottom:16px;border-radius:10px;background:#ffffff;padding:6px;" />
              <p style="margin:0 0 6px;font-size:12px;letter-spacing:0.08em;text-transform:uppercase;color:#c8a951;font-weight:700;">
                ${escapeHtml(siteConfig.shortName)}
              </p>
              <h1 style="margin:0;font-size:22px;line-height:1.3;color:#ffffff;">${escapeHtml(title)}</h1>
            </td>
          </tr>
          <tr>
            <td style="padding:32px;">${body}</td>
          </tr>
          <tr>
            <td style="padding:0 32px 28px;font-size:12px;line-height:1.6;color:#6b7280;">
              ${escapeHtml(siteConfig.name)}<br />
              <a href="mailto:${escapeHtml(siteConfig.email)}" style="color:#2d5a27;text-decoration:none;">${escapeHtml(siteConfig.email)}</a>
              &nbsp;·&nbsp;
              <a href="tel:${escapeHtml(siteConfig.phone)}" style="color:#2d5a27;text-decoration:none;">${escapeHtml(siteConfig.phone)}</a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function fieldRow(label: string, value: string): string {
  return `<tr>
    <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;">
      <p style="margin:0 0 4px;font-size:12px;font-weight:700;color:#6b7280;text-transform:uppercase;letter-spacing:0.04em;">${escapeHtml(label)}</p>
      <p style="margin:0;font-size:15px;line-height:1.5;color:#1a1a1a;">${escapeHtml(value)}</p>
    </td>
  </tr>`;
}

export function buildAdminNotificationEmail(data: FormEmailPayload): { subject: string; html: string } {
  const rows = [
    fieldRow("Name", data.name),
    fieldRow("Email", data.email),
    fieldRow("Phone", data.phone),
    ...(data.company ? [fieldRow("Company", data.company)] : []),
    ...(data.product ? [fieldRow("Product", data.product)] : []),
    ...(data.quantity ? [fieldRow("Quantity", data.quantity)] : []),
    `<tr>
      <td style="padding:16px 0 0;">
        <p style="margin:0 0 8px;font-size:12px;font-weight:700;color:#6b7280;text-transform:uppercase;letter-spacing:0.04em;">Message</p>
        <div style="padding:16px;background:#fbf7f4;border-radius:12px;font-size:15px;line-height:1.6;color:#1a1a1a;white-space:pre-wrap;">${escapeHtml(data.message)}</div>
      </td>
    </tr>`,
  ].join("");

  const html = layout(
    data.product ? "New Product Enquiry" : "New Contact Message",
    `<table role="presentation" width="100%" cellspacing="0" cellpadding="0">${rows}</table>
     <p style="margin:24px 0 0;font-size:13px;color:#6b7280;">Reply directly to this customer at <a href="mailto:${escapeHtml(data.email)}" style="color:#2d5a27;">${escapeHtml(data.email)}</a>.</p>`
  );

  return { subject: data.subject, html };
}

export function buildCustomerAutoReplyEmail(data: FormEmailPayload): { subject: string; html: string } {
  const intro = data.product
    ? `Thank you for your enquiry about <strong>${escapeHtml(data.product)}</strong>. Our sales team has received your request and will respond with pricing and availability shortly.`
    : "Thank you for contacting us. We have received your message and a member of our team will get back to you shortly.";

  const html = layout(
    "We Received Your Message",
    `<p style="margin:0 0 16px;font-size:16px;line-height:1.7;color:#1a1a1a;">Dear ${escapeHtml(data.name)},</p>
     <p style="margin:0 0 16px;font-size:15px;line-height:1.7;color:#374151;">${intro}</p>
     <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin:24px 0;background:#fbf7f4;border-radius:12px;">
       <tr><td style="padding:20px;">
         <p style="margin:0 0 8px;font-size:12px;font-weight:700;color:#6b7280;text-transform:uppercase;">Your Message</p>
         <p style="margin:0;font-size:14px;line-height:1.6;color:#1a1a1a;white-space:pre-wrap;">${escapeHtml(data.message)}</p>
       </td></tr>
     </table>
     <p style="margin:0;font-size:14px;line-height:1.7;color:#374151;">For urgent enquiries, call us at <a href="tel:${escapeHtml(siteConfig.phone)}" style="color:#2d5a27;text-decoration:none;font-weight:600;">${escapeHtml(siteConfig.phone)}</a>.</p>`
  );

  return {
    subject: data.product
      ? `We received your enquiry — ${data.product}`
      : "We received your message — MAHANAKORN",
    html,
  };
}

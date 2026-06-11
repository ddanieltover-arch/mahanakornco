import { NextRequest, NextResponse } from "next/server";
import {
  buildAdminNotificationEmail,
  buildCustomerAutoReplyEmail,
  type FormEmailPayload,
} from "@/lib/email/templates";
import {
  getContactRecipient,
  isSmtpConfigured,
  sendMail,
} from "@/lib/email/smtp";
import {
  storeContactSubmission,
  storeQuoteSubmission,
} from "@/lib/submission-store";
import { apiFormSchema, type ApiFormData } from "@/lib/validations/contact";

function getRequestMeta(req: NextRequest) {
  return {
    ipAddress:
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      req.headers.get("x-real-ip") ??
      undefined,
    userAgent: req.headers.get("user-agent") ?? undefined,
  };
}

function buildEnquiryText(data: ApiFormData): string {
  const parts = [data.message.trim()];
  if (data.company?.trim()) parts.push(`Company: ${data.company.trim()}`);
  if (data.quantity?.trim()) parts.push(`Quantity: ${data.quantity.trim()}`);
  return parts.join("\n\n");
}

async function persistSubmission(data: ApiFormData, subject: string, meta: ReturnType<typeof getRequestMeta>) {
  if (data.product?.trim()) {
    await storeQuoteSubmission(
      {
        name: data.name.trim(),
        email: data.email.trim(),
        phone: data.phone.trim(),
        subject,
        enquiry: buildEnquiryText(data),
        product: data.product.trim(),
      },
      meta,
    );
  } else {
    await storeContactSubmission(
      {
        name: data.name.trim(),
        email: data.email.trim(),
        phone: data.phone.trim(),
        subject,
        message: data.message.trim(),
      },
      meta,
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = apiFormSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Please check the form and try again.", fields: parsed.error.flatten().fieldErrors },
        { status: 400 },
      );
    }

    const data = parsed.data;
    const subject =
      data.subject?.trim() ||
      (data.product
        ? `Product Enquiry: ${data.product}`
        : `Website Contact: ${data.name}`);

    const payload: FormEmailPayload = {
      name: data.name.trim(),
      email: data.email.trim(),
      phone: data.phone.trim(),
      message: data.message.trim(),
      subject,
      product: data.product?.trim(),
      company: data.company?.trim(),
      quantity: data.quantity?.trim(),
    };

    const meta = getRequestMeta(req);

    if (!isSmtpConfigured()) {
      if (process.env.NODE_ENV === "development") {
        console.log("[contact] SMTP not configured — submission logged:", payload);
        await persistSubmission(data, subject, meta).catch((err) => {
          console.error("[contact] Failed to store submission:", err);
        });
        return NextResponse.json({
          success: true,
          message: "Logged in development (SMTP not configured).",
        });
      }

      return NextResponse.json(
        { error: "Email service is not configured. Please contact us by phone or email." },
        { status: 503 },
      );
    }

    const adminEmail = buildAdminNotificationEmail(payload);
    const recipient = getContactRecipient();

    await sendMail({
      to: recipient,
      subject: adminEmail.subject,
      html: adminEmail.html,
      replyTo: payload.email,
    });

    if (process.env.SEND_AUTO_REPLY !== "false") {
      const autoReply = buildCustomerAutoReplyEmail(payload);
      await sendMail({
        to: payload.email,
        subject: autoReply.subject,
        html: autoReply.html,
        replyTo: recipient,
      });
    }

    await persistSubmission(data, subject, meta).catch((err) => {
      console.error("[contact] Failed to store submission:", err);
    });

    return NextResponse.json({
      success: true,
      message: "Your message has been sent successfully.",
    });
  } catch (error) {
    console.error("[contact] Failed to send email:", error);
    return NextResponse.json(
      { error: "We could not send your message right now. Please try again or call us directly." },
      { status: 500 },
    );
  }
}

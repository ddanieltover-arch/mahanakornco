import nodemailer from "nodemailer";
import type { Transporter } from "nodemailer";
import { siteConfig } from "@/config/site";

export interface SendMailOptions {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}

let transporter: Transporter | null = null;

function getSmtpConfig() {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) return null;

  return {
    host,
    port: Number(process.env.SMTP_PORT || 465),
    secure: process.env.SMTP_SECURE !== "false",
    user,
    pass,
  };
}

export function isSmtpConfigured(): boolean {
  return getSmtpConfig() !== null;
}

function getTransporter(): Transporter {
  if (transporter) return transporter;

  const config = getSmtpConfig();
  if (!config) {
    throw new Error("SMTP is not configured");
  }

  transporter = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: {
      user: config.user,
      pass: config.pass,
    },
  });

  return transporter;
}

export function getFromAddress(): string {
  const name = process.env.SMTP_FROM_NAME || siteConfig.name;
  const email = process.env.SMTP_FROM_EMAIL || process.env.SMTP_USER || siteConfig.email;
  return `"${name}" <${email}>`;
}

export function getContactRecipient(): string {
  return process.env.CONTACT_EMAIL || siteConfig.email;
}

export async function sendMail(options: SendMailOptions): Promise<void> {
  const mailer = getTransporter();

  await mailer.sendMail({
    from: getFromAddress(),
    to: options.to,
    subject: options.subject,
    html: options.html,
    replyTo: options.replyTo,
  });
}

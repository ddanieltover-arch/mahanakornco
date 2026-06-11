import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(6, "Phone number is required"),
  subject: z.string().min(2, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export type ContactFormData = z.infer<typeof contactSchema>;

export const enquirySchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(6, "Phone number is required"),
  company: z.string().optional(),
  product: z.string().optional(),
  quantity: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export type EnquiryFormData = z.infer<typeof enquirySchema>;

/** API accepts either contact or product enquiry payloads */
export const apiFormSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(6),
  subject: z.string().optional(),
  message: z.string().min(10),
  product: z.string().optional(),
  company: z.string().optional(),
  quantity: z.string().optional(),
});

export type ApiFormData = z.infer<typeof apiFormSchema>;

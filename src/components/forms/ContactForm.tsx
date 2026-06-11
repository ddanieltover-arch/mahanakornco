"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Building2, Mail, MessageSquare, Phone, User } from "lucide-react";
import {
  FormAlert,
  FormField,
  FormInput,
  FormSubmitButton,
  FormSuccess,
  FormTextarea,
} from "@/components/forms/FormPrimitives";
import { contactSchema, type ContactFormData } from "@/lib/validations/contact";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json().catch(() => ({}));

      if (!res.ok) {
        setErrorMessage(result.error || "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }

      setStatus("success");
      reset();
    } catch {
      setErrorMessage("Network error. Please check your connection and try again.");
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <FormSuccess
        title="Message sent successfully"
        description="Thank you for contacting us. Our team will review your message and respond shortly. A confirmation has been sent to your email."
        onReset={() => setStatus("idle")}
      />
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <FormField label="Full Name" htmlFor="contact-name" error={errors.name?.message}>
          <FormInput
            id="contact-name"
            icon={User}
            placeholder="John Smith"
            hasError={!!errors.name}
            {...register("name")}
          />
        </FormField>

        <FormField label="Email Address" htmlFor="contact-email" error={errors.email?.message}>
          <FormInput
            id="contact-email"
            type="email"
            icon={Mail}
            placeholder="you@company.com"
            hasError={!!errors.email}
            {...register("email")}
          />
        </FormField>

        <FormField label="Phone Number" htmlFor="contact-phone" error={errors.phone?.message}>
          <FormInput
            id="contact-phone"
            type="tel"
            icon={Phone}
            placeholder="+66 ..."
            hasError={!!errors.phone}
            {...register("phone")}
          />
        </FormField>

        <FormField label="Subject" htmlFor="contact-subject" error={errors.subject?.message}>
          <FormInput
            id="contact-subject"
            icon={Building2}
            placeholder="Wholesale sugar enquiry"
            hasError={!!errors.subject}
            {...register("subject")}
          />
        </FormField>
      </div>

      <FormField label="Message" htmlFor="contact-message" error={errors.message?.message}>
        <FormTextarea
          id="contact-message"
          placeholder="Tell us about your product requirements, quantities, destination port, or any questions..."
          rows={5}
          hasError={!!errors.message}
          {...register("message")}
        />
      </FormField>

      {status === "error" && <FormAlert variant="error">{errorMessage}</FormAlert>}

      <FormSubmitButton loading={status === "loading"}>
        {status === "loading" ? "Sending Message..." : "Send Message"}
      </FormSubmitButton>

      <p className="text-center text-xs text-muted">
        <MessageSquare className="mr-1 inline h-3.5 w-3.5" />
        We typically respond within 1–2 business days.
      </p>
    </form>
  );
}

"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Building2, Mail, Package, Phone, User } from "lucide-react";
import {
  FormAlert,
  FormField,
  FormInput,
  FormSubmitButton,
  FormSuccess,
  FormTextarea,
} from "@/components/forms/FormPrimitives";
import { enquirySchema, type EnquiryFormData } from "@/lib/validations/contact";

interface ProductEnquiryFormProps {
  productName: string;
}

export function ProductEnquiryForm({ productName }: ProductEnquiryFormProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EnquiryFormData>({
    resolver: zodResolver(enquirySchema),
    defaultValues: { product: productName },
  });

  const onSubmit = async (data: EnquiryFormData) => {
    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, product: productName }),
      });

      const result = await res.json().catch(() => ({}));

      if (!res.ok) {
        setErrorMessage(result.error || "Failed to send enquiry. Please try again.");
        setStatus("error");
        return;
      }

      setStatus("success");
      reset({ product: productName });
    } catch {
      setErrorMessage("Network error. Please check your connection and try again.");
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <FormSuccess
        title="Quote request received"
        description={`Thank you! We received your enquiry for ${productName}. Our sales team will send pricing and availability details to your email shortly.`}
      />
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <input type="hidden" {...register("product")} />

      <div className="rounded-xl bg-cream/80 border border-primary/10 px-4 py-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-primary">Product</p>
        <p className="mt-1 text-sm font-medium text-primary-dark">{productName}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <FormField label="Full Name" htmlFor="enquiry-name" error={errors.name?.message}>
          <FormInput
            id="enquiry-name"
            icon={User}
            placeholder="Your name"
            hasError={!!errors.name}
            {...register("name")}
          />
        </FormField>

        <FormField label="Email" htmlFor="enquiry-email" error={errors.email?.message}>
          <FormInput
            id="enquiry-email"
            type="email"
            icon={Mail}
            placeholder="you@company.com"
            hasError={!!errors.email}
            {...register("email")}
          />
        </FormField>

        <FormField label="Phone" htmlFor="enquiry-phone" error={errors.phone?.message}>
          <FormInput
            id="enquiry-phone"
            type="tel"
            icon={Phone}
            placeholder="+66 ..."
            hasError={!!errors.phone}
            {...register("phone")}
          />
        </FormField>

        <FormField label="Company" htmlFor="enquiry-company">
          <FormInput
            id="enquiry-company"
            icon={Building2}
            placeholder="Company name (optional)"
            {...register("company")}
          />
        </FormField>

        <div className="sm:col-span-2">
          <FormField label="Quantity / Volume" htmlFor="enquiry-quantity">
            <FormInput
              id="enquiry-quantity"
              icon={Package}
              placeholder="e.g. 500 MT, 20ft container, monthly supply..."
              {...register("quantity")}
            />
          </FormField>
        </div>
      </div>

      <FormField
        label="Requirements"
        htmlFor="enquiry-message"
        error={errors.message?.message}
      >
        <FormTextarea
          id="enquiry-message"
          placeholder="Packaging, destination port, Incoterms (FOB/CIF), specifications..."
          rows={4}
          hasError={!!errors.message}
          {...register("message")}
        />
      </FormField>

      {status === "error" && <FormAlert variant="error">{errorMessage}</FormAlert>}

      <FormSubmitButton loading={status === "loading"}>
        {status === "loading" ? "Sending Enquiry..." : "Request Quote"}
      </FormSubmitButton>
    </form>
  );
}

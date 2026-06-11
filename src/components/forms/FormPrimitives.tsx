"use client";

import type { LucideIcon } from "lucide-react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface FormFieldProps {
  label: string;
  htmlFor: string;
  error?: string;
  children: React.ReactNode;
}

export function FormField({ label, htmlFor, error, children }: FormFieldProps) {
  return (
    <div className="space-y-2">
      <label htmlFor={htmlFor} className="block text-sm font-medium text-primary-dark">
        {label}
      </label>
      {children}
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: LucideIcon;
  hasError?: boolean;
}

export function FormInput({ icon: Icon, hasError, className, ...props }: FormInputProps) {
  return (
    <div className="relative">
      {Icon && (
        <Icon className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
      )}
      <input
        {...props}
        className={cn(
          "w-full rounded-xl border bg-white px-4 py-3 text-sm outline-none transition-all",
          "placeholder:text-gray-400 focus:ring-2 focus:ring-primary/20",
          Icon && "pl-11",
          hasError
            ? "border-red-400 focus:border-red-500"
            : "border-gray-200 focus:border-primary",
          className
        )}
      />
    </div>
  );
}

interface FormTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  hasError?: boolean;
}

export function FormTextarea({ hasError, className, ...props }: FormTextareaProps) {
  return (
    <textarea
      {...props}
      className={cn(
        "w-full rounded-xl border bg-white px-4 py-3 text-sm outline-none transition-all resize-y min-h-[120px]",
        "placeholder:text-gray-400 focus:ring-2 focus:ring-primary/20",
        hasError
          ? "border-red-400 focus:border-red-500"
          : "border-gray-200 focus:border-primary",
        className
      )}
    />
  );
}

interface FormSubmitButtonProps {
  loading?: boolean;
  children: React.ReactNode;
}

export function FormSubmitButton({ loading, children }: FormSubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="btn-animate flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-60 transition-all"
    >
      {loading && <Loader2 className="h-4 w-4 animate-spin" />}
      {children}
    </button>
  );
}

interface FormAlertProps {
  variant: "error" | "info";
  children: React.ReactNode;
}

export function FormAlert({ variant, children }: FormAlertProps) {
  return (
    <div
      className={cn(
        "rounded-xl border px-4 py-3 text-sm",
        variant === "error"
          ? "border-red-200 bg-red-50 text-red-700"
          : "border-primary/20 bg-cream text-primary-dark"
      )}
    >
      {children}
    </div>
  );
}

interface FormSuccessProps {
  title: string;
  description: string;
  onReset?: () => void;
  resetLabel?: string;
}

export function FormSuccess({ title, description, onReset, resetLabel }: FormSuccessProps) {
  return (
    <div className="flex flex-col items-center rounded-xl border border-green-200 bg-green-50 px-6 py-10 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
        <CheckCircle2 className="h-8 w-8 text-green-600" />
      </div>
      <p className="mt-5 text-lg font-semibold text-green-900">{title}</p>
      <p className="mt-2 max-w-sm text-sm leading-relaxed text-green-800">{description}</p>
      {onReset && (
        <button
          type="button"
          onClick={onReset}
          className="mt-6 text-sm font-medium text-primary hover:text-primary-dark underline-offset-2 hover:underline"
        >
          {resetLabel ?? "Send another message"}
        </button>
      )}
    </div>
  );
}

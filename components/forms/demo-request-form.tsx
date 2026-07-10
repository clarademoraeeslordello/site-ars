"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  company: z.string().min(2),
  role: z.string().min(2),
  employees: z.string().min(1),
  country: z.string().min(2),
  frameworks: z.array(z.string()).min(1),
  message: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

const inputClass =
  "w-full rounded-sm border border-hairline bg-paper-raised px-3 py-2.5 text-sm text-ink placeholder:text-silver focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold";

export function DemoRequestForm() {
  const t = useTranslations("demo.form");
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { frameworks: [] },
  });

  const employeesOptions = t.raw("employeesOptions") as string[];
  const frameworkOptions = t.raw("frameworkOptions") as string[];

  async function onSubmit(data: FormData) {
    // Integration point: POST to the demo-request endpoint once it exists.
    // No backend is wired yet by design — see docs/README for the handoff notes.
    console.info("demo-request payload", data);
    await new Promise((r) => setTimeout(r, 400));
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div
        role="status"
        className="rounded-md border border-gold bg-gold-faint p-8 text-center"
      >
        <p className="font-display text-xl font-semibold">{t("success")}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium">
            {t("name")}
          </label>
          <input
            id="name"
            autoComplete="name"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
            className={cn(inputClass, errors.name && "border-nc")}
            {...register("name")}
          />
          {errors.name && (
            <p id="name-error" className="mt-1 text-xs text-nc">
              {t("errors.nameRequired")}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium">
            {t("email")}
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={cn(inputClass, errors.email && "border-nc")}
            {...register("email")}
          />
          {errors.email && (
            <p id="email-error" className="mt-1 text-xs text-nc">
              {t("errors.emailRequired")}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="company" className="mb-1.5 block text-sm font-medium">
            {t("company")}
          </label>
          <input
            id="company"
            autoComplete="organization"
            aria-invalid={!!errors.company}
            aria-describedby={errors.company ? "company-error" : undefined}
            className={cn(inputClass, errors.company && "border-nc")}
            {...register("company")}
          />
          {errors.company && (
            <p id="company-error" className="mt-1 text-xs text-nc">
              {t("errors.companyRequired")}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="role" className="mb-1.5 block text-sm font-medium">
            {t("role")}
          </label>
          <input
            id="role"
            autoComplete="organization-title"
            aria-invalid={!!errors.role}
            aria-describedby={errors.role ? "role-error" : undefined}
            className={cn(inputClass, errors.role && "border-nc")}
            {...register("role")}
          />
          {errors.role && (
            <p id="role-error" className="mt-1 text-xs text-nc">
              {t("errors.roleRequired")}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="employees" className="mb-1.5 block text-sm font-medium">
            {t("employees")}
          </label>
          <select
            id="employees"
            aria-invalid={!!errors.employees}
            aria-describedby={errors.employees ? "employees-error" : undefined}
            className={cn(inputClass, errors.employees && "border-nc")}
            defaultValue=""
            {...register("employees")}
          >
            <option value="" disabled />
            {employeesOptions.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
          {errors.employees && (
            <p id="employees-error" className="mt-1 text-xs text-nc">
              {t("errors.employeesRequired")}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="country" className="mb-1.5 block text-sm font-medium">
            {t("country")}
          </label>
          <input
            id="country"
            autoComplete="country-name"
            aria-invalid={!!errors.country}
            aria-describedby={errors.country ? "country-error" : undefined}
            className={cn(inputClass, errors.country && "border-nc")}
            {...register("country")}
          />
          {errors.country && (
            <p id="country-error" className="mt-1 text-xs text-nc">
              {t("errors.countryRequired")}
            </p>
          )}
        </div>
      </div>

      <fieldset>
        <legend className="mb-2 text-sm font-medium">{t("frameworks")}</legend>
        <div className="flex flex-wrap gap-2">
          {frameworkOptions.map((f) => (
            <label
              key={f}
              className="flex cursor-pointer items-center gap-2 rounded-sm border border-hairline bg-paper-raised px-3 py-2 text-sm has-[:checked]:border-gold has-[:checked]:bg-gold-faint"
            >
              <input
                type="checkbox"
                value={f}
                className="accent-[#8a6d1f]"
                {...register("frameworks")}
              />
              {f}
            </label>
          ))}
        </div>
        {errors.frameworks && (
          <p className="mt-1 text-xs text-nc">{t("errors.frameworksRequired")}</p>
        )}
      </fieldset>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium">
          {t("message")}
        </label>
        <textarea
          id="message"
          rows={4}
          placeholder={t("messagePlaceholder")}
          className={inputClass}
          {...register("message")}
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-sm bg-ink px-6 py-3 font-medium text-paper transition-colors hover:bg-ink-soft disabled:opacity-60 sm:w-auto"
      >
        {isSubmitting ? t("submitting") : t("submit")}
      </button>
    </form>
  );
}

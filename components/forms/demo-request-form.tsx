"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { buttonClasses } from "@/components/ui/button";
import { submitDemoRequest } from "@/app/actions/demo-request";
import { demoRequestSchema, type DemoRequestData } from "@/lib/validations/demo-request";

const schema = demoRequestSchema;
type FormData = DemoRequestData;

const inputClass =
  "w-full rounded-control border border-line bg-well px-3 py-2.5 text-sm text-ink placeholder:text-subtle focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold";

export function DemoRequestForm() {
  const t = useTranslations("demo.form");
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(false);

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
    setSubmitError(false);
    const result = await submitDemoRequest(data);
    if (result.ok) {
      setSubmitted(true);
    } else {
      setSubmitError(true);
    }
  }

  if (submitted) {
    return (
      <div
        role="status"
        className="rounded-panel border border-ok-line bg-ok-bg p-8 text-center text-ok"
      >
        <p className="m-0 font-display text-xl font-medium">{t("success")}</p>
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
            className={cn(inputClass, errors.name && "border-crit")}
            {...register("name")}
          />
          {errors.name && (
            <p id="name-error" className="mt-1 text-xs text-crit">
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
            className={cn(inputClass, errors.email && "border-crit")}
            {...register("email")}
          />
          {errors.email && (
            <p id="email-error" className="mt-1 text-xs text-crit">
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
            className={cn(inputClass, errors.company && "border-crit")}
            {...register("company")}
          />
          {errors.company && (
            <p id="company-error" className="mt-1 text-xs text-crit">
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
            className={cn(inputClass, errors.role && "border-crit")}
            {...register("role")}
          />
          {errors.role && (
            <p id="role-error" className="mt-1 text-xs text-crit">
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
            className={cn(inputClass, errors.employees && "border-crit")}
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
            <p id="employees-error" className="mt-1 text-xs text-crit">
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
            className={cn(inputClass, errors.country && "border-crit")}
            {...register("country")}
          />
          {errors.country && (
            <p id="country-error" className="mt-1 text-xs text-crit">
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
              className="flex cursor-pointer items-center gap-2 rounded-full border border-line bg-well px-3 py-1.5 text-[13px] has-[:checked]:border-gold-cta has-[:checked]:bg-tint"
            >
              <input
                type="checkbox"
                value={f}
                className="accent-gold"
                {...register("frameworks")}
              />
              {f}
            </label>
          ))}
        </div>
        {errors.frameworks && (
          <p className="mt-1 text-xs text-crit">{t("errors.frameworksRequired")}</p>
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

      {submitError && (
        <p role="alert" className="text-sm text-crit">
          {t("errors.generic")}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className={buttonClasses({ className: "w-full disabled:opacity-60 sm:w-auto" })}
      >
        {isSubmitting ? t("submitting") : t("submit")}
      </button>
    </form>
  );
}

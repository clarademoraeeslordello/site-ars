import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export function CtaBand({
  title,
  text,
}: {
  title: string;
  text?: string;
}) {
  const t = useTranslations("cta");
  return (
    <section className="bg-ink px-4 py-16 text-paper sm:px-6 sm:py-20">
      <div className="mx-auto flex max-w-7xl flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="max-w-2xl font-display text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
            {title}
          </h2>
          {text && <p className="mt-3 max-w-2xl text-paper/80">{text}</p>}
        </div>
        <Link
          href="/demonstracao"
          className="shrink-0 rounded-sm bg-gold-bright px-6 py-3 font-medium text-ink transition-colors hover:bg-gold-faint"
        >
          {t("requestDemo")}
        </Link>
      </div>
    </section>
  );
}

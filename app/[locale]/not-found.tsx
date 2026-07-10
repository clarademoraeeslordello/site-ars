import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function NotFound() {
  const t = useTranslations("notFound");

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-24 text-center">
      <p className="font-data text-sm text-gold">404</p>
      <h1 className="mt-3 font-display text-3xl font-semibold">{t("title")}</h1>
      <p className="mt-3 max-w-md text-ink-soft">{t("text")}</p>
      <Link
        href="/"
        className="mt-8 rounded-sm bg-ink px-6 py-3 font-medium text-paper hover:bg-ink-soft"
      >
        {t("back")}
      </Link>
    </div>
  );
}

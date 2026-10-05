import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { buttonClasses } from "@/components/ui/button";

export default function NotFound() {
  const t = useTranslations("notFound");

  return (
    <section aria-labelledby="nf-title" className="container-site flex min-h-[60vh] flex-col items-start justify-center gap-4 py-24">
      <span className="eyebrow">404</span>
      <h1 id="nf-title" className="m-0 font-display text-h1 font-medium">
        {t("title")}
      </h1>
      <p className="m-0 max-w-md text-lg leading-[1.6] text-body">{t("text")}</p>
      <Link href="/" className={buttonClasses({ className: "mt-4" })}>
        {t("back")}
      </Link>
    </section>
  );
}

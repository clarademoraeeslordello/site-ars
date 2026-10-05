import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { buttonClasses } from "@/components/ui/button";
import { CONTACT } from "@/lib/site";

/** Dark closing card: "Vamos ver juntos como está a sua prontidão?", demo button and direct contact. */
export async function CtaFinal({ showButton = true }: { showButton?: boolean }) {
  const t = await getTranslations("home.cta");
  return (
    <section id="demonstracao" aria-labelledby="cta-title" className="container-site mt-[clamp(88px,10vw,128px)] scroll-mt-20">
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,380px),1fr))] items-end gap-x-16 gap-y-6 rounded-card bg-dark p-[clamp(32px,5vw,64px)] text-dark-ink">
        <div className="flex flex-col gap-3.5">
          <h2 id="cta-title" className="m-0 font-display text-[clamp(28px,3.6vw,44px)] font-medium leading-[1.12]">
            {t("title")}
          </h2>
          <p className="m-0 text-base leading-[1.6] text-dark-body">{t("text")}</p>
        </div>
        <div className="flex flex-col items-start gap-3">
          {showButton && (
            <Link
              href="/demonstracao"
              data-track="cta_demo_click"
              data-track-location="cta_final"
              className={buttonClasses({ className: "hover:bg-gold-light hover:text-dark" })}
            >
              {t("button")}
            </Link>
          )}
          <ContactLine prefix={t("contact")} />
        </div>
      </div>
    </section>
  );
}

/** "Ou fale direto com a gente: e-mail · telefone", for dark backgrounds. */
export function ContactLine({ prefix, light = false }: { prefix?: string; light?: boolean }) {
  const link = light ? "whitespace-nowrap text-gold hover:underline" : "whitespace-nowrap text-gold-light hover:underline";
  return (
    <span className={light ? "text-sm leading-[1.6] text-body" : "text-sm leading-[1.6] text-dark-muted"}>
      {prefix && <>{prefix} </>}
      <a href={`mailto:${CONTACT.email}`} className={link}>
        {CONTACT.email}
      </a>{" "}
      ·{" "}
      <a href={CONTACT.phoneHref} className={link}>
        {CONTACT.phone}
      </a>
    </span>
  );
}

import Link from "next/link";
import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import { getDb } from "@/db/client";
import { radarArticles } from "@/db/schema";
import { requireAdmin } from "@/lib/admin/auth";
import { DB_LOCALES } from "@/lib/radar/content";
import { formatStage } from "@/lib/radar/stages";
import { AdminShell, btn } from "../../admin-shell";
import { saveArticleAction } from "../../actions";

const LOCALE_LABEL = { "pt-BR": "Português", en: "English", es: "Español" } as const;
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

const input = "w-full rounded-control border border-line bg-well px-3 py-2 text-[15px] leading-[1.55]";

export default async function EditArticlePage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ ok?: string }>;
}) {
  const email = await requireAdmin();
  const { id } = await params;
  const { ok } = await searchParams;
  if (!UUID.test(id)) notFound();
  const rows = await getDb().select().from(radarArticles).where(eq(radarArticles.groupId, id));
  const pt = rows.find((r) => r.locale === "pt-BR") ?? rows[0];
  if (!pt) notFound();
  const byLocale = new Map(rows.map((r) => [r.locale, r]));

  return (
    <AdminShell email={email} active="radar">
      <Link href="/admin/radar" className="text-sm text-body hover:text-ink">
        ← Fila de revisão
      </Link>
      <header className="flex flex-col gap-1">
        <h1 className="m-0 font-display text-[28px] font-medium">{pt.title}</h1>
        <p className="m-0 text-sm text-muted">
          {pt.reference ?? pt.standards.join(", ")}
          {pt.stageTo != null ? ` · estágio ${formatStage(pt.stageTo)}` : ""} ·{" "}
          <a href={pt.sourceUrl} className="underline" target="_blank" rel="noopener">
            fonte oficial
          </a>{" "}
          · {pt.status === "published" ? "publicado" : pt.status === "draft" ? "rascunho" : pt.status}
        </p>
      </header>
      {ok === "salvo" && (
        <p role="status" className="m-0 rounded-control border border-ok-line bg-ok-bg px-4 py-3 text-sm text-ok">
          Alterações salvas.
        </p>
      )}

      <form action={saveArticleAction} className="flex flex-col gap-8">
        <input type="hidden" name="groupId" value={id} />

        <fieldset className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-4 rounded-card border border-line bg-card p-5">
          <legend className="px-1 text-sm font-semibold">Status e transição</legend>
          <label className="flex flex-col gap-1.5 text-sm font-medium">
            Status no site
            <select name="standardStatus" defaultValue={pt.standardStatus} className={input}>
              <option value="published">Publicado</option>
              <option value="under_review">Em revisão</option>
              <option value="in_transition">Em transição</option>
              <option value="withdrawn">Retirado</option>
            </select>
          </label>
          <label className="flex flex-col gap-1.5 text-sm font-medium">
            Prazo de transição (vazio = a confirmar)
            <input type="date" name="transitionDeadline" defaultValue={pt.transitionDeadline ?? ""} className={input} />
          </label>
          <label className="flex flex-col gap-1.5 text-sm font-medium">
            Fonte do prazo (link, ex.: IAF)
            <input type="url" name="transitionSource" defaultValue={pt.transitionSource ?? ""} className={input} />
          </label>
        </fieldset>

        {DB_LOCALES.map((locale) => {
          const row = byLocale.get(locale);
          return (
            <fieldset key={locale} className="flex flex-col gap-4 rounded-card border border-line bg-card p-5">
              <legend className="px-1 text-sm font-semibold">{LOCALE_LABEL[locale]}</legend>
              <label className="flex flex-col gap-1.5 text-sm font-medium">
                Título
                <input name={`${locale}.title`} defaultValue={row?.title ?? ""} required className={input} />
              </label>
              <label className="flex flex-col gap-1.5 text-sm font-medium">
                Resumo
                <textarea name={`${locale}.summary`} defaultValue={row?.summary ?? ""} rows={2} required className={input} />
              </label>
              <label className="flex flex-col gap-1.5 text-sm font-medium">
                Texto (cada seção começa com &quot;## &quot;; a análise fica marcada como tal)
                <textarea name={`${locale}.bodyMd`} defaultValue={row?.bodyMd ?? ""} rows={16} required className={`${input} font-mono text-[13px]`} />
              </label>
            </fieldset>
          );
        })}

        <div className="flex flex-wrap gap-2">
          <button type="submit" name="intent" value="save" className={btn.secondary}>
            Salvar
          </button>
          {pt.status !== "published" && (
            <button type="submit" name="intent" value="publish" className={btn.primary}>
              Salvar e publicar
            </button>
          )}
        </div>
      </form>
    </AdminShell>
  );
}

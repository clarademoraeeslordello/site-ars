import Link from "next/link";
import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import { requireAdmin } from "@/lib/admin/auth";
import { getDb, schema } from "@/lib/db";
import type { ArticleBody, ArticleLocale } from "@/lib/db/schema";
import { formatStage } from "@/lib/radar/stages";
import { AdminShell, btn } from "../../admin-shell";
import { saveArticleAction } from "../../actions";

const LOCALES: { key: ArticleLocale; label: string }[] = [
  { key: "pt-br", label: "Português" },
  { key: "en", label: "English" },
  { key: "es", label: "Español" },
];

const FIELDS: { key: keyof ArticleBody; label: string; rows: number }[] = [
  { key: "title", label: "Título", rows: 1 },
  { key: "summary", label: "Resumo", rows: 2 },
  { key: "whatHappened", label: "O que aconteceu", rows: 4 },
  { key: "whatChanged", label: "O que mudou", rows: 5 },
  { key: "impact", label: "Impacto (análise marcada como tal)", rows: 5 },
  { key: "watch", label: "O que observar", rows: 4 },
];

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
  const [a] = await getDb().select().from(schema.radarArticles).where(eq(schema.radarArticles.id, Number(id))).limit(1);
  if (!a) notFound();

  return (
    <AdminShell email={email} active="radar">
      <Link href="/admin/radar" className="text-sm text-body hover:text-ink">
        ← Fila de revisão
      </Link>
      <header className="flex flex-col gap-1">
        <h1 className="m-0 font-display text-[28px] font-medium">{a.content["pt-br"].title}</h1>
        <p className="m-0 text-sm text-muted">
          {a.reference} · estágio {formatStage(a.stageTo)} ·{" "}
          <a href={a.sourceUrl} className="underline" target="_blank" rel="noopener">
            fonte oficial
          </a>{" "}
          · {a.status === "published" ? "publicado" : a.status === "draft" ? "rascunho" : "descartado"}
        </p>
      </header>
      {ok === "salvo" && (
        <p role="status" className="m-0 rounded-control border border-ok-line bg-ok-bg px-4 py-3 text-sm text-ok">
          Alterações salvas.
        </p>
      )}

      <form action={saveArticleAction} className="flex flex-col gap-8">
        <input type="hidden" name="id" value={a.id} />

        <fieldset className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-4 rounded-card border border-line bg-card p-5">
          <legend className="px-1 text-sm font-semibold">Status e transição</legend>
          <label className="flex flex-col gap-1.5 text-sm font-medium">
            Status no site
            <select name="lifecycle" defaultValue={a.lifecycle} className={input}>
              <option value="published">Publicado</option>
              <option value="under_review">Em revisão</option>
              <option value="transition">Em transição</option>
              <option value="withdrawn">Retirado</option>
            </select>
          </label>
          <label className="flex flex-col gap-1.5 text-sm font-medium">
            Prazo de transição (vazio = a confirmar)
            <input type="date" name="transitionDeadline" defaultValue={a.transitionDeadline ?? ""} className={input} />
          </label>
          <label className="flex flex-col gap-1.5 text-sm font-medium">
            Fonte do prazo (link, ex.: IAF)
            <input type="url" name="transitionSource" defaultValue={a.transitionSource ?? ""} className={input} />
          </label>
        </fieldset>

        {LOCALES.map((l) => (
          <fieldset key={l.key} className="flex flex-col gap-4 rounded-card border border-line bg-card p-5">
            <legend className="px-1 text-sm font-semibold">{l.label}</legend>
            {FIELDS.map((f) => (
              <label key={f.key} className="flex flex-col gap-1.5 text-sm font-medium">
                {f.label}
                <textarea
                  name={`${l.key}.${f.key}`}
                  defaultValue={a.content[l.key][f.key]}
                  rows={f.rows}
                  required
                  className={input}
                />
              </label>
            ))}
          </fieldset>
        ))}

        <div className="flex flex-wrap gap-2">
          <button type="submit" name="intent" value="save" className={btn.secondary}>
            Salvar
          </button>
          {a.status !== "published" && (
            <button type="submit" name="intent" value="publish" className={btn.primary}>
              Salvar e publicar
            </button>
          )}
        </div>
      </form>
    </AdminShell>
  );
}

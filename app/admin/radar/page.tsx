import Link from "next/link";
import { and, desc, eq } from "drizzle-orm";
import { getDb } from "@/db/client";
import { radarArticles } from "@/db/schema";
import { requireAdmin } from "@/lib/admin/auth";
import { latestScan } from "@/lib/radar/scan";
import { formatStage } from "@/lib/radar/stages";
import { AdminShell, btn } from "../admin-shell";
import { discardAction, publishAction, scanNowAction, unpublishAction } from "../actions";

export const maxDuration = 300;

const CHANGE_LABEL: Record<string, string> = {
  new_project: "Novo projeto",
  stage_change: "Mudança de estágio",
  published: "Nova publicação",
  withdrawn: "Retirada",
  to_be_revised: "Vai ser revisada",
  confirmed: "Confirmada",
};

const STATUS_LABEL: Record<string, string> = {
  published: "Publicado",
  under_review: "Em revisão",
  in_transition: "Em transição",
  withdrawn: "Retirado",
};

const when = (d: Date) =>
  new Intl.DateTimeFormat("pt-BR", { dateStyle: "short", timeStyle: "short", timeZone: "America/Sao_Paulo" }).format(d);

export default async function RadarQueuePage({
  searchParams,
}: {
  searchParams: Promise<{ varredura?: string; ok?: string; erro?: string }>;
}) {
  const email = await requireAdmin();
  const { varredura, ok, erro } = await searchParams;
  const db = getDb();
  // The PT row stands for its article group (PT, EN and ES share group_id and status).
  const byStatus = (status: string) =>
    db
      .select()
      .from(radarArticles)
      .where(and(eq(radarArticles.status, status), eq(radarArticles.locale, "pt-BR")))
      .orderBy(desc(status === "published" ? radarArticles.publishedAt : radarArticles.createdAt));
  const [drafts, published, scan] = await Promise.all([byStatus("draft"), byStatus("published"), latestScan()]);
  const scanResult = varredura?.split("-").map(Number);

  return (
    <AdminShell email={email} active="radar">
      <section className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="m-0 font-display text-[30px] font-medium">Fila de revisão</h1>
          <p className="m-0 text-sm text-muted">
            {scan
              ? `Última varredura: ${when(scan.startedAt)} · ${scan.standardsChecked} documentos verificados · ${scan.changesFound} mudanças${scan.status === "failed" ? ` · falhou: ${scan.error}` : scan.status === "running" ? " · em andamento" : ""}`
              : "Nenhuma varredura ainda."}
          </p>
        </div>
        <form action={scanNowAction}>
          <button type="submit" className={btn.secondary}>
            Rodar varredura agora
          </button>
        </form>
      </section>

      {scanResult && (
        <p role="status" className="m-0 rounded-control border border-tint-line bg-tint px-4 py-3 text-sm">
          Varredura concluída: {scanResult[0]} documentos, {scanResult[1]} mudanças, {scanResult[2]} rascunhos novos
          {scanResult[3] ? `, ${scanResult[3]} falharam (veja os logs)` : ""}.
        </p>
      )}
      {erro && (
        <p role="alert" className="m-0 rounded-control border border-line bg-crit-bg px-4 py-3 text-sm text-crit">
          A varredura não rodou: {erro}
        </p>
      )}
      {ok === "publicado" && (
        <p role="status" className="m-0 rounded-control border border-ok-line bg-ok-bg px-4 py-3 text-sm text-ok">
          Artigo publicado no site.
        </p>
      )}

      <section className="flex flex-col gap-4">
        <h2 className="m-0 text-sm font-semibold uppercase tracking-[0.08em] text-muted">Para revisar · {drafts.length}</h2>
        {drafts.length === 0 && <p className="m-0 text-[15px] text-body">Nada para revisar. Quando a ISO mudar algo, o rascunho aparece aqui.</p>}
        {drafts.map((a) => (
          <article key={a.groupId} className="flex flex-col gap-3 rounded-card border border-line bg-card p-5">
            <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-muted">
              <span className="rounded-full border border-line px-2 py-0.5">{a.standards.join(", ")}</span>
              {a.changeKind && <span>{CHANGE_LABEL[a.changeKind] ?? a.changeKind}</span>}
              {a.stageTo != null && (
                <span>
                  · {a.stageFrom != null ? `${formatStage(a.stageFrom)} → ` : ""}
                  {formatStage(a.stageTo)}
                </span>
              )}
              <span>· {STATUS_LABEL[a.standardStatus] ?? a.standardStatus}</span>
            </div>
            <h3 className="m-0 font-display text-xl font-medium">{a.title}</h3>
            <p className="m-0 text-sm text-body">{a.summary}</p>
            <p className="m-0 text-xs text-muted">
              Fonte:{" "}
              <a href={a.sourceUrl} className="underline" rel="noopener" target="_blank">
                {a.sourceTitle ?? a.sourceUrl}
              </a>{" "}
              · Detectado {when(a.createdAt)} · PT · EN · ES prontos
              {!a.transitionDeadline && a.standardStatus === "in_transition" ? " · prazo de transição a confirmar" : ""}
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              <form action={publishAction}>
                <input type="hidden" name="groupId" value={a.groupId} />
                <button type="submit" className={btn.primary}>
                  Aprovar e publicar
                </button>
              </form>
              <Link href={`/admin/radar/${a.groupId}`} className={btn.secondary}>
                Editar rascunho
              </Link>
              <form action={discardAction}>
                <input type="hidden" name="groupId" value={a.groupId} />
                <button type="submit" className={btn.danger}>
                  Descartar
                </button>
              </form>
            </div>
          </article>
        ))}
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="m-0 text-sm font-semibold uppercase tracking-[0.08em] text-muted">Publicados · {published.length}</h2>
        <ul className="m-0 flex list-none flex-col border-t border-line p-0">
          {published.map((a) => (
            <li key={a.groupId} className="flex flex-wrap items-center justify-between gap-3 border-b border-line py-3">
              <div className="flex min-w-0 flex-col">
                <a href={`/iso-radar/${a.slug}/`} target="_blank" className="font-medium hover:text-gold-deep">
                  {a.title}
                </a>
                <span className="text-xs text-muted">
                  {a.standards.join(", ")} · publicado {a.publishedAt ? when(a.publishedAt) : ""}
                  {a.verifiedAt ? ` · verificado ${when(a.verifiedAt)}` : ""}
                </span>
              </div>
              <div className="flex gap-2">
                <Link href={`/admin/radar/${a.groupId}`} className={btn.secondary}>
                  Editar
                </Link>
                <form action={unpublishAction}>
                  <input type="hidden" name="groupId" value={a.groupId} />
                  <button type="submit" className={btn.secondary}>
                    Despublicar
                  </button>
                </form>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </AdminShell>
  );
}

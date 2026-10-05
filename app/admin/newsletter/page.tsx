import { desc, inArray, sql } from "drizzle-orm";
import { requireAdmin } from "@/lib/admin/auth";
import { getDb, schema } from "@/lib/db";
import { AdminShell, btn } from "../admin-shell";
import { buildEditionAction, discardEditionAction, sendEditionAction } from "../actions";

export const maxDuration = 300;

const STATUS: Record<string, string> = {
  draft: "Aguardando aprovação",
  sending: "Enviando",
  sent: "Enviada",
  discarded: "Descartada",
};

export default async function NewsletterAdminPage({ searchParams }: { searchParams: Promise<{ enviados?: string }> }) {
  const email = await requireAdmin();
  const { enviados } = await searchParams;
  const db = getDb();
  const [counts, editions] = await Promise.all([
    db
      .select({ status: schema.newsletterSubscribers.status, n: sql<number>`count(*)::int` })
      .from(schema.newsletterSubscribers)
      .groupBy(schema.newsletterSubscribers.status),
    db.select().from(schema.newsletterEditions).orderBy(desc(schema.newsletterEditions.month)).limit(24),
  ]);
  const count = (s: string) => counts.find((c) => c.status === s)?.n ?? 0;
  const ids = [...new Set(editions.flatMap((e) => e.articleIds))];
  const titles = ids.length
    ? new Map(
        (
          await db
            .select({ id: schema.radarArticles.id, content: schema.radarArticles.content })
            .from(schema.radarArticles)
            .where(inArray(schema.radarArticles.id, ids))
        ).map((a) => [a.id, a.content["pt-br"].title])
      )
    : new Map<number, string>();

  return (
    <AdminShell email={email} active="newsletter">
      <section className="flex flex-wrap items-end justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="m-0 font-display text-[30px] font-medium">Newsletter</h1>
          <p className="m-0 text-sm text-muted">
            {count("confirmed")} confirmados · {count("pending")} aguardando confirmação · {count("unsubscribed")} cancelados
          </p>
        </div>
        <form action={buildEditionAction}>
          <button type="submit" className={btn.secondary}>
            Montar edição do mês passado
          </button>
        </form>
      </section>

      {enviados && (
        <p role="status" className="m-0 rounded-control border border-ok-line bg-ok-bg px-4 py-3 text-sm text-ok">
          Edição enviada para {enviados} inscritos.
        </p>
      )}

      <p className="m-0 text-sm text-body">
        No dia 1 de cada mês a edição é montada sozinha com os artigos publicados no mês anterior. Nada é enviado até você aprovar.
      </p>

      <section className="flex flex-col gap-4">
        {editions.length === 0 && <p className="m-0 text-[15px] text-body">Nenhuma edição ainda.</p>}
        {editions.map((e) => (
          <article key={e.id} className="flex flex-col gap-3 rounded-card border border-line bg-card p-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="m-0 font-display text-xl font-medium">Edição {e.month}</h2>
              <span className="text-xs text-muted">
                {STATUS[e.status] ?? e.status}
                {e.sentCount != null ? ` · ${e.sentCount} envios` : ""}
              </span>
            </div>
            <ul className="m-0 flex flex-col gap-1 pl-5 text-sm text-body">
              {e.articleIds.map((id) => (
                <li key={id}>{titles.get(id) ?? `Artigo #${id}`}</li>
              ))}
            </ul>
            {e.status === "draft" && (
              <div className="flex flex-wrap gap-2">
                <form action={sendEditionAction}>
                  <input type="hidden" name="id" value={e.id} />
                  <button type="submit" className={btn.primary}>
                    Aprovar e enviar para {count("confirmed")} inscritos
                  </button>
                </form>
                <form action={discardEditionAction}>
                  <input type="hidden" name="id" value={e.id} />
                  <button type="submit" className={btn.danger}>
                    Descartar
                  </button>
                </form>
              </div>
            )}
          </article>
        ))}
      </section>
    </AdminShell>
  );
}

import { and, desc, eq, inArray, sql } from "drizzle-orm";
import { getDb } from "@/db/client";
import { newsletterEditions, newsletterSubscribers, radarArticles } from "@/db/schema";
import { requireAdmin } from "@/lib/admin/auth";
import { AdminShell, btn } from "../admin-shell";
import { buildEditionAction, discardEditionAction, sendEditionAction } from "../actions";

export const maxDuration = 300;

const STATUS: Record<string, string> = {
  draft: "Aguardando aprovação",
  approved: "Enviando",
  sent: "Enviada",
};

export default async function NewsletterAdminPage({ searchParams }: { searchParams: Promise<{ enviados?: string }> }) {
  const email = await requireAdmin();
  const { enviados } = await searchParams;
  const db = getDb();
  const [counts, editions] = await Promise.all([
    db
      .select({ status: newsletterSubscribers.status, n: sql<number>`count(*)::int` })
      .from(newsletterSubscribers)
      .groupBy(newsletterSubscribers.status),
    db.select().from(newsletterEditions).orderBy(desc(newsletterEditions.period)).limit(72),
  ]);
  const count = (s: string) => counts.find((c) => c.status === s)?.n ?? 0;

  // One card per period; the PT, EN and ES editions of a period share their articles.
  const periods = [...new Set(editions.map((e) => e.period))].map((period) => {
    const items = editions.filter((e) => e.period === period);
    return { period, editions: items, groupIds: items[0]?.articleGroupIds ?? [], status: items[0]?.status ?? "draft" };
  });
  const groupIds = [...new Set(periods.flatMap((p) => p.groupIds))];
  const titles = groupIds.length
    ? new Map(
        (
          await db
            .select({ groupId: radarArticles.groupId, title: radarArticles.title })
            .from(radarArticles)
            .where(and(inArray(radarArticles.groupId, groupIds), eq(radarArticles.locale, "pt-BR")))
        ).map((a) => [a.groupId, a.title])
      )
    : new Map<string, string>();

  return (
    <AdminShell email={email} active="newsletter">
      <section className="flex flex-wrap items-end justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="m-0 font-display text-[30px] font-medium">Newsletter</h1>
          <p className="m-0 text-sm text-muted">
            {count("active")} confirmados · {count("pending")} aguardando confirmação · {count("unsubscribed")} cancelados
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
          Edição enviada: {enviados} e-mails.
        </p>
      )}

      <p className="m-0 text-sm text-body">
        No dia 1 de cada mês a edição é montada sozinha (PT, EN e ES) com os artigos publicados no mês anterior. Cada inscrito
        recebe a versão do seu idioma. Nada é enviado até você aprovar.
      </p>

      <section className="flex flex-col gap-4">
        {periods.length === 0 && <p className="m-0 text-[15px] text-body">Nenhuma edição ainda.</p>}
        {periods.map((p) => (
          <article key={p.period} className="flex flex-col gap-3 rounded-card border border-line bg-card p-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="m-0 font-display text-xl font-medium">Edição {p.period}</h2>
              <span className="text-xs text-muted">
                {STATUS[p.status] ?? p.status} · {p.editions.map((e) => e.locale).join(", ")}
              </span>
            </div>
            <ul className="m-0 flex flex-col gap-1 pl-5 text-sm text-body">
              {p.groupIds.map((id) => (
                <li key={id}>{titles.get(id) ?? "Artigo sem versão em português"}</li>
              ))}
            </ul>
            {p.status === "draft" && (
              <div className="flex flex-wrap gap-2">
                <form action={sendEditionAction}>
                  <input type="hidden" name="period" value={p.period} />
                  <button type="submit" className={btn.primary}>
                    Aprovar e enviar para {count("active")} inscritos
                  </button>
                </form>
                <form action={discardEditionAction}>
                  <input type="hidden" name="period" value={p.period} />
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

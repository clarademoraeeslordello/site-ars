import { verifyLinkAction } from "../../actions";

/** The token is spent by the POST below, never by the GET: mail scanners that open links cannot use it up. */
export default async function VerifyPage({ searchParams }: { searchParams: Promise<{ token?: string }> }) {
  const { token = "" } = await searchParams;
  return (
    <main className="mx-auto flex max-w-[420px] flex-col gap-5 px-4 py-20">
      <h1 className="m-0 font-display text-[28px] font-medium">Entrar no painel</h1>
      <form action={verifyLinkAction}>
        <input type="hidden" name="token" value={token} />
        <button
          type="submit"
          className="w-full rounded-control bg-gold-cta px-4 py-2.5 text-sm font-semibold text-dark hover:bg-gold-deep hover:text-white"
        >
          Continuar
        </button>
      </form>
    </main>
  );
}

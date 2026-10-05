import { redirect } from "next/navigation";
import { getAdminEmail } from "@/lib/admin/auth";
import { LoginForm } from "./login-form";

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ erro?: string }> }) {
  if (await getAdminEmail()) redirect("/admin/radar");
  const { erro } = await searchParams;
  return (
    <main className="mx-auto flex max-w-[420px] flex-col gap-5 px-4 py-20">
      <h1 className="m-0 font-display text-[28px] font-medium">Painel do ISO Radar</h1>
      <p className="m-0 text-[15px] text-body">Informe seu e-mail para receber um link de acesso.</p>
      {erro === "link" && (
        <p role="alert" className="m-0 text-sm text-crit">
          Esse link expirou ou já foi usado. Peça um novo abaixo.
        </p>
      )}
      <LoginForm />
    </main>
  );
}

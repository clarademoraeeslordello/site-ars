"use client";

import { useActionState } from "react";
import { requestLinkAction } from "../actions";

export function LoginForm() {
  const [state, action, pending] = useActionState(requestLinkAction, null);
  if (state?.sent) {
    return (
      <p role="status" className="m-0 rounded-control border border-tint-line bg-tint px-4 py-3.5 text-[15px]">
        Se este e-mail tiver acesso ao painel, você vai receber um link para entrar. Ele vale por 15 minutos.
      </p>
    );
  }
  return (
    <form action={action} className="flex flex-col gap-3">
      <label className="flex flex-col gap-1.5 text-sm font-medium">
        E-mail
        <input
          name="email"
          type="email"
          required
          autoComplete="email"
          className="h-10 rounded-control border border-line bg-well px-3 text-[15px]"
        />
      </label>
      <button
        type="submit"
        disabled={pending}
        className="rounded-control bg-gold-cta px-4 py-2.5 text-sm font-semibold text-dark hover:bg-gold-deep hover:text-white disabled:opacity-60"
      >
        {pending ? "Enviando…" : "Enviar link de acesso"}
      </button>
    </form>
  );
}

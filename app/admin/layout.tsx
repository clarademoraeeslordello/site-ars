import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Archivo, Fraunces } from "next/font/google";

const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-fraunces" });
const archivo = Archivo({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-archivo" });

export const metadata: Metadata = {
  title: "Painel · ISO Radar",
  robots: { index: false, follow: false },
};

// Admin pages read cookies and the database on every request.
export const dynamic = "force-dynamic";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR" className={`${fraunces.variable} ${archivo.variable}`}>
      <body className="min-h-screen bg-paper text-ink">{children}</body>
    </html>
  );
}

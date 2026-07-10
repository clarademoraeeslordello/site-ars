import type { ReactNode } from "react";
import "./globals.css";

// Root layout only passes children through; the [locale] layout renders <html>.
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}

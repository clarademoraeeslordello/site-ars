import { notFound } from "next/navigation";

// Any unknown path inside a locale renders that locale's not-found page
// (otherwise Next falls back to its default, untranslated 404).
export default function CatchAll() {
  notFound();
}

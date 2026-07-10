import { Section } from "./section";

/** Numbered feature list shared by content pages (lgpd, audits, security, consultancies). */
export function FeatureSections({
  sections,
  closing,
}: {
  sections: { title: string; text: string }[];
  closing?: string;
}) {
  return (
    <Section>
      <ol className="grid gap-x-12 gap-y-10 md:grid-cols-2">
        {sections.map((s, i) => (
          <li key={s.title} className="border-l-2 border-gold pl-6">
            <span className="font-data text-xs text-gold">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h2 className="mt-1 font-display text-2xl font-semibold">{s.title}</h2>
            <p className="mt-3 leading-relaxed text-ink-soft">{s.text}</p>
          </li>
        ))}
      </ol>
      {closing && (
        <p className="mt-14 max-w-3xl border-t border-hairline pt-8 font-display text-xl leading-relaxed">
          {closing}
        </p>
      )}
    </Section>
  );
}

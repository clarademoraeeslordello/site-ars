import { Eyebrow } from "./section";

export function PageHero({
  eyebrow,
  title,
  text,
}: {
  eyebrow: string;
  title: string;
  text?: string;
}) {
  return (
    <div className="border-b border-hairline px-4 pb-14 pt-20 sm:px-6 sm:pt-28">
      <div className="mx-auto max-w-7xl">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="mt-4 max-w-3xl font-display text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl">
          {title}
        </h1>
        {text && (
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft">
            {text}
          </p>
        )}
      </div>
    </div>
  );
}

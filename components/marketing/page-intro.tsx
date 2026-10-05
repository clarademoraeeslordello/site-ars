import type { ReactNode } from "react";
import { Breadcrumb } from "@/components/layout/breadcrumb";

/** Opening of an internal page: breadcrumb, eyebrow, the page's single H1 and lead. */
export function PageIntro({
  eyebrow,
  title,
  lead,
  crumb,
  children,
}: {
  eyebrow: string;
  /** Breadcrumb label for this page; defaults to the eyebrow. */
  crumb?: string;
  title: string;
  lead?: string;
  children?: ReactNode;
}) {
  return (
    <section aria-labelledby="page-title" className="container-site pt-[clamp(32px,5vw,56px)]">
      <Breadcrumb items={[{ label: crumb ?? eyebrow }]} />
      <div className="mt-[clamp(32px,5vw,56px)] flex max-w-[820px] flex-col gap-5">
        <span className="eyebrow">{eyebrow}</span>
        <h1 id="page-title" className="m-0 font-display text-h1 font-medium">
          {title}
        </h1>
        {lead && <p className="m-0 max-w-[680px] text-lg leading-[1.6] text-pretty text-body">{lead}</p>}
        {children}
      </div>
    </section>
  );
}

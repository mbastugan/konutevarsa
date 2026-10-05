import type { ReactNode } from "react";
import type { Policy } from "@/lib/policies";
import { PageWrap } from "./shell";

export function LegalPage({ policy, children }: { policy: Policy; children?: ReactNode }) {
  return (
    <PageWrap>
      <article className="mx-auto max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-widest text-accent">Konutevarsa</p>
        <h1 className="mt-2 font-serif text-4xl font-semibold">{policy.title}</h1>
        <p className="mt-4 text-lg text-muted">{policy.lede}</p>
        <div className="mt-8 space-y-8">
          {policy.sections.map((section) => (
            <section key={section.h}>
              <h2 className="font-serif text-2xl">{section.h}</h2>
              {section.p.map((paragraph) => (
                <p key={paragraph} className="mt-2 text-ink">
                  {paragraph}
                </p>
              ))}
            </section>
          ))}
        </div>
        {children}
      </article>
    </PageWrap>
  );
}

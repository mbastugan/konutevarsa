import { createFileRoute } from "@tanstack/react-router";
import { LeadForm } from "@/components/site/forms";
import { PageWrap, SiteShell } from "@/components/site/shell";
import { getPlans } from "@/lib/content-api";

export const Route = createFileRoute("/emlakci-ol")({
  loader: () => getPlans(),
  head: () => ({
    meta: [
      { title: "Emlakçı Ol — Konutevarsa" },
      { name: "description", content: "Free, Pro, Premium ve Region Partner. Ödeme bu fazda kapalı." },
    ],
    links: [{ rel: "canonical", href: "/emlakci-ol" }],
  }),
  component: function JoinPage() {
    const plans = Route.useLoaderData();
    return (
      <SiteShell>
        <PageWrap>
          <p className="text-xs font-semibold uppercase tracking-widest text-accent">Üyelik</p>
          <h1 className="mt-2 font-serif text-4xl">Emlakçı ol</h1>
          <p className="mt-3 max-w-2xl text-lg text-muted">
            Planlar duruyor. Tahsilat yok. Başvuru bir iletişim talebi olarak masaya düşer.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {plans.map((plan) => (
              <article key={plan.id} className="border border-line bg-card p-4">
                <h2 className="font-serif text-2xl">{plan.name}</h2>
                <p className="mt-1 text-sm font-semibold text-accent">{plan.priceLabel}</p>
                <p className="mt-2 text-sm text-muted">{plan.summary}</p>
                <ul className="mt-3 space-y-1 text-sm">
                  {plan.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
          <div className="mt-10 max-w-3xl">
            <LeadForm
              sourcePage="/emlakci-ol"
              defaultType="CONTACT"
              heading="Ofis başvurusu"
              sub="Mesaja ofis adınızı ve ilçenizi yazın. Plan seçimi ödeme açılınca bağlanır."
            />
          </div>
        </PageWrap>
      </SiteShell>
    );
  },
});

import { createFileRoute, Link } from "@tanstack/react-router";
import { DemoNote, PlanPill } from "@/components/site/bits";
import { PageWrap, SiteShell } from "@/components/site/shell";
import { listBrokers } from "@/lib/content-api";

export const Route = createFileRoute("/emlakcilar")({
  loader: () => listBrokers(),
  head: ({ loaderData }) => ({
    meta: [
      { title: "Emlakçılar — Konutevarsa" },
      { name: "description", content: "Örnek emlakçı profilleri. İlan sitesi değil, ofis kartı." },
    ],
    links: [{ rel: "canonical", href: loaderData ? `${loaderData.origin}/emlakcilar` : "/emlakcilar" }],
  }),
  component: function BrokersPage() {
    const { brokers } = Route.useLoaderData();
    return (
      <SiteShell>
        <PageWrap>
          <p className="text-xs font-semibold uppercase tracking-widest text-accent">Dizin</p>
          <h1 className="mt-2 font-serif text-4xl">Emlakçılar</h1>
          <p className="mt-3 max-w-2xl text-lg text-muted">
            Profiller hazır. İlan toplama ve ücretli üyelik tahsilatı bu fazda yok.
          </p>
          <div className="mt-3">
            <DemoNote />
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {brokers.map((broker) => (
              <Link
                key={broker.slug}
                to="/emlakci/$slug"
                params={{ slug: broker.slug }}
                className="block border border-line bg-card p-5"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="grid size-12 place-items-center bg-ink font-serif text-lg text-paper">
                    {broker.monogram}
                  </span>
                  <PlanPill plan={broker.plan} />
                </div>
                <h2 className="mt-4 font-serif text-2xl">{broker.companyName}</h2>
                <p className="text-sm text-muted">
                  {broker.districtName ? `${broker.districtName}, ` : ""}
                  {broker.cityName}
                </p>
                <p className="mt-2 text-sm">{broker.description}</p>
              </Link>
            ))}
          </div>
        </PageWrap>
      </SiteShell>
    );
  },
});

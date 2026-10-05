import { createFileRoute, notFound } from "@tanstack/react-router";
import { DemoNote, PlanPill, StoryCard } from "@/components/site/bits";
import { LeadForm } from "@/components/site/forms";
import { PageWrap, SiteShell } from "@/components/site/shell";
import { getBroker } from "@/lib/content-api";
import { planLabel } from "@/lib/format";

export const Route = createFileRoute("/emlakci/$slug")({
  loader: async ({ params }) => {
    const data = await getBroker({ data: params.slug });
    if (!data) throw notFound();
    return data;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData ? `${loaderData.broker.companyName} — Konutevarsa` : "Emlakçı" },
      { name: "description", content: loaderData?.broker.description ?? "" },
    ],
    links: [
      {
        rel: "canonical",
        href: loaderData ? `${loaderData.origin}/emlakci/${loaderData.broker.slug}` : "/emlakcilar",
      },
    ],
  }),
  component: function BrokerPage() {
    const { broker, articles } = Route.useLoaderData();
    return (
      <SiteShell>
        <PageWrap>
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <article>
              <div className="flex items-center gap-4">
                <span className="grid size-16 place-items-center bg-ink font-serif text-2xl text-paper">
                  {broker.monogram}
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-accent">Emlakçı profili</p>
                  <h1 className="font-serif text-4xl">{broker.companyName}</h1>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <PlanPill plan={broker.plan} />
                {broker.verified ? (
                  <span className="border border-line px-2 py-1 text-xs uppercase tracking-wide">Doğrulanmış örnek</span>
                ) : null}
              </div>
              <p className="mt-4 text-lg text-muted">{broker.description}</p>
              <div className="mt-3">
                <DemoNote>Telefon ve e-posta örnek karttır. Gerçek bir ofise ait değildir.</DemoNote>
              </div>
              <dl className="mt-6 grid gap-3 text-sm sm:grid-cols-2">
                <div>
                  <dt className="text-muted">Bölge</dt>
                  <dd>
                    {broker.districtName ? `${broker.districtName}, ` : ""}
                    {broker.cityName}
                  </dd>
                </div>
                <div>
                  <dt className="text-muted">Mahalleler</dt>
                  <dd>{broker.neighborhoods.join(", ") || "—"}</dd>
                </div>
                <div>
                  <dt className="text-muted">Telefon</dt>
                  <dd>{broker.phone || "—"}</dd>
                </div>
                <div>
                  <dt className="text-muted">E-posta</dt>
                  <dd>{broker.email || "—"}</dd>
                </div>
                <div>
                  <dt className="text-muted">Plan</dt>
                  <dd>{planLabel(broker.plan)}</dd>
                </div>
              </dl>
            </article>
            <LeadForm
              sourcePage={`/emlakci/${broker.slug}`}
              assignedBroker={broker.slug}
              defaultCity={broker.cityName}
              defaultDistrict={broker.districtName || ""}
              heading="Bu ofise not bırakın"
              sub="Talep ofise otomatik düşmez. Yayın masası görür."
            />
          </div>
          {articles.length > 0 ? (
            <section className="mt-12">
              <h2 className="font-serif text-3xl">Bölgeden haberler</h2>
              <div className="mt-6 grid gap-6 md:grid-cols-3">
                {articles.map((article) => (
                  <StoryCard key={article.slug} article={article} />
                ))}
              </div>
            </section>
          ) : null}
        </PageWrap>
      </SiteShell>
    );
  },
});

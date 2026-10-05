import { Link } from "@tanstack/react-router";
import { planLabel, statusLabel } from "@/lib/format";
import type { AdCreative, ArticleCard, BrokerCard, Metric, PlaceRef, ProjectCard, RegionNode } from "@/lib/types";
import { AdSlot, DemoNote, MetricGrid, PlanPill, RegionLink, StoryCard } from "./bits";
import { LeadForm } from "./forms";
import { Trend } from "./trend";
import { Crumbs, PageWrap } from "./shell";

export function RegionView({
  region,
  parents,
  children,
  metrics,
  articles,
  brokers,
  projects,
  ads,
}: {
  region: RegionNode;
  parents: PlaceRef[];
  children: PlaceRef[];
  metrics: Metric | null;
  articles: ArticleCard[];
  brokers: BrokerCard[];
  projects: ProjectCard[];
  ads: AdCreative[];
}) {
  const crumbs = [
    { label: "Ana sayfa", href: "/" },
    { label: "Bölgeler", href: "/konut-radar" },
    ...parents.map((parent, index) => ({
      label: parent.name,
      href:
        index === 0
          ? `/bolge/${region.citySlug}`
          : `/bolge/${region.citySlug}/${parent.slug}`,
    })),
    { label: region.name },
  ];
  return (
    <PageWrap>
      <Crumbs items={crumbs} />
      <AdSlot ads={ads} placement="region_top" />
      <header className="mt-4 max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-widest text-accent">
          {region.kind === "city" ? "İl" : region.kind === "district" ? "İlçe" : "Mahalle"}
        </p>
        <h1 className="mt-2 font-serif text-4xl font-semibold sm:text-5xl">{region.name}</h1>
        <p className="mt-3 text-lg text-muted">{region.summary}</p>
        <div className="mt-3">
          <DemoNote />
        </div>
      </header>

      {children.length > 0 ? (
        <div className="mt-6 flex flex-wrap gap-2">
          {children.map((child) => (
            <RegionLink
              key={child.slug}
              city={region.citySlug}
              district={region.kind === "city" ? child.slug : region.districtSlug}
              neighborhood={region.kind === "district" ? child.slug : null}
              className="inline-flex h-11 items-center border border-line bg-card px-3 text-sm"
            >
              {child.name}
            </RegionLink>
          ))}
        </div>
      ) : null}

      <section className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <h2 className="font-serif text-2xl">Konut özeti</h2>
          {metrics ? (
            <>
              <div className="mt-3">
                <MetricGrid metrics={metrics} />
              </div>
              <div className="mt-4 border border-line bg-card p-3">
                <p className="mb-2 text-xs uppercase tracking-wide text-muted">Örnek fiyat serisi</p>
                <Trend series={metrics.series} />
              </div>
            </>
          ) : (
            <p className="mt-3 text-muted">Bu kırılım için örnek seri henüz yok. Üst bölgenin sayfasına bakın.</p>
          )}
        </div>
        <aside className="border border-line bg-card p-5">
          <h2 className="font-serif text-2xl">Bölge rehberi</h2>
          <p className="mt-3 text-muted">{region.guide}</p>
          <AdSlot ads={ads} placement="region_sidebar" />
        </aside>
      </section>

      <section className="mt-12">
        <h2 className="font-serif text-3xl">İlgili haberler</h2>
        {articles.length === 0 ? (
          <p className="mt-3 text-muted">Bu bölgeye bağlı örnek haber henüz yok.</p>
        ) : (
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {articles.map((item) => (
              <StoryCard key={item.slug} article={item} />
            ))}
          </div>
        )}
      </section>

      <section className="mt-12 grid gap-8 lg:grid-cols-2">
        <div>
          <h2 className="font-serif text-3xl">Bölgedeki projeler</h2>
          <ul className="mt-4 divide-y divide-line border-y border-line">
            {projects.length === 0 ? <li className="py-4 text-muted">Örnek proje kartı yok.</li> : null}
            {projects.map((project) => (
              <li key={project.id} className="py-4">
                <p className="text-xs uppercase tracking-widest text-accent">{statusLabel(project.status)}</p>
                <p className="font-serif text-2xl">{project.name}</p>
                <p className="text-sm text-muted">{project.developer}</p>
                <p className="mt-1 text-sm">{project.summary}</p>
                {project.unitCount ? (
                  <p className="mt-1 text-sm text-muted">{project.unitCount} örnek konut</p>
                ) : null}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="font-serif text-3xl">Bölgedeki emlakçılar</h2>
          <ul className="mt-4 space-y-3">
            {brokers.length === 0 ? <li className="text-muted">Bu kırılımda örnek ofis yok.</li> : null}
            {brokers.map((broker) => (
              <li key={broker.id}>
                <Link to="/emlakci/$slug" params={{ slug: broker.slug }} className="block border border-line bg-card p-4">
                  <div className="flex items-center justify-between">
                    <span className="font-serif text-xl">{broker.companyName}</span>
                    <PlanPill plan={broker.plan} />
                  </div>
                  <p className="mt-1 text-sm text-muted">{planLabel(broker.plan)} · örnek profil</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className="mt-12 max-w-3xl">
        <LeadForm
          sourcePage={`/bolge/${region.citySlug}${region.districtSlug ? `/${region.districtSlug}` : ""}`}
          defaultCity={parents[0]?.name || region.name}
          defaultDistrict={region.kind === "district" ? region.name : parents[1]?.name || ""}
          heading={`${region.name} için talep bırakın`}
          sub="Satın alma, kiralama veya değerleme. Dağıtım motoru sonraki fazda açılır."
        />
      </div>
    </PageWrap>
  );
}

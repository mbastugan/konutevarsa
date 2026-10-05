import { createFileRoute, Link } from "@tanstack/react-router";
import { StoryCard } from "@/components/site/bits";
import { PageWrap, SearchBox, SiteShell } from "@/components/site/shell";
import { searchCatalog, type SearchRegion } from "@/lib/content-api";

export const Route = createFileRoute("/ara")({
  validateSearch: (search: Record<string, unknown>) => ({
    q: typeof search.q === "string" ? search.q.slice(0, 80) : "",
  }),
  loaderDeps: ({ search }) => ({ q: search.q }),
  loader: ({ deps }) => searchCatalog({ data: deps.q }),
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData?.q ? `${loaderData.q} araması — Konutevarsa` : "Ara — Konutevarsa" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: function SearchPage() {
    const data = Route.useLoaderData();
    const empty = data.q.length >= 2 && data.articles.length + data.regions.length + data.brokers.length + data.projects.length === 0;
    return (
      <SiteShell>
        <PageWrap>
          <h1 className="font-serif text-4xl">Ara</h1>
          <p className="mt-2 text-muted">Haber, şehir, ilçe, emlakçı veya proje.</p>
          <div className="mt-4 max-w-xl">
            <SearchBox />
          </div>
          {data.q.length < 2 ? <p className="mt-6 text-sm text-muted">En az iki karakter yazın.</p> : null}
          {empty ? <p className="mt-6">“{data.q}” için örnek kayıt yok.</p> : null}
          {data.articles.length > 0 ? (
            <section className="mt-8">
              <h2 className="font-serif text-2xl">Haberler</h2>
              <div className="mt-4 grid gap-6">
                {data.articles.map((article) => (
                  <StoryCard key={article.slug} article={article} layout="row" />
                ))}
              </div>
            </section>
          ) : null}
          {data.regions.length > 0 ? (
            <section className="mt-8">
              <h2 className="font-serif text-2xl">Bölgeler</h2>
              <ul className="mt-3 divide-y divide-line border-y border-line">
                {data.regions.map((region) => (
                  <li key={`${region.kind}-${region.slug}`} className="py-3">
                    <RegionResult region={region} />
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
          {data.brokers.length > 0 ? (
            <section className="mt-8">
              <h2 className="font-serif text-2xl">Emlakçılar</h2>
              <ul className="mt-3 space-y-2">
                {data.brokers.map((broker) => (
                  <li key={broker.slug}>
                    <Link to="/emlakci/$slug" params={{ slug: broker.slug }} className="font-semibold">
                      {broker.companyName}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
          {data.projects.length > 0 ? (
            <section className="mt-8">
              <h2 className="font-serif text-2xl">Projeler</h2>
              <ul className="mt-3 space-y-2">
                {data.projects.map((project) => (
                  <li key={project.slug}>
                    <p className="font-semibold">{project.name}</p>
                    <p className="text-sm text-muted">{project.summary}</p>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
        </PageWrap>
      </SiteShell>
    );
  },
});

function RegionResult({ region }: { region: SearchRegion }) {
  if (region.kind === "neighborhood" && region.district_slug) {
    return (
      <Link
        to="/bolge/$city/$district/$neighborhood"
        params={{ city: region.city_slug, district: region.district_slug, neighborhood: region.slug }}
      >
        {region.name}
      </Link>
    );
  }
  if (region.kind === "district") {
    return (
      <Link to="/bolge/$city/$district" params={{ city: region.city_slug, district: region.slug }}>
        {region.name}
      </Link>
    );
  }
  return (
    <Link to="/bolge/$city" params={{ city: region.slug }}>
      {region.name}
    </Link>
  );
}

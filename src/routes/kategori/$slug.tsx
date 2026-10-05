import { createFileRoute, notFound } from "@tanstack/react-router";
import { AdSlot, DemoNote, StoryCard } from "@/components/site/bits";
import { PageWrap, SiteShell } from "@/components/site/shell";
import { getCategoryPage } from "@/lib/content-api";
import { breadcrumbLd, jsonLd } from "@/lib/seo";
import { absUrl } from "@/lib/site";

export const Route = createFileRoute("/kategori/$slug")({
  loader: async ({ params }) => {
    const data = await getCategoryPage({ data: params.slug });
    if (!data) throw notFound();
    return data;
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Kategori — Konutevarsa" }] };
    const { category, origin } = loaderData;
    return {
      meta: [
        { title: `${category.name} — Konutevarsa` },
        { name: "description", content: category.description },
      ],
      links: [{ rel: "canonical", href: absUrl(origin, `/kategori/${category.slug}`) }],
      scripts: [
        jsonLd(
          breadcrumbLd(origin, [
            { name: "Ana sayfa", path: "/" },
            { name: category.name, path: `/kategori/${category.slug}` },
          ]),
        ),
      ],
    };
  },
  component: function CategoryPage() {
    const { category, articles, ads } = Route.useLoaderData();
    return (
      <SiteShell>
        <PageWrap>
          <p className="text-xs font-semibold uppercase tracking-widest text-accent">Kategori</p>
          <h1 className="mt-2 font-serif text-4xl">{category.name}</h1>
          <p className="mt-3 max-w-2xl text-lg text-muted">{category.description}</p>
          <div className="mt-3">
            <DemoNote />
          </div>
          <div className="mt-6">
            <AdSlot ads={ads} placement="category_top" />
          </div>
          <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <StoryCard key={article.slug} article={article} />
            ))}
          </div>
          {articles.length === 0 ? <p className="mt-6 text-muted">Bu kategoride yayında örnek haber yok.</p> : null}
        </PageWrap>
      </SiteShell>
    );
  },
});

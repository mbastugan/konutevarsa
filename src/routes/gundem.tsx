import { createFileRoute } from "@tanstack/react-router";
import { DemoNote, StoryCard } from "@/components/site/bits";
import { PageWrap, SiteShell } from "@/components/site/shell";
import { getGundem } from "@/lib/content-api";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/gundem")({
  loader: () => getGundem(),
  head: ({ loaderData }) => ({
    meta: [
      { title: `Gündem — ${SITE.name}` },
      { name: "description", content: "Günün gayrimenkul başlıkları, önem sırasıyla." },
    ],
    links: [{ rel: "canonical", href: loaderData ? `${loaderData.origin}/gundem` : "/gundem" }],
  }),
  component: function GundemPage() {
    const { articles } = Route.useLoaderData();
    return (
      <SiteShell>
        <PageWrap>
          <p className="text-xs font-semibold uppercase tracking-widest text-accent">Gündem</p>
          <h1 className="mt-2 font-serif text-4xl">Gayrimenkulde gündemi kaçırmayın</h1>
          <div className="mt-3">
            <DemoNote />
          </div>
          <div className="mt-8 grid gap-8">
            {articles.map((article) => (
              <StoryCard key={article.slug} article={article} layout="row" />
            ))}
          </div>
        </PageWrap>
      </SiteShell>
    );
  },
});

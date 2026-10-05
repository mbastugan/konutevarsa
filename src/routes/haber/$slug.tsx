import { createFileRoute, notFound } from "@tanstack/react-router";
import { ArticleView } from "@/components/site/article-view";
import { SiteShell } from "@/components/site/shell";
import { getArticle } from "@/lib/content-api";
import { breadcrumbLd, jsonLd, newsArticleLd } from "@/lib/seo";
import { absUrl } from "@/lib/site";

export const Route = createFileRoute("/haber/$slug")({
  loader: async ({ params }) => {
    const data = await getArticle({ data: params.slug });
    if (!data) throw notFound();
    return data;
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Haber — Konutevarsa" }] };
    const { article, origin } = loaderData;
    return {
      meta: [
        { title: `${article.seoTitle} — Konutevarsa` },
        { name: "description", content: article.seoDescription },
        { name: "author", content: article.authorName },
      ],
      links: [{ rel: "canonical", href: absUrl(origin, article.canonicalPath) }],
      scripts: [
        jsonLd(newsArticleLd(origin, article)),
        jsonLd(
          breadcrumbLd(origin, [
            { name: "Ana sayfa", path: "/" },
            { name: article.categoryName, path: `/kategori/${article.categorySlug}` },
            { name: article.title, path: article.canonicalPath },
          ]),
        ),
      ],
    };
  },
  component: function HaberPage() {
    const data = Route.useLoaderData();
    return (
      <SiteShell>
        <ArticleView article={data.article} related={data.related} broker={data.broker} ads={data.ads} />
      </SiteShell>
    );
  },
});

import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "@/components/site/home";
import { SiteShell } from "@/components/site/shell";
import { getHome } from "@/lib/content-api";
import { jsonLd, organizationLd, websiteLd } from "@/lib/seo";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/")({
  loader: () => getHome(),
  head: ({ loaderData }) => ({
    meta: [
      { title: `${SITE.name} — ${SITE.tagline}` },
      { name: "description", content: SITE.description },
    ],
    links: [{ rel: "canonical", href: loaderData?.origin ? `${loaderData.origin}/` : "/" }],
    scripts: loaderData
      ? [jsonLd(websiteLd(loaderData.origin)), jsonLd(organizationLd(loaderData.origin))]
      : [],
  }),
  component: function Home() {
    const data = Route.useLoaderData();
    return (
      <SiteShell>
        <HomePage data={data} />
      </SiteShell>
    );
  },
});

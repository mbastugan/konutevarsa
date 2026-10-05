import { createFileRoute, notFound } from "@tanstack/react-router";
import { RegionView } from "@/components/site/region-view";
import { SiteShell } from "@/components/site/shell";
import { getRegion } from "@/lib/content-api";
import { regionHead } from "@/lib/region-meta";

export const Route = createFileRoute("/bolge/$city")({
  loader: async ({ params }) => {
    const data = await getRegion({ data: { city: params.city } });
    if (!data) throw notFound();
    return data;
  },
  head: ({ loaderData }) => regionHead(loaderData),
  component: function CityPage() {
    const data = Route.useLoaderData();
    return (
      <SiteShell>
        <RegionView {...data} />
      </SiteShell>
    );
  },
});


import { createFileRoute, notFound } from "@tanstack/react-router";
import { RegionView } from "@/components/site/region-view";
import { SiteShell } from "@/components/site/shell";
import { getRegion } from "@/lib/content-api";
import { regionHead } from "@/lib/region-meta";

export const Route = createFileRoute("/bolge/$city/$district/$neighborhood")({
  loader: async ({ params }) => {
    const data = await getRegion({
      data: { city: params.city, district: params.district, neighborhood: params.neighborhood },
    });
    if (!data) throw notFound();
    return data;
  },
  head: ({ loaderData }) => regionHead(loaderData),
  component: function NeighborhoodPage() {
    const data = Route.useLoaderData();
    return (
      <SiteShell>
        <RegionView {...data} />
      </SiteShell>
    );
  },
});

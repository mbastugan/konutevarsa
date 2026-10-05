import { breadcrumbLd, jsonLd, placeLd } from "@/lib/seo";

type RegionHeadData = {
  origin: string;
  region: {
    name: string;
    summary: string;
    citySlug: string;
    districtSlug: string | null;
    neighborhoodSlug: string | null;
  };
  parents: { name: string }[];
};

export function regionHead(data: RegionHeadData | undefined) {
  if (!data) return { meta: [{ title: "Bölge — Konutevarsa" }] };
  const { region, origin, parents } = data;
  const path =
    region.neighborhoodSlug && region.districtSlug
      ? `/bolge/${region.citySlug}/${region.districtSlug}/${region.neighborhoodSlug}`
      : region.districtSlug
        ? `/bolge/${region.citySlug}/${region.districtSlug}`
        : `/bolge/${region.citySlug}`;
  const crumbs = [
    { name: "Ana sayfa", path: "/" },
    ...parents.map((parent, index) => ({
      name: parent.name,
      path: index === 0 ? `/bolge/${region.citySlug}` : `/bolge/${region.citySlug}/${region.districtSlug}`,
    })),
    { name: region.name, path },
  ];
  return {
    meta: [
      { title: `${region.name} konut özeti — Konutevarsa` },
      { name: "description", content: region.summary },
    ],
    links: [{ rel: "canonical", href: origin ? `${origin}${path}` : path }],
    scripts: [
      jsonLd(breadcrumbLd(origin, crumbs)),
      jsonLd(placeLd(origin, region.name, path, parents[0]?.name || region.name, parents[1]?.name)),
    ],
  };
}

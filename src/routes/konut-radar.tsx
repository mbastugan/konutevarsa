import { createFileRoute } from "@tanstack/react-router";
import { PageWrap, SiteShell } from "@/components/site/shell";
import { RadarPanel } from "@/components/site/radar";
import { getRadar } from "@/lib/content-api";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/konut-radar")({
  loader: () => getRadar({ data: { city: "istanbul", district: "cekmekoy" } }),
  head: () => ({
    meta: [
      { title: `Konut Radar — ${SITE.name}` },
      {
        name: "description",
        content: "İl ve ilçe seçerek örnek konut fiyatı, kira trendi ve amortisman tahminini izleyin.",
      },
    ],
    links: [{ rel: "canonical", href: "/konut-radar" }],
  }),
  component: function RadarPage() {
    const data = Route.useLoaderData();
    return (
      <SiteShell>
        <PageWrap>
          <RadarPanel initial={data} />
          <p className="mt-8 max-w-3xl text-muted">
            Konut Radar, ileride resmi ve lisanslı serilere bağlanacak şekilde kuruldu. Şimdiki sayılar ürünü
            göstermek için üretilmiş örneklerdir.
          </p>
        </PageWrap>
      </SiteShell>
    );
  },
});

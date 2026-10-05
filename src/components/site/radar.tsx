import { useState } from "react";
import { getRadar } from "@/lib/content-api";
import type { RadarPayload } from "@/lib/types";
import { DemoNote, MetricGrid, RegionLink } from "./bits";
import { Trend } from "./trend";

const select = "h-12 w-full border border-line bg-card px-3 text-base text-ink";

export function RadarPanel({ initial }: { initial: RadarPayload }) {
  const [data, setData] = useState(initial);
  const [pending, setPending] = useState(false);

  async function load(city: string, district?: string) {
    setPending(true);
    try {
      const next = await getRadar({ data: { city, district } });
      setData(next);
    } finally {
      setPending(false);
    }
  }

  const place = data.districtName ? `${data.cityName} / ${data.districtName}` : data.cityName;

  return (
    <section className="border border-line bg-card p-4 sm:p-6">
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-accent">Konut Radar</p>
          <h2 className="mt-2 font-serif text-3xl font-semibold sm:text-4xl">
            Türkiye'nin konut piyasasını şehir şehir takip edin.
          </h2>
          <p className="mt-3 text-muted">
            İl, sonra ilçe seçin. Karttaki seriler ürünü göstermek için üretilmiş örnek veridir.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <label className="block text-sm font-semibold">
              İl
              <select
                className={`${select} mt-1`}
                value={data.city}
                disabled={pending}
                onChange={(event) => void load(event.target.value)}
              >
                {data.cities.map((city) => (
                  <option key={city.slug} value={city.slug}>
                    {city.name}
                  </option>
                ))}
              </select>
            </label>
            <label className="block text-sm font-semibold">
              İlçe
              <select
                className={`${select} mt-1`}
                value={data.district ?? ""}
                disabled={pending}
                onChange={(event) =>
                  void load(event.target.value ? data.city : data.city, event.target.value || undefined)
                }
              >
                <option value="">İl geneli</option>
                {data.districts.map((district) => (
                  <option key={district.slug} value={district.slug}>
                    {district.name}
                  </option>
                ))}
              </select>
            </label>
          </div>
          {data.neighborhoods.length > 0 ? (
            <div className="mt-4 flex flex-wrap gap-2">
              {data.neighborhoods.map((item) => (
                <RegionLink
                  key={item.slug}
                  city={data.city}
                  district={data.district}
                  neighborhood={item.slug}
                  className="inline-flex h-10 items-center border border-line px-3 text-sm"
                >
                  {item.name}
                </RegionLink>
              ))}
            </div>
          ) : null}
          <RegionLink
            city={data.city}
            district={data.district}
            className="mt-6 inline-flex h-12 items-center bg-ink px-5 text-sm font-semibold text-paper"
          >
            Bölgeyi incele
          </RegionLink>
        </div>
        <div className={pending ? "opacity-70" : undefined}>
          <p className="font-serif text-2xl">{place}</p>
          <div className="mt-3">
            <DemoNote>Gösterilen fiyat, kira ve amortisman resmi istatistik değildir.</DemoNote>
          </div>
          {data.metrics ? (
            <>
              <div className="mt-4">
                <MetricGrid metrics={data.metrics} />
              </div>
              <div className="mt-4 border border-line p-3">
                <p className="mb-2 text-xs uppercase tracking-wide text-muted">Örnek m² serisi</p>
                <Trend series={data.metrics.series} />
              </div>
            </>
          ) : (
            <p className="mt-4 text-muted">Bu seçim için örnek seri yok.</p>
          )}
        </div>
      </div>
    </section>
  );
}

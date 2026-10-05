import { Link } from "@tanstack/react-router";
import type { HomePayload } from "@/lib/types";
import { AdSlot, DemoNote, PlanPill, SectionHead, StoryCard } from "./bits";
import { Newsletter } from "./forms";
import { RadarPanel } from "./radar";
import { PageWrap } from "./shell";

export function HomePage({ data }: { data: HomePayload }) {
  const hero = data.hero;
  return (
    <>
      <div className="bg-ink text-paper">
        <div className="mx-auto flex max-w-6xl gap-4 overflow-x-auto px-4 py-2 text-sm sm:px-6">
          <span className="shrink-0 font-semibold uppercase tracking-widest text-accent-soft">Gündem</span>
          {data.today.slice(0, 4).map((item) => (
            <Link
              key={item.slug}
              to="/haber/$slug"
              params={{ slug: item.slug }}
              className="shrink-0 whitespace-nowrap text-paper/90"
            >
              {item.title}
            </Link>
          ))}
        </div>
      </div>
      <PageWrap>
        <DemoNote />
        <div className="mt-6">
          <AdSlot ads={data.ads} placement="homepage_top" />
        </div>
        {hero ? (
          <section className="mt-6 grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <p className="text-xs font-semibold uppercase tracking-widest text-accent">
                Konut piyasasında bugün
              </p>
              <div className="mt-3">
                <StoryCard article={hero} layout="feature" />
              </div>
            </div>
            <div className="space-y-6 lg:col-span-5">
              <h2 className="font-serif text-2xl">Günün diğer başlıkları</h2>
              {data.side.map((item) => (
                <StoryCard key={item.slug} article={item} layout="row" />
              ))}
            </div>
          </section>
        ) : null}

        <section className="mt-14">
          <SectionHead kicker="Bugün" title="Bugün gayrimenkulde" to="/gundem" />
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {data.today.map((item) => (
              <StoryCard key={item.slug} article={item} />
            ))}
          </div>
        </section>

        <section className="mt-14">
          <RadarPanel initial={data.radar} />
        </section>

        <div className="mt-8">
          <AdSlot ads={data.ads} placement="homepage_middle" />
        </div>

        <section className="mt-14">
          <SectionHead title="Türkiye'den gayrimenkul haberleri" to="/gundem" label="Gündem" />
          <div className="grid gap-8 md:grid-cols-2">
            {data.feed.map((item) => (
              <StoryCard key={item.slug} article={item} layout="row" />
            ))}
          </div>
        </section>

        {data.urban[0] ? (
          <section className="mt-14 grid gap-8 border-t border-line pt-10 lg:grid-cols-2">
            <div>
              <SectionHead kicker="Dosya" title="Kentsel dönüşüm" />
              <StoryCard article={data.urban[0]} layout="stack" />
            </div>
            <div className="grid content-start gap-8">
              <SectionHead kicker="Piyasa" title="Konut ve kira" />
              {data.housing.map((item) => (
                <StoryCard key={item.slug} article={item} layout="row" />
              ))}
            </div>
          </section>
        ) : null}

        <section className="mt-14 grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHead title="Gayrimenkul yatırım" />
            <div className="space-y-6">
              {data.invest.map((item) => (
                <StoryCard key={item.slug} article={item} layout="row" />
              ))}
            </div>
          </div>
          <div>
            <SectionHead title="Uzman analizleri" />
            <div className="space-y-6">
              {data.analysis.map((item) => (
                <StoryCard key={item.slug} article={item} layout="row" />
              ))}
            </div>
          </div>
        </section>

        <section className="mt-14">
          <SectionHead title="Şehirler" to="/konut-radar" label="Radar" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {data.cities.map((city) => (
              <Link
                key={city.slug}
                to="/bolge/$city"
                params={{ city: city.slug }}
                className="block border border-line bg-card p-4"
              >
                <h3 className="font-serif text-2xl">{city.name}</h3>
                <p className="mt-2 text-sm text-muted">{city.summary}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-14">
          <SectionHead title="Öne çıkan emlakçılar" to="/emlakcilar" label="Tümü" />
          <div className="grid gap-4 md:grid-cols-3">
            {data.brokers.map((broker) => (
              <Link
                key={broker.slug}
                to="/emlakci/$slug"
                params={{ slug: broker.slug }}
                className="block border border-line bg-card p-4"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="grid size-12 place-items-center bg-ink font-serif text-lg text-paper">
                    {broker.monogram}
                  </span>
                  <PlanPill plan={broker.plan} />
                </div>
                <h3 className="mt-4 font-serif text-2xl">{broker.companyName}</h3>
                <p className="mt-1 text-sm text-muted">
                  {broker.districtName ? `${broker.districtName}, ` : ""}
                  {broker.cityName}
                </p>
                <p className="mt-3 text-sm text-muted">{broker.description}</p>
              </Link>
            ))}
          </div>
        </section>
      </PageWrap>
      <Newsletter />
    </>
  );
}

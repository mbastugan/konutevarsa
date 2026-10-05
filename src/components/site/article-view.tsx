import { Link } from "@tanstack/react-router";
import { formatDate } from "@/lib/format";
import type { AdCreative, ArticleCard, ArticleDetail, BrokerCard } from "@/lib/types";
import { AdSlot, DemoNote, MetaLine, RegionLink, StoryCard } from "./bits";
import { LeadForm } from "./forms";
import { Markdown } from "./markdown";
import { Photo } from "./photo";
import { Crumbs, PageWrap } from "./shell";

export function ArticleView({
  article,
  related,
  broker,
  ads,
}: {
  article: ArticleDetail;
  related: ArticleCard[];
  broker: BrokerCard | null;
  ads: AdCreative[];
}) {
  const regionHref = article.neighborhoodSlug && article.districtSlug && article.citySlug
    ? `/bolge/${article.citySlug}/${article.districtSlug}/${article.neighborhoodSlug}`
    : article.districtSlug && article.citySlug
      ? `/bolge/${article.citySlug}/${article.districtSlug}`
      : article.citySlug
        ? `/bolge/${article.citySlug}`
        : null;
  const place = [article.districtName, article.cityName].filter(Boolean).join(", ");
  return (
    <PageWrap>
      <Crumbs
        items={[
          { label: "Ana sayfa", href: "/" },
          { label: article.categoryName, href: `/kategori/${article.categorySlug}` },
          { label: article.title },
        ]}
      />
      <article className="mx-auto max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-widest text-accent">{article.categoryName}</p>
        <h1 className="mt-3 font-serif text-4xl font-semibold leading-tight sm:text-5xl">{article.title}</h1>
        <p className="mt-4 text-xl text-muted">{article.summary}</p>
        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 border-y border-line py-3 text-sm text-muted">
          <span>{article.authorName}</span>
          <span>Yayın {formatDate(article.publishedAt)}</span>
          <span>Güncelleme {formatDate(article.updatedAt)}</span>
          <MetaLine article={article} />
        </div>
        {article.isDemo ? (
          <div className="mt-4">
            <DemoNote />
          </div>
        ) : null}
        <div className="mt-6">
          <Photo src={article.image} alt={article.imageAlt || article.title} priority ratio="aspect-[16/10]" />
        </div>
        {article.keyFigures.length > 0 ? (
          <dl className="mt-6 grid grid-cols-2 gap-px bg-line sm:grid-cols-3">
            {article.keyFigures.map((figure) => (
              <div key={figure.label} className="bg-card px-3 py-3">
                <dt className="text-xs uppercase tracking-wide text-muted">{figure.label}</dt>
                <dd className="mt-1 font-serif text-lg">{figure.value}</dd>
              </div>
            ))}
          </dl>
        ) : null}
        <div className="mt-8">
          <Markdown source={article.content} />
        </div>
        <div className="my-8">
          <AdSlot ads={ads} placement="article_inline" />
        </div>
        {article.takeaway ? (
          <aside className="border border-line bg-accent-soft p-5">
            <h2 className="font-serif text-2xl">Bu ne anlama geliyor?</h2>
            <p className="mt-2 text-ink">{article.takeaway}</p>
          </aside>
        ) : null}
        <section className="mt-8">
          <h2 className="font-serif text-2xl">Kaynaklar</h2>
          <p className="mt-1 text-sm text-muted">
            Kurum ana sayfaları örnek atıf iskeletidir. Belirli bir bültenin kopyası değildir.
          </p>
          <ul className="mt-3 divide-y divide-line border-y border-line">
            {article.sources.map((source) => (
              <li key={source.url + source.name} className="flex flex-col gap-1 py-3 sm:flex-row sm:items-center sm:justify-between">
                <a href={source.url} className="font-semibold" rel="noreferrer">
                  {source.name}
                </a>
                <span className="text-sm text-muted">
                  {source.sourceType} · güven {source.trustScore} · {formatDate(source.retrievedAt)}
                </span>
              </li>
            ))}
          </ul>
        </section>
        <p className="mt-6 text-sm text-muted">{article.authorBio}</p>
      </article>

      <div className="mx-auto mt-10 grid max-w-3xl gap-4">
        {regionHref && article.citySlug ? (
          <RegionLink
            city={article.citySlug}
            district={article.districtSlug}
            neighborhood={article.neighborhoodSlug}
            className="block border border-line bg-card p-4"
          >
            <p className="text-xs uppercase tracking-widest text-accent">İlgili bölge</p>
            <p className="mt-1 font-serif text-2xl">{place || "Bölge sayfası"}</p>
          </RegionLink>
        ) : null}
        {broker ? (
          <Link to="/emlakci/$slug" params={{ slug: broker.slug }} className="block border border-line bg-card p-4">
            <p className="text-xs uppercase tracking-widest text-accent">İlgili emlakçı</p>
            <p className="mt-1 font-serif text-2xl">{broker.companyName}</p>
            <p className="text-sm text-muted">Örnek profil · {broker.cityName}</p>
          </Link>
        ) : null}
      </div>

      <div className="mx-auto mt-8 max-w-3xl">
        <LeadForm
          sourcePage={`/haber/${article.slug}`}
          defaultCity={article.cityName || ""}
          defaultDistrict={article.districtName || ""}
          defaultType={article.categorySlug === "kira" ? "RENT" : "BUY"}
          assignedBroker={broker?.slug}
          heading={article.categorySlug === "yatirim" ? "Gayrimenkulünüzü satmayı mı düşünüyorsunuz?" : "Bu bölgede ev mi arıyorsunuz?"}
          sub="Talebiniz şimdilik yayın masasında durur. Otomatik dağıtım bu fazda kapalıdır."
        />
      </div>

      {related.length > 0 ? (
        <section className="mt-14">
          <h2 className="mb-6 font-serif text-3xl">İlgili haberler</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {related.map((item) => (
              <StoryCard key={item.slug} article={item} />
            ))}
          </div>
        </section>
      ) : null}
    </PageWrap>
  );
}

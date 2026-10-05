import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { formatDate, formatNum, formatPct, formatTry, planLabel } from "@/lib/format";
import type { AdCreative, ArticleCard, Metric } from "@/lib/types";
import { Photo } from "./photo";

export function DemoNote({ children }: { children?: string }) {
  return (
    <p className="text-sm text-muted">
      {children ??
        "Örnek içerik ve örnek veri. Resmi istatistik, ilan veya yatırım tavsiyesi değildir."}
    </p>
  );
}

export function Kicker({ children }: { children: string }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-widest text-accent">{children}</p>
  );
}

export function AdSlot({ ads, placement }: { ads: AdCreative[]; placement: string }) {
  const ad = ads.find((item) => item.placement === placement && item.active);
  if (!ad) return null;
  return (
    <aside className="border border-line bg-card px-4 py-3 sm:px-5">
      <p className="text-xs font-semibold uppercase tracking-widest text-muted">Sponsorlu örnek</p>
      <p className="mt-1 font-serif text-xl text-ink">{ad.title}</p>
      {ad.body ? <p className="mt-1 text-sm text-muted">{ad.body}</p> : null}
      {ad.href ? (
        <a href={ad.href} className="mt-2 inline-flex min-h-11 items-center text-sm font-semibold text-accent">
          {ad.sponsorName}
        </a>
      ) : null}
    </aside>
  );
}

export function MetaLine({ article }: { article: ArticleCard }) {
  return (
    <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted">
      <span>{formatDate(article.publishedAt)}</span>
      <span>{article.readingMinutes} dk</span>
      <span>{article.sourceCount} kaynak</span>
      {article.isDemo ? <span className="text-accent">Örnek</span> : null}
    </p>
  );
}

export function StoryCard({
  article,
  layout = "stack",
}: {
  article: ArticleCard;
  layout?: "stack" | "row" | "feature";
}) {
  const body = (
    <>
      <p className="text-xs font-semibold uppercase tracking-widest text-accent">
        {article.categoryName}
      </p>
      <h3
        className={
          layout === "feature"
            ? "mt-2 font-serif text-3xl font-semibold leading-tight sm:text-4xl"
            : "mt-2 font-serif text-xl font-semibold leading-snug"
        }
      >
        {article.title}
      </h3>
      {layout !== "row" ? <p className="mt-2 text-muted">{article.summary}</p> : null}
      <div className="mt-3">
        <MetaLine article={article} />
      </div>
    </>
  );
  return (
    <article className="group">
      <Link to="/haber/$slug" params={{ slug: article.slug }} className="block">
        {layout === "row" ? (
          <div className="grid grid-cols-[7.5rem_1fr] gap-3 sm:grid-cols-[9rem_1fr]">
            <Photo src={article.image} alt={article.imageAlt || article.title} ratio="aspect-[4/3]" />
            <div>{body}</div>
          </div>
        ) : (
          <div>
            <Photo
              src={article.image}
              alt={article.imageAlt || article.title}
              priority={layout === "feature"}
              ratio={layout === "feature" ? "aspect-[16/10]" : "aspect-[3/2]"}
            />
            <div className="pt-4">{body}</div>
          </div>
        )}
      </Link>
    </article>
  );
}

export function MetricGrid({ metrics }: { metrics: Metric }) {
  const cells = [
    ["Örnek m² satış", formatTry(metrics.avgSqmPrice)],
    ["Aylık değişim", formatPct(metrics.monthlyChange)],
    ["Yıllık değişim", formatPct(metrics.yearlyChange)],
    ["Örnek satış adedi", formatNum(metrics.salesCount)],
    ["Örnek kira", formatTry(metrics.rentMonthly)],
    ["Kira trendi", formatPct(metrics.rentTrend)],
    ["Amortisman tahmini", `${metrics.amortizationYears.toFixed(1).replace(".", ",")} yıl`],
  ];
  return (
    <dl className="grid grid-cols-2 gap-px bg-line sm:grid-cols-3">
      {cells.map(([label, value]) => (
        <div key={label} className="bg-card px-3 py-3">
          <dt className="text-xs uppercase tracking-wide text-muted">{label}</dt>
          <dd className="mt-1 font-serif text-xl tabular-nums text-ink">{value}</dd>
        </div>
      ))}
    </dl>
  );
}

export function SectionHead({
  kicker,
  title,
  to,
  label = "Tümü",
}: {
  kicker?: string;
  title: string;
  to?: "/gundem" | "/konut-radar" | "/emlakcilar";
  label?: string;
}) {
  return (
    <div className="mb-6 flex items-end justify-between gap-4 border-b border-line pb-3">
      <div>
        {kicker ? <Kicker>{kicker}</Kicker> : null}
        <h2 className="mt-1 font-serif text-3xl font-semibold">{title}</h2>
      </div>
      {to ? (
        <Link to={to} className="shrink-0 text-sm font-semibold text-accent">
          {label}
        </Link>
      ) : null}
    </div>
  );
}

export function PlanPill({ plan }: { plan: string }) {
  return (
    <span className="border border-line px-2 py-1 text-xs font-semibold uppercase tracking-wide text-ink">
      {planLabel(plan)}
    </span>
  );
}

export function RegionLink({
  city,
  district,
  neighborhood,
  className,
  children,
}: {
  city: string;
  district?: string | null;
  neighborhood?: string | null;
  className?: string;
  children: ReactNode;
}) {
  if (neighborhood && district) {
    return (
      <Link
        to="/bolge/$city/$district/$neighborhood"
        params={{ city, district, neighborhood }}
        className={className}
      >
        {children}
      </Link>
    );
  }
  if (district) {
    return (
      <Link to="/bolge/$city/$district" params={{ city, district }} className={className}>
        {children}
      </Link>
    );
  }
  return (
    <Link to="/bolge/$city" params={{ city }} className={className}>
      {children}
    </Link>
  );
}

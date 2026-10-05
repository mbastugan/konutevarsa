import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getSql, type Sql } from "@/lib/db";
import { foldTr } from "@/lib/format";
import { requestOrigin } from "@/lib/site";
import type {
  AdCreative,
  ArticleCard,
  ArticleDetail,
  BrokerCard,
  CategoryInfo,
  Figure,
  HomePayload,
  Metric,
  PlaceRef,
  PlanInfo,
  ProjectCard,
  RadarPayload,
  RegionNode,
  SeriesPoint,
} from "@/lib/types";

const slugSchema = z.string().regex(/^[a-z0-9-]{1,80}$/);

export type SearchRegion = {
  slug: string;
  name: string;
  kind: string;
  city_slug: string;
  district_slug: string | null;
};

const CARD = `
  a.id, a.title, a.slug, a.summary,
  c.name as category_name, c.slug as category_slug,
  a.published_at::text as published_at,
  a.updated_at::text as updated_at,
  a.featured_image, a.image_alt, a.reading_minutes,
  a.importance_score, a.confidence_score, a.is_demo,
  a.city_slug, a.district_slug, a.content_type, a.status,
  a.editorial_status,
  (select count(*)::int from article_sources s where s.article_id = a.id) as source_count
`;

const FROM_CARD = `
  from articles a
  join categories c on c.id = a.category_id
`;

const PUBLIC = `a.status = 'published' and (a.published_at is null or a.published_at <= now())`;

type CardRow = {
  id: string;
  title: string;
  slug: string;
  summary: string;
  category_name: string;
  category_slug: string;
  published_at: string | null;
  updated_at: string | null;
  featured_image: string | null;
  image_alt: string | null;
  reading_minutes: number;
  importance_score: number;
  confidence_score: number;
  is_demo: boolean;
  city_slug: string | null;
  district_slug: string | null;
  content_type: string;
  status: string;
  editorial_status: string;
  source_count: number;
};

function card(row: CardRow): ArticleCard {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    summary: row.summary,
    categoryName: row.category_name,
    categorySlug: row.category_slug,
    publishedAt: row.published_at ? String(row.published_at) : null,
    updatedAt: row.updated_at ? String(row.updated_at) : null,
    image: row.featured_image,
    imageAlt: row.image_alt,
    readingMinutes: Number(row.reading_minutes),
    importance: Number(row.importance_score),
    confidence: Number(row.confidence_score),
    isDemo: Boolean(row.is_demo),
    citySlug: row.city_slug,
    districtSlug: row.district_slug,
    contentType: row.content_type,
    sourceCount: Number(row.source_count),
    status: row.status,
    editorialStatus: row.editorial_status,
  };
}

function asSeries(value: unknown): SeriesPoint[] {
  const raw = typeof value === "string" ? JSON.parse(value) : value;
  if (!Array.isArray(raw)) return [];
  return raw.map((point) => {
    const row = point as Record<string, unknown>;
    return {
      m: String(row.m ?? ""),
      price: Number(row.price ?? 0),
      rent: Number(row.rent ?? 0),
      sales: Number(row.sales ?? 0),
    };
  });
}

function asFigures(value: unknown): Figure[] {
  const raw = typeof value === "string" ? JSON.parse(value) : value;
  if (!Array.isArray(raw)) return [];
  return raw.map((item) => {
    const row = item as Record<string, unknown>;
    return { label: String(row.label ?? ""), value: String(row.value ?? "") };
  });
}

type MetricRow = {
  region_id: string;
  avg_sqm_price: number;
  monthly_change: number;
  yearly_change: number;
  sales_count: number;
  rent_monthly: number;
  rent_trend: number;
  amortization_years: number;
  series: unknown;
  as_of: string;
  is_demo: boolean;
};

function metric(row: MetricRow): Metric {
  return {
    regionId: row.region_id,
    avgSqmPrice: Number(row.avg_sqm_price),
    monthlyChange: Number(row.monthly_change),
    yearlyChange: Number(row.yearly_change),
    salesCount: Number(row.sales_count),
    rentMonthly: Number(row.rent_monthly),
    rentTrend: Number(row.rent_trend),
    amortizationYears: Number(row.amortization_years),
    series: asSeries(row.series),
    asOf: String(row.as_of),
    isDemo: Boolean(row.is_demo),
  };
}

type BrokerRow = {
  id: string;
  company_name: string;
  slug: string;
  monogram: string;
  description: string;
  city_slug: string;
  city_name: string;
  district_slug: string | null;
  district_name: string | null;
  neighborhoods: string[] | null;
  phone: string | null;
  email: string | null;
  website: string | null;
  instagram: string | null;
  verified: boolean;
  premium: boolean;
  featured: boolean;
  subscription_plan: string;
  is_demo: boolean;
};

const BROKER_SQL = `
  select b.id, b.company_name, b.slug, b.monogram, b.description,
    b.city_slug, c.name as city_name, b.district_slug, d.name as district_name,
    b.neighborhoods, b.phone, b.email, b.website, b.instagram,
    b.verified, b.premium, b.featured, b.subscription_plan, b.is_demo
  from brokers b
  join regions c on c.id = b.city_slug
  left join regions d on d.id = b.city_slug || '-' || b.district_slug
`;

function broker(row: BrokerRow): BrokerCard {
  return {
    id: row.id,
    companyName: row.company_name,
    slug: row.slug,
    monogram: row.monogram,
    description: row.description,
    citySlug: row.city_slug,
    cityName: row.city_name,
    districtSlug: row.district_slug,
    districtName: row.district_name,
    neighborhoods: row.neighborhoods ?? [],
    phone: row.phone,
    email: row.email,
    website: row.website,
    instagram: row.instagram,
    verified: Boolean(row.verified),
    premium: Boolean(row.premium),
    featured: Boolean(row.featured),
    plan: row.subscription_plan,
    isDemo: Boolean(row.is_demo),
  };
}

type AdRow = {
  id: string;
  placement: string;
  title: string;
  body: string | null;
  href: string | null;
  sponsor_name: string;
  active: boolean;
  is_demo: boolean;
};

function ad(row: AdRow): AdCreative {
  return {
    id: row.id,
    placement: row.placement,
    title: row.title,
    body: row.body,
    href: row.href,
    sponsorName: row.sponsor_name,
    active: Boolean(row.active),
    isDemo: Boolean(row.is_demo),
  };
}

async function loadAds(sql: Sql, placements: string[]) {
  if (placements.length === 0) return [];
  const rows = await sql.query<AdRow>(
    `select id, placement, title, body, href, sponsor_name, active, is_demo
     from ad_slots
     where active = true and placement = any($1::text[])
       and (starts_at is null or starts_at <= now())
       and (ends_at is null or ends_at >= now())`,
    [placements],
  );
  return rows.map(ad);
}

async function loadCards(sql: Sql, where: string, params: unknown[], order: string, limit: number) {
  const rows = await sql.query<CardRow>(
    `select ${CARD} ${FROM_CARD} where ${where} order by ${order} limit ${limit}`,
    params,
  );
  return rows.map(card);
}

const METRIC_SQL = `
  select region_id, avg_sqm_price,
    monthly_change::float8 as monthly_change,
    yearly_change::float8 as yearly_change,
    sales_count, rent_monthly,
    rent_trend::float8 as rent_trend,
    amortization_years::float8 as amortization_years,
    series, as_of::text as as_of, is_demo
  from region_metrics where region_id = $1
`;

export async function loadRadar(sql: Sql, city: string, district?: string | null): Promise<RadarPayload> {
  const cities = await sql<{ slug: string; name: string }>`
    select slug, name from regions where kind = 'city' order by name
  `;
  const cityOk = cities.some((item) => item.slug === city) ? city : (cities[0]?.slug ?? "istanbul");
  const cityRow = cities.find((item) => item.slug === cityOk);
  const districts = await sql<{ slug: string; name: string }>`
    select slug, name from regions
    where kind = 'district' and city_slug = ${cityOk}
    order by name
  `;
  const districtOk = district && districts.some((item) => item.slug === district) ? district : null;
  const regionId = districtOk ? `${cityOk}-${districtOk}` : cityOk;
  const metrics = await sql.query<MetricRow>(METRIC_SQL, [regionId]);
  const neighborhoods = districtOk
    ? await sql<{ slug: string; name: string }>`
        select slug, name from regions
        where kind = 'neighborhood' and city_slug = ${cityOk} and district_slug = ${districtOk}
        order by name
      `
    : [];
  return {
    city: cityOk,
    district: districtOk,
    cityName: cityRow?.name ?? cityOk,
    districtName: districts.find((item) => item.slug === districtOk)?.name ?? null,
    cities,
    districts,
    neighborhoods,
    metrics: metrics[0] ? metric(metrics[0]) : null,
  };
}

export const getHome = createServerFn({ method: "GET" }).handler(async (): Promise<HomePayload> => {
  const sql = await getSql();
  const origin = await requestOrigin();
  const ranked = await loadCards(sql, PUBLIC, [], "a.importance_score desc, a.published_at desc", 20);
  const hero = ranked[0] ?? null;
  const sidePool = ranked.filter((item) => item.slug !== hero?.slug);
  const side = [
    sidePool.find((item) => item.categorySlug === "analiz"),
    sidePool.find((item) => item.categorySlug === "yeni-projeler"),
    sidePool.find((item) => item.categorySlug === "toki"),
  ].filter((item): item is ArticleCard => Boolean(item));
  const sideSlugs = new Set(side.map((item) => item.slug));
  if (side.length < 3) {
    for (const item of sidePool) {
      if (side.length >= 3) break;
      if (!sideSlugs.has(item.slug)) {
        side.push(item);
        sideSlugs.add(item.slug);
      }
    }
  }
  const used = new Set([hero?.slug, ...side.map((item) => item.slug)].filter(Boolean) as string[]);
  const byDate = [...ranked].sort((a, b) => String(b.publishedAt).localeCompare(String(a.publishedAt)));
  const today = byDate.filter((item) => !used.has(item.slug)).slice(0, 6);
  const pick = (slug: string, n: number) => ranked.filter((item) => item.categorySlug === slug).slice(0, n);
  const housing = [...pick("konut", 1), ...pick("kira", 2)].slice(0, 3);
  const invest = [...pick("yatirim", 2), ...pick("mortgage", 1)].slice(0, 3);
  const analysis = [...pick("analiz", 1), ...pick("proptech", 1), ...pick("gayrimenkul", 1)].slice(0, 3);
  const urban = pick("kentsel-donusum", 2);
  const feedUsed = new Set([...housing, ...invest, ...analysis, ...urban, ...today].map((item) => item.slug));
  const feed = ranked.filter((item) => item.slug !== hero?.slug && !feedUsed.has(item.slug)).slice(0, 4);
  const cities = await sql<{ slug: string; name: string; summary: string }>`
    select slug, name, summary from regions where kind = 'city' order by name
  `;
  const brokers = (
    await sql.query<BrokerRow>(
      `${BROKER_SQL} where b.featured = true order by b.premium desc, b.company_name limit 3`,
    )
  ).map(broker);
  const radar = await loadRadar(sql, "istanbul", "cekmekoy");
  const ads = await loadAds(sql, ["homepage_top", "homepage_middle"]);
  return {
    origin,
    hero,
    side,
    today,
    feed: feed.length ? feed : ranked.slice(4, 8),
    urban,
    housing,
    invest,
    analysis,
    cities,
    brokers,
    radar,
    ads,
  };
});

const radarInput = z.object({
  city: slugSchema,
  district: slugSchema.optional(),
});

export const getRadar = createServerFn({ method: "GET" })
  .validator((input: unknown) => radarInput.parse(input))
  .handler(async ({ data }) => {
    const sql = await getSql();
    return loadRadar(sql, data.city, data.district);
  });

export const getArticle = createServerFn({ method: "GET" })
  .validator((slug: unknown) => slugSchema.parse(slug))
  .handler(async ({ data: slug }) => {
    const sql = await getSql();
    const origin = await requestOrigin();
    const rows = await sql.query<
      CardRow & {
        content: string;
        tags: string[] | null;
        author_name: string;
        author_slug: string;
        author_bio: string;
        seo_title: string | null;
        seo_description: string | null;
        canonical_path: string | null;
        neighborhood_slug: string | null;
        takeaway: string | null;
        key_figures: unknown;
        city_name: string | null;
        district_name: string | null;
      }
    >(
      `select ${CARD}, a.content, a.tags, au.name as author_name, au.slug as author_slug,
        au.bio as author_bio, a.seo_title, a.seo_description, a.canonical_path,
        a.neighborhood_slug, a.takeaway, a.key_figures,
        rc.name as city_name, rd.name as district_name
       ${FROM_CARD}
       join authors au on au.id = a.author_id
       left join regions rc on rc.id = a.city_slug
       left join regions rd on rd.id = a.city_slug || '-' || a.district_slug
       where a.slug = $1 and ${PUBLIC}`,
      [slug],
    );
    const row = rows[0];
    if (!row) return null;
    const sources = await sql.query<{
      name: string;
      source_url: string;
      source_type: string;
      retrieved_at: string;
      trust_score: number;
    }>(
      `select s.name, l.source_url, s.source_type, l.retrieved_at::text as retrieved_at, s.trust_score
       from article_sources l join sources s on s.id = l.source_id
       where l.article_id = $1 order by s.trust_score desc`,
      [row.id],
    );
    const related = await loadCards(
      sql,
      `${PUBLIC} and a.slug <> $1 and (a.category_id = $2 or a.city_slug = $3)`,
      [slug, row.category_slug, row.city_slug],
      "a.published_at desc",
      3,
    );
    const brokers = row.city_slug
      ? (
          await sql.query<BrokerRow>(
            `${BROKER_SQL} where b.city_slug = $1 and ($2::text is null or b.district_slug = $2)
             order by b.featured desc, b.premium desc limit 1`,
            [row.city_slug, row.district_slug],
          )
        ).map(broker)
      : [];
    const detail: ArticleDetail = {
      ...card(row),
      content: row.content,
      tags: row.tags ?? [],
      authorName: row.author_name,
      authorSlug: row.author_slug,
      authorBio: row.author_bio,
      seoTitle: row.seo_title || row.title,
      seoDescription: row.seo_description || row.summary,
      canonicalPath: row.canonical_path || `/haber/${row.slug}`,
      neighborhoodSlug: row.neighborhood_slug,
      takeaway: row.takeaway,
      keyFigures: asFigures(row.key_figures),
      sources: sources.map((item) => ({
        name: item.name,
        url: item.source_url,
        sourceType: item.source_type,
        retrievedAt: String(item.retrieved_at),
        trustScore: Number(item.trust_score),
      })),
      cityName: row.city_name,
      districtName: row.district_name,
    };
    const ads = await loadAds(sql, ["article_inline", "article_sidebar"]);
    return { origin, article: detail, related, broker: brokers[0] ?? null, ads };
  });

export const getCategoryPage = createServerFn({ method: "GET" })
  .validator((slug: unknown) => slugSchema.parse(slug))
  .handler(async ({ data: slug }) => {
    const sql = await getSql();
    const origin = await requestOrigin();
    const cats = await sql<{ id: string; name: string; slug: string; description: string }>`
      select id, name, slug, description from categories where slug = ${slug}
    `;
    const category = cats[0];
    if (!category) return null;
    const articles = await loadCards(sql, `${PUBLIC} and c.slug = $1`, [slug], "a.published_at desc", 24);
    const info: CategoryInfo = category;
    const ads = await loadAds(sql, ["category_top"]);
    return { origin, category: info, articles, ads };
  });

export const getGundem = createServerFn({ method: "GET" }).handler(async () => {
  const sql = await getSql();
  const origin = await requestOrigin();
  const articles = await loadCards(sql, PUBLIC, [], "a.importance_score desc, a.published_at desc", 24);
  return { origin, articles };
});

const regionInput = z.object({
  city: slugSchema,
  district: slugSchema.optional(),
  neighborhood: slugSchema.optional(),
});

export const getRegion = createServerFn({ method: "GET" })
  .validator((input: unknown) => regionInput.parse(input))
  .handler(async ({ data }) => {
    const sql = await getSql();
    const origin = await requestOrigin();
    const district = data.district ?? null;
    const neighborhood = data.neighborhood ?? null;
    const kind = neighborhood ? "neighborhood" : district ? "district" : "city";
    const rows = await sql.query<{
      id: string;
      slug: string;
      name: string;
      kind: string;
      city_slug: string;
      district_slug: string | null;
      neighborhood_slug: string | null;
      summary: string;
      guide: string;
    }>(
      `select id, slug, name, kind, city_slug, district_slug, neighborhood_slug, summary, guide
       from regions
       where city_slug = $1
         and district_slug is not distinct from $2
         and neighborhood_slug is not distinct from $3
         and kind = $4`,
      [data.city, district, neighborhood, kind],
    );
    const found = rows[0];
    if (!found) return null;
    const region: RegionNode = {
      id: found.id,
      slug: found.slug,
      name: found.name,
      kind: found.kind,
      citySlug: found.city_slug,
      districtSlug: found.district_slug,
      neighborhoodSlug: found.neighborhood_slug,
      summary: found.summary,
      guide: found.guide,
    };
    const children = await sql.query<PlaceRef>(
      `select slug, name from regions where parent_id = $1 order by name`,
      [region.id],
    );
    const metrics = await sql.query<MetricRow>(METRIC_SQL, [region.id]);
    const articles = await loadCards(
      sql,
      `${PUBLIC} and a.city_slug = $1 and ($2::text is null or a.district_slug = $2)`,
      [data.city, district],
      "a.published_at desc",
      6,
    );
    const brokers = (
      await sql.query<BrokerRow>(
        `${BROKER_SQL} where b.city_slug = $1 and ($2::text is null or b.district_slug = $2)
         order by b.featured desc, b.company_name`,
        [data.city, district],
      )
    ).map(broker);
    const projectRows = await sql.query<{
      id: string;
      name: string;
      slug: string;
      developer: string;
      city_slug: string;
      district_slug: string | null;
      status: string;
      summary: string;
      unit_count: number | null;
      is_demo: boolean;
    }>(
      `select id, name, slug, developer, city_slug, district_slug, status, summary, unit_count, is_demo
       from projects
       where city_slug = $1 and ($2::text is null or district_slug = $2)
       order by name`,
      [data.city, district],
    );
    const projects: ProjectCard[] = projectRows.map((item) => ({
      id: item.id,
      name: item.name,
      slug: item.slug,
      developer: item.developer,
      citySlug: item.city_slug,
      districtSlug: item.district_slug,
      status: item.status,
      summary: item.summary,
      unitCount: item.unit_count == null ? null : Number(item.unit_count),
      isDemo: Boolean(item.is_demo),
    }));
    const parentBits: PlaceRef[] = [];
    if (kind !== "city") {
      const city = await sql<{ slug: string; name: string }>`
        select slug, name from regions where id = ${data.city}
      `;
      if (city[0]) parentBits.push(city[0]);
    }
    if (neighborhood && district) {
      const parentDistrict = await sql<{ slug: string; name: string }>`
        select slug, name from regions where id = ${`${data.city}-${district}`}
      `;
      if (parentDistrict[0]) parentBits.push(parentDistrict[0]);
    }
    const ads = await loadAds(sql, ["region_top", "region_sidebar"]);
    return {
      origin,
      region,
      children,
      parents: parentBits,
      metrics: metrics[0] ? metric(metrics[0]) : null,
      articles,
      brokers,
      projects,
      ads,
    };
  });

export const getBroker = createServerFn({ method: "GET" })
  .validator((slug: unknown) => slugSchema.parse(slug))
  .handler(async ({ data: slug }) => {
    const sql = await getSql();
    const origin = await requestOrigin();
    const rows = await sql.query<BrokerRow>(`${BROKER_SQL} where b.slug = $1`, [slug]);
    const row = rows[0];
    if (!row) return null;
    const articles = await loadCards(
      sql,
      `${PUBLIC} and a.city_slug = $1 and ($2::text is null or a.district_slug = $2)`,
      [row.city_slug, row.district_slug],
      "a.published_at desc",
      3,
    );
    return { origin, broker: broker(row), articles };
  });

export const listBrokers = createServerFn({ method: "GET" }).handler(async () => {
  const sql = await getSql();
  const origin = await requestOrigin();
  const rows = await sql.query<BrokerRow>(
    `${BROKER_SQL} order by b.featured desc, b.premium desc, b.company_name`,
  );
  const cities = await sql<PlaceRef>`
    select slug, name from regions where kind = 'city' order by name
  `;
  return { origin, brokers: rows.map(broker), cities };
});

export const getPlans = createServerFn({ method: "GET" }).handler(async () => {
  const sql = await getSql();
  const rows = await sql<{
    id: string;
    name: string;
    price_label: string;
    summary: string;
    features: string[];
  }>`
    select id, name, price_label, summary, features
    from subscription_plans order by sort_order
  `;
  const plans: PlanInfo[] = rows.map((row) => ({
    id: row.id,
    name: row.name,
    priceLabel: row.price_label,
    summary: row.summary,
    features: row.features ?? [],
  }));
  return plans;
});

const searchInput = z.string().trim().max(80);

export const searchCatalog = createServerFn({ method: "GET" })
  .validator((q: unknown) => searchInput.parse(q))
  .handler(async ({ data: q }) => {
    const origin = await requestOrigin();
    const folded = foldTr(q).replace(/[%_\\]/g, "").trim();
    const empty = {
      origin,
      q,
      articles: [] as ArticleCard[],
      regions: [] as SearchRegion[],
      brokers: [] as BrokerCard[],
      projects: [] as { slug: string; name: string; summary: string }[],
    };
    if (folded.length < 2) return empty;
    const like = `%${folded}%`;
    const sql = await getSql();
    let articles: ArticleCard[] = [];
    try {
      articles = await loadCards(
        sql,
        `${PUBLIC} and (a.search_text ilike $1 or to_tsvector('simple', a.title || ' ' || a.summary) @@ plainto_tsquery('simple', $2))`,
        [like, q],
        "a.importance_score desc",
        12,
      );
    } catch {
      articles = await loadCards(sql, `${PUBLIC} and a.search_text ilike $1`, [like], "a.importance_score desc", 12);
    }
    const regions = await sql.query<SearchRegion>(
      `select slug, name, kind, city_slug, district_slug from regions
       where search_text ilike $1 order by kind, name limit 8`,
      [like],
    );
    const brokers = (
      await sql.query<BrokerRow>(`${BROKER_SQL} where b.search_text ilike $1 order by b.company_name limit 6`, [like])
    ).map(broker);
    const projects = await sql.query<{ slug: string; name: string; summary: string }>(
      `select slug, name, summary from projects where search_text ilike $1 order by name limit 6`,
      [like],
    );
    return { origin, q, articles, regions, brokers, projects };
  });

const leadInput = z
  .object({
    leadType: z.enum(["BUY", "SELL", "RENT", "VALUATION", "CONTACT"]),
    name: z.string().trim().min(2).max(120),
    phone: z.union([z.literal(""), z.string().trim().min(7).max(30)]).optional(),
    email: z.union([z.literal(""), z.string().trim().email().max(160)]).optional(),
    city: z.string().trim().max(80).optional(),
    district: z.string().trim().max(80).optional(),
    neighborhood: z.string().trim().max(80).optional(),
    propertyType: z.string().trim().max(80).optional(),
    budgetMin: z.number().int().min(0).max(2_000_000_000).optional(),
    budgetMax: z.number().int().min(0).max(2_000_000_000).optional(),
    message: z.string().trim().max(2000).optional(),
    sourcePage: z.string().trim().max(200),
    assignedBroker: z.string().trim().max(80).optional(),
    kvkkConsent: z.literal(true),
    companyWebsite: z.string().max(200).optional(),
  })
  .refine((value) => Boolean(value.phone || value.email), {
    message: "Telefon veya e-posta gerekli",
  });

export const submitLead = createServerFn({ method: "POST" })
  .validator((input: unknown) => leadInput.parse(input))
  .handler(async ({ data }) => {
    if (data.companyWebsite) return { ok: true as const };
    const sql = await getSql();
    await sql`
      insert into leads (
        id, lead_type, name, phone, email, city, district, neighborhood,
        property_type, budget_min, budget_max, message, source_page,
        assigned_broker, status, kvkk_consent, consent_at
      ) values (
        ${crypto.randomUUID()},
        ${data.leadType},
        ${data.name},
        ${data.phone || null},
        ${data.email || null},
        ${data.city || null},
        ${data.district || null},
        ${data.neighborhood || null},
        ${data.propertyType || null},
        ${data.budgetMin ?? null},
        ${data.budgetMax ?? null},
        ${data.message || null},
        ${data.sourcePage},
        ${data.assignedBroker || null},
        'new',
        true,
        now()
      )
    `;
    return { ok: true as const };
  });

const newsletterInput = z.object({
  email: z.string().trim().email().max(160),
  kvkkConsent: z.literal(true),
  companyWebsite: z.string().max(200).optional(),
});

export const subscribeNewsletter = createServerFn({ method: "POST" })
  .validator((input: unknown) => newsletterInput.parse(input))
  .handler(async ({ data }) => {
    if (data.companyWebsite) return { ok: true as const };
    const sql = await getSql();
    const existing = await sql<{ id: string }>`
      select id from newsletter_subscribers where email = ${data.email.toLowerCase()}
    `;
    if (existing[0]) return { ok: false as const, error: "Bu adres zaten kayıtlı." };
    await sql`
      insert into newsletter_subscribers (id, email, kvkk_consent)
      values (${crypto.randomUUID()}, ${data.email.toLowerCase()}, true)
    `;
    return { ok: true as const };
  });

export type ArticleCard = {
  id: string;
  title: string;
  slug: string;
  summary: string;
  categoryName: string;
  categorySlug: string;
  publishedAt: string | null;
  updatedAt: string | null;
  image: string | null;
  imageAlt: string | null;
  readingMinutes: number;
  importance: number;
  confidence: number;
  isDemo: boolean;
  citySlug: string | null;
  districtSlug: string | null;
  contentType: string;
  sourceCount: number;
  status: string;
  editorialStatus: string;
};

export type Figure = { label: string; value: string };

export type ArticleSource = {
  name: string;
  url: string;
  sourceType: string;
  retrievedAt: string;
  trustScore: number;
};

export type ArticleDetail = ArticleCard & {
  content: string;
  tags: string[];
  authorName: string;
  authorSlug: string;
  authorBio: string;
  seoTitle: string;
  seoDescription: string;
  canonicalPath: string;
  neighborhoodSlug: string | null;
  takeaway: string | null;
  keyFigures: Figure[];
  sources: ArticleSource[];
  cityName: string | null;
  districtName: string | null;
};

export type SeriesPoint = { m: string; price: number; rent: number; sales: number };

export type Metric = {
  regionId: string;
  avgSqmPrice: number;
  monthlyChange: number;
  yearlyChange: number;
  salesCount: number;
  rentMonthly: number;
  rentTrend: number;
  amortizationYears: number;
  series: SeriesPoint[];
  asOf: string;
  isDemo: boolean;
};

export type PlaceRef = { slug: string; name: string };

export type RegionNode = {
  id: string;
  slug: string;
  name: string;
  kind: string;
  citySlug: string;
  districtSlug: string | null;
  neighborhoodSlug: string | null;
  summary: string;
  guide: string;
};

export type BrokerCard = {
  id: string;
  companyName: string;
  slug: string;
  monogram: string;
  description: string;
  citySlug: string;
  cityName: string;
  districtSlug: string | null;
  districtName: string | null;
  neighborhoods: string[];
  phone: string | null;
  email: string | null;
  website: string | null;
  instagram: string | null;
  verified: boolean;
  premium: boolean;
  featured: boolean;
  plan: string;
  isDemo: boolean;
};

export type ProjectCard = {
  id: string;
  name: string;
  slug: string;
  developer: string;
  citySlug: string;
  districtSlug: string | null;
  status: string;
  summary: string;
  unitCount: number | null;
  isDemo: boolean;
};

export type AdCreative = {
  id: string;
  placement: string;
  title: string;
  body: string | null;
  href: string | null;
  sponsorName: string;
  active: boolean;
  isDemo: boolean;
};

export type RadarPayload = {
  city: string;
  district: string | null;
  cityName: string;
  districtName: string | null;
  cities: PlaceRef[];
  districts: PlaceRef[];
  neighborhoods: PlaceRef[];
  metrics: Metric | null;
};

export type CategoryInfo = {
  id: string;
  name: string;
  slug: string;
  description: string;
};

export type PlanInfo = {
  id: string;
  name: string;
  priceLabel: string;
  summary: string;
  features: string[];
};

export type HomePayload = {
  origin: string;
  hero: ArticleCard | null;
  side: ArticleCard[];
  today: ArticleCard[];
  feed: ArticleCard[];
  urban: ArticleCard[];
  housing: ArticleCard[];
  invest: ArticleCard[];
  analysis: ArticleCard[];
  cities: { slug: string; name: string; summary: string }[];
  brokers: BrokerCard[];
  radar: RadarPayload;
  ads: AdCreative[];
};

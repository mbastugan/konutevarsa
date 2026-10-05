-- Konutevarsa domain schema. Editorial catalog is public-read.
-- Mutations go through staff-gated server functions (see src/lib/admin-api.ts).

create table if not exists authors (
  id text primary key,
  name text not null,
  slug text not null unique,
  bio text not null,
  avatar_url text,
  social jsonb not null default '{}'::jsonb,
  expertise text[] not null default '{}',
  active boolean not null default true
);

create table if not exists categories (
  id text primary key,
  name text not null,
  slug text not null unique,
  description text not null,
  nav_order int not null default 100
);

create table if not exists sources (
  id text primary key,
  name text not null,
  domain text not null,
  source_type text not null check (
    source_type in (
      'official',
      'public_institution',
      'company',
      'news',
      'blog',
      'research',
      'other'
    )
  ),
  trust_score int not null check (trust_score between 0 and 100),
  rss_url text,
  base_url text not null,
  is_active boolean not null default true,
  allow_auto_publish boolean not null default false,
  last_checked_at timestamptz
);

create table if not exists editorial_agents (
  id text primary key,
  name text not null,
  role text not null,
  status text not null check (status in ('idle', 'running', 'paused', 'error')),
  last_run_at timestamptz,
  items_processed int not null default 0,
  notes text not null default ''
);

create table if not exists regions (
  id text primary key,
  slug text not null,
  name text not null,
  kind text not null check (kind in ('city', 'district', 'neighborhood')),
  parent_id text references regions (id),
  city_slug text not null,
  district_slug text,
  neighborhood_slug text,
  summary text not null,
  guide text not null,
  search_text text not null default ''
);

create index if not exists regions_parent_idx on regions (parent_id);
create index if not exists regions_city_idx on regions (city_slug, kind);

create table if not exists region_metrics (
  region_id text primary key references regions (id) on delete cascade,
  avg_sqm_price int not null,
  monthly_change numeric not null,
  yearly_change numeric not null,
  sales_count int not null,
  rent_monthly int not null,
  rent_trend numeric not null,
  amortization_years numeric not null,
  series jsonb not null,
  as_of date not null,
  is_demo boolean not null default true
);

create table if not exists articles (
  id text primary key,
  title text not null,
  slug text not null unique,
  summary text not null,
  content text not null,
  category_id text not null references categories (id),
  tags text[] not null default '{}',
  featured_image text,
  image_alt text,
  author_id text not null references authors (id),
  status text not null check (
    status in ('draft', 'review', 'scheduled', 'published', 'rejected')
  ),
  published_at timestamptz,
  seo_title text,
  seo_description text,
  canonical_path text,
  original_source_url text,
  city_slug text,
  district_slug text,
  neighborhood_slug text,
  importance_score int not null default 50 check (importance_score between 0 and 100),
  confidence_score int not null default 50 check (confidence_score between 0 and 100),
  content_type text not null default 'news' check (
    content_type in ('news', 'analysis', 'guide')
  ),
  editorial_status text not null default 'discovered' check (
    editorial_status in (
      'discovered',
      'researching',
      'verified',
      'written',
      'review',
      'approved',
      'published'
    )
  ),
  agent_id text references editorial_agents (id),
  discovered_at timestamptz,
  takeaway text,
  key_figures jsonb not null default '[]'::jsonb,
  reading_minutes int not null default 3,
  is_demo boolean not null default true,
  search_text text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists articles_status_published_idx
  on articles (status, published_at desc);
create index if not exists articles_category_idx on articles (category_id, status);
create index if not exists articles_place_idx on articles (city_slug, district_slug);
create index if not exists articles_fts_idx on articles using gin (
  to_tsvector('simple', coalesce(title, '') || ' ' || coalesce(summary, ''))
);

create table if not exists article_sources (
  article_id text not null references articles (id) on delete cascade,
  source_id text not null references sources (id),
  source_url text not null,
  retrieved_at timestamptz not null,
  primary key (article_id, source_id)
);

create table if not exists brokers (
  id text primary key,
  company_name text not null,
  slug text not null unique,
  monogram text not null,
  description text not null,
  city_slug text not null,
  district_slug text,
  neighborhoods text[] not null default '{}',
  phone text,
  email text,
  website text,
  instagram text,
  verified boolean not null default false,
  premium boolean not null default false,
  featured boolean not null default false,
  subscription_plan text not null default 'free' check (
    subscription_plan in ('free', 'pro', 'premium', 'region_partner')
  ),
  is_demo boolean not null default true,
  search_text text not null default '',
  created_at timestamptz not null default now()
);

create index if not exists brokers_place_idx on brokers (city_slug, district_slug);
create index if not exists brokers_featured_idx on brokers (featured, premium);

create table if not exists projects (
  id text primary key,
  name text not null,
  slug text not null unique,
  developer text not null,
  city_slug text not null,
  district_slug text,
  status text not null check (status in ('planning', 'sales', 'construction')),
  summary text not null,
  unit_count int,
  is_demo boolean not null default true,
  search_text text not null default ''
);

create table if not exists subscription_plans (
  id text primary key,
  name text not null,
  price_label text not null,
  summary text not null,
  features text[] not null,
  sort_order int not null
);

create table if not exists leads (
  id text primary key,
  lead_type text not null check (
    lead_type in ('BUY', 'SELL', 'RENT', 'VALUATION', 'CONTACT')
  ),
  name text not null,
  phone text,
  email text,
  city text,
  district text,
  neighborhood text,
  property_type text,
  budget_min int,
  budget_max int,
  message text,
  source_page text,
  assigned_agent text,
  assigned_broker text,
  status text not null default 'new' check (
    status in ('new', 'reviewed', 'assigned', 'closed')
  ),
  kvkk_consent boolean not null default false,
  consent_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists leads_status_idx on leads (status, created_at desc);

create table if not exists ad_slots (
  id text primary key,
  placement text not null check (
    placement in (
      'homepage_top',
      'homepage_middle',
      'article_inline',
      'article_sidebar',
      'category_top',
      'region_top',
      'region_sidebar',
      'sponsored_story',
      'featured_project',
      'featured_broker'
    )
  ),
  title text not null,
  body text,
  href text,
  sponsor_name text not null,
  active boolean not null default false,
  starts_at timestamptz,
  ends_at timestamptz,
  is_demo boolean not null default true
);

create table if not exists newsletter_subscribers (
  id text primary key,
  email text not null unique,
  kvkk_consent boolean not null,
  created_at timestamptz not null default now()
);

create table if not exists staff (
  user_id text primary key,
  role text not null check (role in ('owner', 'editor')),
  created_at timestamptz not null default now()
);

create table if not exists settings (
  key text primary key,
  value jsonb not null
);

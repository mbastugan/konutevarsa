import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { authMiddleware } from "@/lib/auth/middleware";
import { getSql } from "@/lib/db";
import { foldTr } from "@/lib/format";

async function assertStaff(userId: string) {
  const sql = await getSql();
  const anyStaff = await sql<{ user_id: string }>`select user_id from staff limit 1`;
  if (anyStaff.length === 0) {
    await sql`
      insert into staff (user_id, role) values (${userId}, 'owner')
      on conflict (user_id) do nothing
    `;
    return "owner";
  }
  const mine = await sql<{ role: string }>`
    select role from staff where user_id = ${userId}
  `;
  if (!mine[0]) throw new Error("Forbidden");
  return mine[0].role;
}

const slugSchema = z.string().regex(/^[a-z0-9-]{1,80}$/);

export const getDashboard = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const role = await assertStaff(context.userId);
    const sql = await getSql();
    const counts = await sql<{
      today: number;
      drafts: number;
      review: number;
      published: number;
      rejected: number;
      scheduled: number;
      sources: number;
    }>`
      select
        (select count(*)::int from articles
          where status = 'published'
            and (published_at at time zone 'Europe/Istanbul')::date
              = (now() at time zone 'Europe/Istanbul')::date) as today,
        (select count(*)::int from articles where status = 'draft') as drafts,
        (select count(*)::int from articles where status = 'review') as review,
        (select count(*)::int from articles where status = 'published') as published,
        (select count(*)::int from articles where status = 'rejected') as rejected,
        (select count(*)::int from articles where status = 'scheduled') as scheduled,
        (select count(*)::int from sources where is_active = true) as sources
    `;
    const agents = await sql<{
      id: string;
      name: string;
      role: string;
      status: string;
      last_run_at: string | null;
      items_processed: number;
      notes: string;
    }>`
      select id, name, role, status, last_run_at::text as last_run_at, items_processed, notes
      from editorial_agents order by name
    `;
    return { role, counts: counts[0], agents };
  });

export const listAdminArticles = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    await assertStaff(context.userId);
    const sql = await getSql();
    return sql<{
      id: string;
      title: string;
      slug: string;
      status: string;
      editorial_status: string;
      importance_score: number;
      confidence_score: number;
      category_name: string;
      updated_at: string;
    }>`
      select a.id, a.title, a.slug, a.status, a.editorial_status,
        a.importance_score, a.confidence_score, c.name as category_name,
        a.updated_at::text as updated_at
      from articles a join categories c on c.id = a.category_id
      order by a.updated_at desc
    `;
  });

export const getEditorialQueue = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    await assertStaff(context.userId);
    const sql = await getSql();
    return sql<{
      id: string;
      title: string;
      slug: string;
      status: string;
      editorial_status: string;
      importance_score: number;
      confidence_score: number;
      category_name: string;
      source_name: string | null;
      agent_name: string | null;
      discovered_at: string | null;
    }>`
      select a.id, a.title, a.slug, a.status, a.editorial_status,
        a.importance_score, a.confidence_score, c.name as category_name,
        s.name as source_name, g.name as agent_name, a.discovered_at::text as discovered_at
      from articles a
      join categories c on c.id = a.category_id
      left join editorial_agents g on g.id = a.agent_id
      left join lateral (
        select so.name from article_sources l
        join sources so on so.id = l.source_id
        where l.article_id = a.id
        order by so.trust_score desc
        limit 1
      ) s on true
      where a.status <> 'published'
      order by a.importance_score desc, a.discovered_at desc nulls last
    `;
  });

const queueActionInput = z.object({
  id: z.string().min(1).max(80),
  action: z.enum(["approve", "reject", "publish"]),
});

export const actOnQueue = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: unknown) => queueActionInput.parse(input))
  .handler(async ({ context, data }) => {
    await assertStaff(context.userId);
    const sql = await getSql();
    if (data.action === "approve") {
      await sql`
        update articles set status = 'review', editorial_status = 'approved', updated_at = now()
        where id = ${data.id}
      `;
    } else if (data.action === "reject") {
      await sql`
        update articles set status = 'rejected', editorial_status = 'review', updated_at = now()
        where id = ${data.id}
      `;
    } else {
      await sql`
        update articles
        set status = 'published',
            editorial_status = 'published',
            published_at = coalesce(published_at, now()),
            updated_at = now()
        where id = ${data.id}
      `;
    }
    return { ok: true as const };
  });

export const getAdminArticle = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .validator((id: unknown) => z.string().min(1).max(80).parse(id))
  .handler(async ({ context, data: id }) => {
    await assertStaff(context.userId);
    const sql = await getSql();
    const rows = await sql<{
      id: string;
      title: string;
      slug: string;
      summary: string;
      content: string;
      takeaway: string | null;
      category_id: string;
      status: string;
      editorial_status: string;
      importance_score: number;
      confidence_score: number;
      seo_title: string | null;
      seo_description: string | null;
    }>`
      select id, title, slug, summary, content, takeaway, category_id, status,
        editorial_status, importance_score, confidence_score, seo_title, seo_description
      from articles where id = ${id}
    `;
    const categories = await sql<{ id: string; name: string }>`
      select id, name from categories order by nav_order, name
    `;
    return { article: rows[0] ?? null, categories };
  });

const articleInput = z.object({
  id: z.string().min(1).max(80),
  title: z.string().trim().min(8).max(180),
  summary: z.string().trim().min(20).max(400),
  content: z.string().trim().min(40).max(20000),
  takeaway: z.string().trim().max(800).optional().or(z.literal("")),
  categoryId: slugSchema,
  status: z.enum(["draft", "review", "scheduled", "published", "rejected"]),
  editorialStatus: z.enum([
    "discovered",
    "researching",
    "verified",
    "written",
    "review",
    "approved",
    "published",
  ]),
  importance: z.number().int().min(0).max(100),
  confidence: z.number().int().min(0).max(100),
  seoTitle: z.string().trim().max(180).optional().or(z.literal("")),
  seoDescription: z.string().trim().max(300).optional().or(z.literal("")),
});

export const saveArticle = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: unknown) => articleInput.parse(input))
  .handler(async ({ context, data }) => {
    await assertStaff(context.userId);
    const sql = await getSql();
    const search = foldTr(`${data.title} ${data.summary}`);
    await sql`
      update articles set
        title = ${data.title},
        summary = ${data.summary},
        content = ${data.content},
        takeaway = ${data.takeaway || null},
        category_id = ${data.categoryId},
        status = ${data.status},
        editorial_status = ${data.editorialStatus},
        importance_score = ${data.importance},
        confidence_score = ${data.confidence},
        seo_title = ${data.seoTitle || null},
        seo_description = ${data.seoDescription || null},
        search_text = ${search},
        published_at = case
          when ${data.status} = 'published' then coalesce(published_at, now())
          else published_at
        end,
        updated_at = now()
      where id = ${data.id}
    `;
    return { ok: true as const };
  });

export const listSources = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    await assertStaff(context.userId);
    const sql = await getSql();
    return sql<{
      id: string;
      name: string;
      domain: string;
      source_type: string;
      trust_score: number;
      is_active: boolean;
      allow_auto_publish: boolean;
      last_checked_at: string | null;
      base_url: string;
    }>`
      select id, name, domain, source_type, trust_score, is_active, allow_auto_publish,
        last_checked_at::text as last_checked_at, base_url
      from sources order by trust_score desc, name
    `;
  });

export const toggleSource = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: unknown) =>
    z.object({ id: z.string().min(1).max(80), active: z.boolean() }).parse(input),
  )
  .handler(async ({ context, data }) => {
    await assertStaff(context.userId);
    const sql = await getSql();
    await sql`update sources set is_active = ${data.active} where id = ${data.id}`;
    return { ok: true as const };
  });

export const listAdminRegions = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    await assertStaff(context.userId);
    const sql = await getSql();
    return sql<{
      id: string;
      name: string;
      kind: string;
      city_slug: string;
      avg_sqm_price: number | null;
      is_demo: boolean | null;
    }>`
      select r.id, r.name, r.kind, r.city_slug, m.avg_sqm_price, m.is_demo
      from regions r
      left join region_metrics m on m.region_id = r.id
      order by r.city_slug, r.kind, r.name
    `;
  });

export const listAgents = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    await assertStaff(context.userId);
    const sql = await getSql();
    return sql<{
      id: string;
      name: string;
      role: string;
      status: string;
      last_run_at: string | null;
      items_processed: number;
      notes: string;
    }>`
      select id, name, role, status, last_run_at::text as last_run_at, items_processed, notes
      from editorial_agents order by name
    `;
  });

export const listAdminBrokers = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    await assertStaff(context.userId);
    const sql = await getSql();
    return sql<{
      id: string;
      company_name: string;
      slug: string;
      city_slug: string;
      district_slug: string | null;
      verified: boolean;
      premium: boolean;
      featured: boolean;
      subscription_plan: string;
    }>`
      select id, company_name, slug, city_slug, district_slug, verified, premium, featured, subscription_plan
      from brokers order by featured desc, company_name
    `;
  });

export const listLeads = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    await assertStaff(context.userId);
    const sql = await getSql();
    return sql<{
      id: string;
      lead_type: string;
      name: string;
      phone: string | null;
      email: string | null;
      city: string | null;
      district: string | null;
      status: string;
      source_page: string | null;
      created_at: string;
      kvkk_consent: boolean;
    }>`
      select id, lead_type, name, phone, email, city, district, status, source_page,
        created_at::text as created_at, kvkk_consent
      from leads order by created_at desc limit 100
    `;
  });

export const setLeadStatus = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: unknown) =>
    z
      .object({
        id: z.string().min(8).max(80),
        status: z.enum(["new", "reviewed", "assigned", "closed"]),
      })
      .parse(input),
  )
  .handler(async ({ context, data }) => {
    await assertStaff(context.userId);
    const sql = await getSql();
    await sql`update leads set status = ${data.status} where id = ${data.id}`;
    return { ok: true as const };
  });

export const listAds = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    await assertStaff(context.userId);
    const sql = await getSql();
    return sql<{
      id: string;
      placement: string;
      title: string;
      sponsor_name: string;
      active: boolean;
      is_demo: boolean;
    }>`
      select id, placement, title, sponsor_name, active, is_demo
      from ad_slots order by placement
    `;
  });

export const toggleAd = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: unknown) =>
    z.object({ id: z.string().min(1).max(80), active: z.boolean() }).parse(input),
  )
  .handler(async ({ context, data }) => {
    await assertStaff(context.userId);
    const sql = await getSql();
    await sql`update ad_slots set active = ${data.active} where id = ${data.id}`;
    return { ok: true as const };
  });

export const getSettings = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const role = await assertStaff(context.userId);
    const sql = await getSql();
    const rows = await sql<{ key: string; value: unknown }>`select key, value from settings order by key`;
    return {
      role,
      userId: context.userId,
      settings: rows.map((row) => ({
        key: row.key,
        value: JSON.stringify(row.value ?? null),
      })),
    };
  });

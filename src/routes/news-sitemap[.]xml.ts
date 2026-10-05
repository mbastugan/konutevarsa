import { createFileRoute } from "@tanstack/react-router";

function esc(value: string) {
  return value.replace(/&/g, "&").replace(/</g, "<").replace(/>/g, ">");
}

export const Route = createFileRoute("/news-sitemap.xml")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const origin = new URL(request.url).origin;
        const { getSql } = await import("@/lib/db");
        const sql = await getSql();
        const rows = await sql<{ slug: string; title: string; published_at: string }>`
          select slug, title, published_at::text as published_at
          from articles
          where status = 'published'
            and published_at is not null
            and published_at <= now()
            and published_at >= now() - interval '2 days'
          order by published_at desc
        `;
        const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${rows
  .map((row) => {
    const date = new Date(row.published_at).toISOString();
    return `  <url><loc>${esc(`${origin}/haber/${row.slug}`)}</loc><news:news><news:publication><news:name>Konutevarsa</news:name><news:language>tr</news:language></news:publication><news:publication_date>${esc(date)}</news:publication_date><news:title>${esc(row.title)}</news:title></news:news></url>`;
  })
  .join("\n")}
</urlset>`;
        return new Response(body, {
          headers: { "content-type": "application/xml; charset=utf-8" },
        });
      },
    },
  },
});

import { createFileRoute } from "@tanstack/react-router";

function esc(value: string) {
  return value.replace(/&/g, "&").replace(/</g, "<").replace(/>/g, ">");
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const origin = new URL(request.url).origin;
        const { getSql } = await import("@/lib/db");
        const sql = await getSql();
        const staticPaths = [
          "/",
          "/gundem",
          "/konut-radar",
          "/emlakcilar",
          "/emlakci-ol",
          "/hakkimizda",
          "/iletisim",
          "/editoriyal-politika",
          "/kaynak-politikasi",
          "/duzeltme-politikasi",
          "/kvkk",
          "/gizlilik",
          "/cerez-politikasi",
        ];
        const categories = await sql<{ slug: string }>`select slug from categories`;
        const articles = await sql<{ slug: string }>`
          select slug from articles
          where status = 'published' and (published_at is null or published_at <= now())
        `;
        const brokers = await sql<{ slug: string }>`select slug from brokers`;
        const regions = await sql<{
          kind: string;
          city_slug: string;
          district_slug: string | null;
          neighborhood_slug: string | null;
        }>`select kind, city_slug, district_slug, neighborhood_slug from regions`;
        const urls = [
          ...staticPaths,
          ...categories.map((row) => `/kategori/${row.slug}`),
          ...articles.map((row) => `/haber/${row.slug}`),
          ...brokers.map((row) => `/emlakci/${row.slug}`),
          ...regions.map((row) => {
            if (row.kind === "neighborhood" && row.district_slug && row.neighborhood_slug) {
              return `/bolge/${row.city_slug}/${row.district_slug}/${row.neighborhood_slug}`;
            }
            if (row.kind === "district" && row.district_slug) {
              return `/bolge/${row.city_slug}/${row.district_slug}`;
            }
            return `/bolge/${row.city_slug}`;
          }),
        ];
        const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map((path) => `  <url><loc>${esc(origin + path)}</loc></url>`)
  .join("\n")}
</urlset>`;
        return new Response(body, {
          headers: { "content-type": "application/xml; charset=utf-8" },
        });
      },
    },
  },
});

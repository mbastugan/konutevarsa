import { absUrl, SITE } from "@/lib/site";
import type { ArticleDetail } from "@/lib/types";

export function jsonLd(data: unknown) {
  return { type: "application/ld+json", children: JSON.stringify(data) };
}

export function breadcrumbLd(origin: string, items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absUrl(origin, item.path),
    })),
  };
}

export function websiteLd(origin: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.name,
    description: SITE.description,
    inLanguage: "tr-TR",
    url: absUrl(origin, "/"),
    potentialAction: {
      "@type": "SearchAction",
      target: `${absUrl(origin, "/ara")}?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function organizationLd(origin: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.name,
    url: absUrl(origin, "/"),
    description: SITE.description,
    publishingPrinciples: absUrl(origin, "/editoriyal-politika"),
    correctionsPolicy: absUrl(origin, "/duzeltme-politikasi"),
  };
}

export function newsArticleLd(origin: string, article: ArticleDetail) {
  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    description: article.seoDescription,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt || article.publishedAt,
    inLanguage: "tr-TR",
    articleSection: article.categoryName,
    keywords: article.tags.join(", "),
    isAccessibleForFree: true,
    image: article.image ? [absUrl(origin, article.image)] : undefined,
    mainEntityOfPage: absUrl(origin, article.canonicalPath),
    author: {
      "@type": article.authorSlug === "haber-merkezi" ? "Organization" : "Person",
      name: article.authorName,
      url: absUrl(origin, "/hakkimizda"),
    },
    publisher: {
      "@type": "Organization",
      name: SITE.publisher,
      url: absUrl(origin, "/"),
    },
  };
}

export function placeLd(origin: string, name: string, path: string, city: string, district?: string | null) {
  return {
    "@context": "https://schema.org",
    "@type": "Place",
    name,
    url: absUrl(origin, path),
    address: {
      "@type": "PostalAddress",
      addressLocality: district || city,
      addressRegion: city,
      addressCountry: "TR",
    },
  };
}

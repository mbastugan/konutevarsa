import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import { AuthProvider } from "@/lib/auth/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import { analyticsConfig, analyticsScripts } from "@/lib/analytics";
import { SiteShell } from "@/components/site/shell";
import { SITE } from "@/lib/site";
import appCss from "../styles.css?url";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: `${SITE.name} — ${SITE.tagline}` },
      { name: "description", content: SITE.description },
      { name: "theme-color", content: "#f3f0e8" },
      ...(analyticsConfig.searchConsoleVerification
        ? [{ name: "google-site-verification", content: analyticsConfig.searchConsoleVerification }]
        : []),
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,500;0,6..72,600;0,6..72,700;1,6..72,500&family=Source+Sans+3:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap",
      },
      { rel: "manifest", href: "/__grok/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/__grok/icon-180.png" },
    ],
    scripts: analyticsScripts().map((script) =>
      script.src ? { src: script.src } : { children: script.children ?? "" },
    ),
  }),
  component: RootComponent,
  notFoundComponent: NotFound,
});

function RootComponent() {
  return (
    <html lang="tr" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        <PreviewHostBridge />
        <AuthProvider>
          <Outlet />
        </AuthProvider>
        <Scripts />
      </body>
    </html>
  );
}

function NotFound() {
  return (
    <SiteShell>
      <div className="mx-auto max-w-3xl px-4 py-20">
        <p className="text-xs font-semibold uppercase tracking-widest text-accent">404</p>
        <h1 className="mt-2 font-serif text-4xl">Sayfa bulunamadı</h1>
        <p className="mt-3 text-muted">Aradığınız haber, bölge veya ofis bu adreste yok.</p>
        <a href="/" className="mt-6 inline-flex h-12 items-center bg-ink px-5 text-sm font-semibold text-paper">
          Ana sayfa
        </a>
      </div>
    </SiteShell>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { GROK_PROVIDERS, authEnabled, signIn } from "@/lib/auth/client";
import { SiteShell } from "@/components/site/shell";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Giriş — Konutevarsa" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  return (
    <SiteShell>
      <main className="mx-auto max-w-md px-4 py-16">
        <p className="text-xs font-semibold uppercase tracking-widest text-accent">Yayın masası</p>
        <h1 className="mt-2 font-serif text-4xl">Giriş</h1>
        <p className="mt-3 text-muted">
          Haberler herkese açıktır. Giriş, yayın ekibinin taslak ve kuyruk ekranı içindir.
        </p>
        <div className="mt-6 grid gap-2">
          {authEnabled ? (
            GROK_PROVIDERS.map((provider) => (
              <button
                key={provider.providerId}
                type="button"
                onClick={() => signIn(provider.providerId, { callbackURL: "/admin" })}
                className="h-12 border border-ink text-sm font-semibold"
              >
                {provider.label} ile devam et
              </button>
            ))
          ) : (
            <p className="text-sm text-muted">Giriş kapalı.</p>
          )}
        </div>
      </main>
    </SiteShell>
  );
}

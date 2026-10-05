import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { RedirectToSignIn } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";

const links = [
  ["/admin", "Dashboard"],
  ["/admin/articles", "Articles"],
  ["/admin/queue", "Editorial Queue"],
  ["/admin/sources", "Sources"],
  ["/admin/regions", "Regions"],
  ["/admin/agents", "Agents"],
  ["/admin/brokers", "Emlakçılar"],
  ["/admin/leads", "Leads"],
  ["/admin/ads", "Advertisements"],
  ["/admin/settings", "Settings"],
] as const;

export function AdminFrame({ children }: { children: ReactNode }) {
  const { user, isPending } = useCurrentUserState();
  if (isPending) {
    return <div className="min-h-screen bg-paper p-6 text-sm text-muted">Masa açılıyor…</div>;
  }
  if (!user) return <RedirectToSignIn />;
  return (
    <div className="min-h-screen bg-paper text-ink">
      <div className="border-b border-line bg-card">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
          <Link to="/" className="font-serif text-lg">
            Konutevarsa Masa
          </Link>
          <Link to="/" className="text-sm font-semibold text-accent">
            Siteye dön
          </Link>
        </div>
      </div>
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-6 lg:grid-cols-[200px_1fr]">
        <nav className="flex gap-2 overflow-x-auto lg:flex-col lg:overflow-visible">
          {links.map(([href, label]) => (
            <a key={href} href={href} className="inline-flex h-11 shrink-0 items-center px-2 text-sm font-medium">
              {label}
            </a>
          ))}
        </nav>
        <div>{children}</div>
      </div>
    </div>
  );
}

export function AdminTitle({ title, sub }: { title: string; sub?: string }) {
  return (
    <header className="mb-6">
      <h1 className="font-serif text-3xl">{title}</h1>
      {sub ? <p className="mt-1 text-sm text-muted">{sub}</p> : null}
    </header>
  );
}

export function Stat({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="border border-line bg-card p-4">
      <p className="text-xs uppercase tracking-widest text-muted">{label}</p>
      <p className="mt-2 font-serif text-3xl tabular-nums">{value}</p>
    </div>
  );
}

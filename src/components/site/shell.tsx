import { useEffect, useState, type ReactNode } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Menu, Search, X } from "lucide-react";
import { SignedIn, SignedOut, UserButton } from "@/lib/auth/gates";
import { SITE } from "@/lib/site";

const field =
  "h-12 w-full border border-line bg-card px-3 text-base text-ink placeholder:text-muted";

export function SearchBox({ onDone, autoFocus = false }: { onDone?: () => void; autoFocus?: boolean }) {
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  return (
    <form
      className="flex gap-2"
      onSubmit={(event) => {
        event.preventDefault();
        const query = q.trim();
        if (query.length < 2) return;
        onDone?.();
        void navigate({ to: "/ara", search: { q: query } });
      }}
    >
      <label className="sr-only" htmlFor="site-search">
        Ara
      </label>
      <input
        id="site-search"
        value={q}
        autoFocus={autoFocus}
        onChange={(event) => setQ(event.target.value)}
        placeholder="Haber, şehir, ilçe, emlakçı"
        className={field}
      />
      <button type="submit" className="h-12 shrink-0 bg-ink px-4 text-sm font-semibold text-paper">
        Ara
      </button>
    </form>
  );
}

function NavLinks({ onDone, className }: { onDone?: () => void; className: string }) {
  return (
    <>
      <Link to="/gundem" className={className} onClick={onDone}>
        Gündem
      </Link>
      <Link to="/kategori/$slug" params={{ slug: "konut" }} className={className} onClick={onDone}>
        Konut
      </Link>
      <Link to="/kategori/$slug" params={{ slug: "yatirim" }} className={className} onClick={onDone}>
        Yatırım
      </Link>
      <Link to="/kategori/$slug" params={{ slug: "kira" }} className={className} onClick={onDone}>
        Kira
      </Link>
      <Link
        to="/kategori/$slug"
        params={{ slug: "yeni-projeler" }}
        className={className}
        onClick={onDone}
      >
        Projeler
      </Link>
      <Link
        to="/kategori/$slug"
        params={{ slug: "kentsel-donusum" }}
        className={className}
        onClick={onDone}
      >
        Kentsel Dönüşüm
      </Link>
      <Link to="/emlakcilar" className={className} onClick={onDone}>
        Emlakçılar
      </Link>
      <Link to="/konut-radar" className={className} onClick={onDone}>
        Konut Radar
      </Link>
      <Link to="/kategori/$slug" params={{ slug: "mevzuat" }} className={className} onClick={onDone}>
        Mevzuat
      </Link>
    </>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const link = "inline-flex min-h-11 items-center text-sm font-medium text-ink";
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-paper">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-3 px-4 sm:px-6">
        <Link to="/" className="flex min-w-0 items-center gap-2">
          <span className="grid size-9 place-items-center bg-ink font-serif text-lg text-paper">K</span>
          <span className="truncate">
            <span className="block font-serif text-xl leading-none tracking-tight">Konutevarsa</span>
            <span className="hidden text-xs uppercase tracking-widest text-muted sm:block">
              {SITE.tagline}
            </span>
          </span>
        </Link>
        <div className="ml-auto flex items-center gap-1 sm:gap-2">
          <button
            type="button"
            className="grid size-11 place-items-center"
            aria-label="Ara"
            onClick={() => setSearchOpen((value) => !value)}
          >
            <Search className="size-5" />
          </button>
          <SignedOut>
            <Link to="/login" className="hidden h-11 items-center px-2 text-sm font-semibold sm:inline-flex">
              Giriş
            </Link>
          </SignedOut>
          <SignedIn>
            <Link to="/admin" className="hidden h-11 items-center px-2 text-sm font-semibold sm:inline-flex">
              Masa
            </Link>
            <span className="hidden lg:block">
              <UserButton />
            </span>
          </SignedIn>
          <Link
            to="/emlakci-ol"
            className="hidden h-11 items-center bg-accent px-3 text-sm font-semibold text-paper sm:inline-flex"
          >
            Emlakçı Ol
          </Link>
          <button
            type="button"
            className="grid size-11 place-items-center lg:hidden"
            aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>
      <nav className="mx-auto hidden max-w-6xl gap-x-5 overflow-x-auto px-6 lg:flex" aria-label="Bölümler">
        <NavLinks className={`${link} whitespace-nowrap`} />
      </nav>
      {searchOpen ? (
        <div className="border-t border-line px-4 py-3 sm:px-6">
          <div className="mx-auto max-w-6xl">
            <SearchBox autoFocus onDone={() => setSearchOpen(false)} />
          </div>
        </div>
      ) : null}
      {open ? (
        <div className="border-t border-line bg-paper px-4 py-3 lg:hidden">
          <nav className="flex flex-col" aria-label="Mobil menü">
            <NavLinks className="min-h-12 border-b border-line text-base" onDone={() => setOpen(false)} />
          </nav>
          <div className="mt-4 flex flex-col gap-2">
            <SignedOut>
              <Link to="/login" className="inline-flex h-12 items-center justify-center border border-ink text-sm font-semibold" onClick={() => setOpen(false)}>
                Giriş
              </Link>
            </SignedOut>
            <SignedIn>
              <Link to="/admin" className="inline-flex h-12 items-center justify-center border border-ink text-sm font-semibold" onClick={() => setOpen(false)}>
                Yayın masası
              </Link>
            </SignedIn>
            <Link
              to="/emlakci-ol"
              className="inline-flex h-12 items-center justify-center bg-accent text-sm font-semibold text-paper"
              onClick={() => setOpen(false)}
            >
              Emlakçı Ol
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}

const footer = [
  ["Kurum", [
    ["/hakkimizda", "Hakkımızda"],
    ["/iletisim", "İletişim"],
    ["/editoriyal-politika", "Editoryal Politikamız"],
    ["/kaynak-politikasi", "Kaynak Politikamız"],
    ["/duzeltme-politikasi", "Düzeltme Politikası"],
  ]],
  ["Hukuk", [
    ["/kvkk", "KVKK"],
    ["/gizlilik", "Gizlilik"],
    ["/cerez-politikasi", "Çerez Politikası"],
  ]],
  ["Ürün", [
    ["/konut-radar", "Konut Radar"],
    ["/emlakcilar", "Emlakçılar"],
    ["/emlakci-ol", "Emlakçı Ol"],
    ["/gundem", "Gündem"],
  ]],
] as const;

export function Footer() {
  return (
    <footer className="mt-16 border-t border-line">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-4">
        <div>
          <p className="font-serif text-2xl">Konutevarsa</p>
          <p className="mt-2 text-sm text-muted">{SITE.tagline}. Haber, bölge ve emlak profesyoneli aynı çatıda.</p>
        </div>
        {footer.map(([title, links]) => (
          <div key={title}>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted">{title}</p>
            <ul className="mt-3 space-y-2">
              {links.map(([href, label]) => (
                <li key={href}>
                  <a href={href} className="inline-flex min-h-11 items-center text-sm">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-line">
        <p className="mx-auto max-w-6xl px-4 py-4 text-xs text-muted sm:px-6">
          © {new Date().getFullYear()} {SITE.publisher}. Örnek içerikler demo ibaresiyle yayındadır.
        </p>
      </div>
    </footer>
  );
}

export function CookieNote() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    try {
      if (!localStorage.getItem("kv-cookie")) setVisible(true);
    } catch {
      setVisible(false);
    }
  }, []);
  if (!visible) return null;
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-card px-4 py-3 sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted">
          Oturum ve tercih için gerekli çerezler kullanılır. Ayrıntı çerez politikasındadır.
        </p>
        <div className="flex gap-2">
          <a href="/cerez-politikasi" className="inline-flex h-11 items-center px-3 text-sm font-semibold">
            Politika
          </a>
          <button
            type="button"
            className="h-11 bg-ink px-4 text-sm font-semibold text-paper"
            onClick={() => {
              try {
                localStorage.setItem("kv-cookie", "1");
              } catch {
                /* ignore */
              }
              setVisible(false);
            }}
          >
            Anladım
          </button>
        </div>
      </div>
    </div>
  );
}

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen">
      <a href="#icerik" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-card focus:px-3 focus:py-2">
        İçeriğe geç
      </a>
      <Header />
      <main id="icerik">{children}</main>
      <Footer />
      <CookieNote />
    </div>
  );
}

export function PageWrap({ children }: { children: ReactNode }) {
  return <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">{children}</div>;
}

export function Crumbs({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Konum" className="mb-4 text-sm text-muted">
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, index) => (
          <li key={item.label} className="flex items-center gap-2">
            {index > 0 ? <span aria-hidden="true">/</span> : null}
            {item.href ? <a href={item.href}>{item.label}</a> : <span className="text-ink">{item.label}</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}

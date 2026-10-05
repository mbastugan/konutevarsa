import { useEffect, useRef, useState, type FormEvent } from "react";
import { Link } from "@tanstack/react-router";
import {
  actOnQueue,
  getAdminArticle,
  getDashboard,
  getEditorialQueue,
  getSettings,
  listAdminArticles,
  listAdminBrokers,
  listAdminRegions,
  listAds,
  listAgents,
  listLeads,
  listSources,
  saveArticle,
  setLeadStatus,
  toggleAd,
  toggleSource,
} from "@/lib/admin-api";
import { formatDateTime, statusLabel } from "@/lib/format";
import { analyticsConfig } from "@/lib/analytics";
import { AdminTitle, Stat } from "./frame";

function useLoad<T>(loader: () => Promise<T>) {
  const [tick, setTick] = useState(0);
  const [state, setState] = useState<{ data?: T; error?: string; loading: boolean }>({ loading: true });
  const loaderRef = useRef(loader);
  loaderRef.current = loader;
  useEffect(() => {
    let live = true;
    setState((prev) => ({ ...prev, loading: true, error: undefined }));
    loaderRef.current()
      .then((data) => {
        if (live) setState({ data, loading: false });
      })
      .catch((error: unknown) => {
        if (live) {
          setState({
            loading: false,
            error: error instanceof Error ? error.message : "Masa açılamadı",
          });
        }
      });
    return () => {
      live = false;
    };
  }, [tick]);
  return { ...state, reload: () => setTick((value) => value + 1) };
}

function Note({ error, loading }: { error?: string; loading: boolean }) {
  if (loading) return <p className="text-sm text-muted">Yükleniyor…</p>;
  if (error === "Forbidden") return <p>Bu hesap yayın ekibinde değil.</p>;
  if (error) return <p>{error}</p>;
  return null;
}

export function DashboardScreen() {
  const query = useLoad(getDashboard);
  const counts = query.data?.counts;
  return (
    <>
      <AdminTitle title="Dashboard" sub="Bugünün masası. Ajanlar örnek durumdadır, otomatik yayın kapalıdır." />
      <Note error={query.error} loading={query.loading} />
      {counts ? (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <Stat label="Bugünkü haberler" value={counts.today} />
          <Stat label="Taslaklar" value={counts.drafts} />
          <Stat label="İnceleme" value={counts.review} />
          <Stat label="Yayınlananlar" value={counts.published} />
          <Stat label="Reddedilenler" value={counts.rejected} />
          <Stat label="Kaynak" value={counts.sources} />
        </div>
      ) : null}
      {query.data ? (
        <section className="mt-8">
          <h2 className="font-serif text-2xl">Agent çalışma durumu</h2>
          <ul className="mt-3 divide-y divide-line border-y border-line">
            {query.data.agents.map((agent) => (
              <li key={agent.id} className="py-3">
                <p className="font-semibold">
                  {agent.name} · {statusLabel(agent.status)}
                </p>
                <p className="text-sm text-muted">
                  {agent.role} · {agent.items_processed} kayıt · {formatDateTime(agent.last_run_at)}
                </p>
                <p className="text-sm">{agent.notes}</p>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </>
  );
}

export function ArticlesScreen() {
  const query = useLoad(listAdminArticles);
  return (
    <>
      <AdminTitle title="Articles" />
      <Note error={query.error} loading={query.loading} />
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="text-xs uppercase tracking-wide text-muted">
            <tr>
              <th className="py-2">Başlık</th>
              <th>Kategori</th>
              <th>Durum</th>
              <th>Skor</th>
            </tr>
          </thead>
          <tbody>
            {query.data?.map((row) => (
              <tr key={row.id} className="border-t border-line">
                <td className="py-3">
                  <Link to="/admin/articles/$id" params={{ id: row.id }} className="font-semibold">
                    {row.title}
                  </Link>
                </td>
                <td>{row.category_name}</td>
                <td>{statusLabel(row.status)}</td>
                <td className="tabular-nums">
                  {row.importance_score}/{row.confidence_score}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export function QueueScreen() {
  const query = useLoad(getEditorialQueue);
  async function act(id: string, action: "approve" | "reject" | "publish") {
    await actOnQueue({ data: { id, action } });
    query.reload();
  }
  return (
    <>
      <AdminTitle title="Editorial Queue" sub="Önizle, düzenle, onayla, reddet, yayınla." />
      <Note error={query.error} loading={query.loading} />
      <div className="overflow-x-auto">
        <table className="w-full min-w-[860px] text-left text-sm">
          <thead className="text-xs uppercase tracking-wide text-muted">
            <tr>
              <th className="py-2">Başlık</th>
              <th>Kaynak</th>
              <th>Kategori</th>
              <th>Önem</th>
              <th>Güven</th>
              <th>Durum</th>
              <th>Bulunma</th>
              <th>Agent</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {query.data?.map((row) => (
              <tr key={row.id} className="border-t border-line align-top">
                <td className="py-3 pr-3 font-semibold">{row.title}</td>
                <td>{row.source_name ?? "—"}</td>
                <td>{row.category_name}</td>
                <td className="tabular-nums">{row.importance_score}</td>
                <td className="tabular-nums">{row.confidence_score}</td>
                <td>{statusLabel(row.status)}</td>
                <td>{formatDateTime(row.discovered_at)}</td>
                <td>{row.agent_name ?? "—"}</td>
                <td className="space-x-2 whitespace-nowrap">
                  <Link to="/admin/articles/$id" params={{ id: row.id }} className="underline">
                    Preview
                  </Link>
                  <Link to="/admin/articles/$id" params={{ id: row.id }} className="underline">
                    Edit
                  </Link>
                  <button type="button" className="underline" onClick={() => void act(row.id, "approve")}>
                    Approve
                  </button>
                  <button type="button" className="underline" onClick={() => void act(row.id, "reject")}>
                    Reject
                  </button>
                  <button type="button" className="underline" onClick={() => void act(row.id, "publish")}>
                    Publish
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export function ArticleEditScreen({ id }: { id: string }) {
  const query = useLoad(() => getAdminArticle({ data: id }));
  const [note, setNote] = useState("");
  const article = query.data?.article;

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!article) return;
    const form = new FormData(event.currentTarget);
    await saveArticle({
      data: {
        id: article.id,
        title: String(form.get("title") || ""),
        summary: String(form.get("summary") || ""),
        content: String(form.get("content") || ""),
        takeaway: String(form.get("takeaway") || ""),
        categoryId: String(form.get("categoryId") || ""),
        status: String(form.get("status")) as "draft",
        editorialStatus: String(form.get("editorialStatus")) as "review",
        importance: Number(form.get("importance")),
        confidence: Number(form.get("confidence")),
        seoTitle: String(form.get("seoTitle") || ""),
        seoDescription: String(form.get("seoDescription") || ""),
      },
    });
    setNote("Kaydedildi.");
    query.reload();
  }

  return (
    <>
      <AdminTitle title="Edit" sub="Önizleme bu formun kendisidir. Yayındaki slug değişmez." />
      <Note error={query.error} loading={query.loading} />
      {article && query.data ? (
        <form onSubmit={onSubmit} className="grid max-w-3xl gap-3">
          <input name="title" defaultValue={article.title} className="h-12 border border-line bg-card px-3" />
          <textarea name="summary" defaultValue={article.summary} rows={3} className="border border-line bg-card px-3 py-2" />
          <textarea name="content" defaultValue={article.content} rows={14} className="border border-line bg-card px-3 py-2 font-mono text-sm" />
          <textarea name="takeaway" defaultValue={article.takeaway ?? ""} rows={3} className="border border-line bg-card px-3 py-2" />
          <div className="grid gap-3 sm:grid-cols-2">
            <select name="categoryId" defaultValue={article.category_id} className="h-12 border border-line bg-card px-3">
              {query.data.categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            <select name="status" defaultValue={article.status} className="h-12 border border-line bg-card px-3">
              {["draft", "review", "scheduled", "published", "rejected"].map((status) => (
                <option key={status} value={status}>
                  {statusLabel(status)}
                </option>
              ))}
            </select>
            <select name="editorialStatus" defaultValue={article.editorial_status} className="h-12 border border-line bg-card px-3">
              {["discovered", "researching", "verified", "written", "review", "approved", "published"].map((status) => (
                <option key={status} value={status}>
                  {statusLabel(status)}
                </option>
              ))}
            </select>
            <input name="importance" type="number" min={0} max={100} defaultValue={article.importance_score} className="h-12 border border-line bg-card px-3" />
            <input name="confidence" type="number" min={0} max={100} defaultValue={article.confidence_score} className="h-12 border border-line bg-card px-3" />
          </div>
          <input name="seoTitle" defaultValue={article.seo_title ?? ""} placeholder="SEO başlık" className="h-12 border border-line bg-card px-3" />
          <input name="seoDescription" defaultValue={article.seo_description ?? ""} placeholder="SEO açıklama" className="h-12 border border-line bg-card px-3" />
          <div className="flex items-center gap-3">
            <button type="submit" className="h-12 bg-ink px-5 text-sm font-semibold text-paper">
              Kaydet
            </button>
            <a href={`/haber/${article.slug}`} className="text-sm font-semibold text-accent">
              Yayındaki önizleme
            </a>
            {note ? <span className="text-sm">{note}</span> : null}
          </div>
        </form>
      ) : null}
    </>
  );
}

export function SourcesScreen() {
  const query = useLoad(listSources);
  return (
    <>
      <AdminTitle title="Sources" sub="Otomatik yayın tüm örnek kaynaklarda kapalıdır." />
      <Note error={query.error} loading={query.loading} />
      <ul className="divide-y divide-line border-y border-line">
        {query.data?.map((source) => (
          <li key={source.id} className="flex flex-col gap-2 py-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-semibold">{source.name}</p>
              <p className="text-sm text-muted">
                {source.source_type} · güven {source.trust_score} · {source.domain}
              </p>
            </div>
            <button
              type="button"
              className="h-11 border border-line px-3 text-sm"
              onClick={() => {
                void toggleSource({ data: { id: source.id, active: !source.is_active } }).then(() => query.reload());
              }}
            >
              {source.is_active ? "Aktif" : "Kapalı"}
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

export function RegionsAdminScreen() {
  const query = useLoad(listAdminRegions);
  return (
    <>
      <AdminTitle title="Regions" sub="İl, ilçe ve mahalle iskeleti. Metrikler örnek seridir." />
      <Note error={query.error} loading={query.loading} />
      <ul className="divide-y divide-line border-y border-line text-sm">
        {query.data?.map((row) => (
          <li key={row.id} className="flex items-center justify-between py-2">
            <span>
              {row.name} · {row.kind}
            </span>
            <span className="tabular-nums text-muted">
              {row.avg_sqm_price ? `${row.avg_sqm_price} TL/m²` : "seri yok"}
              {row.is_demo ? " · örnek" : ""}
            </span>
          </li>
        ))}
      </ul>
    </>
  );
}

export function AgentsScreen() {
  const query = useLoad(listAgents);
  return (
    <>
      <AdminTitle title="Agents" sub="Robotlar bu fazda çalışmaz. Durum kartı sonraki kuyruk içindir." />
      <Note error={query.error} loading={query.loading} />
      <ul className="space-y-3">
        {query.data?.map((agent) => (
          <li key={agent.id} className="border border-line bg-card p-4">
            <p className="font-serif text-2xl">{agent.name}</p>
            <p className="text-sm text-muted">
              {agent.role} · {statusLabel(agent.status)} · {formatDateTime(agent.last_run_at)}
            </p>
            <p className="mt-2 text-sm">{agent.notes}</p>
          </li>
        ))}
      </ul>
    </>
  );
}

export function BrokersAdminScreen() {
  const query = useLoad(listAdminBrokers);
  return (
    <>
      <AdminTitle title="Emlakçılar" sub="Profil altyapısı. Tahsilat yok." />
      <Note error={query.error} loading={query.loading} />
      <ul className="divide-y divide-line border-y border-line">
        {query.data?.map((broker) => (
          <li key={broker.id} className="py-3">
            <a href={`/emlakci/${broker.slug}`} className="font-semibold">
              {broker.company_name}
            </a>
            <p className="text-sm text-muted">
              {broker.city_slug}
              {broker.district_slug ? ` / ${broker.district_slug}` : ""} · {broker.subscription_plan}
              {broker.verified ? " · doğrulanmış örnek" : ""}
              {broker.featured ? " · vitrin" : ""}
            </p>
          </li>
        ))}
      </ul>
    </>
  );
}

export function LeadsScreen() {
  const query = useLoad(listLeads);
  return (
    <>
      <AdminTitle title="Leads" sub="KVKK onayı olmayan kayıt yazılmaz. Dağıtım motoru kapalı." />
      <Note error={query.error} loading={query.loading} />
      {query.data && query.data.length === 0 ? <p className="text-sm text-muted">Henüz talep yok.</p> : null}
      <ul className="divide-y divide-line border-y border-line">
        {query.data?.map((lead) => (
          <li key={lead.id} className="py-3 text-sm">
            <p className="font-semibold">
              {lead.lead_type} · {lead.name}
            </p>
            <p className="text-muted">
              {lead.phone || "—"} · {lead.email || "—"} · {lead.city || "—"} / {lead.district || "—"}
            </p>
            <p className="text-muted">{formatDateTime(lead.created_at)} · {lead.source_page}</p>
            <select
              className="mt-2 h-11 border border-line bg-card px-2"
              value={lead.status}
              onChange={(event) => {
                void setLeadStatus({
                  data: { id: lead.id, status: event.target.value as "new" },
                }).then(() => query.reload());
              }}
            >
              {["new", "reviewed", "assigned", "closed"].map((status) => (
                <option key={status} value={status}>
                  {statusLabel(status)}
                </option>
              ))}
            </select>
          </li>
        ))}
      </ul>
    </>
  );
}

export function AdsScreen() {
  const query = useLoad(listAds);
  return (
    <>
      <AdminTitle title="Advertisements" sub="Alanlar yerleşim koduyla durur. Kapalı olanlar sayfada görünmez." />
      <Note error={query.error} loading={query.loading} />
      <ul className="divide-y divide-line border-y border-line">
        {query.data?.map((ad) => (
          <li key={ad.id} className="flex items-center justify-between gap-3 py-3">
            <div>
              <p className="font-semibold">{ad.title}</p>
              <p className="text-sm text-muted">
                {ad.placement} · {ad.sponsor_name}
                {ad.is_demo ? " · örnek" : ""}
              </p>
            </div>
            <button
              type="button"
              className="h-11 border border-line px-3 text-sm"
              onClick={() => {
                void toggleAd({ data: { id: ad.id, active: !ad.active } }).then(() => query.reload());
              }}
            >
              {ad.active ? "Açık" : "Kapalı"}
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

export function SettingsScreen() {
  const query = useLoad(getSettings);
  return (
    <>
      <AdminTitle title="Settings" sub="Ölçüm kimliği yoksa kod yüklenmez." />
      <Note error={query.error} loading={query.loading} />
      <dl className="grid gap-3 text-sm">
        <div className="border border-line bg-card p-4">
          <dt className="text-muted">Google Analytics</dt>
          <dd>{analyticsConfig.googleAnalyticsId || "Tanımlı değil"}</dd>
        </div>
        <div className="border border-line bg-card p-4">
          <dt className="text-muted">Search Console</dt>
          <dd>{analyticsConfig.searchConsoleVerification || "Tanımlı değil"}</dd>
        </div>
        <div className="border border-line bg-card p-4">
          <dt className="text-muted">Clarity</dt>
          <dd>{analyticsConfig.clarityId || "Tanımlı değil"}</dd>
        </div>
        <div className="border border-line bg-card p-4">
          <dt className="text-muted">Meta Pixel</dt>
          <dd>{analyticsConfig.metaPixelId || "Tanımlı değil"}</dd>
        </div>
      </dl>
      {query.data ? (
        <pre className="mt-4 overflow-x-auto border border-line bg-card p-4 text-xs">
          {JSON.stringify(query.data.settings, null, 2)}
        </pre>
      ) : null}
    </>
  );
}

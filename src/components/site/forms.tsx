import { useState, type FormEvent } from "react";
import { submitLead, subscribeNewsletter } from "@/lib/content-api";

const field = "h-12 w-full border border-line bg-card px-3 text-base text-ink";

const TYPES = [
  ["BUY", "Satın almak"],
  ["SELL", "Satmak"],
  ["RENT", "Kiralamak"],
  ["VALUATION", "Değerleme"],
  ["CONTACT", "İletişim"],
] as const;

export function LeadForm({
  sourcePage,
  heading,
  sub,
  defaultType = "CONTACT",
  defaultCity = "",
  defaultDistrict = "",
  assignedBroker = "",
}: {
  sourcePage: string;
  heading: string;
  sub: string;
  defaultType?: (typeof TYPES)[number][0];
  defaultCity?: string;
  defaultDistrict?: string;
  assignedBroker?: string;
}) {
  const [status, setStatus] = useState<"idle" | "pending" | "done" | "error">("idle");
  const [note, setNote] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") || "");
    const phone = String(form.get("phone") || "");
    if (!email && !phone) {
      setStatus("error");
      setNote("Telefon veya e-posta bırakın.");
      return;
    }
    if (form.get("kvkk") !== "on") {
      setStatus("error");
      setNote("KVKK aydınlatmasını onaylamadan talep iletilemez.");
      return;
    }
    const min = String(form.get("budgetMin") || "");
    const max = String(form.get("budgetMax") || "");
    setStatus("pending");
    try {
      await submitLead({
        data: {
          leadType: String(form.get("leadType")) as (typeof TYPES)[number][0],
          name: String(form.get("name") || ""),
          phone,
          email,
          city: String(form.get("city") || ""),
          district: String(form.get("district") || ""),
          neighborhood: String(form.get("neighborhood") || ""),
          propertyType: String(form.get("propertyType") || ""),
          budgetMin: min ? Number(min) : undefined,
          budgetMax: max ? Number(max) : undefined,
          message: String(form.get("message") || ""),
          sourcePage,
          assignedBroker,
          kvkkConsent: true,
          companyWebsite: String(form.get("companyWebsite") || ""),
        },
      });
      setStatus("done");
    } catch {
      setStatus("error");
      setNote("Talep iletilemedi. Alanları kontrol edip yeniden deneyin.");
    }
  }

  if (status === "done") {
    return (
      <div className="border border-line bg-card p-5">
        <h2 className="font-serif text-2xl">{heading}</h2>
        <p className="mt-2 text-muted">Talebiniz yayın masasına düştü. Bu demo ortamında otomatik arama veya SMS yapılmaz.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="border border-line bg-card p-5">
      <h2 className="font-serif text-2xl">{heading}</h2>
      <p className="mt-2 text-sm text-muted">{sub}</p>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <label className="text-sm font-semibold sm:col-span-2">
          Talep
          <select name="leadType" defaultValue={defaultType} className={`${field} mt-1`}>
            {TYPES.map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </label>
        <label className="text-sm font-semibold">
          Ad soyad
          <input name="name" required minLength={2} className={`${field} mt-1`} />
        </label>
        <label className="text-sm font-semibold">
          Telefon
          <input name="phone" inputMode="tel" className={`${field} mt-1`} />
        </label>
        <label className="text-sm font-semibold">
          E-posta
          <input name="email" type="email" className={`${field} mt-1`} />
        </label>
        <label className="text-sm font-semibold">
          Konut tipi
          <input name="propertyType" placeholder="Daire, villa…" className={`${field} mt-1`} />
        </label>
        <label className="text-sm font-semibold">
          İl
          <input name="city" defaultValue={defaultCity} className={`${field} mt-1`} />
        </label>
        <label className="text-sm font-semibold">
          İlçe
          <input name="district" defaultValue={defaultDistrict} className={`${field} mt-1`} />
        </label>
        <label className="text-sm font-semibold">
          Mahalle
          <input name="neighborhood" className={`${field} mt-1`} />
        </label>
        <label className="text-sm font-semibold">
          Bütçe alt
          <input name="budgetMin" inputMode="numeric" className={`${field} mt-1`} />
        </label>
        <label className="text-sm font-semibold">
          Bütçe üst
          <input name="budgetMax" inputMode="numeric" className={`${field} mt-1`} />
        </label>
        <label className="text-sm font-semibold sm:col-span-2">
          Not
          <textarea name="message" rows={4} className="mt-1 w-full border border-line bg-card px-3 py-2 text-base" />
        </label>
      </div>
      <label className="mt-3 flex items-start gap-2 text-sm">
        <input name="kvkk" type="checkbox" className="mt-1 size-4" required />
        <span>Kişisel verilerimin talep iletimi için işlenmesini kabul ediyorum.</span>
      </label>
      <input name="companyWebsite" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      {status === "error" ? <p className="mt-3 text-sm text-ink">{note}</p> : null}
      <button
        type="submit"
        disabled={status === "pending"}
        className="mt-4 h-12 bg-accent px-5 text-sm font-semibold text-paper disabled:opacity-60"
      >
        {status === "pending" ? "Gönderiliyor" : "Talebi bırak"}
      </button>
    </form>
  );
}

export function Newsletter() {
  const [status, setStatus] = useState<"idle" | "pending" | "done" | "error">("idle");
  const [note, setNote] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    if (form.get("kvkk") !== "on") {
      setStatus("error");
      setNote("KVKK onayı olmadan bülten kaydı açılmaz.");
      return;
    }
    setStatus("pending");
    try {
      const result = await subscribeNewsletter({
        data: {
          email: String(form.get("email") || ""),
          kvkkConsent: true,
          companyWebsite: String(form.get("companyWebsite") || ""),
        },
      });
      if (!result.ok) {
        setStatus("error");
        setNote(result.error);
        return;
      }
      setStatus("done");
    } catch {
      setStatus("error");
      setNote("Adres doğrulanamadı.");
    }
  }

  return (
    <section className="bg-ink px-4 py-12 text-paper sm:px-6">
      <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-[1.2fr_1fr] md:items-end">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-accent-soft">Bülten</p>
          <h2 className="mt-2 font-serif text-3xl sm:text-4xl">Günün gayrimenkul notu, gürültüsüz.</h2>
          <p className="mt-3 max-w-xl text-paper/80">
            Haftada birkaç başlık. Örnek yayında reklam postası yoktur, SMS yoktur.
          </p>
        </div>
        {status === "done" ? (
          <p className="text-lg">Kaydınız alındı.</p>
        ) : (
          <form onSubmit={onSubmit} className="grid gap-3">
            <input name="email" type="email" required placeholder="E-posta" className="h-12 bg-paper px-3 text-ink" />
            <label className="flex items-start gap-2 text-sm text-paper/80">
              <input name="kvkk" type="checkbox" className="mt-1 size-4" required />
              <span>Bülten için e-posta adresimin işlenmesini kabul ediyorum.</span>
            </label>
            <input name="companyWebsite" className="hidden" tabIndex={-1} autoComplete="off" />
            {status === "error" ? <p className="text-sm">{note}</p> : null}
            <button type="submit" disabled={status === "pending"} className="h-12 bg-accent text-sm font-semibold text-paper">
              {status === "pending" ? "Kaydediliyor" : "Kaydol"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}

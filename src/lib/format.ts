export function foldTr(input: string) {
  return input
    .replace(/İ/g, "i")
    .replace(/I/g, "i")
    .replace(/Ş/g, "s")
    .replace(/ş/g, "s")
    .replace(/Ğ/g, "g")
    .replace(/ğ/g, "g")
    .replace(/Ü/g, "u")
    .replace(/ü/g, "u")
    .replace(/Ö/g, "o")
    .replace(/ö/g, "o")
    .replace(/Ç/g, "c")
    .replace(/ç/g, "c")
    .replace(/ı/g, "i")
    .toLowerCase();
}

export function formatDate(input: string | null | undefined) {
  if (!input) return "—";
  const d = new Date(input);
  if (Number.isNaN(d.getTime())) return input;
  return new Intl.DateTimeFormat("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Europe/Istanbul",
  }).format(d);
}

export function formatDateTime(input: string | null | undefined) {
  if (!input) return "—";
  const d = new Date(input);
  if (Number.isNaN(d.getTime())) return input;
  return new Intl.DateTimeFormat("tr-TR", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/Istanbul",
  }).format(d);
}

export function formatTry(value: number) {
  return `${new Intl.NumberFormat("tr-TR").format(Math.round(value))} TL`;
}

export function formatNum(value: number) {
  return new Intl.NumberFormat("tr-TR").format(Math.round(value));
}

export function formatPct(value: number) {
  const sign = value > 0 ? "+" : "";
  return `${sign}${new Intl.NumberFormat("tr-TR", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(value)}%`;
}

export function monthLabel(key: string) {
  const [year, month] = key.split("-");
  const d = new Date(Date.UTC(Number(year), Number(month) - 1, 1));
  if (Number.isNaN(d.getTime())) return key;
  return new Intl.DateTimeFormat("tr-TR", { month: "short" }).format(d);
}

const PLAN_LABEL: Record<string, string> = {
  free: "Free",
  pro: "Pro",
  premium: "Premium",
  region_partner: "Region Partner",
};

export function planLabel(plan: string) {
  return PLAN_LABEL[plan] ?? plan;
}

const STATUS_LABEL: Record<string, string> = {
  draft: "Taslak",
  review: "İnceleme",
  scheduled: "Zamanlanmış",
  published: "Yayında",
  rejected: "Reddedildi",
  discovered: "Bulundu",
  researching: "Araştırılıyor",
  verified: "Doğrulandı",
  written: "Yazıldı",
  approved: "Onaylandı",
  idle: "Beklemede",
  running: "Çalışıyor",
  paused: "Durduruldu",
  error: "Hata",
  new: "Yeni",
  reviewed: "Görüldü",
  assigned: "Atandı",
  closed: "Kapandı",
  planning: "Planlama",
  sales: "Satış",
  construction: "İnşaat",
};

export function statusLabel(value: string) {
  return STATUS_LABEL[value] ?? value;
}

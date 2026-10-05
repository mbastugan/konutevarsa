export const SITE = {
  name: "Konutevarsa",
  tagline: "Gayrimenkulün Gündemi",
  description:
    "Konut piyasası, kira, yatırım, kentsel dönüşüm ve mevzuat. Türkiye gayrimenkul gündemini haber, bölge ve emlak profesyoneli katmanlarıyla izleyen yayın.",
  publisher: "Konutevarsa Haber Merkezi",
  locale: "tr-TR",
  emailLabel: "editoryal@konutevarsa.com",
} as const;

export function absUrl(origin: string, path: string) {
  if (!origin) return path;
  return `${origin.replace(/\/$/, "")}${path.startsWith("/") ? path : `/${path}`}`;
}

export async function requestOrigin(): Promise<string> {
  try {
    const { getRequestUrl } = await import("@tanstack/react-start/server");
    return getRequestUrl({ xForwardedHost: true, xForwardedProto: true }).origin;
  } catch {
    const fromEnv = import.meta.env.VITE_SITE_URL;
    return typeof fromEnv === "string" ? fromEnv.replace(/\/$/, "") : "";
  }
}

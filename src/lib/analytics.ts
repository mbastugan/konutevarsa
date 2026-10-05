/**
 * Central analytics switches. Scripts render only when a real id is provided
 * at build time. Never invent measurement ids.
 */
function envString(name: string) {
  const value = (import.meta.env as Record<string, string | boolean | undefined>)[name];
  return typeof value === "string" ? value.trim() : "";
}

export const analyticsConfig = {
  googleAnalyticsId: envString("VITE_GA_MEASUREMENT_ID"),
  searchConsoleVerification: envString("VITE_GSC_VERIFICATION"),
  clarityId: envString("VITE_CLARITY_ID"),
  metaPixelId: envString("VITE_META_PIXEL_ID"),
};

export function analyticsScripts() {
  const scripts: { src?: string; children?: string }[] = [];
  const { googleAnalyticsId, clarityId, metaPixelId } = analyticsConfig;
  if (googleAnalyticsId) {
    scripts.push({
      src: `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(googleAnalyticsId)}`,
    });
    scripts.push({
      children: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${googleAnalyticsId}');`,
    });
  }
  if (clarityId) {
    scripts.push({
      children: `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window, document, "clarity", "script", "${clarityId}");`,
    });
  }
  if (metaPixelId) {
    scripts.push({
      children: `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window, document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${metaPixelId}');fbq('track','PageView');`,
    });
  }
  return scripts;
}

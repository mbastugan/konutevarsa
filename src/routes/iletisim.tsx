import { createFileRoute } from "@tanstack/react-router";
import { LeadForm } from "@/components/site/forms";
import { LegalPage } from "@/components/site/legal";
import { SiteShell } from "@/components/site/shell";
import { policyByPath } from "@/lib/policies";

const policy = policyByPath("/iletisim")!;

export const Route = createFileRoute("/iletisim")({
  head: () => ({
    meta: [
      { title: "İletişim — Konutevarsa" },
      { name: "description", content: policy.lede },
    ],
    links: [{ rel: "canonical", href: "/iletisim" }],
  }),
  component: function Page() {
    return (
      <SiteShell>
        <LegalPage policy={policy}>
          <div className="mt-8">
            <LeadForm
              sourcePage="/iletisim"
              defaultType="CONTACT"
              heading="Mesaj bırakın"
              sub="Düzeltme, yayın notu veya genel soru. Otomatik yanıt yoktur."
            />
          </div>
        </LegalPage>
      </SiteShell>
    );
  },
});

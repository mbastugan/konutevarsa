import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/site/legal";
import { SiteShell } from "@/components/site/shell";
import { policyByPath } from "@/lib/policies";

const policy = policyByPath("/cerez-politikasi")!;

export const Route = createFileRoute("/cerez-politikasi")({
  head: () => ({
    meta: [
      { title: `${policy.title} — Konutevarsa` },
      { name: "description", content: policy.lede },
    ],
    links: [{ rel: "canonical", href: policy.path }],
  }),
  component: () => (
    <SiteShell>
      <LegalPage policy={policy} />
    </SiteShell>
  ),
});

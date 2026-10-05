import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/site/legal";
import { SiteShell } from "@/components/site/shell";
import { policyByPath } from "@/lib/policies";

const policy = policyByPath("/hakkimizda")!;

export const Route = createFileRoute("/hakkimizda")({
  head: () => ({
    meta: [
      { title: `${policy.title} — Konutevarsa` },
      { name: "description", content: policy.lede },
    ],
    links: [{ rel: "canonical", href: policy.path }],
  }),
  component: function Page() {
    return (
      <SiteShell>
        <LegalPage policy={policy} />
      </SiteShell>
    );
  },
});

import { createFileRoute } from "@tanstack/react-router";
import { SourcesScreen } from "@/components/admin/screens";

export const Route = createFileRoute("/admin/sources")({
  component: SourcesScreen,
});

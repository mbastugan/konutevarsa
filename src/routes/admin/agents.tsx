import { createFileRoute } from "@tanstack/react-router";
import { AgentsScreen } from "@/components/admin/screens";

export const Route = createFileRoute("/admin/agents")({
  component: AgentsScreen,
});

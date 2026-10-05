import { createFileRoute } from "@tanstack/react-router";
import { DashboardScreen } from "@/components/admin/screens";

export const Route = createFileRoute("/admin/")({
  component: DashboardScreen,
});

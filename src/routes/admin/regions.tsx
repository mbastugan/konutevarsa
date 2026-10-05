import { createFileRoute } from "@tanstack/react-router";
import { RegionsAdminScreen } from "@/components/admin/screens";

export const Route = createFileRoute("/admin/regions")({
  component: RegionsAdminScreen,
});

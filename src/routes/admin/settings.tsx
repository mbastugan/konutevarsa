import { createFileRoute } from "@tanstack/react-router";
import { SettingsScreen } from "@/components/admin/screens";

export const Route = createFileRoute("/admin/settings")({
  component: SettingsScreen,
});

import { createFileRoute } from "@tanstack/react-router";
import { LeadsScreen } from "@/components/admin/screens";

export const Route = createFileRoute("/admin/leads")({
  component: LeadsScreen,
});

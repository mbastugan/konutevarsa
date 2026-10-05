import { createFileRoute } from "@tanstack/react-router";
import { BrokersAdminScreen } from "@/components/admin/screens";

export const Route = createFileRoute("/admin/brokers")({
  component: BrokersAdminScreen,
});

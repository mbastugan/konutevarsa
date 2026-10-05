import { createFileRoute } from "@tanstack/react-router";
import { AdsScreen } from "@/components/admin/screens";

export const Route = createFileRoute("/admin/ads")({
  component: AdsScreen,
});

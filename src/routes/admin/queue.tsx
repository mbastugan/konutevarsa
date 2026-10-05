import { createFileRoute } from "@tanstack/react-router";
import { QueueScreen } from "@/components/admin/screens";

export const Route = createFileRoute("/admin/queue")({
  component: QueueScreen,
});

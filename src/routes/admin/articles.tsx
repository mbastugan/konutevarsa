import { createFileRoute } from "@tanstack/react-router";
import { ArticlesScreen } from "@/components/admin/screens";

export const Route = createFileRoute("/admin/articles")({
  component: ArticlesScreen,
});

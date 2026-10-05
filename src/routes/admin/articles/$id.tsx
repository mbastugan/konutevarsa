import { createFileRoute } from "@tanstack/react-router";
import { ArticleEditScreen } from "@/components/admin/screens";

export const Route = createFileRoute("/admin/articles/$id")({
  component: function EditRoute() {
    const { id } = Route.useParams();
    return <ArticleEditScreen id={id} />;
  },
});

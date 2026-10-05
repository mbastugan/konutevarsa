import { createFileRoute, Outlet } from "@tanstack/react-router";
import { AdminFrame } from "@/components/admin/frame";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Masa — Konutevarsa" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: function AdminLayout() {
    return (
      <AdminFrame>
        <Outlet />
      </AdminFrame>
    );
  },
});

import dynamic from "next/dynamic";

const AdminPanel = dynamic(() => import("@/components/admin-panel"), {
  ssr: false,
});

export default function AdminPage() {
  return <AdminPanel />;
}
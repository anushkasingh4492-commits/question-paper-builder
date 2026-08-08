import Sidebar from "./Sidebar";
import Topbar from "./topbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[var(--color-paper-50)]">
  <Sidebar />

  <div className="ml-[248px] flex flex-1 flex-col">
    <Topbar />

    <main className="flex-1 p-8">
      {children}
    </main>
  </div>
</div>
  );
}
import Sidebar from "./Sidebar";
import Topbar from "./topbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1">
        <Topbar />

        <main className="p-6 bg-slate-100 min-h-screen">
          {children}
        </main>
      </div>
    </div>
  );
}
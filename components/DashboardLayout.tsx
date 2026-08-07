import Sidebar from "./Sidebar";
import Topbar from "./topbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[#fbf7f2]">
      {/* Sidebar */}
      <Sidebar />

      {/* Content */}
      <div className="flex-1 flex flex-col">
        <Topbar />

      <main className="ml-[248px] p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
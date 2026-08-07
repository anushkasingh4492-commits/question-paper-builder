"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  Files,
  Folder,
  BookOpen,
  Settings,
} from "lucide-react";

const menuItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
  },
  {
    title: "Create Paper",
    icon: FileText,
    href: "/create-paper",
  },
  {
    title: "My Papers",
    icon: Files,
    href: "/papers",
  },
  {
    title: "Templates",
    icon: Folder,
    href: "/templates",
  },
  {
    title: "Drafts",
    icon: BookOpen,
    href: "/drafts",
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-72 min-h-screen bg-white border-r border-[#eee4d8] flex flex-col">

      {/* Logo */}
      <div className="px-6 py-6">
        <h1
          className="text-3xl font-semibold text-[#6f2332]"
          style={{ fontFamily: "Source Serif 4, serif" }}
        >
          Paper Tree
        </h1>

        <p className="text-sm text-[#75685d] mt-2">
          Assessment Creation Tool
        </p>
      </div>


      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;

          return (
            <Link
              key={item.title}
              href={item.href}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 transition-all ${
                active
                  ? "bg-[#6f2332] text-white shadow-sm"
                  : "text-[#4b4b4b] hover:bg-[#f7f2ec]"
              }`}
            >
              <Icon size={20} />
              <span className="font-medium">
                {item.title}
              </span>
            </Link>
          );
        })}
      </nav>


      {/* Bottom */}
      <div className="border-t border-[#eee4d8] p-4">
        <Link
          href="/settings"
          className="flex items-center gap-3 rounded-xl px-4 py-3 text-[#4b4b4b] hover:bg-[#f7f2ec]"
        >
          <Settings size={20} />
          <span>Settings</span>
        </Link>
      </div>

    </aside>
  );
}
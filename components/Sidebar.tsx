"use client";

import Link from "next/link";
import {
  LayoutDashboard,
  FileText,
  BookOpen,
  Folder,
  Settings,
  Files,
  LayoutTemplate,
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

 
];

export default function Sidebar() {
  return (
    <aside className="w-64 h-screen bg-white border-r flex flex-col">
      <div className="p-6 border-b">
        <h1 className="text-xl font-bold text-blue-600">
          Paper Generator
        </h1>
        <p className="text-sm text-gray-500">
          Assessment Creation Tool
        </p>
      </div>

      <nav className="flex-1 p-4 space-y-2">
       {menuItems.map((item) => (
  <Link
    key={item.href}
    href={item.href}
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-blue-50 transition"
          >
            <item.icon size={20} />
            {item.title}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
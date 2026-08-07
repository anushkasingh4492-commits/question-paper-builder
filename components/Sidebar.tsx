"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  FilePlus,
  Files,
  BookOpen,
  Folder,
  Settings,
  Sparkles,
} from "lucide-react";

const menuItems = [
  {
    title: "Home",
    icon: Home,
    href: "/dashboard",
  },
  {
    title: "Create Paper",
    icon: FilePlus,
    href: "/create-paper",
  },
  {
    title: "Papers",
    icon: Files,
    href: "/papers",
  },
  {
    title: "Question Bank",
    icon: BookOpen,
    href: "/question-bank",
  },
  {
    title: "Templates",
    icon: Folder,
    href: "/templates",
  },
  {
    title: "Settings",
    icon: Settings,
    href: "/settings",
  },
  {
    title: "Design System",
    icon: Sparkles,
    href: "/design-system",
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-[248px] min-h-screen bg-[#fffdf9] border-r border-[#eadfce] flex flex-col fixed left-0 top-0">

      {/* Logo */}
      <div className="px-6 py-7">

        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-[#7b2140] flex items-center justify-center text-white font-bold text-xl">
            P
          </div>

          <div>
            <h1
              className="text-xl font-semibold text-[#7b2140]"
              style={{
                fontFamily: "Source Serif 4, serif",
              }}
            >
              Paper Tree
            </h1>

            <p className="text-xs text-[#75685d]">
              Test Generator
            </p>
          </div>
        </div>

      </div>


      {/* Menu */}
      <nav className="flex-1 px-4 space-y-2">

        {menuItems.map((item) => {

          const Icon = item.icon;

          const active =
            pathname === item.href;

          return (
            <Link
              key={item.title}
              href={item.href}
              className={`
                flex items-center gap-3
                px-4 py-3
                rounded-xl
                transition-all
                ${
                  active
                  ? "bg-[#7b2140] text-white"
                  : "text-[#4b4b4b] hover:bg-[#f5eee4]"
                }
              `}
            >

              <Icon size={20}/>

              <span className="font-medium">
                {item.title}
              </span>

            </Link>
          );

        })}

      </nav>


      {/* Footer */}
      <div className="px-4 py-5 border-t border-[#eadfce]">

        <p className="text-xs text-[#9b8d80] px-4">
          Assessment Creation Tool
        </p>

      </div>


    </aside>
  );
}
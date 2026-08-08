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
  
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-[248px] flex-col border-r border-[var(--color-border)] bg-[var(--color-surface)]">
      {/* Logo */}
      <div className="flex items-center gap-3 border-b border-[var(--color-border)] px-5 py-5">
        <img
          src="/assets/logo.png"
          alt="Paper Tree"
          className="h-10 w-auto object-contain"
        />

        <div>
          <h1
            className="text-lg font-semibold text-[var(--color-brand)]"
            style={{ fontFamily: "Source Serif 4, serif" }}
          >
            Paper Tree
          </h1>

          <p className="text-xs text-[var(--color-text-muted)]">
            Test Generator
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-2 py-3">
        {menuItems.map((item) => {
          const Icon = item.icon;

          const active =
            pathname === item.href ||
            (item.href !== "/dashboard" &&
              pathname.startsWith(`${item.href}/`));

          return (
            <Link
              key={item.title}
              href={item.href}
              className={`flex items-center gap-3 rounded-[8px] px-3 py-2.5 text-sm transition-colors duration-150 ${
                active
                  ? "bg-[var(--color-brand)] text-white"
                  : "text-[var(--color-text)] hover:bg-[var(--color-paper-50)]"
              }`}
            >
              <Icon size={18} strokeWidth={1.7} />

              <span className="font-medium">
                {item.title}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-[var(--color-border)] px-4 py-4">
        <p className="text-xs leading-relaxed text-[var(--color-text-muted)]">
          Assessment Creation Tool
        </p>
      </div>
    </aside>
  );
}
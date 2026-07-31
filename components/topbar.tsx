"use client";

import { Bell, Search, UserCircle } from "lucide-react";

export default function Topbar() {
  return (
    <header className="h-16 bg-white border-b flex items-center justify-between px-6">
      <div className="flex items-center gap-2 border rounded-lg px-3 py-2 w-80">
        <Search size={18} />
        <input
          className="outline-none w-full"
          placeholder="Search..."
        />
      </div>

      <div className="flex items-center gap-5">
        <Bell />
        <UserCircle size={30} />
      </div>
    </header>
  );
}
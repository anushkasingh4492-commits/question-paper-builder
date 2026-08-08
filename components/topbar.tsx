"use client";

import { Bell, Search, UserCircle } from "lucide-react";

export default function Topbar() {
  return (
    <header className="px-8 py-5 flex items-center justify-between bg-[var(--color-paper-0)] border-b border-[var(--color-border)] shadow-[var(--shadow-card)]">
      
      {/* Search */}
      <div className="flex items-center gap-3 bg-[var(--color-surface-muted)] rounded-[8px] px-3 py-2 w-80">
        <Search size={18}className="text-[var(--color-text-muted)]" />
        <input
          type="text"
          placeholder="Search..."
          className="w-full bg-transparent text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] outline-none"
        />
      </div>


      {/* Right Section */}
      <div className="flex items-center gap-5">
        
        <button className="relative">
          <Bell size={22} className="text-[var(--color-brand)]" />
          <span className="absolute -top-1 -right-1 bg-[var(--color-board-tag)] text-white text-xs rounded-full px-1">
            2
            
          </span>
        </button>


        <div className="flex items-center gap-2 cursor-pointer">
          <UserCircle size={32} />
          <div className="hidden md:block">
            <p className="text-sm font-medium">
              Anushka
            </p>
            <p className="text-xs text-[var(--color-text-muted)]">
              Admin
            </p>
          </div>
        </div>

      </div>
    </header>
  );
}
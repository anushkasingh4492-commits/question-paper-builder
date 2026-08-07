"use client";

import { Bell, Search, UserCircle } from "lucide-react";

export default function Topbar() {
  return (
    <header className="h-16 border-b bg-white flex items-center justify-between px-6">
      
      {/* Search */}
      <div className="flex items-center gap-3 bg-gray-100 rounded-lg px-3 py-2 w-80">
        <Search size={18} className="text-gray-500" />
        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent outline-none text-sm w-full"
        />
      </div>


      {/* Right Section */}
      <div className="flex items-center gap-5">
        
        <button className="relative">
          <Bell size={22} />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1">
            2
          </span>
        </button>


        <div className="flex items-center gap-2 cursor-pointer">
          <UserCircle size={32} />
          <div className="hidden md:block">
            <p className="text-sm font-medium">
              Anushka
            </p>
            <p className="text-xs text-gray-500">
              Admin
            </p>
          </div>
        </div>

      </div>

    </header>
  );
}
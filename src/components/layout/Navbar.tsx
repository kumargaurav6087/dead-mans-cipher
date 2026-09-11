"use client";

import React from "react";
import Link from "next/link";
import { Search, Bell, Shield, Compass, Menu } from "lucide-react";

interface NavbarProps {
  onToggleSidebar?: () => void;
}

export function Navbar({ onToggleSidebar }: NavbarProps) {
  return (
    <header className="sticky top-0 z-30 h-16 bg-[#0B101D]/90 backdrop-blur-md border-b border-[#1E2D4A] px-4 md:px-6 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button
          onClick={onToggleSidebar}
          className="md:hidden text-gray-400 hover:text-white p-2 rounded-lg hover:bg-[#131B2E]"
          aria-label="Toggle Navigation"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Search Bar */}
        <div className="relative w-64 md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full bg-[#131B2E] border border-[#1E2D4A] rounded-lg pl-9 pr-4 py-1.5 text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:border-[#D9A036] transition-colors"
          />
        </div>
      </div>

      {/* Right User & Notification Controls */}
      <div className="flex items-center gap-4">
        <button className="relative p-2 text-gray-400 hover:text-white rounded-lg hover:bg-[#131B2E] transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#D9A036] rounded-full animate-pulse" />
        </button>

        <div className="flex items-center gap-3 pl-3 border-l border-[#1E2D4A]">
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#D9A036] to-[#E5B849] text-[#0B101D] font-bold flex items-center justify-center text-sm shadow-md">
            V
          </div>
          <div className="hidden sm:block text-left">
            <div className="text-sm font-semibold text-gray-200 leading-tight">Vijay</div>
            <div className="text-xs text-[#D9A036] font-medium leading-tight">Security Explorer</div>
          </div>
        </div>
      </div>
    </header>
  );
}

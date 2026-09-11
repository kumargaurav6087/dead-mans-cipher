"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Compass,
  Lock,
  EyeOff,
  Scan,
  ShieldCheck,
  Zap,
  Key,
  History,
  Settings,
  Skull
} from "lucide-react";

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export const navItems = [
  { label: "Command Center", href: "/dashboard", icon: Compass },
  { label: "Encrypt", href: "/encryption", icon: Lock },
  { label: "Hide Secret", href: "/steganography", icon: EyeOff },
  { label: "Extract", href: "/extraction", icon: Scan },
  { label: "Verify Integrity", href: "/integrity", icon: ShieldCheck },
  { label: "Attack Simulator", href: "/attack-simulator", icon: Zap },
  { label: "Key Vault", href: "/key-vault", icon: Key },
  { label: "Message History", href: "/history", icon: History },
  { label: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar({ isOpen = true, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-40 w-64 bg-[#0B101D] border-r border-[#1E2D4A] flex flex-col transition-transform duration-300 md:translate-x-0 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* Brand Header */}
      <div className="h-16 flex items-center px-5 border-b border-[#1E2D4A] gap-3">
        <div className="w-9 h-9 rounded-full bg-[#131B2E] border border-[#D9A036]/50 flex items-center justify-center text-[#D9A036] shadow-sm">
          <Compass className="w-5 h-5 animate-spin-slow" />
        </div>
        <div>
          <div className="text-xs uppercase tracking-wider text-[#D9A036] font-bold">THE DEAD</div>
          <div className="text-sm font-extrabold tracking-wide text-gray-100 font-serif leading-none">MAN'S CIPHER</div>
        </div>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 py-4 px-3 space-y-1.5 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                isActive
                  ? "bg-[#131B2E] text-[#D9A036] border border-[#D9A036]/40 shadow-sm"
                  : "text-gray-400 hover:text-gray-200 hover:bg-[#131B2E]/60"
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? "text-[#D9A036]" : "text-gray-400"}`} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer Branding Info */}
      <div className="p-4 border-t border-[#1E2D4A] text-xs text-gray-500 text-center">
        <span className="text-[#D9A036]">Web Crypto API</span> • Zero Plaintext
      </div>
    </aside>
  );
}

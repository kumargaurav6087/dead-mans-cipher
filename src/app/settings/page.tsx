"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Navbar } from "@/components/layout/Navbar";
import { motion } from "framer-motion";
import { Shield, Lock, Moon, Info, CheckCircle2 } from "lucide-react";

export default function SettingsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0B101D] text-gray-100 flex">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col md:pl-64 min-w-0">
        <Navbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

        <main className="flex-1 p-4 md:p-8 space-y-6 max-w-4xl w-full mx-auto">
          {/* Header Title Banner */}
          <div className="space-y-1">
            <h1 className="text-2xl font-extrabold font-serif tracking-tight text-gray-100">
              Settings
            </h1>
            <p className="text-sm text-gray-400">
              Security preferences and workbench configuration.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
          >
            {/* Security Preferences */}
            <div className="naval-card p-6 space-y-4 shadow-xl">
              <div className="border-b border-[#1E2D4A] pb-3 flex items-center gap-2">
                <Shield className="w-4 h-4 text-[#D9A036]" />
                <h2 className="text-base font-bold text-gray-100">Security Preferences</h2>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#0B101D] border border-[#1E2D4A]">
                  <div>
                    <div className="font-bold text-gray-200">Enforce Zero Plaintext Transmission</div>
                    <div className="text-gray-400 text-[11px]">Never send unencrypted plaintext to backend</div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold text-[10px] flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Enabled
                  </span>
                </div>

                <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#0B101D] border border-[#1E2D4A]">
                  <div>
                    <div className="font-bold text-gray-200">Browser-Native Web Crypto API</div>
                    <div className="text-gray-400 text-[11px]">Hardware-accelerated client encryption</div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold text-[10px] flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Active
                  </span>
                </div>
              </div>
            </div>

            {/* Theme Preference */}
            <div className="naval-card p-6 space-y-4 shadow-xl">
              <div className="border-b border-[#1E2D4A] pb-3 flex items-center gap-2">
                <Moon className="w-4 h-4 text-[#D9A036]" />
                <h2 className="text-base font-bold text-gray-100">Theme & Atmosphere</h2>
              </div>

              <div className="p-3.5 rounded-xl bg-[#0B101D] border border-[#D9A036]/40 flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-[#D9A036]">Dark Naval Pirate Atmosphere</div>
                  <div className="text-gray-400 text-[11px]">Cinematic dark cybersecurity theme</div>
                </div>
                <span className="px-3 py-1 rounded-lg bg-[#131B2E] border border-[#D9A036] text-[#D9A036] font-bold text-[11px]">
                  Default
                </span>
              </div>
            </div>

            {/* Application Information */}
            <div className="naval-card p-6 space-y-4 shadow-xl">
              <div className="border-b border-[#1E2D4A] pb-3 flex items-center gap-2">
                <Info className="w-4 h-4 text-[#D9A036]" />
                <h2 className="text-base font-bold text-gray-100">Application Information</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-3.5 rounded-xl bg-[#0B101D] border border-[#1E2D4A]">
                  <div className="text-gray-400">Application Name</div>
                  <div className="font-bold text-gray-100 font-serif text-sm mt-0.5">The Dead Man's Cipher</div>
                </div>
                <div className="p-3.5 rounded-xl bg-[#0B101D] border border-[#1E2D4A]">
                  <div className="text-gray-400">Version</div>
                  <div className="font-bold text-gray-100 font-mono text-sm mt-0.5">v1.0.0 (Production Scaffolding)</div>
                </div>
              </div>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}

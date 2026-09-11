"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Navbar } from "@/components/layout/Navbar";
import { KeyGenerator } from "@/components/key-vault/KeyGenerator";
import { WaxSealGenerator } from "@/components/key-vault/WaxSealGenerator";
import { motion } from "framer-motion";

export default function KeyVaultPage() {
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
              Key Vault
            </h1>
            <p className="text-sm text-gray-400">
              Generate and manage your cryptographic keys.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
          >
            <KeyGenerator />
            <WaxSealGenerator />
          </motion.div>
        </main>
      </div>
    </div>
  );
}

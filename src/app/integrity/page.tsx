"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Navbar } from "@/components/layout/Navbar";
import { IntegrityChecker } from "@/components/integrity/IntegrityChecker";
import { HashComparison } from "@/components/integrity/HashComparison";
import { motion } from "framer-motion";
import { incrementStat } from "@/lib/storage/local-storage";

export default function IntegrityPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isTampered, setIsTampered] = useState(false);

  const handleVerify = () => {
    setIsTampered(false);
    incrementStat("verified");
  };

  const handleSimulateTamper = () => {
    setIsTampered(true);
    incrementStat("threats");
  };

  return (
    <div className="min-h-screen bg-[#0B101D] text-gray-100 flex">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col md:pl-64 min-w-0 relative">
        <img
          src="/images/maps/antique-map.jpg"
          alt="Nautical Map Texture"
          className="absolute inset-0 w-full h-full object-cover opacity-5 pointer-events-none mix-blend-luminosity"
        />
        <Navbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

        <main className="flex-1 p-4 md:p-8 space-y-6 max-w-7xl w-full mx-auto">
          {/* Header Title Banner */}
          <div className="space-y-1">
            <h1 className="text-2xl font-extrabold font-serif tracking-tight text-gray-100">
              Message Integrity
            </h1>
            <p className="text-sm text-gray-400">
              Ensure your message hasn't been tampered with.
            </p>
          </div>

          {/* Two-Panel Workspace Grid */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
          >
            {/* Left Panel: Integrity Input Form */}
            <div className="lg:col-span-6">
              <IntegrityChecker
                onVerify={handleVerify}
                onSimulateTamper={handleSimulateTamper}
              />
            </div>

            {/* Right Panel: Status Verification Result Display */}
            <div className="lg:col-span-6 h-full">
              <HashComparison isTampered={isTampered} />
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}

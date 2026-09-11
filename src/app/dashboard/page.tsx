"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Navbar } from "@/components/layout/Navbar";
import { DashboardHero } from "@/components/dashboard/DashboardHero";
import { StatsCards } from "@/components/dashboard/StatsCards";
import { SecurityWorkflow } from "@/components/dashboard/SecurityWorkflow";
import { SecurityStatus } from "@/components/dashboard/SecurityStatus";
import { motion } from "framer-motion";

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0B101D] text-gray-100 flex">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col md:pl-64 min-w-0">
        <Navbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

        <main className="flex-1 p-4 md:p-8 space-y-8 max-w-7xl w-full mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <DashboardHero />
            <StatsCards />
            <SecurityWorkflow />
            <SecurityStatus />
          </motion.div>
        </main>
      </div>
    </div>
  );
}

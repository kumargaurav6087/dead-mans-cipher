"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Navbar } from "@/components/layout/Navbar";
import { TextSteganography } from "@/components/steganography/TextSteganography";
import { SvgSteganography } from "@/components/steganography/SvgSteganography";
import { motion } from "framer-motion";
import { FileText, Flag } from "lucide-react";

export default function SteganographyPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"text" | "svg">("text");

  return (
    <div className="min-h-screen bg-[#0B101D] text-gray-100 flex">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col md:pl-64 min-w-0">
        <Navbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

        <main className="flex-1 p-4 md:p-8 space-y-6 max-w-7xl w-full mx-auto">
          {/* Header Title Banner */}
          <div className="space-y-1">
            <h1 className="text-2xl font-extrabold font-serif tracking-tight text-gray-100">
              Hide Your Secret
            </h1>
            <p className="text-sm text-gray-400">
              Conceal your encrypted message within innocent text or a ship flag.
            </p>
          </div>

          {/* Sub Navigation Tabs */}
          <div className="flex items-center gap-3 border-b border-[#1E2D4A] pb-3">
            <button
              onClick={() => setActiveTab("text")}
              className={`px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 transition-all ${
                activeTab === "text"
                  ? "bg-[#131B2E] text-[#D9A036] border border-[#D9A036]/50 shadow-md"
                  : "text-gray-400 hover:text-gray-200"
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Text (Sea Shanty)</span>
            </button>

            <button
              onClick={() => setActiveTab("svg")}
              className={`px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 transition-all ${
                activeTab === "svg"
                  ? "bg-[#131B2E] text-[#D9A036] border border-[#D9A036]/50 shadow-md"
                  : "text-gray-400 hover:text-gray-200"
              }`}
            >
              <Flag className="w-4 h-4" />
              <span>Ship Flag (SVG)</span>
            </button>
          </div>

          {/* Two-Panel Workspace Grid */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
          >
            {/* Left Panel: Text Steganography */}
            <div className="lg:col-span-6">
              <TextSteganography />
            </div>

            {/* Right Panel: SVG Steganography */}
            <div className="lg:col-span-6 h-full">
              <SvgSteganography />
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}

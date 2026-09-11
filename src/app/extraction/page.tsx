"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Navbar } from "@/components/layout/Navbar";
import { ExtractionPanel } from "@/components/extraction/ExtractionPanel";
import { DecryptionPanel } from "@/components/extraction/DecryptionPanel";
import { motion } from "framer-motion";

export default function ExtractionPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [scannedPayload, setScannedPayload] = useState<string>(
    "U2FsdGVkX19xVzV4QnJvd3NlckNyeXB0bzEyMzQ1Njc4OTA="
  );

  const handleScan = (content: string) => {
    setScannedPayload(content || "");
  };

  return (
    <div className="min-h-screen bg-[#0B101D] text-gray-100 flex">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col md:pl-64 min-w-0">
        <Navbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

        <main className="flex-1 p-4 md:p-8 space-y-6 max-w-7xl w-full mx-auto">
          {/* Header Title Banner */}
          <div className="space-y-1">
            <h1 className="text-2xl font-extrabold font-serif tracking-tight text-gray-100">
              Recover the Secret
            </h1>
            <p className="text-sm text-gray-400">
              Scan for hidden payload and decrypt the message.
            </p>
          </div>

          {/* Two-Panel Workspace Grid */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
          >
            {/* Left Panel: Extraction Scanner Input */}
            <div className="lg:col-span-6">
              <ExtractionPanel onScan={handleScan} />
            </div>

            {/* Right Panel: Scan Result & Decryption Panel */}
            <div className="lg:col-span-6 h-full">
              <DecryptionPanel foundPayload={scannedPayload} />
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}

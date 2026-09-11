"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Navbar } from "@/components/layout/Navbar";
import { EncryptionForm } from "@/components/encryption/EncryptionForm";
import { EncryptedPayload } from "@/components/encryption/EncryptedPayload";
import { useEncryption } from "@/hooks/useEncryption";
import { motion } from "framer-motion";

export default function EncryptionPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { encrypt, loading, error } = useEncryption();

  const [encryptedResult, setEncryptedResult] = useState<{
    cipher: string;
    key: string;
    iv: string;
    ciphertext: string;
  }>({
    cipher: "AES-GCM",
    key: "Click 'Encrypt Message' to generate AES-256 key...",
    iv: "Click 'Encrypt Message' to generate IV...",
    ciphertext: "",
  });

  const handleEncryptReal = async (data: {
    message: string;
    lat: string;
    lng: string;
    cipher: string;
  }) => {
    try {
      const result = await encrypt(data.message, data.lat, data.lng);

      setEncryptedResult({
        cipher: "AES-GCM",
        key: result.rawKeyBase64,
        iv: result.rawIvHex,
        ciphertext: result.payloadJson,
      });
    } catch (err: any) {
      // Error handling managed via state and UI
    }
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
              Encryption Lab
            </h1>
            <p className="text-sm text-gray-400">
              Turn your secret into an unreadable treasure.
            </p>
          </div>

          {error && (
            <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-semibold">
              {error}
            </div>
          )}

          {/* Two-Panel Workspace Grid */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
          >
            {/* Left Panel - Input Form */}
            <div className="lg:col-span-6">
              <EncryptionForm onEncrypt={handleEncryptReal} />
            </div>

            {/* Right Panel - Output Payload */}
            <div className="lg:col-span-6 h-full">
              <EncryptedPayload
                cipher={encryptedResult.cipher}
                encryptionKey={encryptedResult.key}
                iv={encryptedResult.iv}
                ciphertext={encryptedResult.ciphertext}
              />
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}

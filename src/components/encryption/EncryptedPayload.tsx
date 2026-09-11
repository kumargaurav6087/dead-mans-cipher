"use client";

import React, { useState } from "react";
import { Copy, Eye, EyeOff, Check } from "lucide-react";

interface EncryptedPayloadProps {
  cipher?: string;
  encryptionKey?: string;
  iv?: string;
  ciphertext?: string;
}

export function EncryptedPayload({
  cipher = "AES-GCM",
  encryptionKey = "7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a",
  iv = "9a8b7c6d5e4f3a2b1c0d9e8f",
  ciphertext = "",
}: EncryptedPayloadProps) {
  const [showKey, setShowKey] = useState(false);
  const [showIv, setShowIv] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copyToClipboard = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div className="naval-card p-6 space-y-6 shadow-xl flex flex-col justify-between h-full">
      <div className="flex items-center justify-between border-b border-[#1E2D4A] pb-4">
        <div>
          <h2 className="text-lg font-bold text-gray-100">Encrypted Payload</h2>
          <p className="text-xs text-gray-400">Browser-encrypted ciphertext and metadata</p>
        </div>
        <button
          onClick={() => copyToClipboard(ciphertext || "Encrypted payload demo data", "all")}
          className="px-3 py-1.5 rounded-lg border border-[#D9A036]/40 bg-[#131B2E] text-xs font-semibold text-[#D9A036] hover:bg-[#D9A036]/10 flex items-center gap-1.5 transition-colors"
        >
          {copiedField === "all" ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
          <span>Copy All</span>
        </button>
      </div>

      {/* Cipher Display */}
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-gray-400 mb-1">Cipher</label>
          <div className="px-3.5 py-2.5 rounded-xl bg-[#0B101D] border border-[#1E2D4A] text-sm font-semibold text-gray-200">
            {cipher}
          </div>
        </div>

        {/* Encryption Key */}
        <div>
          <label className="block text-xs font-semibold text-gray-400 mb-1">Encryption Key</label>
          <div className="relative flex items-center">
            <input
              type={showKey ? "text" : "password"}
              readOnly
              value={encryptionKey}
              className="w-full bg-[#0B101D] border border-[#1E2D4A] rounded-xl pl-3.5 pr-20 py-2.5 text-xs text-gray-200 font-mono tracking-wider focus:outline-none"
            />
            <div className="absolute right-2 flex items-center gap-1">
              <button
                type="button"
                onClick={() => setShowKey(!showKey)}
                className="p-1.5 text-gray-400 hover:text-gray-200 transition-colors"
              >
                {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
              <button
                type="button"
                onClick={() => copyToClipboard(encryptionKey, "key")}
                className="p-1.5 text-gray-400 hover:text-[#D9A036] transition-colors"
              >
                {copiedField === "key" ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>

        {/* IV / Nonce */}
        <div>
          <label className="block text-xs font-semibold text-gray-400 mb-1">IV / Nonce</label>
          <div className="relative flex items-center">
            <input
              type={showIv ? "text" : "password"}
              readOnly
              value={iv}
              className="w-full bg-[#0B101D] border border-[#1E2D4A] rounded-xl pl-3.5 pr-20 py-2.5 text-xs text-gray-200 font-mono tracking-wider focus:outline-none"
            />
            <div className="absolute right-2 flex items-center gap-1">
              <button
                type="button"
                onClick={() => setShowIv(!showIv)}
                className="p-1.5 text-gray-400 hover:text-gray-200 transition-colors"
              >
                {showIv ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
              <button
                type="button"
                onClick={() => copyToClipboard(iv, "iv")}
                className="p-1.5 text-gray-400 hover:text-[#D9A036] transition-colors"
              >
                {copiedField === "iv" ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>

        {/* Encrypted Data (Base64) Code Block */}
        <div>
          <label className="block text-xs font-semibold text-gray-400 mb-1">Encrypted Data (Base64)</label>
          <div className="w-full h-36 bg-[#0B101D] border border-[#1E2D4A] rounded-xl p-3.5 text-xs font-mono text-gray-400 overflow-y-auto break-all">
            {ciphertext || "Encrypted payload will appear here..."}
          </div>
        </div>
      </div>
    </div>
  );
}

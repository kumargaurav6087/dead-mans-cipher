"use client";

import React, { useState } from "react";
import { Eye, EyeOff, Copy, RefreshCw, Key, ShieldCheck } from "lucide-react";

export function KeyGenerator() {
  const [aesKey, setAesKey] = useState("7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a");
  const [hmacSecret, setHmacSecret] = useState("3a2b1c0d9e8f7a6b5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a8b7c6d5e4f3a2b");
  const [ivNonce, setIvNonce] = useState("9a8b7c6d5e4f3a2b1c0d9e8f");

  const [showAes, setShowAes] = useState(false);
  const [showHmac, setShowHmac] = useState(false);
  const [showIv, setShowIv] = useState(false);

  const generateCryptoHex = (bytesCount: number) => {
    const array = new Uint8Array(bytesCount);
    if (typeof window !== "undefined" && window.crypto) {
      window.crypto.getRandomValues(array);
    }
    return Array.from(array)
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  };

  return (
    <div className="naval-card p-6 space-y-6 shadow-xl">
      <div className="border-b border-[#1E2D4A] pb-4">
        <h2 className="text-lg font-bold text-gray-100">Key Vault</h2>
        <p className="text-xs text-gray-400">Generate and manage your cryptographic keys</p>
      </div>

      {/* AES-256 Key Row */}
      <div className="space-y-1.5">
        <label className="block text-xs font-semibold text-gray-400">AES-256 Key</label>
        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <input
              type={showAes ? "text" : "password"}
              readOnly
              value={aesKey}
              className="w-full bg-[#0B101D] border border-[#1E2D4A] rounded-xl pl-3.5 pr-20 py-2.5 text-xs text-gray-200 font-mono tracking-wider focus:outline-none"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
              <button
                type="button"
                onClick={() => setShowAes(!showAes)}
                className="p-1 text-gray-400 hover:text-gray-200"
              >
                {showAes ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
              <button
                type="button"
                onClick={() => navigator.clipboard.writeText(aesKey)}
                className="p-1 text-gray-400 hover:text-[#D9A036]"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>
          </div>
          <button
            onClick={() => setAesKey(generateCryptoHex(32))}
            className="px-4 py-2.5 rounded-xl border border-[#D9A036]/40 bg-[#131B2E] text-xs font-bold text-[#D9A036] hover:bg-[#D9A036]/10 flex items-center gap-1.5 transition-colors shrink-0"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Generate</span>
          </button>
        </div>
      </div>

      {/* HMAC Secret Row */}
      <div className="space-y-1.5">
        <label className="block text-xs font-semibold text-gray-400">HMAC Secret</label>
        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <input
              type={showHmac ? "text" : "password"}
              readOnly
              value={hmacSecret}
              className="w-full bg-[#0B101D] border border-[#1E2D4A] rounded-xl pl-3.5 pr-20 py-2.5 text-xs text-gray-200 font-mono tracking-wider focus:outline-none"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
              <button
                type="button"
                onClick={() => setShowHmac(!showHmac)}
                className="p-1 text-gray-400 hover:text-gray-200"
              >
                {showHmac ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
              <button
                type="button"
                onClick={() => navigator.clipboard.writeText(hmacSecret)}
                className="p-1 text-gray-400 hover:text-[#D9A036]"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>
          </div>
          <button
            onClick={() => setHmacSecret(generateCryptoHex(32))}
            className="px-4 py-2.5 rounded-xl border border-[#D9A036]/40 bg-[#131B2E] text-xs font-bold text-[#D9A036] hover:bg-[#D9A036]/10 flex items-center gap-1.5 transition-colors shrink-0"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Generate</span>
          </button>
        </div>
      </div>

      {/* IV / Nonce Row */}
      <div className="space-y-1.5">
        <label className="block text-xs font-semibold text-gray-400">IV / Nonce</label>
        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <input
              type={showIv ? "text" : "password"}
              readOnly
              value={ivNonce}
              className="w-full bg-[#0B101D] border border-[#1E2D4A] rounded-xl pl-3.5 pr-20 py-2.5 text-xs text-gray-200 font-mono tracking-wider focus:outline-none"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
              <button
                type="button"
                onClick={() => setShowIv(!showIv)}
                className="p-1 text-gray-400 hover:text-gray-200"
              >
                {showIv ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
              <button
                type="button"
                onClick={() => navigator.clipboard.writeText(ivNonce)}
                className="p-1 text-gray-400 hover:text-[#D9A036]"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>
          </div>
          <button
            onClick={() => setIvNonce(generateCryptoHex(12))}
            className="px-4 py-2.5 rounded-xl border border-[#D9A036]/40 bg-[#131B2E] text-xs font-bold text-[#D9A036] hover:bg-[#D9A036]/10 flex items-center gap-1.5 transition-colors shrink-0"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Generate</span>
          </button>
        </div>
      </div>
    </div>
  );
}

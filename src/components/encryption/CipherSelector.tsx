"use client";

import React from "react";
import { Shield, Zap } from "lucide-react";

interface CipherSelectorProps {
  selectedCipher: string;
  onSelectCipher: (cipher: string) => void;
}

export function CipherSelector({ selectedCipher, onSelectCipher }: CipherSelectorProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      <button
        type="button"
        onClick={() => onSelectCipher("AES-GCM")}
        className={`p-3 rounded-xl border text-left transition-all ${
          selectedCipher === "AES-GCM"
            ? "bg-[#131B2E] border-[#D9A036] text-[#D9A036]"
            : "bg-[#0B101D] border-[#1E2D4A] text-gray-400 hover:border-gray-600"
        }`}
      >
        <div className="flex items-center gap-2 font-bold text-sm text-gray-200">
          <Shield className="w-4 h-4 text-[#D9A036]" />
          AES-GCM
        </div>
        <div className="text-[10px] text-gray-500 mt-1">256-bit Web Crypto API</div>
      </button>

      <button
        type="button"
        onClick={() => onSelectCipher("ChaCha20")}
        className={`p-3 rounded-xl border text-left transition-all ${
          selectedCipher === "ChaCha20"
            ? "bg-[#131B2E] border-[#D9A036] text-[#D9A036]"
            : "bg-[#0B101D] border-[#1E2D4A] text-gray-400 hover:border-gray-600"
        }`}
      >
        <div className="flex items-center gap-2 font-bold text-sm text-gray-200">
          <Zap className="w-4 h-4 text-[#D9A036]" />
          ChaCha20
        </div>
        <div className="text-[10px] text-gray-500 mt-1">Stream Cipher</div>
      </button>
    </div>
  );
}

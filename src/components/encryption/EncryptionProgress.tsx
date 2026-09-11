"use client";

import React from "react";
import { Lock } from "lucide-react";

interface EncryptionProgressProps {
  progress?: number;
  statusText?: string;
}

export function EncryptionProgress({
  progress = 100,
  statusText = "Payload Encrypted Client-Side",
}: EncryptionProgressProps) {
  return (
    <div className="p-4 rounded-xl bg-[#0B101D] border border-[#1E2D4A] space-y-2">
      <div className="flex items-center justify-between text-xs">
        <span className="flex items-center gap-1.5 font-semibold text-gray-300">
          <Lock className="w-3.5 h-3.5 text-[#D9A036]" />
          {statusText}
        </span>
        <span className="font-mono text-[#D9A036] font-bold">{progress}%</span>
      </div>
      <div className="w-full h-2 rounded-full bg-[#131B2E] overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-[#D9A036] to-[#E5B849] transition-all duration-300 rounded-full"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

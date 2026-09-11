"use client";

import React from "react";
import { ShieldCheck } from "lucide-react";

export function HmacVerification() {
  return (
    <div className="p-4 rounded-xl bg-[#0B101D] border border-[#1E2D4A] flex items-center justify-between text-xs">
      <div className="flex items-center gap-2 font-semibold text-gray-300">
        <ShieldCheck className="w-4 h-4 text-[#D9A036]" />
        <span>HMAC-SHA256 Secret Authentication</span>
      </div>
      <span className="text-[#D9A036] font-mono text-[10px]">Verified</span>
    </div>
  );
}

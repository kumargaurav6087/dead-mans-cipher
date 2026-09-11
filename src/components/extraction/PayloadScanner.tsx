"use client";

import React from "react";
import { Scan, Search } from "lucide-react";

interface PayloadScannerProps {
  isScanning?: boolean;
}

export function PayloadScanner({ isScanning = false }: PayloadScannerProps) {
  return (
    <div className="p-4 rounded-xl bg-[#0B101D] border border-[#1E2D4A] flex items-center justify-between text-xs">
      <div className="flex items-center gap-2 text-gray-300 font-semibold">
        <Scan className={`w-4 h-4 text-[#D9A036] ${isScanning ? "animate-spin" : ""}`} />
        <span>{isScanning ? "Scanning content for stego payload..." : "Scanner Ready"}</span>
      </div>
      <span className="text-gray-500 font-mono text-[10px]">Zero-Width & SVG Meta Scan</span>
    </div>
  );
}

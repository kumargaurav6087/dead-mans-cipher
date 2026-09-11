"use client";

import React from "react";
import { Key } from "lucide-react";

interface KeyCardProps {
  label: string;
  type: string;
}

export function KeyCard({ label, type }: KeyCardProps) {
  return (
    <div className="p-4 rounded-xl bg-[#131B2E] border border-[#1E2D4A] flex items-center justify-between text-xs">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-[#0B101D] text-[#D9A036]">
          <Key className="w-4 h-4" />
        </div>
        <div>
          <div className="font-bold text-gray-200">{label}</div>
          <div className="text-[10px] text-gray-500">{type}</div>
        </div>
      </div>
    </div>
  );
}

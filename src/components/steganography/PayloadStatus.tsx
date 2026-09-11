"use client";

import React from "react";
import { CheckCircle2 } from "lucide-react";

interface PayloadStatusProps {
  capacity?: number;
  currentSize?: number;
  status?: string;
}

export function PayloadStatus({
  capacity = 1000,
  currentSize = 0,
  status = "Ready",
}: PayloadStatusProps) {
  return (
    <div className="grid grid-cols-3 gap-3 p-3.5 rounded-xl bg-[#0B101D] border border-[#1E2D4A] text-center text-xs">
      <div>
        <div className="text-gray-400 font-medium">Payload Capacity</div>
        <div className="text-sm font-bold text-gray-200 font-mono mt-0.5">
          {capacity.toLocaleString()} characters
        </div>
      </div>
      <div className="border-x border-[#1E2D4A]">
        <div className="text-gray-400 font-medium">Current Size</div>
        <div className="text-sm font-bold text-gray-200 font-mono mt-0.5">
          {currentSize.toLocaleString()} characters
        </div>
      </div>
      <div>
        <div className="text-gray-400 font-medium">Status</div>
        <div className="text-sm font-bold text-emerald-400 mt-0.5 flex items-center justify-center gap-1">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>{status}</span>
        </div>
      </div>
    </div>
  );
}

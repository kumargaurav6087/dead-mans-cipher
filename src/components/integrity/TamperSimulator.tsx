"use client";

import React from "react";
import { AlertTriangle } from "lucide-react";

interface TamperSimulatorProps {
  onSimulate?: () => void;
}

export function TamperSimulator({ onSimulate }: TamperSimulatorProps) {
  return (
    <button
      onClick={onSimulate}
      className="w-full py-2.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 hover:bg-rose-500/20 text-xs font-bold flex items-center justify-center gap-2 transition-colors"
    >
      <AlertTriangle className="w-4 h-4" />
      <span>Simulate Data Tampering Attack</span>
    </button>
  );
}

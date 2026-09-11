"use client";

import React from "react";
import { ShieldCheck, Lock, Eye, CheckCircle2, Shield } from "lucide-react";

export function SecurityStatus() {
  const telemetryItems = [
    { label: "Client-Side Crypto", status: "ACTIVE", icon: Lock, color: "text-emerald-400" },
    { label: "Zero Plaintext", status: "ENFORCED", icon: Shield, color: "text-emerald-400" },
    { label: "AES-GCM", status: "ACTIVE", icon: CheckCircle2, color: "text-emerald-400" },
    { label: "Integrity Protection", status: "ACTIVE", icon: ShieldCheck, color: "text-emerald-400" },
    { label: "Steganography", status: "ACTIVE", icon: Eye, color: "text-emerald-400" },
  ];

  return (
    <div className="p-6 rounded-2xl bg-[#131B2E] border border-[#1E2D4A] shadow-xl space-y-4">
      <div className="border-b border-[#1E2D4A] pb-3">
        <h3 className="text-base font-bold text-gray-200">Security Telemetry</h3>
        <p className="text-xs text-gray-400">Real-time client-side cryptographic status</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {telemetryItems.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="p-3.5 rounded-xl bg-[#0B101D] border border-[#1E2D4A] flex items-center justify-between"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <Icon className={`w-4 h-4 shrink-0 ${item.color}`} />
                <span className="text-xs font-semibold text-gray-300 truncate">
                  {item.label}
                </span>
              </div>
              <span className="text-[11px] font-mono font-extrabold text-emerald-400 flex items-center gap-1 shrink-0 ml-2">
                ✓ {item.status}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}


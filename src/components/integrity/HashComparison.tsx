"use client";

import React from "react";
import { CheckCircle2, AlertOctagon, Check, X } from "lucide-react";

interface HashComparisonProps {
  isTampered?: boolean;
}

export function HashComparison({ isTampered = false }: HashComparisonProps) {
  return (
    <div className="naval-card p-8 space-y-8 shadow-xl flex flex-col items-center justify-center text-center h-full">
      <div className="text-xs uppercase font-mono tracking-wider text-gray-400">
        Status Verification
      </div>

      {/* Main Large Icon Circle */}
      {isTampered ? (
        <div className="w-24 h-24 rounded-full bg-rose-500/10 border-2 border-rose-500/50 flex items-center justify-center text-rose-500 shadow-2xl animate-pulse">
          <AlertOctagon className="w-12 h-12" />
        </div>
      ) : (
        <div className="w-24 h-24 rounded-full bg-emerald-500/10 border-2 border-emerald-500/50 flex items-center justify-center text-emerald-400 shadow-2xl">
          <CheckCircle2 className="w-12 h-12" />
        </div>
      )}

      {/* Status Heading */}
      <div>
        <h3
          className={`text-xl font-extrabold tracking-wide uppercase font-serif ${
            isTampered ? "text-rose-400" : "text-emerald-400"
          }`}
        >
          {isTampered ? "TAMPERING DETECTED" : "MESSAGE VERIFIED"}
        </h3>
        <p className="text-xs text-gray-400 mt-1">
          {isTampered
            ? "Payload signature mismatch! Do not trust this payload."
            : "All cryptographic integrity checks passed successfully."}
        </p>
      </div>

      {/* Checklist */}
      <div className="w-full max-w-xs space-y-3 text-xs text-left bg-[#0B101D] p-4 rounded-xl border border-[#1E2D4A]">
        <div className="flex items-center gap-2.5">
          {isTampered ? (
            <X className="w-4 h-4 text-rose-400 shrink-0" />
          ) : (
            <Check className="w-4 h-4 text-emerald-400 shrink-0" />
          )}
          <span className={isTampered ? "text-rose-300 font-semibold" : "text-gray-200 font-medium"}>
            {isTampered ? "SHA-256 Mismatch" : "SHA-256 Match"}
          </span>
        </div>

        <div className="flex items-center gap-2.5">
          {isTampered ? (
            <X className="w-4 h-4 text-rose-400 shrink-0" />
          ) : (
            <Check className="w-4 h-4 text-emerald-400 shrink-0" />
          )}
          <span className={isTampered ? "text-rose-300 font-semibold" : "text-gray-200 font-medium"}>
            {isTampered ? "Invalid HMAC Signature" : "HMAC Valid"}
          </span>
        </div>

        <div className="flex items-center gap-2.5">
          {isTampered ? (
            <X className="w-4 h-4 text-rose-400 shrink-0" />
          ) : (
            <Check className="w-4 h-4 text-emerald-400 shrink-0" />
          )}
          <span className={isTampered ? "text-rose-300 font-semibold" : "text-gray-200 font-medium"}>
            {isTampered ? "Payload Altered" : "Payload Unaltered"}
          </span>
        </div>
      </div>
    </div>
  );
}

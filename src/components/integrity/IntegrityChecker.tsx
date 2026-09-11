"use client";

import React, { useState } from "react";
import { ShieldCheck, AlertTriangle, Copy } from "lucide-react";

interface IntegrityCheckerProps {
  onVerify?: (text: string) => void;
  onSimulateTamper?: () => void;
}

export function IntegrityChecker({ onVerify, onSimulateTamper }: IntegrityCheckerProps) {
  const [data, setData] = useState("Across the waves we sail, Beneath the stars and silver veil...");
  const [sha256Hash] = useState("e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855");
  const [hmacHash] = useState("9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a8b");

  return (
    <div className="naval-card p-6 space-y-6 shadow-xl">
      <div className="border-b border-[#1E2D4A] pb-4">
        <h2 className="text-lg font-bold text-gray-100">Message Integrity</h2>
        <p className="text-xs text-gray-400">Ensure your message hasn't been tampered with</p>
      </div>

      {/* Original Data Input */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
          Original Data
        </label>
        <textarea
          value={data}
          onChange={(e) => setData(e.target.value)}
          placeholder="Enter or paste the message..."
          rows={3}
          className="w-full bg-[#0B101D] border border-[#1E2D4A] rounded-xl p-3.5 text-xs text-gray-200 font-mono focus:outline-none focus:border-[#D9A036] resize-none"
        />
      </div>

      {/* SHA-256 Hash Field */}
      <div>
        <div className="flex items-center justify-between mb-1">
          <label className="text-xs font-semibold text-gray-400">SHA-256 Hash</label>
          <button
            onClick={() => navigator.clipboard.writeText(sha256Hash)}
            className="text-[10px] text-[#D9A036] hover:underline flex items-center gap-1"
          >
            <Copy className="w-3 h-3" />
            <span>Copy</span>
          </button>
        </div>
        <input
          type="text"
          readOnly
          value={sha256Hash}
          className="w-full bg-[#0B101D] border border-[#1E2D4A] rounded-xl px-3.5 py-2.5 text-xs text-gray-400 font-mono tracking-wider focus:outline-none"
        />
      </div>

      {/* HMAC-SHA256 Field */}
      <div>
        <div className="flex items-center justify-between mb-1">
          <label className="text-xs font-semibold text-gray-400">HMAC-SHA256 Signature</label>
          <button
            onClick={() => navigator.clipboard.writeText(hmacHash)}
            className="text-[10px] text-[#D9A036] hover:underline flex items-center gap-1"
          >
            <Copy className="w-3 h-3" />
            <span>Copy</span>
          </button>
        </div>
        <input
          type="text"
          readOnly
          value={hmacHash}
          className="w-full bg-[#0B101D] border border-[#1E2D4A] rounded-xl px-3.5 py-2.5 text-xs text-gray-400 font-mono tracking-wider focus:outline-none"
        />
      </div>

      {/* Action Buttons */}
      <div className="space-y-3 pt-2">
        <button
          onClick={() => onVerify && onVerify(data)}
          className="w-full py-3.5 rounded-xl gold-button flex items-center justify-center gap-2 text-sm font-bold shadow-lg"
        >
          <ShieldCheck className="w-4 h-4" />
          <span>Verify Integrity</span>
        </button>

        <button
          onClick={onSimulateTamper}
          className="w-full py-3 rounded-xl bg-rose-500/10 border border-rose-500/40 text-rose-400 hover:bg-rose-500/20 text-xs font-bold flex items-center justify-center gap-2 transition-colors"
        >
          <AlertTriangle className="w-4 h-4" />
          <span>Simulate Tampering</span>
        </button>
      </div>
    </div>
  );
}

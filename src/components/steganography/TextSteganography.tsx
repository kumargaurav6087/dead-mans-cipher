"use client";

import React, { useState } from "react";
import { SeaShantyEditor } from "./SeaShantyEditor";
import { PayloadStatus } from "./PayloadStatus";
import { useSteganography } from "@/hooks/useSteganography";
import { Lock, Scan, CheckCircle2, Copy } from "lucide-react";

export function TextSteganography() {
  const { embedText, extractText, loading, error } = useSteganography();
  const [shantyText, setShantyText] = useState(
    "Across the waves we sail,\nBeneath the stars and silver veil,\nWith courage deep and hearts so true,\nThe ocean hides what we pursue..."
  );
  const [secretPayload, setSecretPayload] = useState(
    '{\n  "version": "1.0",\n  "algorithm": "AES-GCM",\n  "ciphertext": "U2FsdGVkX19xVzV4...",\n  "iv": "9a8b7c6d5e4f"\n}'
  );
  const [stegoResult, setStegoResult] = useState<string | null>(null);
  const [extractedResult, setExtractedResult] = useState<string | null>(null);

  const handleEmbed = () => {
    try {
      const res = embedText(shantyText, secretPayload);
      setStegoResult(res);
      setExtractedResult(null);
    } catch (err) {
      // error set in hook
    }
  };

  const handleExtract = () => {
    try {
      const targetText = stegoResult || shantyText;
      const res = extractText(targetText);
      setExtractedResult(res);
    } catch (err) {
      setExtractedResult(null);
    }
  };

  return (
    <div className="naval-card p-6 space-y-6 shadow-xl">
      <SeaShantyEditor value={shantyText} onChange={setShantyText} />

      {/* Payload Input */}
      <div>
        <label className="block text-xs font-semibold text-gray-400 mb-1">
          Encrypted Payload to Hide
        </label>
        <textarea
          value={secretPayload}
          onChange={(e) => setSecretPayload(e.target.value)}
          placeholder="Paste JSON or Base64 encrypted payload..."
          rows={2}
          className="w-full bg-[#0B101D] border border-[#1E2D4A] rounded-xl p-3 text-xs font-mono text-gray-300 focus:outline-none focus:border-[#D9A036] resize-none"
        />
      </div>

      {error && (
        <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-semibold">
          {error}
        </div>
      )}

      {/* Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <button
          onClick={handleEmbed}
          disabled={loading}
          className="py-3 rounded-xl gold-button flex items-center justify-center gap-2 text-sm font-bold shadow-md"
        >
          <Lock className="w-4 h-4" />
          <span>{loading ? "Embedding..." : "Hide Secret"}</span>
        </button>
        <button
          onClick={handleExtract}
          disabled={loading}
          className="py-3 rounded-xl bg-[#0B101D] border border-[#1E2D4A] hover:border-[#D9A036]/50 text-gray-200 text-sm font-semibold flex items-center justify-center gap-2 transition-colors"
        >
          <Scan className="w-4 h-4 text-[#D9A036]" />
          <span>Extract Secret</span>
        </button>
      </div>

      {stegoResult && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 space-y-2">
          <div className="text-xs font-bold flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              ✓ SECRET HIDDEN (Zero-width payload embedded into Sea Shanty text)
            </span>
            <button
              onClick={() => navigator.clipboard.writeText(stegoResult)}
              className="text-xs text-[#D9A036] hover:underline flex items-center gap-1"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>Copy Text</span>
            </button>
          </div>
        </div>
      )}

      {extractedResult && (
        <div className="p-4 rounded-xl bg-[#0B101D] border border-[#D9A036]/40 space-y-1">
          <div className="text-xs font-bold text-[#D9A036] uppercase tracking-wider">
            ✓ Extracted Hidden Payload
          </div>
          <div className="text-xs font-mono text-gray-200 break-all max-h-24 overflow-y-auto">
            {extractedResult}
          </div>
        </div>
      )}

      {/* Payload Capacity / Status */}
      <PayloadStatus
        capacity={1000}
        currentSize={shantyText.length}
        status={stegoResult ? "Hidden Payload Embedded" : "Ready"}
      />
    </div>
  );
}

"use client";

import React, { useState } from "react";
import { CheckCircle2, Copy, KeyRound, Lock, MapPin, Key } from "lucide-react";
import { useEncryption } from "@/hooks/useEncryption";

interface DecryptionPanelProps {
  foundPayload?: string;
}

export function DecryptionPanel({
  foundPayload = "",
}: DecryptionPanelProps) {
  const { decrypt, loading, error } = useEncryption();
  const [decryptionKey, setDecryptionKey] = useState("");
  const [decryptedResult, setDecryptedResult] = useState<{
    message: string;
    lat: string | null;
    lng: string | null;
  } | null>(null);

  const handleDecrypt = async () => {
    if (!foundPayload) return;
    try {
      const res = await decrypt(foundPayload, decryptionKey);
      setDecryptedResult(res);
    } catch (err) {
      setDecryptedResult(null);
    }
  };

  return (
    <div className="naval-card p-6 space-y-6 shadow-xl flex flex-col justify-between h-full">
      <div className="border-b border-[#1E2D4A] pb-4 space-y-3">
        <h2 className="text-lg font-bold text-gray-100">Scan Result</h2>
        
        {/* Green Found Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
          <CheckCircle2 className="w-4 h-4" />
          <span>Secret Payload Found!</span>
        </div>
      </div>

      {/* Encrypted Payload Output Box */}
      <div className="space-y-4">
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-gray-400">Encrypted Payload</label>
            <button
              onClick={() => navigator.clipboard.writeText(foundPayload)}
              className="text-xs text-[#D9A036] hover:underline flex items-center gap-1"
            >
              <Copy className="w-3 h-3" />
              <span>Copy</span>
            </button>
          </div>
          <div className="w-full bg-[#0B101D] border border-[#1E2D4A] rounded-xl p-3.5 text-xs text-gray-300 font-mono break-all max-h-28 overflow-y-auto">
            {foundPayload || "Paste or scan payload above..."}
          </div>
        </div>

        {/* AES Key Input for Decryption */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-gray-400 flex items-center gap-1">
            <Key className="w-3.5 h-3.5 text-[#D9A036]" />
            Decryption AES Key (Base64)
          </label>
          <input
            type="text"
            value={decryptionKey}
            onChange={(e) => setDecryptionKey(e.target.value)}
            placeholder="Paste Base64 AES-256 Key..."
            className="w-full bg-[#0B101D] border border-[#1E2D4A] rounded-xl p-3 text-xs text-gray-200 font-mono focus:outline-none focus:border-[#D9A036]"
          />
        </div>
      </div>

      {error && (
        <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-semibold">
          {error}
        </div>
      )}

      {/* Decrypted Recovered Message Box */}
      {decryptedResult && (
        <div className="p-4 rounded-xl bg-[#0B101D] border border-[#D9A036]/40 space-y-2">
          <div className="text-xs font-bold text-[#D9A036] uppercase tracking-wider flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5" />
            Decrypted Secret Message
          </div>
          <p className="text-sm text-gray-100 font-serif italic">{decryptedResult.message}</p>
          {(decryptedResult.lat || decryptedResult.lng) && (
            <div className="text-[10px] text-gray-400 font-mono flex items-center gap-2 pt-1 border-t border-[#1E2D4A]">
              <MapPin className="w-3 h-3 text-[#D9A036]" />
              <span>LAT: {decryptedResult.lat || "N/A"} • LON: {decryptedResult.lng || "N/A"}</span>
            </div>
          )}
        </div>
      )}

      {/* Decrypt Message Action Button */}
      <button
        onClick={handleDecrypt}
        disabled={loading}
        className="w-full py-3.5 rounded-xl gold-button flex items-center justify-center gap-2.5 text-sm font-bold shadow-lg"
      >
        <KeyRound className="w-4 h-4" />
        <span>{loading ? "Decrypting..." : "Decrypt Message"}</span>
      </button>
    </div>
  );
}

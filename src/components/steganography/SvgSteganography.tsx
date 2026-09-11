"use client";

import React, { useState } from "react";
import { Upload, Download, Skull, FileCode, CheckCircle2 } from "lucide-react";
import { useSteganography } from "@/hooks/useSteganography";

const SAMPLE_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 60" width="100%" height="100%">
  <rect width="100" height="60" fill="#000000"/>
  <circle cx="50" cy="25" r="12" fill="#ffffff"/>
  <path d="M 40 45 L 60 45 M 50 35 L 50 55" stroke="#ffffff" stroke-width="3"/>
</svg>`;

export function SvgSteganography() {
  const { embedSvg, loading, error } = useSteganography();
  const [fileName, setFileName] = useState<string | null>("Black_Pearl_Flag.svg");
  const [svgPayload, setSvgPayload] = useState(
    '{\n  "version": "1.0",\n  "algorithm": "AES-GCM",\n  "ciphertext": "U2FsdGVkX19xVzV4...",\n  "iv": "9a8b7c6d5e4f"\n}'
  );
  const [embeddedSvg, setEmbeddedSvg] = useState<string | null>(null);

  const handleEmbedAndDownload = () => {
    try {
      const resultSvg = embedSvg(SAMPLE_SVG, svgPayload);
      setEmbeddedSvg(resultSvg);

      // Trigger browser download of modified SVG
      const blob = new Blob([resultSvg], { type: "image/svg+xml" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "stego_ship_flag.svg";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      // error handled in hook
    }
  };

  return (
    <div className="naval-card p-6 space-y-6 shadow-xl flex flex-col justify-between h-full">
      <div className="border-b border-[#1E2D4A] pb-4">
        <h2 className="text-lg font-bold text-gray-100">Ship Flag (SVG)</h2>
        <p className="text-xs text-gray-400">Embed encrypted payloads directly into SVG metadata / custom attributes</p>
      </div>

      {/* SVG Flag Drag & Drop Preview Box */}
      <div className="border-2 border-dashed border-[#2A3854] hover:border-[#D9A036]/60 rounded-2xl p-6 bg-[#0B101D]/70 transition-all flex flex-col items-center justify-center text-center cursor-pointer relative overflow-hidden group">
        {/* Pirate Flag Graphic Preview */}
        <div className="w-56 h-32 mb-3 rounded-lg bg-black border border-gray-800 flex items-center justify-center shadow-2xl relative overflow-hidden group-hover:scale-105 transition-transform">
          <img
            src="/images/flags/jolly-roger.svg"
            alt="Jolly Roger Ship Flag"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>

        <Upload className="w-6 h-6 text-[#D9A036] mb-2" />
        <div className="text-sm font-semibold text-gray-200">
          Upload SVG Ship Flag <span className="text-gray-400 font-normal">or drag and drop</span>
        </div>
        <div className="text-xs text-gray-500 mt-1">Supports SVG files up to 10MB</div>
        {fileName && (
          <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#131B2E] border border-[#1E2D4A] text-xs text-[#D9A036]">
            <FileCode className="w-3.5 h-3.5" />
            <span>{fileName}</span>
          </div>
        )}
      </div>

      {/* Hidden Payload Input Box */}
      <div>
        <label className="block text-xs font-semibold text-gray-400 mb-1">Encrypted Payload to Embed</label>
        <textarea
          value={svgPayload}
          onChange={(e) => setSvgPayload(e.target.value)}
          rows={2}
          className="w-full bg-[#0B101D] border border-[#1E2D4A] rounded-xl p-3 text-xs text-gray-300 font-mono resize-none focus:outline-none focus:border-[#D9A036]"
        />
      </div>

      {error && (
        <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-semibold">
          {error}
        </div>
      )}

      {embeddedSvg && (
        <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>✓ PAYLOAD EMBEDDED IN SVG METADATA (Downloaded)</span>
        </div>
      )}

      {/* Action Button */}
      <button
        onClick={handleEmbedAndDownload}
        disabled={loading}
        className="w-full py-3.5 rounded-xl gold-button flex items-center justify-center gap-2.5 text-sm font-bold shadow-lg"
      >
        <Download className="w-4 h-4" />
        <span>{loading ? "Embedding..." : "Hide Payload & Download"}</span>
      </button>
    </div>
  );
}

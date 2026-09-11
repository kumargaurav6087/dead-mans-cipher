"use client";

import React, { useState } from "react";
import { Upload, Scan, FileText, Flag } from "lucide-react";
import { useSteganography } from "@/hooks/useSteganography";

interface ExtractionPanelProps {
  onScan?: (extractedPayload: string) => void;
  onError?: (errorMsg: string) => void;
}

export function ExtractionPanel({ onScan, onError }: ExtractionPanelProps) {
  const { extractText, extractSvg, loading } = useSteganography();
  const [sourceType, setSourceType] = useState<"text" | "svg">("text");
  const [inputText, setInputText] = useState("");
  const [localError, setLocalError] = useState<string | null>(null);

  const handleScanClick = () => {
    setLocalError(null);
    try {
      let extracted = "";
      if (sourceType === "text") {
        extracted = extractText(inputText);
      } else {
        extracted = extractSvg(inputText);
      }

      if (onScan) {
        onScan(extracted);
      }
    } catch (err: any) {
      const msg = err.message || "No hidden payload detected.";
      setLocalError(msg);
      if (onError) onError(msg);
    }
  };

  return (
    <div className="naval-card p-6 space-y-6 shadow-xl">
      <div className="flex items-center gap-3 border-b border-[#1E2D4A] pb-4">
        <button
          type="button"
          onClick={() => {
            setSourceType("text");
            setLocalError(null);
          }}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
            sourceType === "text"
              ? "bg-[#131B2E] text-[#D9A036] border border-[#D9A036]/50"
              : "text-gray-400 hover:text-gray-200"
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          <span>From Text</span>
        </button>
        <button
          type="button"
          onClick={() => {
            setSourceType("svg");
            setLocalError(null);
          }}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
            sourceType === "svg"
              ? "bg-[#131B2E] text-[#D9A036] border border-[#D9A036]/50"
              : "text-gray-400 hover:text-gray-200"
          }`}
        >
          <Flag className="w-3.5 h-3.5" />
          <span>From SVG Flag</span>
        </button>
      </div>

      {/* Input / Drop zone Area */}
      <div className="space-y-2">
        <div className="border-2 border-dashed border-[#2A3854] hover:border-[#D9A036]/60 rounded-2xl p-6 bg-[#0B101D] text-center flex flex-col items-center justify-center space-y-3 cursor-pointer">
          <Upload className="w-8 h-8 text-[#D9A036]" />
          <p className="text-sm font-semibold text-gray-300">
            Paste or upload {sourceType === "text" ? "text" : "SVG file"} with hidden payload
          </p>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={
              sourceType === "text"
                ? "Paste sea shanty text containing zero-width stego payload..."
                : "Paste raw SVG XML code or upload file..."
            }
            rows={4}
            className="w-full bg-[#131B2E] border border-[#1E2D4A] rounded-xl p-3 text-xs text-gray-200 font-mono focus:outline-none focus:border-[#D9A036] resize-none"
          />
        </div>
      </div>

      {localError && (
        <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-semibold">
          NO HIDDEN PAYLOAD DETECTED ({localError})
        </div>
      )}

      {/* Scan Button */}
      <button
        onClick={handleScanClick}
        disabled={loading}
        className="w-full py-3.5 rounded-xl gold-button flex items-center justify-center gap-2 text-sm font-bold shadow-lg"
      >
        <Scan className="w-4 h-4" />
        <span>{loading ? "Scanning..." : "Scan for Secret"}</span>
      </button>
    </div>
  );
}

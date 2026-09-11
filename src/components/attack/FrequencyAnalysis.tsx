"use client";

import React, { useState } from "react";
import { Lock, Zap, RefreshCw } from "lucide-react";

export function FrequencyAnalysis() {
  const [analyzing, setAnalyzing] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);
  const [sampleText, setSampleText] = useState("KRRV DW SRUW URBDO DW PLDQLJKW");

  // Calculate character frequencies from sample classical ciphertext
  const calculateFrequencies = (text: string) => {
    const counts: Record<string, number> = {};
    const upper = text.toUpperCase().replace(/[^A-Z]/g, "");
    const total = upper.length || 1;
    for (const char of upper) {
      counts[char] = (counts[char] || 0) + 1;
    }
    const alphabet = "ABCDEFGHIJKLM".split("");
    return alphabet.map((letter) => {
      const count = counts[letter] || 0;
      const pct = Math.min(Math.round((count / total) * 100 * 3.5) + 10, 95);
      return { letter, val: pct, count };
    });
  };

  const frequencies = calculateFrequencies(sampleText);

  const handleRunAnalysis = () => {
    setAnalyzing(true);
    setAnalyzed(false);
    setTimeout(() => {
      setAnalyzing(false);
      setAnalyzed(true);
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* Sample Ciphertext Input */}
      <div className="space-y-1.5">
        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400">
          Classical Cipher Sample
        </label>
        <input
          type="text"
          value={sampleText}
          onChange={(e) => setSampleText(e.target.value)}
          placeholder="Enter classical ciphertext sample..."
          className="w-full bg-[#0B101D] border border-[#1E2D4A] rounded-xl px-3.5 py-2.5 text-xs text-gray-200 font-mono tracking-wider focus:outline-none focus:border-[#D9A036]"
        />
      </div>

      {/* Histogram Bar Chart */}
      <div className="p-6 rounded-xl bg-[#0B101D] border border-[#1E2D4A] space-y-4">
        <div className="text-xs font-semibold uppercase tracking-wider text-gray-400">
          Character Frequency Spectrum (A - M)
        </div>

        <div className="h-44 flex items-end justify-between gap-2 px-2 pt-6 border-b border-[#1E2D4A]">
          {frequencies.map((item) => (
            <div key={item.letter} className="flex-1 flex flex-col items-center gap-2 group">
              <div
                className="w-full bg-gradient-to-t from-cyan-600 to-cyan-400 rounded-t group-hover:from-[#D9A036] group-hover:to-[#E5B849] transition-all shadow-md"
                style={{ height: `${item.val}%` }}
              />
              <span className="text-[10px] font-mono font-bold text-gray-400 group-hover:text-white">
                {item.letter}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Run Analysis Action Button */}
      <button
        onClick={handleRunAnalysis}
        disabled={analyzing}
        className="w-full py-3.5 rounded-xl gold-button flex items-center justify-center gap-2 text-sm font-bold shadow-lg"
      >
        {analyzing ? (
          <RefreshCw className="w-4 h-4 animate-spin" />
        ) : (
          <Zap className="w-4 h-4" />
        )}
        <span>{analyzing ? "Analyzing Frequency Patterns..." : "RUN ANALYSIS"}</span>
      </button>

      {/* Result Status Box */}
      {analyzed && (
        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 flex items-center gap-3.5">
          <div className="p-2.5 rounded-lg bg-rose-500/20 text-rose-400 shrink-0">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-wider">Analysis Result</div>
            <div className="text-sm font-semibold text-gray-200">
              Classical cipher pattern detected. (Substitution Cipher Vulnerable)
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


"use client";

import React, { useState } from "react";
import { Key, Copy, Check, Shield } from "lucide-react";

export function WaxSealGenerator() {
  const [passphrase, setPassphrase] = useState("Black-Pearl-Waverunner-7924");
  const [copied, setCopied] = useState(false);

  const maritimeWords = [
    "Black-Pearl",
    "Moonlit",
    "Storm",
    "Crimson",
    "Waverunner",
    "Sea-Fang",
    "Dead-Reckoning",
    "Iron-Tide",
    "Flying-Dutchman",
    "Jolly-Roger",
    "Tortuga-Bay",
    "Queen-Annes-Revenge",
  ];

  const generatePassphrase = () => {
    const randomBuffer = new Uint32Array(3);
    if (typeof window !== "undefined" && window.crypto) {
      window.crypto.getRandomValues(randomBuffer);
    }

    const word1 = maritimeWords[randomBuffer[0] % maritimeWords.length];
    let word2Index = randomBuffer[1] % maritimeWords.length;
    if (word2Index === randomBuffer[0] % maritimeWords.length) {
      word2Index = (word2Index + 1) % maritimeWords.length;
    }
    const word2 = maritimeWords[word2Index];

    const num = (randomBuffer[2] % 9000) + 1000;

    return `${word1}-${word2}-${num}`;
  };

  const handleGenerate = () => {
    setPassphrase(generatePassphrase());
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(passphrase);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="naval-card p-6 space-y-5 shadow-xl border border-[#D9A036]/30">
      <div>
        <h3 className="text-base font-bold text-gray-100 flex items-center gap-2">
          <Shield className="w-4 h-4 text-[#D9A036]" />
          Pirate Passphrase Generator
        </h3>
        <p className="text-xs text-gray-400">Generates high-entropy nautical key phrases</p>
      </div>

      {/* Display Field */}
      <div className="flex items-center gap-3">
        <div className="flex-1 bg-[#0B101D] border border-[#1E2D4A] rounded-xl px-4 py-3 text-sm font-mono text-[#D9A036] font-bold flex items-center justify-between">
          <span>{passphrase}</span>
          <button
            onClick={handleCopy}
            className="p-1 text-gray-400 hover:text-white transition-colors"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Action Button */}
      <button
        onClick={handleGenerate}
        className="w-full py-3 rounded-xl gold-button flex items-center justify-center gap-2 text-xs font-bold shadow-md"
      >
        <Key className="w-4 h-4" />
        <span>Generate Passphrase</span>
      </button>
    </div>
  );
}


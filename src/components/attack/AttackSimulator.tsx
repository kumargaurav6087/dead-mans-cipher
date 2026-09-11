"use client";

import React, { useState } from "react";
import { FrequencyAnalysis } from "./FrequencyAnalysis";
import { BruteForceSimulation } from "./BruteForceSimulation";

export function AttackSimulator() {
  const [activeTab, setActiveTab] = useState<"frequency" | "bruteforce">("frequency");

  return (
    <div className="naval-card p-6 space-y-6 shadow-xl max-w-3xl mx-auto">
      {/* Top Sub-tabs matching Panel 07 */}
      <div className="flex items-center gap-3 border-b border-[#1E2D4A] pb-3">
        <button
          onClick={() => setActiveTab("frequency")}
          className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === "frequency"
              ? "bg-[#131B2E] text-[#D9A036] border border-[#D9A036]/50 shadow-md"
              : "text-gray-400 hover:text-gray-200"
          }`}
        >
          Frequency Analysis
        </button>

        <button
          onClick={() => setActiveTab("bruteforce")}
          className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === "bruteforce"
              ? "bg-[#131B2E] text-[#D9A036] border border-[#D9A036]/50 shadow-md"
              : "text-gray-400 hover:text-gray-200"
          }`}
        >
          Brute Force
        </button>
      </div>

      {activeTab === "frequency" ? <FrequencyAnalysis /> : <BruteForceSimulation />}
    </div>
  );
}

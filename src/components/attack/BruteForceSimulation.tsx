"use client";

import React, { useState } from "react";
import { ShieldCheck, ShieldAlert, RefreshCw, AlertOctagon } from "lucide-react";

export function BruteForceSimulation() {
  const [running, setRunning] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [attemptLogs, setAttemptLogs] = useState<Array<{ id: string; status: "FAILED" | "SUCCESS"; key: string }>>([]);

  const sampleAttempts = [
    { id: "Attempt 001", status: "FAILED" as const, key: "0x1A2B3C" },
    { id: "Attempt 002", status: "FAILED" as const, key: "0x4D5E6F" },
    { id: "Attempt 003", status: "FAILED" as const, key: "0x789A0B" },
    { id: "Attempt 004", status: "FAILED" as const, key: "0xC1D2E3" },
    { id: "Attempt 005", status: "SUCCESS" as const, key: "0xF4E5D6 (Caesar Shift +3)" },
  ];

  const startSimulation = () => {
    setRunning(true);
    setCompleted(false);
    setAttemptLogs([]);

    sampleAttempts.forEach((item, index) => {
      setTimeout(() => {
        setAttemptLogs((prev) => [...prev, item]);
        if (index === sampleAttempts.length - 1) {
          setRunning(false);
          setCompleted(true);
        }
      }, (index + 1) * 450);
    });
  };

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-xl bg-[#0B101D] border border-[#1E2D4A] space-y-4">
        <div className="text-xs font-semibold uppercase tracking-wider text-gray-400">
          Brute-Force Key Space Search
        </div>

        <div className="p-4 rounded-xl bg-[#131B2E] border border-[#1E2D4A] space-y-2 text-xs">
          <div className="flex justify-between">
            <span className="text-gray-400">Target Cipher:</span>
            <span className="font-mono text-gray-200 font-bold">AES-GCM (256-bit) vs Classical</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">AES Key Search Space:</span>
            <span className="font-mono text-[#D9A036]">2^256 combinations (Immune)</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Classical Search Space:</span>
            <span className="font-mono text-cyan-400">26 combinations (Small Keyspace)</span>
          </div>
        </div>

        {/* Live Attempts Log Terminal */}
        {attemptLogs.length > 0 && (
          <div className="bg-[#050810] border border-[#1E2D4A] rounded-xl p-3.5 space-y-1.5 font-mono text-[11px]">
            {attemptLogs.map((log) => (
              <div key={log.id} className="flex items-center justify-between">
                <span className="text-gray-400">{log.id} ({log.key})</span>
                <span
                  className={
                    log.status === "SUCCESS"
                      ? "text-rose-400 font-bold"
                      : "text-gray-500 font-medium"
                  }
                >
                  — {log.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      <button
        onClick={startSimulation}
        disabled={running}
        className="w-full py-3.5 rounded-xl gold-button flex items-center justify-center gap-2 text-sm font-bold shadow-lg"
      >
        <RefreshCw className={`w-4 h-4 ${running ? "animate-spin" : ""}`} />
        <span>{running ? "Simulating Key Search..." : "Start Brute-Force Simulation"}</span>
      </button>

      {/* Comparative Status Badges */}
      {completed && (
        <div className="space-y-3">
          <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/40 text-rose-400 flex items-center gap-3">
            <AlertOctagon className="w-5 h-5 shrink-0 text-rose-400" />
            <div>
              <div className="text-xs font-bold uppercase tracking-wider">Weak Classical Cipher</div>
              <div className="text-sm font-extrabold text-rose-400">COMPROMISED</div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/40 text-emerald-400 flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 shrink-0 text-emerald-400" />
            <div>
              <div className="text-xs font-bold uppercase tracking-wider">AES-GCM (256-bit)</div>
              <div className="text-sm font-extrabold text-emerald-400">
                RESISTANT TO THIS DEMO ATTACK
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


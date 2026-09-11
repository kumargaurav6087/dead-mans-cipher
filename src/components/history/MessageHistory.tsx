"use client";

import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getHistoryRecords } from "@/lib/storage/local-storage";
import { EncryptedMessageRecord } from "@/types/message";

export function MessageHistory() {
  const [records, setRecords] = useState<EncryptedMessageRecord[]>([]);

  useEffect(() => {
    setRecords(getHistoryRecords());
  }, []);

  const getStatusBadge = (type: string) => {
    switch (type.toLowerCase()) {
      case "text":
        return "bg-blue-500/10 border-blue-500/40 text-blue-400";
      case "svg":
        return "bg-cyan-500/10 border-cyan-500/40 text-cyan-400";
      default:
        return "bg-emerald-500/10 border-emerald-500/40 text-emerald-400";
    }
  };

  return (
    <div className="naval-card p-6 space-y-6 shadow-xl">
      <div className="border-b border-[#1E2D4A] pb-4">
        <h2 className="text-lg font-bold text-gray-100">Message History</h2>
        <p className="text-xs text-gray-400">Your secured communications logs</p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-[#1E2D4A] text-gray-400 uppercase tracking-wider font-semibold">
              <th className="pb-3 px-4">ID</th>
              <th className="pb-3 px-4">Stego Type</th>
              <th className="pb-3 px-4">Cipher</th>
              <th className="pb-3 px-4">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1E2D4A]/60">
            {records.map((row) => (
              <tr key={row.id} className="hover:bg-[#131B2E]/60 transition-colors">
                <td className="py-4 px-4 font-mono font-bold text-[#D9A036]">{row.id}</td>
                <td className="py-4 px-4">
                  <span
                    className={`inline-block px-3 py-1 rounded-full border text-[11px] font-semibold uppercase ${getStatusBadge(
                      row.steganographyType || "none"
                    )}`}
                  >
                    {row.steganographyType || "none"}
                  </span>
                </td>
                <td className="py-4 px-4 text-gray-200 font-mono">{row.cipher}</td>
                <td className="py-4 px-4 text-gray-400 font-mono">{row.createdAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="flex items-center justify-center gap-4 border-t border-[#1E2D4A] pt-4 text-xs">
        <button className="p-1.5 rounded-lg border border-[#1E2D4A] bg-[#0B101D] text-gray-400 hover:text-white">
          <ChevronLeft className="w-4 h-4" />
        </button>
        <span className="font-mono text-gray-300 font-bold px-2 py-1 bg-[#0B101D] rounded border border-[#1E2D4A]">
          1
        </span>
        <button className="p-1.5 rounded-lg border border-[#1E2D4A] bg-[#0B101D] text-gray-400 hover:text-white">
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

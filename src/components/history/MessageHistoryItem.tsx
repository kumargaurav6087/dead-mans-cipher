"use client";

import React from "react";

interface MessageHistoryItemProps {
  id: string;
  type: string;
  status: string;
  date: string;
}

export function MessageHistoryItem({ id, type, status, date }: MessageHistoryItemProps) {
  return (
    <tr className="hover:bg-[#131B2E]/60 transition-colors">
      <td className="py-4 px-4 font-mono font-bold text-[#D9A036]">{id}</td>
      <td className="py-4 px-4 text-gray-200 font-medium">{type}</td>
      <td className="py-4 px-4">
        <span className="inline-block px-3 py-1 rounded-full border text-[11px] font-semibold bg-blue-500/10 border-blue-500/40 text-blue-400">
          {status}
        </span>
      </td>
      <td className="py-4 px-4 text-gray-400 font-mono">{date}</td>
    </tr>
  );
}

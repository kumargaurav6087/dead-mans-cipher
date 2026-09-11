"use client";

import React from "react";

interface SeaShantyEditorProps {
  value: string;
  onChange: (val: string) => void;
}

export function SeaShantyEditor({ value, onChange }: SeaShantyEditorProps) {
  return (
    <div className="space-y-2">
      <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400">
        Sea Shanty Text
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={6}
        className="w-full bg-[#0B101D] border border-[#1E2D4A] rounded-xl p-4 text-sm text-gray-200 font-serif italic placeholder-gray-500 focus:outline-none focus:border-[#D9A036] transition-colors leading-relaxed resize-none"
      />
    </div>
  );
}

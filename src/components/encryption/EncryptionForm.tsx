"use client";

import React, { useState } from "react";
import { Lock, MapPin } from "lucide-react";

interface EncryptionFormProps {
  onEncrypt?: (data: { message: string; lat: string; lng: string; cipher: string }) => void;
}

export function EncryptionForm({ onEncrypt }: EncryptionFormProps) {
  const [message, setMessage] = useState("");
  const [lat, setLat] = useState("19.0760");
  const [lng, setLng] = useState("72.8777");
  const [cipher, setCipher] = useState("AES-GCM");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onEncrypt) {
      onEncrypt({ message, lat, lng, cipher });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="naval-card p-6 space-y-6 shadow-xl">
      <div className="flex items-center justify-between border-b border-[#1E2D4A] pb-4">
        <div>
          <h2 className="text-lg font-bold text-gray-100">Secret Message</h2>
          <p className="text-xs text-gray-400">Input your plaintext payload and maritime coordinates</p>
        </div>
        <span className="text-xs font-mono text-[#D9A036]">
          {message.length}/1000
        </span>
      </div>

      {/* Secret Message Input */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
          Secret Message
        </label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter your secret message..."
          rows={5}
          maxLength={1000}
          className="w-full bg-[#0B101D] border border-[#1E2D4A] rounded-xl p-3.5 text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:border-[#D9A036] transition-colors resize-none"
        />
      </div>

      {/* Coordinates (Latitude / Longitude) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-gray-400 mb-1.5 flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-[#D9A036]" />
            Latitude (Optional)
          </label>
          <input
            type="text"
            value={lat}
            onChange={(e) => setLat(e.target.value)}
            placeholder="19.0760"
            className="w-full bg-[#0B101D] border border-[#1E2D4A] rounded-xl px-3.5 py-2.5 text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:border-[#D9A036] transition-colors font-mono"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-400 mb-1.5 flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-[#D9A036]" />
            Longitude (Optional)
          </label>
          <input
            type="text"
            value={lng}
            onChange={(e) => setLng(e.target.value)}
            placeholder="72.8777"
            className="w-full bg-[#0B101D] border border-[#1E2D4A] rounded-xl px-3.5 py-2.5 text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:border-[#D9A036] transition-colors font-mono"
          />
        </div>
      </div>

      {/* Cipher Selector */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
          Select Cipher
        </label>
        <div className="grid grid-cols-2 gap-3">
          <label
            className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
              cipher === "AES-GCM"
                ? "bg-[#131B2E] border-[#D9A036] text-[#D9A036]"
                : "bg-[#0B101D] border-[#1E2D4A] text-gray-400 hover:border-gray-600"
            }`}
          >
            <input
              type="radio"
              name="cipher"
              value="AES-GCM"
              checked={cipher === "AES-GCM"}
              onChange={() => setCipher("AES-GCM")}
              className="accent-[#D9A036]"
            />
            <div>
              <div className="text-sm font-bold text-gray-200">AES-GCM</div>
              <div className="text-[10px] text-gray-500">Browser Native (Recommended)</div>
            </div>
          </label>

          <label
            className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
              cipher === "ChaCha20"
                ? "bg-[#131B2E] border-[#D9A036] text-[#D9A036]"
                : "bg-[#0B101D] border-[#1E2D4A] text-gray-400 hover:border-gray-600"
            }`}
          >
            <input
              type="radio"
              name="cipher"
              value="ChaCha20"
              checked={cipher === "ChaCha20"}
              onChange={() => setCipher("ChaCha20")}
              className="accent-[#D9A036]"
            />
            <div>
              <div className="text-sm font-bold text-gray-200">ChaCha20</div>
              <div className="text-[10px] text-gray-500">Stream Cipher</div>
            </div>
          </label>
        </div>
      </div>

      {/* Encrypt Action Button */}
      <button
        type="submit"
        className="w-full py-3.5 rounded-xl gold-button flex items-center justify-center gap-2.5 text-base font-bold shadow-lg"
      >
        <Lock className="w-5 h-5" />
        <span>Encrypt Message</span>
      </button>
    </form>
  );
}

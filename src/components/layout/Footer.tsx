import React from "react";
import Link from "next/link";
import { Shield } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#0B101D] border-t border-[#1E2D4A] py-8 px-6 text-sm text-gray-400">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-[#D9A036]" />
          <span className="font-semibold text-gray-200">THE DEAD MAN'S CIPHER</span>
          <span className="text-xs text-gray-500">— Secure the message. Hide the secret.</span>
        </div>
        <div className="flex items-center gap-6 text-xs">
          <span>Client-Side Encryption (Web Crypto API)</span>
          <span>•</span>
          <span>Zero Plaintext Transmission</span>
          <span>•</span>
          <span>AES-GCM • HMAC • SHA-256</span>
        </div>
      </div>
    </footer>
  );
}

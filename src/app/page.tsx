"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Compass,
  Lock,
  Shield,
  Key,
  Eye,
  ArrowRight,
  Play,
  Anchor
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#0B101D] text-gray-100 flex flex-col relative overflow-hidden">
      {/* Background Ocean & Moon Atmospheric Overlay */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#1B294A]/40 via-[#0B101D] to-[#050810]" />
      
      {/* Decorative Moon Glow & Water Waves overlay effect */}
      <div className="absolute top-10 right-1/4 w-72 h-72 rounded-full bg-[#E5B849]/10 blur-[100px] pointer-events-none" />

      {/* Top Header Navigation */}
      <header className="relative z-20 max-w-7xl w-full mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#131B2E] border border-[#D9A036]/60 flex items-center justify-center text-[#D9A036] shadow-lg">
            <Compass className="w-6 h-6 animate-spin-slow" />
          </div>
          <div>
            <div className="text-xs tracking-widest text-[#D9A036] font-bold">THE DEAD</div>
            <div className="text-base font-extrabold tracking-wider font-serif text-gray-100 leading-none">
              MAN'S CIPHER
            </div>
          </div>
        </div>

        {/* Center Nav Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
          <Link href="/" className="text-[#D9A036] hover:text-white transition-colors">Home</Link>
          <a href="#features" className="hover:text-[#D9A036] transition-colors">Features</a>
          <a href="#about" className="hover:text-[#D9A036] transition-colors">About</a>
          <a href="#contact" className="hover:text-[#D9A036] transition-colors">Contact</a>
        </nav>

        {/* Header Right Actions */}
        <div className="flex items-center gap-4">
          <Link
            href="/dashboard"
            className="px-4 py-2 text-sm font-semibold text-gray-300 hover:text-white transition-colors"
          >
            Login
          </Link>
          <Link
            href="/dashboard"
            className="px-5 py-2 rounded-lg text-sm font-bold text-[#0B101D] gold-button flex items-center gap-2"
          >
            Get Started
          </Link>
        </div>
      </header>

      {/* Main Hero Banner Container */}
      <main className="relative z-10 flex-1 max-w-7xl w-full mx-auto px-6 pt-12 pb-24 flex flex-col justify-between">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center my-auto">
          {/* Left Column Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#131B2E] border border-[#D9A036]/30 text-xs font-semibold text-[#D9A036]">
              <Anchor className="w-3.5 h-3.5" />
              <span>Cybersecurity & Steganography Workbench</span>
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold font-serif tracking-tight leading-none">
              THE <br />
              <span className="gold-gradient-text">DEAD MAN'S</span> <br />
              CIPHER
            </h1>

            <p className="text-xl sm:text-2xl font-serif text-gray-200 tracking-wide italic">
              "SOME SECRETS SHOULD NEVER REACH THE SHORE."
            </p>

            <p className="text-sm sm:text-base text-gray-400 max-w-xl leading-relaxed">
              Secure the message. Hide the secret. A client-side cryptographic and steganographic workbench for secure maritime communication using browser-native Web Crypto API.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Link
                href="/dashboard"
                className="px-7 py-3.5 rounded-xl text-base font-bold text-[#0B101D] gold-button flex items-center gap-3 shadow-lg"
              >
                <span>ENTER THE COMMAND CENTER</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <button
                onClick={() => alert("Demo video coming soon!")}
                className="px-6 py-3.5 rounded-xl text-base font-semibold text-gray-200 border border-[#1E2D4A] bg-[#131B2E]/60 hover:bg-[#131B2E] hover:border-[#D9A036]/50 flex items-center gap-2.5 transition-all"
              >
                <Play className="w-4 h-4 fill-current text-[#D9A036]" />
                <span>WATCH DEMO</span>
              </button>
            </div>
          </motion.div>

          {/* Right Column: Visual Ship / Parchment Banner Overlay */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            {/* Visual Pirate Ship Frame Box */}
            <div className="relative rounded-2xl overflow-hidden border border-[#2A3854] bg-[#131B2E]/80 p-3 backdrop-blur-md shadow-2xl">
              <div className="aspect-[4/3] rounded-xl relative overflow-hidden flex flex-col justify-end p-5">
                {/* Ken Burns cinematic pan/zoom animation — no video file needed */}
                <style>{`
                  @keyframes kenBurns {
                    0%   { transform: scale(1.08) translate(0%, 0%); }
                    25%  { transform: scale(1.12) translate(-1.5%, -1%); }
                    50%  { transform: scale(1.10) translate(-0.5%, -2%); }
                    75%  { transform: scale(1.13) translate(1%, -0.5%); }
                    100% { transform: scale(1.08) translate(0%, 0%); }
                  }
                  @keyframes fogDrift {
                    0%,100% { opacity: 0.18; }
                    50%     { opacity: 0.28; }
                  }
                  .ken-burns-img { animation: kenBurns 18s ease-in-out infinite; }
                  .fog-layer     { animation: fogDrift 8s ease-in-out infinite; }
                `}</style>
                <img
                  src="/images/backgrounds/hero-ocean.jpg"
                  alt="Dead Man's Cipher Hero Ocean Ship"
                  className="ken-burns-img absolute inset-0 w-full h-full object-cover rounded-xl opacity-90"
                />
                {/* Animated fog / mist overlay for depth */}
                <div className="fog-layer absolute inset-0 bg-gradient-to-br from-[#0B101D]/30 via-transparent to-[#1B294A]/20 rounded-xl pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B101D] via-[#0B101D]/40 to-transparent" />

                <div className="relative z-10 space-y-2">
                  <div className="text-[10px] uppercase tracking-widest text-[#D9A036] font-mono font-bold">
                    LAT: 18.4767 N • LON: 77.8939 W
                  </div>
                  <div className="text-base font-serif font-bold text-gray-100">
                    Caribbean Naval Communications
                  </div>

                  {/* Parchment Quote Banner */}
                  <div className="p-3 rounded-lg parchment-banner text-left relative max-w-sm w-full">
                    <p className="text-xs font-serif italic text-[#E5B849] leading-snug">
                      "Secure the message. Hide the secret."
                    </p>
                    <div className="text-[9px] uppercase font-mono text-gray-400 stroke-none text-right mt-0.5">
                      — Captain's Log #1704
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Feature Badges Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          <div className="p-4 rounded-xl naval-card flex items-center gap-3.5">
            <div className="p-2.5 rounded-lg bg-[#0B101D] border border-[#1E2D4A] text-[#D9A036]">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-gray-400 font-medium">Client-Side Encryption</div>
              <div className="text-sm font-semibold text-gray-200">Web Crypto API</div>
            </div>
          </div>

          <div className="p-4 rounded-xl naval-card flex items-center gap-3.5">
            <div className="p-2.5 rounded-lg bg-[#0B101D] border border-[#1E2D4A] text-[#D9A036]">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-gray-400 font-medium">Zero Plaintext</div>
              <div className="text-sm font-semibold text-gray-200">Transmission</div>
            </div>
          </div>

          <div className="p-4 rounded-xl naval-card flex items-center gap-3.5">
            <div className="p-2.5 rounded-lg bg-[#0B101D] border border-[#1E2D4A] text-[#D9A036]">
              <Key className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-gray-400 font-medium">Modern Cryptography</div>
              <div className="text-sm font-semibold text-gray-200">AES-GCM • HMAC • SHA-256</div>
            </div>
          </div>

          <div className="p-4 rounded-xl naval-card flex items-center gap-3.5">
            <div className="p-2.5 rounded-lg bg-[#0B101D] border border-[#1E2D4A] text-[#D9A036]">
              <Eye className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-gray-400 font-medium">Steganography</div>
              <div className="text-sm font-semibold text-gray-200">Text • SVG Flag</div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}

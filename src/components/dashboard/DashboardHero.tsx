"use client";

import React from "react";
import { Compass } from "lucide-react";

export function DashboardHero() {
  return (
    <div className="relative rounded-2xl overflow-hidden border border-[#2A3854] bg-[#131B2E]/90 p-6 md:p-8 backdrop-blur-md shadow-xl">
      {/* Background Antique Map Overlay */}
      <img
        src="/images/maps/antique-map.jpg"
        alt="Nautical Map Texture"
        className="absolute inset-0 w-full h-full object-cover opacity-10 pointer-events-none mix-blend-luminosity"
      />
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_right,_var(--tw-gradient-stops))] from-[#1B294A]/40 via-transparent to-transparent pointer-events-none" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Left Welcome Text */}
        <div className="lg:col-span-7 space-y-3">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-serif tracking-tight text-gray-100">
            Welcome Back, Vijay!
          </h1>
          <p className="text-base text-gray-300 font-medium">
            Ready to secure your next message?
          </p>

          <div className="pt-2">
            <p className="text-lg font-serif italic text-[#E5B849]">
              "Every Message Finds a Safer Shore."
            </p>
          </div>
        </div>

        {/* Right Parchment Quote Box with Compass Graphic */}
        <div className="lg:col-span-5 flex items-center justify-end">
          <div className="parchment-banner p-5 rounded-xl border border-[#D9A036]/40 max-w-sm w-full relative overflow-hidden shadow-lg flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-[#0B101D] border border-[#D9A036]/60 flex items-center justify-center text-[#D9A036] shrink-0">
              <Compass className="w-8 h-8 animate-spin-slow" />
            </div>
            <div>
              <p className="text-sm font-serif italic text-[#E5B849] leading-snug">
                "In a world of open seas, code is your compass."
              </p>
              <div className="text-[10px] uppercase font-mono text-gray-400 mt-1">
                — Maritime Crypto Motto
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
